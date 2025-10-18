import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
  },
});

export async function sendSubmissionEmail(
  to: string,
  formName: string,
  data: Record<string, any>,
  files?: Record<string, any>,
) {
  try {
    const htmlContent = generateEmailHTML(formName, data, files)

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: `New submission from ${formName}`,
      html: htmlContent,
    })
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}

function generateEmailHTML(formName: string, data: Record<string, any>, files?: Record<string, any>) {
  let html = `
    <h2>New Submission: ${formName}</h2>
    <hr />
  `

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object") {
      html += `<p><strong>${key}:</strong> ${JSON.stringify(value)}</p>`
    } else {
      html += `<p><strong>${key}:</strong> ${value}</p>`
    }
  }

  if (files && Object.keys(files).length > 0) {
    html += `<hr /><h3>Files:</h3>`
    for (const [key, fileData] of Object.entries(files)) {
      const file = fileData as any
      html += `<p><strong>${key}:</strong> <a href="${file.secure_url}">${file.original_filename}</a></p>`
    }
  }

  return html
}
