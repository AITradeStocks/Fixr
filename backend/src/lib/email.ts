import nodemailer from "nodemailer";
import { generateInvoicePDF } from "./pdf.js";

const port = parseInt(process.env.SMTP_PORT || "587");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: port,
  secure: false, // Port 587 uses STARTTLS, so secure should be false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a professional verification email to contractors.
 */
export async function sendVerificationEmail(email: string, code: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 28px; font-weight: 900; color: #059669; letter-spacing: -0.025em; }
          .content { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 24px; padding: 40px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .title { font-size: 24px; font-weight: 800; color: #111827; margin-top: 0; }
          .otp-container { background: #f9fafb; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0; border: 1px dashed #d1d5db; }
          .otp-code { font-size: 48px; font-weight: 900; letter-spacing: 0.25em; color: #059669; font-family: 'Roboto Mono', monospace; }
          .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #6b7280; }
          .button { display: inline-block; padding: 12px 24px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">FIXR <span style="color: #111827">ELITE</span></div>
          </div>
          <div class="content">
            <h1 class="title">Security Verification</h1>
            <p>To finalize your contractor registration and access the Fixr Elite network, please enter the following 6-digit verification code:</p>
            
            <div class="otp-container">
              <div class="otp-code">${code}</div>
            </div>
            
            <p><strong>Note:</strong> This code is valid for the next 10 minutes. If you did not request this verification, please ignore this email or contact our security team.</p>
            
            <p style="margin-top: 32px;">Welcome to the next level of property maintenance.</p>
            <p>Best regards,<br>The Fixr Security Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Fixr Global. All rights reserved.</p>
            <p>Secure Enterprise Property Maintenance Intelligence</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `[FIXR] Verification Code: ${code}`,
    html,
  });
}

export async function sendInvoiceEmail(email: string, job: any, amountPaid?: number) {
  const approvedPartsTotal = job.parts
    ?.filter((p: any) => p.status === "APPROVED")
    .reduce((sum: number, p: any) => sum + p.price, 0) || 0;
  
  // Use amountPaid from Stripe if available, otherwise calculate
  const totalAmount = amountPaid ?? ((job.serviceCharge || job.quotedPrice || 0));
  const serviceFee = job.serviceCharge || (job.quotedPrice - approvedPartsTotal);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 700px; margin: 40px auto; padding: 0; background: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08); }
          .header { background: #0f172a; padding: 60px 40px; color: white; text-align: center; }
          .logo { font-size: 32px; font-weight: 900; letter-spacing: -0.05em; margin-bottom: 8px; }
          .logo span { color: #10b981; }
          .status { display: inline-block; padding: 6px 16px; background: #10b981; color: white; border-radius: 100px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
          
          .body { padding: 60px; }
          .thanks-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 20px; padding: 24px; margin-bottom: 40px; text-align: center; }
          .thanks-title { font-size: 18px; font-weight: 800; color: #166534; margin: 0; }
          .thanks-text { font-size: 14px; color: #15803d; margin-top: 4px; font-weight: 500; }
          
          .meta { display: grid; grid-cols: 2; margin-bottom: 48px; border-bottom: 1px solid #f1f5f9; padding-bottom: 48px; }
          .meta-item { margin-bottom: 24px; }
          .meta-label { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 4px; }
          .meta-value { font-size: 14px; font-weight: 700; color: #1e293b; }
          
          .table { w: 100%; border-collapse: collapse; margin-bottom: 48px; }
          .th { text-align: left; padding: 12px 0; border-bottom: 2px solid #f1f5f9; font-size: 10px; font-weight: 900; text-transform: uppercase; color: #94a3b8; }
          .td { padding: 20px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #1e293b; }
          
          .total-section { background: #f8fafc; border-radius: 24px; padding: 32px; }
          .total-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #64748b; font-weight: 600; }
          .total-row.grand { margin-top: 24px; padding-top: 24px; border-top: 2px dashed #e2e8f0; font-size: 24px; color: #0f172a; font-weight: 900; }
          
          .footer { text-align: center; padding: 40px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">FIXR<span>ELITE</span></div>
            <div class="status">Payment Settled</div>
            <p style="opacity: 0.6; font-size: 14px; margin-top: 16px;">Tax Invoice #${job.id.slice(-8).toUpperCase()}</p>
          </div>
          
          <div class="body">
            <div class="thanks-box">
               <p class="thanks-title">Payment Successful! Thank You.</p>
               <p class="thanks-text">We've received your payment of $${totalAmount.toFixed(2)}. Your service mission is now fully settled.</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: start;">
               <div class="meta-item">
                  <div class="meta-label">Customer Details</div>
                  <div class="meta-value">${job.user?.name || 'Valued Member'}</div>
                  <div class="meta-value" style="opacity: 0.6; font-weight: 500;">${email}</div>
               </div>
               <div class="meta-item" style="text-align: right;">
                  <div class="meta-label">Billing Date</div>
                  <div class="meta-value">${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
               </div>
            </div>

            <div class="meta-item" style="margin-top: 24px;">
               <div class="meta-label">Service Description</div>
               <div class="meta-value" style="font-size: 18px;">${job.description}</div>
            </div>

            <table style="width: 100%; margin-top: 48px; border-collapse: collapse;">
               <thead>
                  <tr>
                     <th class="th">Description</th>
                     <th class="th" style="text-align: right;">Amount</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td class="td">Professional Service Fee (${job.category})</td>
                     <td class="td" style="text-align: right;">$${(serviceFee > 0 ? serviceFee : (totalAmount - approvedPartsTotal)).toFixed(2)}</td>
                  </tr>
                  ${job.parts?.filter((p: any) => p.status === 'APPROVED').map((p: any) => `
                    <tr>
                       <td class="td">Part: ${p.name}</td>
                       <td class="td" style="text-align: right;">$${p.price.toFixed(2)}</td>
                    </tr>
                  `).join('')}
               </tbody>
            </table>

            <div class="total-section">
               <div class="total-row">
                  <span>Subtotal</span>
                  <span>$${totalAmount.toFixed(2)}</span>
               </div>
               <div class="total-row">
                  <span>Tax (Included)</span>
                  <span>$0.00</span>
               </div>
               <div class="total-row grand">
                  <span>Total Paid</span>
                  <span>$${totalAmount.toFixed(2)}</span>
               </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing Fixr Elite for your property maintenance needs.</p>
            <p style="margin-top: 8px;">Fixr Global HQ • 123 Enterprise Way • Secure City</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const pdfBuffer = await generateInvoicePDF(job, totalAmount);

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `[INVOICE] Service Mission ${job.id.slice(-8).toUpperCase()} - Payment Confirmed`,
    html,
    attachments: [
      {
        filename: `Invoice_${job.id.slice(-8).toUpperCase()}.pdf`,
        content: pdfBuffer,
      }
    ]
  });
}
