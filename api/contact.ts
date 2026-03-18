import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface ContactRequestBody {
  name: string;
  company?: string;
  email: string;
  senderEmail?: string;
  phone?: string;
  subject: string;
  message: string;
}

function isValidBody(payload: unknown): payload is ContactRequestBody {
  if (!payload || typeof payload !== 'object') return false;
  const data = payload as Record<string, unknown>;
  return (
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    typeof data.email === 'string' &&
    data.email.trim().length > 0 &&
    typeof data.subject === 'string' &&
    data.subject.trim().length > 0 &&
    typeof data.message === 'string' &&
    data.message.trim().length > 0
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const gmailUser = process.env.MAIL_GMAIL_USER || '';
  const gmailAppPassword = process.env.MAIL_GMAIL_APP_PASSWORD || '';
  const receiverEmails = (process.env.MAIL_RECEIVER_EMAILS || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  if (!gmailUser || !gmailAppPassword || gmailAppPassword === 'PASTE_GMAIL_APP_PASSWORD_HERE') {
    return res.status(500).json({
      message:
        'Mail server is not configured. Set MAIL_GMAIL_USER / MAIL_GMAIL_APP_PASSWORD / MAIL_RECEIVER_EMAILS in .env.',
    });
  }

  const payload = req.body;
  if (!isValidBody(payload)) {
    return res.status(400).json({ message: 'Invalid request body.' });
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
      auth: { user: gmailUser, pass: gmailAppPassword },
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
