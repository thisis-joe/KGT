# Corporate Website Proposal

This is a code bundle for Corporate Website Proposal. The original project is available at https://www.figma.com/design/3jA3XqxbjdGfMBDpa1vT3q/Corporate-Website-Proposal.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Contact mail setup (.env)

1. Copy `.env.example` to `.env`.
2. Fill the values:
   - `MAIL_GMAIL_USER`: Gmail sender account
   - `MAIL_GMAIL_APP_PASSWORD`: Google App Password
   - `MAIL_RECEIVER_EMAILS`: comma-separated receiver emails
   - `VITE_CONTACT_RECEIVER_EMAIL`: fallback mailto target shown in the Contact page
   - `VITE_NAVER_MAP_CLIENT_ID`: Naver Maps JavaScript API client id
   - `VITE_KAKAO_MAP_APP_KEY`: Kakao Maps JavaScript API app key

Then submit the contact form. It calls `/api/contact` and sends mail through Gmail SMTP.
