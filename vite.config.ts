import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'path';
import nodemailer from 'nodemailer';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import type { Connect, Plugin } from 'vite';

interface ContactRequestBody {
  name: string;
  company?: string;
  email: string;
  senderEmail?: string;
  phone?: string;
  subject: string;
  message: string;
}

interface MailConfig {
  gmailUser: string;
  gmailAppPassword: string;
  receiverEmail: string[];
}

const sendJson = (res: ServerResponse, statusCode: number, body: Record<string, unknown>) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
};

const parseJsonBody = (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('end', () => {
      if (!chunks.length) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });

const isValidContactBody = (payload: unknown): payload is ContactRequestBody => {
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
};

const createContactApiPlugin = (mailConfig: MailConfig): Plugin => {
  const contactApiMiddleware: Connect.NextHandleFunction = async (req, res, next) => {
    if (!req.url?.startsWith('/api/contact')) {
      next();
      return;
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { message: 'Method Not Allowed' });
      return;
    }

    const { gmailUser, gmailAppPassword, receiverEmail } = mailConfig;
    if (!gmailUser || !gmailAppPassword || gmailAppPassword === 'PASTE_GMAIL_APP_PASSWORD_HERE') {
      sendJson(res, 500, {
        message: 'Mail server is not configured. Set MAIL_GMAIL_USER / MAIL_GMAIL_APP_PASSWORD / MAIL_RECEIVER_EMAILS in .env.',
      });
      return;
    }

    try {
      const payload = await parseJsonBody(req);
      if (!isValidContactBody(payload)) {
        sendJson(res, 400, { message: 'Invalid request body.' });
        return;
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

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      await transporter.sendMail({
        from: `"KGT Contact" <${gmailUser}>`,
        to: receiverEmail,
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

      sendJson(res, 200, { ok: true });
    } catch (error) {
      console.error('Contact API error:', error);
      sendJson(res, 500, { message: 'Failed to send email.' });
    }
  };

  return {
    name: 'kgt-contact-api',
    configureServer(server) {
      server.middlewares.use(contactApiMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(contactApiMiddleware);
    },
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mailConfig: MailConfig = {
    gmailUser: env.MAIL_GMAIL_USER || '',
    gmailAppPassword: env.MAIL_GMAIL_APP_PASSWORD || '',
    receiverEmail: (env.MAIL_RECEIVER_EMAILS || '')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean),
  };

  return {
    plugins: [react(), createContactApiPlugin(mailConfig)],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
