# FormBackend Setup Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- SMTP credentials for email notifications

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo>
   cd form-backend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update `.env.local` with your:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - SMTP credentials for email notifications

4. **Set up the database**
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

5. **Generate Prisma Client**
   \`\`\`bash
   npx prisma generate
   \`\`\`

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses Prisma ORM with the following models:

### Form
- `id` - Unique identifier
- `userId` - User who created the form
- `name` - Form name
- `key` - Unique endpoint key
- `email` - Email for notifications
- `description` - Optional form description
- `redirectUrl` - Optional redirect after submission
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Submission
- `id` - Unique identifier
- `formId` - Reference to Form
- `data` - JSON data from form submission
- `ipAddress` - Submitter's IP address
- `userAgent` - Submitter's user agent
- `createdAt` - Submission timestamp

## Email Configuration

The app uses Nodemailer for email notifications. Configure SMTP settings:

- **Gmail**: Use App Passwords (not your regular password)
- **SendGrid**: Use SMTP relay
- **Other providers**: Use their SMTP settings

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

1. Set environment variables
2. Run `npm run build`
3. Run `npm start`

## API Endpoints

### POST /f/[key]
Submit form data to a specific form endpoint.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form fields

**Response:**
- 200: Success
- 404: Form not found
- 500: Server error

### GET /api/forms
Get all forms (for dashboard).

### POST /api/forms
Create a new form.

### DELETE /api/forms/[id]
Delete a form and all its submissions.

### GET /api/forms/[id]/submissions
Get all submissions for a form.

### DELETE /api/submissions/[id]
Delete a specific submission.

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check firewall/network settings
- Ensure database is running

### Email Not Sending
- Verify SMTP credentials
- Check email provider's app password requirements
- Review server logs for errors

### Prisma Issues
- Run `npx prisma generate` to regenerate client
- Run `npx prisma db push` to sync schema
- Check `.env.local` for DATABASE_URL

## Support

For issues or questions, please open an issue on GitHub.
