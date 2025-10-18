# FormBackend Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Neon PostgreSQL database
- Clerk account for authentication
- Cloudinary account for file uploads
- SMTP credentials for email notifications

## Installation

1. Clone the repository and install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up your environment variables by copying `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

## Configuration

### 1. Database Setup (Neon PostgreSQL)

1. Create a new Neon project at https://console.neon.tech
2. Copy your connection string
3. Add it to `.env.local`:
\`\`\`
DATABASE_URL="postgresql://user:password@host/database"
\`\`\`

4. Run Prisma migrations:
\`\`\`bash
npx prisma migrate dev
\`\`\`

### 2. Clerk Authentication

1. Sign up at https://clerk.com
2. Create a new application
3. Copy your API keys from the Clerk dashboard
4. Add to `.env.local`:
\`\`\`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_key"
CLERK_SECRET_KEY="your_key"
\`\`\`

### 3. Cloudinary File Uploads

1. Sign up at https://cloudinary.com
2. Go to your dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
3. Add to `.env.local`:
\`\`\`
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
\`\`\`

### 4. Email Configuration (SMTP)

1. Set up SMTP credentials (Gmail, SendGrid, etc.)
2. Add to `.env.local`:
\`\`\`
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@formbackend.com"
SMTP_SECURE="false"
\`\`\`

## Running the Application

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see your application.

## Features

- **User Authentication**: Secure sign-up and login with Clerk
- **Form Management**: Create and manage multiple forms
- **File Uploads**: Automatic file uploads to Cloudinary
- **Email Notifications**: Instant email alerts for new submissions
- **Data Export**: Export submissions as CSV
- **Submission Tracking**: View all submissions with IP and user agent info

## API Endpoints

### Public Endpoints
- `POST /f/[key]` - Submit form data (public)

### Protected Endpoints (Requires Authentication)
- `GET /api/forms` - Get all user's forms
- `POST /api/forms` - Create a new form
- `DELETE /api/forms/[id]` - Delete a form
- `GET /api/forms/[id]/submissions` - Get form submissions
- `DELETE /api/submissions/[id]` - Delete a submission

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy

\`\`\`bash
vercel deploy
\`\`\`

## Troubleshooting

### File uploads not working
- Check Cloudinary credentials in `.env.local`
- Verify API key and secret are correct
- Check Cloudinary dashboard for upload limits

### Emails not sending
- Verify SMTP credentials
- Check email provider's app password requirements
- Ensure "Less secure app access" is enabled (if using Gmail)

### Authentication issues
- Verify Clerk keys are correct
- Check Clerk dashboard for application settings
- Clear browser cookies and try again

## Support

For issues or questions, please open an issue on GitHub or contact support.
