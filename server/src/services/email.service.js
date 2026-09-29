import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text version
 * @param {string} options.html - HTML version
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Skip if SMTP credentials aren't configured (graceful degradation)
    if (!process.env.SMTP_USER || process.env.SMTP_USER.includes('your_smtp')) {
      console.warn(`[Mock Email] Would have sent email to: ${to}`);
      console.warn(`Subject: ${subject}`);
      return true;
    }

    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'FINPILOT'}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Send Workspace Invitation Email
 */
export const sendWorkspaceInvitation = async (toEmail, companyName, inviterName, joinUrl) => {
  const subject = `You have been invited to join ${companyName} on FINPILOT`;
  
  const html = `
    <div style="font-family: sans-serif; max-w-xl; margin: 0 auto; padding: 20px;">
      <h2 style="color: #0f172a;">Welcome to FINPILOT!</h2>
      <p style="color: #334155; font-size: 16px;">
        <strong>${inviterName}</strong> has invited you to join their financial workspace for <strong>${companyName}</strong>.
      </p>
      <div style="margin: 30px 0;">
        <a href="${joinUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Accept Invitation
        </a>
      </div>
      <p style="color: #64748b; font-size: 14px;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${joinUrl}" style="color: #2563eb;">${joinUrl}</a>
      </p>
    </div>
  `;

  const text = `${inviterName} has invited you to join ${companyName} on FINPILOT. Accept here: ${joinUrl}`;

  return await sendEmail({ to: toEmail, subject, text, html });
};
