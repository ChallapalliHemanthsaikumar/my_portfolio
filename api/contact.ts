// Vercel Serverless Function for Contact Form
export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Here you can integrate with email services like:
    // - SendGrid
    // - Nodemailer with Gmail
    // - Vercel's email service
    // - Or any other email service

    // For now, we'll just log the contact form and return success
    console.log('Contact form submission:', {
      name,
      email,
      company,
      message,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you would:
    // 1. Send email to Hemanth with the contact details
    // 2. Optionally send confirmation email to the user
    // 3. Store the contact in a database

    // Example with SendGrid (commented out - requires API key and setup):
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'challapallihemanthsaikumar@gmail.com',
      from: 'noreply@your-portfolio-domain.com',
      subject: `Portfolio Contact: ${name}${company ? ` from ${company}` : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from portfolio website</em></p>
      `,
    };

    await sgMail.send(msg);
    */

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}