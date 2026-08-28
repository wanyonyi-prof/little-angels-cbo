import emailjs from '@emailjs/browser';

// IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const PUBLIC_KEY = 'ISq26wNSLSLaSSIzh'; // Replace with your actual public key
const SERVICE_ID = 'service_ittn84q'; // Replace with your actual service ID
const TEMPLATE_ID = 'template_x61cqy7'; // Replace with your actual template ID

// Initialize EmailJS with your public key
emailjs.init(PUBLIC_KEY);

/**
 * Send donation notification email to the organization
 * @param {Object} data - Donation form data
 * @returns {Promise<Object>} - Response object with success status and message
 */
export const sendDonationNotification = async (data) => {
  const templateParams = {
    to_email: 'litt89765@gmail.com',
    to_name: 'Little Angels CBO Team',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    country: data.country,
    amount: data.amount,
    category: data.category,
    message: data.message || 'No message provided',
    anonymous: data.anonymous ? 'Yes' : 'No',
    date: new Date().toLocaleDateString('en-KE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-KE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Donation notification sent successfully:', response);
    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Error sending donation notification:', error);
    return { success: false, message: error.text || 'Failed to send notification' };
  }
};

/**
 * Send volunteer application notification email to the organization
 * @param {Object} data - Volunteer form data
 * @returns {Promise<Object>} - Response object with success status and message
 */
export const sendVolunteerNotification = async (data) => {
  const templateParams = {
    to_email: 'litt89765@gmail.com',
    to_name: 'Little Angels CBO Team',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    location: data.location,
    skills: data.skills,
    interest: data.interest,
    availability: data.availability,
    motivation: data.motivation,
    date: new Date().toLocaleDateString('en-KE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-KE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Volunteer notification sent successfully:', response);
    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Error sending volunteer notification:', error);
    return { success: false, message: error.text || 'Failed to send notification' };
  }
};

/**
 * Send partnership inquiry notification email to the organization
 * @param {Object} data - Partnership form data
 * @returns {Promise<Object>} - Response object with success status and message
 */
export const sendPartnershipNotification = async (data) => {
  const templateParams = {
    to_email: 'litt89765@gmail.com',
    to_name: 'Little Angels CBO Team',
    organization: data.organization,
    contact_person: data.contactPerson,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    interest: data.interest,
    message: data.message,
    date: new Date().toLocaleDateString('en-KE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-KE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Partnership notification sent successfully:', response);
    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Error sending partnership notification:', error);
    return { success: false, message: error.text || 'Failed to send notification' };
  }
};

/**
 * Send contact form notification email to the organization
 * @param {Object} data - Contact form data
 * @returns {Promise<Object>} - Response object with success status and message
 */
export const sendContactNotification = async (data) => {
  const templateParams = {
    to_email: 'litt89765@gmail.com',
    to_name: 'Little Angels CBO Team',
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    date: new Date().toLocaleDateString('en-KE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-KE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Contact notification sent successfully:', response);
    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Error sending contact notification:', error);
    return { success: false, message: error.text || 'Failed to send notification' };
  }
};