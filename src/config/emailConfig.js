// EmailJS 配置文件
// 请在 https://www.emailjs.com/ 注册账户并获取以下配置信息

export const EMAIL_CONFIG = {
  // 你的EmailJS Service ID
  serviceId: process.env.VUE_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  
  // 你的EmailJS Template ID
  templateId: process.env.VUE_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  
  // 你的EmailJS Public Key
  publicKey: process.env.VUE_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  
  // 管理员邮箱（接收联系表单邮件）
  adminEmail: process.env.VUE_APP_ADMIN_EMAIL || 'your-admin-email@gmail.com'
}

// EmailJS 邮件模板配置
export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Welcome to Health & Happiness Home!',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2c3e50; text-align: center;">Welcome to Health & Happiness Home!</h1>
        
        <p>Dear {{to_name}},</p>
        
        <p>Thank you for joining our community! We're excited to have you as part of our family.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2c3e50; margin-top: 0;">Our Services Include:</h2>
          <ul style="color: #555;">
            <li>Health Knowledge Lectures</li>
            <li>Interest Groups and Activities</li>
            <li>Home Visit Care</li>
            <li>Community Day Care</li>
          </ul>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">You can now:</h3>
          <ul style="color: #555;">
            <li>Rate our services</li>
            <li>Find our locations</li>
            <li>Access exclusive member content</li>
          </ul>
        </div>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666;">Best regards,<br><strong>The Health & Happiness Home Team</strong></p>
        </div>
      </div>
    `
  },
  
  contact: {
    subject: 'New Contact Form Submission',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2c3e50;">New Contact Form Submission</h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> {{from_name}}</p>
          <p><strong>Email:</strong> {{from_email}}</p>
          <p><strong>Subject:</strong> {{subject}}</p>
          
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #007bff;">
              {{message}}
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666;">
          <p>This message was sent from the Health & Happiness Home contact form.</p>
        </div>
      </div>
    `
  }
}

// 验证配置是否完整
export const validateEmailConfig = () => {
  const requiredFields = ['serviceId', 'templateId', 'publicKey']
  const missingFields = requiredFields.filter(field => 
    !EMAIL_CONFIG[field] || EMAIL_CONFIG[field].startsWith('YOUR_')
  )
  
  if (missingFields.length > 0) {
    console.warn('EmailJS configuration incomplete. Missing or default values for:', missingFields)
    return false
  }
  
  return true
}

export default EMAIL_CONFIG
