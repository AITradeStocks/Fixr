import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { LocationCache } from "./redis.js";
import { prisma } from "../db/prisma.js";

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Contractor joins a job room to start broadcasting
    socket.on("join_job", ({ jobId }) => {
      socket.join(`job_${jobId}`);
      console.log(`Contractor joined job room: job_${jobId}`);
    });

    // Customer joins a job room to start watching
    socket.on("watch_job", ({ jobId }) => {
      socket.join(`job_${jobId}`);
      console.log(`Customer watching job room: job_${jobId}`);
    });

    // Contractor updates their location
    socket.on("update_location", async ({ jobId, lat, lng, accuracy, contractorId }) => {
      // Security check: Only broadcast if job is in active state
      try {
        const job = await prisma.job.findUnique({
          where: { id: jobId },
          select: { status: true }
        });

        if (!job || !["assigned", "awaiting_customer_confirmation"].includes(job.status)) {
           return;
        }

        const timestamp = new Date().toISOString();
        const locationData = { lat, lng, accuracy, timestamp, contractorId };

        // 1. Broadcast to all in the room (mostly the customer)
        io.to(`job_${jobId}`).emit("location_update", {
          jobId,
          ...locationData,
        });

        // 2. Cache in Redis (TTL 10s)
        await LocationCache.set(jobId, locationData);

        // 3. Log to DB
        await prisma.locationLog.create({
          data: {
            jobId,
            contractorId,
            lat,
            lng,
            accuracy,
          },
        });
      } catch (err) {
        console.error("Socket update_location error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}
