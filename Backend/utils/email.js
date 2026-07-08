const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send OTP email
 */
async function sendOtpEmail(toEmail, otp, type = 'verify') {
  const subjects = {
    verify: 'Verify your Lockify account',
    login:  'Your Lockify login code',
    reset:  'Reset your Lockify password',
  };

  const labels = {
    verify: 'confirm your account',
    login:  'sign in to your account',
    reset:  'reset your password',
  };

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to:      toEmail,
    subject: subjects[type] || subjects.verify,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#0f1224;border-radius:16px;color:#e2e8f0;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
          <div style="background:linear-gradient(135deg,#5e81f4,#3b5fe2);width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;">
            🔒
          </div>
          <span style="font-size:1.2rem;font-weight:700;color:#e8edff;">Lockify</span>
        </div>
        <h2 style="color:#ffffff;margin-bottom:8px;">Your verification code</h2>
        <p style="color:#8892b0;margin-bottom:24px;">Use this code to ${labels[type] || labels.verify}:</p>
        <div style="background:#1a1f3a;border:1px solid #2a3050;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
          <span style="font-size:2.5rem;font-weight:700;letter-spacing:12px;color:#5e81f4;font-family:monospace;">${otp}</span>
        </div>
        <p style="color:#4a5270;font-size:0.85rem;">This code expires in <strong style="color:#8892b0;">10 minutes</strong>. Never share it with anyone.</p>
        <hr style="border:none;border-top:1px solid #1a1f3a;margin:24px 0;" />
        <p style="color:#4a5270;font-size:0.75rem;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };