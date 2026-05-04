// api/contact.js

const nodemailer = require('nodemailer');

function isValidBody(payload) {
  if (!payload || typeof payload !== 'object') return false;

  return (
    typeof payload.name === 'string' &&
    payload.name.trim().length > 0 &&
    typeof payload.email === 'string' &&
    payload.email.trim().length > 0 &&
    typeof payload.subject === 'string' &&
    payload.subject.trim().length > 0 &&
    typeof payload.message === 'string' &&
    payload.message.trim().length > 0
  );
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
  }

  const gmailUser = process.env.MAIL_GMAIL_USER || '';
  const gmailAppPassword = process.env.MAIL_GMAIL_APP_PASSWORD || '';
  const receiverEmails = (process.env.MAIL_RECEIVER_EMAILS || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  if (
    !gmailUser ||
    !gmailAppPassword ||
    gmailAppPassword === 'PASTE_GMAIL_APP_PASSWORD_HERE' ||
    receiverEmails.length === 0
  ) {
    return res.status(500).json({
      message:
        'Mail server is not configured. Set MAIL_GMAIL_USER / MAIL_GMAIL_APP_PASSWORD / MAIL_RECEIVER_EMAILS in Vercel Environment Variables.',
    });
  }

  const payload = req.body;

  if (!isValidBody(payload)) {
    return res.status(400).json({
      message: 'Invalid request body.',
    });
  }

  const sanitized = {
    name: payload.name.trim(),
    company: typeof payload.company === 'string' ? payload.company.trim() : '',
    email: payload.email.trim(),
    senderEmail: typeof payload.senderEmail === 'string' ? payload.senderEmail.trim() : '',
    phone: typeof payload.phone === 'string' ? payload.phone.trim() : '',
    subject: payload.subject.trim(),
    message: payload.message.trim(),
  };

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"KGT Contact" <${gmailUser}>`,
      to: receiverEmails,
      replyTo: sanitized.email,
      subject: `[KGT Contact] ${sanitized.subject}`,
      text: [
        `Name: ${sanitized.name}`,
        `Company: ${sanitized.company || '-'}`,
        `Reply Email: ${sanitized.email}`,
        `Sender Email: ${sanitized.senderEmail || gmailUser}`,
        `Phone: ${sanitized.phone || '-'}`,
        '',
        sanitized.message,
      ].join('\n'),
    });

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return res.status(500).json({
      message: 'Failed to send email.',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};