const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  console.log("API endpoint hit:", req.method);
  
  const { name, email, subject, message } = req.body;
  console.log("Request body:", { name, email, subject, message: message?.substring(0, 50) + "..." });

  // Validate required fields
  if (!name || !email || !subject || !message) {
    console.log("Missing required fields");
    return res.status(400).json({ 
      success: false, 
      message: "All fields are required" 
    });
  }

  try {
    console.log("Creating SMTP transporter...");
    // Create transporter with Brevo SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("Testing SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    // Email content
    const mailOptions = {
      from: `"LifCura Contact Form" <932ea5002@smtp-brevo.com>`,
      to: "lodhibhupendra172@gmail.com", // Your receiving email
      replyTo: email, // Set reply-to as the form submitter's email
      subject: `[LifCura Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #17624b; border-bottom: 2px solid #17624b; padding-bottom: 10px;">
            New Message from LifCura Website
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #17624b;">Name:</strong> ${name}</p>
            <p><strong style="color: #17624b;">Email:</strong> ${email}</p>
            <p><strong style="color: #17624b;">Subject:</strong> ${subject}</p>
            <div style="margin-top: 15px;">
              <strong style="color: #17624b;">Message:</strong>
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 5px; border-left: 4px solid #17624b;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the LifCura website contact form.
          </p>
        </div>
      `,
      // Also send a plain text version
      text: `
New Message from LifCura Website

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    };

    console.log("Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);

    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });

  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error details:", {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send email. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});