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

const styles = {
  container: `
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  `,
  header: `
    background-color: #0070f3;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  `,
  title: `
    margin: 0;
    font-size: 24px;
    font-weight: bold;
  `,
  content: `
    padding: 20px;
    color: #333333;
    line-height: 1.6;
  `,
  field: `
    margin-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
  `,
  label: `
    font-weight: bold;
    color: #555555;
    display: block;
    margin-bottom: 5px;
  `,
  value: `
    color: #000000;
  `,
  codeBlock: `
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    overflow-x: auto;
  `,
  filesSection: `
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #e0e0e0;
  `,
  fileLink: `
    display: inline-block;
    background-color: #f0f0f0;
    padding: 8px 12px;
    border-radius: 4px;
    text-decoration: none;
    color: #0070f3;
    margin-right: 10px;
    margin-bottom: 10px;
  `,
  footer: `
    background-color: #f9f9f9;
    padding: 15px;
    text-align: center;
    font-size: 12px;
    color: #888888;
    border-top: 1px solid #e0e0e0;
  `
};

function generateEmailHTML(formName: string, data: Record<string, any>, files?: Record<string, any>) {
  let fieldsHtml = '';

  for (const [key, value] of Object.entries(data)) {
    let valueHtml = '';

    if (typeof value === "object" && value !== null) {
      valueHtml = `<pre style="${styles.codeBlock}">${JSON.stringify(value, null, 2)}</pre>`;
    } else {
      valueHtml = `<div style="${styles.value}">${value}</div>`;
    }

    fieldsHtml += `
      <div style="${styles.field}">
        <span style="${styles.label}">${key}</span>
        ${valueHtml}
      </div>
    `;
  }

  let filesHtml = '';
  if (files && Object.keys(files).length > 0) {
    let fileLinks = '';
    for (const [key, fileData] of Object.entries(files)) {
      const file = fileData as any;
      fileLinks += `<a href="${file.secure_url}" style="${styles.fileLink}" target="_blank">${file.original_filename} (${key})</a>`;
    }

    filesHtml = `
      <div style="${styles.filesSection}">
        <h3 style="margin-top: 0; color: #333;">Attachments</h3>
        ${fileLinks}
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Submission: ${formName}</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="${styles.container}">
          <div style="${styles.header}">
            <h2 style="${styles.title}">New Submission</h2>
            <div style="font-size: 14px; opacity: 0.9;">${formName}</div>
          </div>
          
          <div style="${styles.content}">
            ${fieldsHtml}
            ${filesHtml}
          </div>
          
          <div style="${styles.footer}">
            <p style="margin: 0;">Sent via Form Backend</p>
            <p style="margin: 5px 0 0 0;">${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
