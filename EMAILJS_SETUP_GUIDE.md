# EmailJS 设置指南

这个指南将帮你配置EmailJS来替代Firebase Cloud Functions的邮件功能，使其在Firebase免费版本中正常工作。

## 第一步：注册EmailJS账户

1. 访问 https://www.emailjs.com/
2. 点击 "Sign Up" 注册免费账户
3. 使用你的Gmail账户登录（推荐）

## 第二步：创建邮件服务

1. 登录后，点击左侧菜单的 "Email Services"
2. 点击 "Add New Service"
3. 选择 "Gmail" 作为邮件服务提供商
4. 点击 "Connect Account" 并授权你的Gmail账户
5. 给服务起个名字，比如 "Health-Charity-Gmail"
6. 记录下 **Service ID**（类似：service_xxxxxxx）

## 第三步：创建邮件模板

### 创建欢迎邮件模板
1. 点击左侧菜单的 "Email Templates"
2. 点击 "Create New Template"
3. 选择 "Gmail" 服务
4. 配置模板：
   - **Template Name**: Welcome Email
   - **Subject**: Welcome to Health & Happiness Home!
   - **Content**: 
   ```html
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
     
     <p>{{message}}</p>
     
     <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
       <p style="color: #666;">Best regards,<br><strong>{{from_name}}</strong></p>
     </div>
   </div>
   ```

5. 在 "Settings" 标签页中：
   - **To Email**: {{to_email}}
   - **To Name**: {{to_name}}
   - **From Name**: {{from_name}}
   - **Reply To**: {{to_email}}

6. 点击 "Save" 并记录下 **Template ID**

### 创建联系表单模板
1. 再创建一个新模板用于联系表单
2. 配置：
   - **Template Name**: Contact Form
   - **Subject**: New Contact: {{subject}}
   - **Content**:
   ```html
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
   </div>
   ```

3. 在 "Settings" 标签页中：
   - **To Email**: your-admin-email@gmail.com（替换为你的管理员邮箱）
   - **To Name**: Health & Happiness Home Admin
   - **From Name**: {{from_name}}
   - **From Email**: {{from_email}}
   - **Reply To**: {{from_email}}

## 第四步：获取Public Key

1. 点击左侧菜单的 "Account"
2. 在 "API Keys" 部分找到 **Public Key**
3. 记录下这个key（类似：user_xxxxxxxxxxxxxxxx）

## 第五步：配置项目

1. 在项目根目录创建 `.env` 文件：
```bash
# EmailJS Configuration
VUE_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
VUE_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VUE_APP_EMAILJS_PUBLIC_KEY=user_xxxxxxxxxxxxxxxx
VUE_APP_ADMIN_EMAIL=your-admin-email@gmail.com
```

2. 替换为你的实际值：
   - `VUE_APP_EMAILJS_SERVICE_ID`: 第二步中的Service ID
   - `VUE_APP_EMAILJS_TEMPLATE_ID`: 第三步中的Template ID
   - `VUE_APP_EMAILJS_PUBLIC_KEY`: 第四步中的Public Key
   - `VUE_APP_ADMIN_EMAIL`: 你的管理员邮箱

## 第六步：测试配置

1. 重启开发服务器：
```bash
npm run dev
```

2. 测试用户注册功能：
   - 访问登录页面
   - 切换到注册模式
   - 注册一个新用户
   - 检查是否收到欢迎邮件

3. 测试联系表单：
   - 访问联系页面
   - 填写并提交联系表单
   - 检查管理员邮箱是否收到邮件

## 故障排除

### 常见问题

1. **邮件没有发送**
   - 检查浏览器控制台是否有错误
   - 确认EmailJS配置正确
   - 检查Gmail账户是否正确连接

2. **配置错误**
   - 确保 `.env` 文件在项目根目录
   - 确保所有环境变量都以 `VUE_APP_` 开头
   - 重启开发服务器

3. **邮件进入垃圾箱**
   - 这是正常的，特别是测试阶段
   - 可以将发送邮箱添加到联系人

### 免费版本限制

EmailJS免费版本限制：
- 每月200封邮件
- 基本邮件模板
- 社区支持

如果需要更多功能，可以考虑升级到付费版本。

## 部署到生产环境

1. 在生产环境中设置相同的环境变量
2. 确保生产环境的域名已添加到EmailJS的允许域名列表中
3. 测试所有邮件功能

## 安全注意事项

- Public Key是公开的，可以在前端代码中使用
- 不要在前端代码中暴露Private Key
- 定期检查EmailJS的使用统计
- 考虑添加验证码来防止垃圾邮件

完成这些步骤后，你的邮件功能就可以在Firebase免费版本中正常工作了！
