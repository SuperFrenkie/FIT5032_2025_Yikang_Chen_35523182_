# Firebase Hosting 手动部署指南

## 当前状态
✅ 项目已构建完成
✅ Firebase项目已配置：`health-charity-app-b7555`
✅ 构建文件位于：`dist/` 文件夹

## 手动部署步骤

### 1. 在Firebase Console中继续设置

你当前在"设置Firebase托管"页面，请：
- 点击"下一步"跳过CLI安装（已安装）
- 跳过"初始化项目"步骤（已完成）

### 2. 准备上传的文件

需要上传 `dist/` 文件夹中的所有内容：

```
dist/
├── index.html              (主页面文件)
├── favicon.ico            (网站图标)
└── assets/                (资源文件夹)
    ├── AboutView-CSIvawM9.css
    ├── AboutView-tXujbWyg.js
    ├── index-Bunz0_rM.css
    └── index-Qg-xv6sj.js
```

### 3. 上传文件到Firebase Hosting

在Firebase Console的部署页面：

1. **拖拽上传方式**：
   - 将整个 `dist` 文件夹拖拽到上传区域
   - 或者选择 `dist` 文件夹中的所有文件进行上传

2. **确保文件结构正确**：
   - `index.html` 必须在根目录
   - `assets/` 文件夹包含所有CSS和JS文件
   - `favicon.ico` 在根目录

### 4. 完成部署

上传完成后：
- 点击"部署"按钮
- 等待部署完成
- 获取你的网站URL：`https://health-charity-app-b7555.web.app/`

## 重要提醒

⚠️ **文件路径很重要**：
- 确保 `index.html` 在根目录
- 确保 `assets/` 文件夹结构完整
- 不要上传 `dist` 文件夹本身，而是上传其内容

✅ **正确的上传结构**：
```
Firebase Hosting根目录/
├── index.html
├── favicon.ico
└── assets/
    └── (所有CSS和JS文件)
```

❌ **错误的上传结构**：
```
Firebase Hosting根目录/
└── dist/
    ├── index.html
    └── ...
```

## 部署后验证

部署完成后，访问你的网站URL并检查：
- [ ] 首页正常加载
- [ ] 导航功能正常
- [ ] 登录功能正常
- [ ] 地图功能正常
- [ ] 管理员面板正常

## 如果遇到问题

1. **404错误**：检查文件路径是否正确
2. **资源加载失败**：确保assets文件夹上传完整
3. **功能异常**：检查Firebase配置是否正确

## 备选方案

如果手动上传仍有问题，我们可以：
1. 使用GitHub Pages部署
2. 使用Netlify部署
3. 尝试其他Firebase CLI登录方法
