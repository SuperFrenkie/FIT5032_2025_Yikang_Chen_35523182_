import emailjs from '@emailjs/browser'

// EmailJS 配置 - 你需要替换为你的实际配置
const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // 替换为你的EmailJS Service ID
  templateId: 'YOUR_TEMPLATE_ID', // 替换为你的EmailJS Template ID
  publicKey: 'YOUR_PUBLIC_KEY' // 替换为你的EmailJS Public Key
}

// 初始化EmailJS
emailjs.init(EMAIL_CONFIG.publicKey)

/**
 * 发送欢迎邮件
 * @param {string} userEmail - 用户邮箱
 * @param {string} userName - 用户名称
 * @returns {Promise} 发送结果
 */
export const sendWelcomeEmail = async (userEmail, userName = '') => {
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
      EMAIL_CONFIG.templateId,
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
      EMAIL_CONFIG.templateId,
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
  try {
    if (!name || !email || !subject || !message) {
      throw new Error('Missing required fields: name, email, subject, and message')
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: 'your-admin-email@gmail.com', // 替换为你的管理员邮箱
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
      EMAIL_CONFIG.templateId,
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
  emailjs.init(EMAIL_CONFIG.publicKey)
}

export default {
  sendWelcomeEmail,
  sendEmail,
  sendContactEmail,
  updateEmailConfig
}
