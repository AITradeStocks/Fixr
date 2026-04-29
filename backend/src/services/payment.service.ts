import Stripe from "stripe";
import { prisma } from "../db/prisma.js";
import { HttpError } from "../lib/errors.js";
import { sendInvoiceEmail } from "../lib/email.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function createCheckoutSession(jobId: string, userId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { parts: true },
  });

  if (!job) throw new HttpError(404, "Job not found");
  if (job.userId !== userId) throw new HttpError(403, "Not authorized to pay for this job");
  if (job.paymentStatus === "paid") throw new HttpError(400, "Job already paid");

  // Calculate total: service charge + approved parts
  let totalAmount = 0;
  
  if (job.serviceCharge !== null && job.serviceCharge !== undefined) {
    const approvedPartsTotal = job.parts
      .filter((p) => p.status === "APPROVED")
      .reduce((sum, p) => sum + p.price, 0);
    totalAmount = job.serviceCharge + approvedPartsTotal;
  } else {
    // Legacy job fallback
    totalAmount = job.quotedPrice;
  }

  if (totalAmount <= 0) throw new HttpError(400, "Invalid payment amount");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Service Mission: ${job.category}`,
            description: job.description,
          },
          unit_amount: Math.round(totalAmount * 100), // Stripe expects cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&jobId=${jobId}`,
    cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment_cancelled=true`,
    metadata: {
      jobId,
      userId,
    },
  });

  await prisma.job.update({
    where: { id: jobId },
    data: { 
      stripeSessionId: session.id,
      paymentStatus: "pending"
    },
  });

  return session;
}

export async function verifyPayment(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status === "paid") {
    const jobId = session.metadata?.jobId;
    const checkoutEmail = session.customer_details?.email;
    
    if (jobId) {
      const job = await prisma.job.update({
        where: { id: jobId },
        data: { paymentStatus: "paid" },
        include: { 
          parts: true,
          user: true
        }
      });

      // Send professional invoice email to checkout email OR registered email
      const targetEmail = checkoutEmail || job.user?.email;
      if (targetEmail) {
        try {
          const paidAmount = session.amount_total ? session.amount_total / 100 : undefined;
          await sendInvoiceEmail(targetEmail, job, paidAmount);
        } catch (e) {
          console.error("Failed to send invoice email:", e);
        }
      }
    }
    return true;
  }
  return false;
}
