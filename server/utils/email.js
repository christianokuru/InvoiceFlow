import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const FROM_NAME = process.env.RESEND_FROM_NAME || 'InvoiceFlow'
const APP_URL = process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables')
      throw new Error('Email service is not configured')
    }

    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject,
      html
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log(`Email sent successfully to ${to}. ID: ${data.id}`)
    return {
      success: true,
      messageId: data.id
    }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export const sendPasswordResetEmail = async (email, resetToken, userName = '') => {
  const resetLink = `${APP_URL}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            color: #4b5563;
            margin-bottom: 30px;
            font-size: 15px;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .alternative-link {
            margin-top: 25px;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 6px;
            font-size: 13px;
            color: #6b7280;
          }
          .alternative-link p {
            margin: 0 0 10px 0;
          }
          .link-text {
            word-break: break-all;
            color: #3B82F6;
            text-decoration: none;
          }
          .warning {
            margin-top: 25px;
            padding: 15px;
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
            font-size: 14px;
            color: #92400e;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #6b7280;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Password Reset Request</h1>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello${userName ? ' ' + userName : ''},
            </div>
            
            <div class="message">
              We received a request to reset your password for your InvoiceFlow account. Click the button below to create a new password:
            </div>
            
            <div class="button-container">
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            
            <div class="alternative-link">
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <a href="${resetLink}" class="link-text">${resetLink}</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons. If you didn't request a password reset, please ignore this email or contact support if you have concerns.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>InvoiceFlow</strong></p>
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} InvoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Reset Your Password - InvoiceFlow',
    html
  })
}

export const sendPasswordResetConfirmationEmail = async (email, userName = '') => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            color: #4b5563;
            margin-bottom: 20px;
            font-size: 15px;
          }
          .info-box {
            margin: 25px 0;
            padding: 20px;
            background-color: #f0fdf4;
            border-left: 4px solid #10B981;
            border-radius: 4px;
          }
          .info-box p {
            margin: 0;
            color: #065f46;
            font-size: 14px;
          }
          .warning {
            margin-top: 25px;
            padding: 15px;
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
            font-size: 14px;
            color: #92400e;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #6b7280;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1>Password Reset Successful</h1>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello${userName ? ' ' + userName : ''},
            </div>
            
            <div class="message">
              Your password has been successfully reset. You can now log in to your InvoiceFlow account using your new password.
            </div>
            
            <div class="info-box">
              <p><strong>✓</strong> Password changed on ${new Date().toLocaleString('en-US', { 
                dateStyle: 'long', 
                timeStyle: 'short' 
              })}</p>
            </div>
            
            <div class="button-container">
              <a href="${APP_URL}/auth/login" class="button">Log In to Your Account</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Didn't make this change?</strong><br>
              If you didn't reset your password, please contact our support team immediately to secure your account.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>InvoiceFlow</strong></p>
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} InvoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Your Password Has Been Reset - InvoiceFlow',
    html
  })
}

export const sendEmailVerificationEmail = async (email, verificationToken, userName = '') => {
  const verificationLink = `${APP_URL}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            color: #4b5563;
            margin-bottom: 30px;
            font-size: 15px;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
          }
          .alternative-link {
            margin-top: 25px;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 6px;
            font-size: 13px;
            color: #6b7280;
          }
          .alternative-link p {
            margin: 0 0 10px 0;
          }
          .link-text {
            word-break: break-all;
            color: #8B5CF6;
            text-decoration: none;
          }
          .info {
            margin-top: 25px;
            padding: 15px;
            background-color: #eff6ff;
            border-left: 4px solid #3B82F6;
            border-radius: 4px;
            font-size: 14px;
            color: #1e40af;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #6b7280;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Verify Your Email Address</h1>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello${userName ? ' ' + userName : ''},
            </div>
            
            <div class="message">
              Thank you for signing up with InvoiceFlow! To complete your registration and start using all features, please verify your email address by clicking the button below:
            </div>
            
            <div class="button-container">
              <a href="${verificationLink}" class="button">Verify Email Address</a>
            </div>
            
            <div class="alternative-link">
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <a href="${verificationLink}" class="link-text">${verificationLink}</a>
            </div>
            
            <div class="info">
              <strong>ℹ️ Note:</strong> This verification link will expire in 24 hours. If you didn't create an account with InvoiceFlow, you can safely ignore this email.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>InvoiceFlow</strong></p>
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} InvoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Verify Your Email Address - InvoiceFlow',
    html
  })
}

export const sendWelcomeEmail = async (email, userName = '') => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to InvoiceFlow</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .welcome-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1f2937;
          }
          .message {
            color: #4b5563;
            margin-bottom: 25px;
            font-size: 15px;
          }
          .features {
            margin: 30px 0;
          }
          .feature {
            display: flex;
            align-items: start;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9fafb;
            border-radius: 6px;
          }
          .feature-icon {
            font-size: 24px;
            margin-right: 15px;
            flex-shrink: 0;
          }
          .feature-content h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
            color: #1f2937;
          }
          .feature-content p {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #6b7280;
          }
          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="welcome-icon">🎉</div>
            <h1>Welcome to InvoiceFlow!</h1>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello${userName ? ' ' + userName : ''}!
            </div>
            
            <div class="message">
              We're thrilled to have you on board! InvoiceFlow is designed to make managing your invoices, receipts, and business finances effortless and efficient.
            </div>
            
            <div class="features">
              <div class="feature">
                <div class="feature-icon">📄</div>
                <div class="feature-content">
                  <h3>Create Professional Invoices</h3>
                  <p>Generate beautiful, customizable invoices in seconds</p>
                </div>
              </div>
              
              <div class="feature">
                <div class="feature-icon">🧾</div>
                <div class="feature-content">
                  <h3>Manage Receipts</h3>
                  <p>Keep track of all your receipts in one organized place</p>
                </div>
              </div>
              
              <div class="feature">
                <div class="feature-icon">👥</div>
                <div class="feature-content">
                  <h3>Client Management</h3>
                  <p>Store and manage all your client information securely</p>
                </div>
              </div>
              
              <div class="feature">
                <div class="feature-icon">📊</div>
                <div class="feature-content">
                  <h3>Analytics & Reports</h3>
                  <p>Get insights into your business performance</p>
                </div>
              </div>
            </div>
            
            <div class="button-container">
              <a href="${APP_URL}/dashboard" class="button">Get Started</a>
            </div>
            
            <div class="message">
              If you have any questions or need assistance, our support team is always here to help. Simply reply to this email or visit our help center.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>InvoiceFlow</strong></p>
            <p>Making invoicing simple and efficient</p>
            <p>&copy; ${new Date().getFullYear()} InvoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to InvoiceFlow! 🎉',
    html
  })
}

export default {
  sendPasswordResetEmail,
  sendPasswordResetConfirmationEmail,
  sendEmailVerificationEmail,
  sendWelcomeEmail
}