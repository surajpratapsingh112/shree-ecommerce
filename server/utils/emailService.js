import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter - Nodemailer 8.x syntax
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // For development only
    }
  });
};

// Send Email Function
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html || options.message,
      ...(options.text && { text: options.text })
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

// Welcome Email Template
export const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SHREE ENTERPRISES!</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.name}! 👋</h2>
          <p>Thank you for registering with SHREE ENTERPRISES. We're excited to have you on board!</p>
          <p>Your account has been successfully created. You can now browse our products and start shopping.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <a href="${process.env.FRONTEND_URL}" class="button">Start Shopping</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SHREE ENTERPRISES. All rights reserved.</p>
          <p>Lucknow, Uttar Pradesh, India</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Welcome to SHREE ENTERPRISES',
    html: html
  });
};

// Order Confirmation Email
export const sendOrderConfirmationEmail = async (order, user) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .order-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f3f4f6; padding: 10px; text-align: left; }
        .total { background: #10b981; color: white; font-weight: bold; }
        .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Order Confirmed!</h1>
          <p>Order #${order.orderNumber}</p>
        </div>
        <div class="content">
          <h2>Hello ${user.name}! 🎉</h2>
          <p>Thank you for your order! We've received your order and will process it shortly.</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right;"><strong>Subtotal:</strong></td>
                  <td style="padding: 10px; text-align: right;">₹${order.itemsPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right;"><strong>Tax (GST):</strong></td>
                  <td style="padding: 10px; text-align: right;">₹${order.taxPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right;"><strong>Shipping:</strong></td>
                  <td style="padding: 10px; text-align: right;">₹${order.shippingPrice.toFixed(2)}</td>
                </tr>
                ${order.discountPrice > 0 ? `
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right;"><strong>Discount:</strong></td>
                  <td style="padding: 10px; text-align: right; color: #10b981;">-₹${order.discountPrice.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr class="total">
                  <td colspan="3" style="padding: 15px; text-align: right; font-size: 18px;">Total:</td>
                  <td style="padding: 15px; text-align: right; font-size: 18px;">₹${order.totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <h3>Shipping Address:</h3>
            <p>
              ${order.shippingAddress.street}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
              PIN: ${order.shippingAddress.zipCode}<br>
              Phone: ${order.shippingAddress.phone}
            </p>

            <h3>Payment Method:</h3>
            <p>${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Payment'}</p>
          </div>

          <a href="${process.env.FRONTEND_URL}/orders/${order._id}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SHREE ENTERPRISES. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: html
  });
};

// Order Status Update Email
export const sendOrderStatusEmail = async (order, user, newStatus) => {
  const statusMessages = {
    processing: 'Your order is being processed',
    packed: 'Your order has been packed',
    shipped: 'Your order has been shipped',
    delivered: 'Your order has been delivered',
    cancelled: 'Your order has been cancelled',
    returned: 'Your order return has been initiated'
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-box { background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; }
        .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📦 Order Status Update</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.name}!</h2>
          
          <div class="status-box">
            <h3>Order #${order.orderNumber}</h3>
            <p><strong>Status:</strong> ${statusMessages[newStatus]}</p>
            ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
            ${order.courierName ? `<p><strong>Courier:</strong> ${order.courierName}</p>` : ''}
          </div>

          <a href="${process.env.FRONTEND_URL}/orders/${order._id}" class="button">View Order Details</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SHREE ENTERPRISES. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email: user.email,
    subject: `Order ${order.orderNumber} - ${statusMessages[newStatus]}`,
    html: html
  });
};

// Password Reset Email
export const sendPasswordResetEmail = async (user, resetUrl) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        .button { display: inline-block; padding: 12px 30px; background: #ef4444; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.name}!</h2>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          
          <a href="${resetUrl}" class="button">Reset Password</a>
          
          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link is valid for 15 minutes only</li>
              <li>If you didn't request this, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>

          <p>Or copy this link: <br>${resetUrl}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SHREE ENTERPRISES. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request - SHREE ENTERPRISES',
    html: html
  });
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusEmail,
  sendPasswordResetEmail
};