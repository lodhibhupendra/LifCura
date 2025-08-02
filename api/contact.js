// /api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST requests allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields are required" 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Please enter a valid email address" 
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test connection
    await transporter.verify();

    // Email content with better formatting
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
      text: `
New Message from LifCura Website

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send email. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
