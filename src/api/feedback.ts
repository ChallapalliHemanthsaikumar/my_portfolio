// Vercel Serverless Function for Feedback
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
    const { rating, feedback, email } = req.body;

    if (!rating || !feedback) {
      return res.status(400).json({ error: 'Rating and feedback are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Log the feedback
    console.log('Feedback submission:', {
      rating,
      feedback,
      email: email || 'Anonymous',
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you would:
    // 1. Store feedback in a database
    // 2. Send notification to Hemanth about new feedback
    // 3. Optionally send thank you email to user

    // Example with SendGrid (commented out - requires API key and setup):
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'challapallihemanthsaikumar@gmail.com',
      from: 'noreply@your-portfolio-domain.com',
      subject: `Portfolio Feedback: ${rating} Star${rating !== 1 ? 's' : ''}`,
      html: `
        <h2>New Portfolio Feedback</h2>
        <p><strong>Rating:</strong> ${rating} star${rating !== 1 ? 's' : ''} ⭐</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback.replace(/\n/g, '<br>')}</p>
        ${email ? `<p><strong>Contact Email:</strong> ${email}</p>` : '<p><em>Anonymous feedback</em></p>'}
        <hr>
        <p><em>Sent from portfolio website</em></p>
      `,
    };

    await sgMail.send(msg);
    */

    return res.status(200).json({ 
      success: true, 
      message: 'Feedback submitted successfully' 
    });

  } catch (error) {
    console.error('Error handling feedback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}