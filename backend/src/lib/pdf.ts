import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

export async function generateInvoicePDF(job: any, amountPaid: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // --- Header ---
    doc.fillColor('#0f172a').rect(0, 0, 600, 150).fill();
    doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('FIXR ELITE', 50, 50);
    doc.fontSize(10).font('Helvetica').text('SECURE PROPERTY MAINTENANCE INTELLIGENCE', 50, 80, { characterSpacing: 1 });
    
    doc.fontSize(12).text('TAX INVOICE', 450, 50, { align: 'right' });
    doc.fontSize(10).text(`#${job.id.slice(-8).toUpperCase()}`, 450, 70, { align: 'right' });
    doc.text(new Date().toLocaleDateString(), 450, 85, { align: 'right' });

    // --- Billing Info ---
    doc.fillColor('#1e293b').fontSize(10).font('Helvetica-Bold').text('BILL TO:', 50, 180);
    doc.font('Helvetica').text(job.user?.name || 'Valued Member', 50, 195);
    doc.text(job.user?.email || '', 50, 210);

    doc.font('Helvetica-Bold').text('SERVICE LOCATION:', 300, 180);
    doc.font('Helvetica').text(job.location, 300, 195, { width: 250 });

    // --- Table Header ---
    doc.rect(50, 250, 500, 20).fill('#f8fafc');
    doc.fillColor('#64748b').fontSize(8).font('Helvetica-Bold').text('DESCRIPTION', 60, 256);
    doc.text('AMOUNT', 500, 256);

    // --- Table Content ---
    let y = 280;
    const approvedParts = job.parts?.filter((p: any) => p.status === 'APPROVED') || [];
    const serviceFee = amountPaid - approvedParts.reduce((s: number, p: any) => s + p.price, 0);

    doc.fillColor('#1e293b').fontSize(10).font('Helvetica');
    doc.text(`Professional Service Fee (${job.category})`, 60, y);
    doc.text(`$${serviceFee.toFixed(2)}`, 500, y);
    
    y += 25;
    approvedParts.forEach((p: any) => {
      doc.text(`Part: ${p.name}`, 60, y);
      doc.text(`$${p.price.toFixed(2)}`, 500, y);
      y += 20;
    });

    // --- Footer / Total ---
    doc.rect(50, y + 20, 500, 1).fill('#e2e8f0');
    y += 50;

    doc.fillColor('#64748b').fontSize(10).text('SUBTOTAL', 350, y);
    doc.fillColor('#1e293b').text(`$${amountPaid.toFixed(2)}`, 500, y);
    
    y += 20;
    doc.fillColor('#64748b').text('TAX (0%)', 350, y);
    doc.fillColor('#1e293b').text('$0.00', 500, y);

    y += 30;
    doc.rect(340, y - 5, 210, 40).fill('#f0fdf4');
    doc.fillColor('#166534').font('Helvetica-Bold').fontSize(14).text('TOTAL PAID', 350, y);
    doc.text(`$${amountPaid.toFixed(2)}`, 500, y);

    // --- Status Stamp ---
    doc.save();
    doc.rotate(-20, { origin: [100, 500] });
    doc.rect(80, 480, 120, 40).lineWidth(2).stroke('#10b981');
    doc.fillColor('#10b981').fontSize(16).text('SETTLED', 100, 492);
    doc.restore();

    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('Fixr Global HQ • 123 Enterprise Way • Secure City', 50, 750, { align: 'center' });
    doc.text('Thank you for your business.', 50, 765, { align: 'center' });

    doc.end();
  });
}
