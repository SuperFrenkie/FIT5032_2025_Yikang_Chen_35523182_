import emailjs from '@emailjs/browser'

// EmailJS 配置 - 从环境变量读取
const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_health_app',
  welcomeTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_v5f5oyk', // 欢迎邮件模板
  contactTemplateId: 'template_7v11toe', // 联系表单模板
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Y10smDQfpmW5fyZW1',
  adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'chencruise21@gmail.com'
}

// 验证配置
const validateConfig = () => {
  console.log('EmailJS Configuration:', {
    serviceId: EMAIL_CONFIG.serviceId,
    welcomeTemplateId: EMAIL_CONFIG.welcomeTemplateId,
    contactTemplateId: EMAIL_CONFIG.contactTemplateId,
    publicKey: EMAIL_CONFIG.publicKey ? '***configured***' : 'not set',
    adminEmail: EMAIL_CONFIG.adminEmail
  })

  const requiredFields = ['serviceId', 'welcomeTemplateId', 'publicKey']
  const missingFields = requiredFields.filter(field =>
    !EMAIL_CONFIG[field] || EMAIL_CONFIG[field].startsWith('YOUR_')
  )

  if (missingFields.length > 0) {
    console.warn('EmailJS configuration incomplete. Missing or default values for:', missingFields)
    console.warn('Please check your .env file and ensure all EmailJS variables are set.')
    console.warn('Current config:', EMAIL_CONFIG)
    return false
  }

  return true
}

// 初始化EmailJS
if (validateConfig()) {
  emailjs.init(EMAIL_CONFIG.publicKey)
} else {
  console.error('EmailJS not initialized due to missing configuration')
}

/**
 * 发送欢迎邮件
 * @param {string} userEmail - 用户邮箱
 * @param {string} userName - 用户名称
 * @returns {Promise} 发送结果
 */
export const sendWelcomeEmail = async (userEmail, userName = '') => {
  if (!validateConfig()) {
    throw new Error('EmailJS configuration is incomplete')
  }

  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userName || userEmail,
      from_name: 'Health & Happiness Home',
      subject: 'Welcome to Health & Happiness Home!',
      message: `
        Dear ${userName || userEmail},

        Thank you for joining our community! We're excited to have you as part of our family.

        Our Services Include:
        • Health Knowledge Lectures
        • Interest Groups and Activities
        • Home Visit Care
        • Community Day Care

        You can now:
        • Rate our services
        • Find our locations
        • Access exclusive member content

        If you have any questions, please don't hesitate to contact us.

        Best regards,
        The Health & Happiness Home Team
      `
    }

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.welcomeTemplateId,
      templateParams
    )

    console.log('Welcome email sent successfully:', result)
    return { success: true, messageId: result.text }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw new Error(`Failed to send welcome email: ${error.message}`)
  }
}

/**
 * 发送通用邮件
 * @param {Object} emailData - 邮件数据
 * @param {string} emailData.to - 收件人邮箱
 * @param {string} emailData.subject - 邮件主题
 * @param {string} emailData.message - 邮件内容
 * @param {string} emailData.toName - 收件人姓名（可选）
 * @returns {Promise} 发送结果
 */
export const sendEmail = async ({ to, subject, message, toName = '' }) => {
  if (!validateConfig()) {
    throw new Error('EmailJS configuration is incomplete')
  }

  try {
    if (!to || !subject || !message) {
      throw new Error('Missing required fields: to, subject, and message')
    }

    const templateParams = {
      to_email: to,
      to_name: toName || to,
      from_name: 'Health & Happiness Home',
      subject: subject,
      message: message
    }

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.welcomeTemplateId,
      templateParams
    )

    console.log('Email sent successfully:', result)
    return { success: true, messageId: result.text }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}

/**
 * 发送联系表单邮件
 * @param {Object} formData - 表单数据
 * @param {string} formData.name - 发送者姓名
 * @param {string} formData.email - 发送者邮箱
 * @param {string} formData.subject - 邮件主题
 * @param {string} formData.message - 邮件内容
 * @returns {Promise} 发送结果
 */
export const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!validateConfig()) {
    throw new Error('EmailJS configuration is incomplete')
  }

  try {
    if (!name || !email || !subject || !message) {
      throw new Error('Missing required fields: name, email, subject, and message')
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: EMAIL_CONFIG.adminEmail,
      to_name: 'Health & Happiness Home Admin',
      subject: `Contact Form: ${subject}`,
      message: `
        New contact form submission:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `
    }

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.welcomeTemplateId, // 使用同一个模板
      templateParams
    )

    console.log('Contact email sent successfully:', result)
    return { success: true, messageId: result.text }
  } catch (error) {
    console.error('Error sending contact email:', error)
    throw new Error(`Failed to send contact email: ${error.message}`)
  }
}

/**
 * 更新EmailJS配置
 * @param {Object} config - 新的配置
 */
export const updateEmailConfig = (config) => {
  Object.assign(EMAIL_CONFIG, config)
  if (validateConfig()) {
    emailjs.init(EMAIL_CONFIG.publicKey)
  }
}

/**
 * 获取当前配置状态
 */
export const getConfigStatus = () => {
  return {
    isConfigured: validateConfig(),
    config: {
      serviceId: EMAIL_CONFIG.serviceId,
      templateId: EMAIL_CONFIG.templateId,
      publicKey: EMAIL_CONFIG.publicKey ? '***configured***' : 'not set',
      adminEmail: EMAIL_CONFIG.adminEmail
    }
  }
}

export default {
  sendWelcomeEmail,
  sendEmail,
  sendContactEmail,
  updateEmailConfig,
  getConfigStatus
}
