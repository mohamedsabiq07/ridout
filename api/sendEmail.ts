import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    customer_name,
    mobile,
    email,
    service_name,
    property_type,
    apartment_size,
    location,
    preferred_date,
    preferred_time,
    notes,
    is_urgent
  } = req.body;

  // The owner's email
  const TO_EMAIL = 'mohamedsabiq07@gmail.com';
  const FROM_EMAIL = 'mohamedsabiq07@gmail.com';
  
  // Gmail App Password must be added to Vercel Environment Variables as GMAIL_APP_PASSWORD
  const APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  if (!APP_PASSWORD) {
    console.error('Missing GMAIL_APP_PASSWORD environment variable.');
    return res.status(500).json({ message: 'Email configuration error.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: FROM_EMAIL,
        pass: APP_PASSWORD,
      },
    });

    const propertyInfo = property_type === 'Apartment' && apartment_size
      ? `Apartment (${apartment_size})`
      : property_type;

    const urgentFlag = is_urgent ? '🚨 URGENT: ' : '';
    
    const formattedServices = Array.isArray(service_name) 
      ? service_name.join(', ') 
      : (service_name || 'N/A');

    const mailOptions = {
      from: `"Ridout Pest Control" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `${urgentFlag}New Booking Request: ${customer_name}`,
      text: `
New Service Request via Website

Customer Details:
-----------------
Name: ${customer_name || 'N/A'}
Mobile: ${mobile || 'N/A'}
Email: ${email || 'N/A'}

Service Required:
-----------------
Services: ${formattedServices}
Property: ${propertyInfo || 'N/A'}
Location: ${location || 'N/A'}
Preferred Date: ${preferred_date || 'N/A'}
Preferred Time: ${preferred_time || 'N/A'}

Additional Notes:
-----------------
${notes || 'None provided'}
      `,
      html: `
        <h2>New Service Request</h2>
        ${is_urgent ? '<h3 style="color:red">🚨 URGENT REQUEST</h3>' : ''}
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${customer_name || 'N/A'}</li>
          <li><strong>Mobile:</strong> ${mobile || 'N/A'}</li>
          <li><strong>Email:</strong> ${email || 'N/A'}</li>
        </ul>
        
        <h3>Service Details:</h3>
        <ul>
          <li><strong>Services:</strong> ${formattedServices}</li>
          <li><strong>Property:</strong> ${propertyInfo || 'N/A'}</li>
          <li><strong>Location:</strong> ${location || 'N/A'}</li>
          <li><strong>Date:</strong> ${preferred_date || 'N/A'}</li>
          <li><strong>Time:</strong> ${preferred_time || 'N/A'}</li>
        </ul>
        
        <h3>Additional Notes:</h3>
        <p>${notes || 'None provided'}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error sending email', 
      error: error.message || error.toString() 
    });
  }
}
