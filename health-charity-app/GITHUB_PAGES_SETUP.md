# GitHub Pages 手动部署指南

## 仓库信息
- 仓库名称: `FIT5032_2025_Yikang_Chen_35523182_`
- 项目路径: `health-charity-app/`
- 部署URL: `https://superfrenkie.github.io/FIT5032_2025_Yikang_Chen_35523182_/health-charity-app/`

## 方法1：通过GitHub Web界面上传

### 步骤1：访问GitHub仓库
```
https://github.com/SuperFrenkie/FIT5032_2025_Yikang_Chen_35523182_
```

### 步骤2：上传GitHub Actions工作流
1. 在仓库根目录创建 `.github/workflows/` 文件夹
2. 上传 `deploy.yml` 文件到该文件夹

### 步骤3：上传项目文件
1. 确保 `health-charity-app/` 文件夹包含所有项目文件
2. 特别确保包含更新后的 `vite.config.js` 和 `package.json`

### 步骤4：启用GitHub Pages
1. 进入仓库 Settings
2. 找到 Pages 设置
3. Source 选择 "GitHub Actions"

## 方法2：本地文件清单

需要确保以下文件已更新并上传：

### 关键配置文件：
```
health-charity-app/
├── .github/workflows/deploy.yml  (GitHub Actions配置)
├── vite.config.js                (包含正确的base路径)
├── package.json                  (包含部署脚本)
├── dist/                         (构建输出，自动生成)
└── src/                          (源代码)
```

### vite.config.js 关键配置：
```javascript
base: process.env.NODE_ENV === 'production' 
  ? '/FIT5032_2025_Yikang_Chen_35523182_/health-charity-app/' 
  : '/',
```

### GitHub Actions 工作流要点：
- 只在 `health-charity-app/**` 路径变更时触发
- 构建输出到 `./health-charity-app/dist`
- 部署到 `health-charity-app` 子目录

## 方法3：直接上传构建文件

如果GitHub Actions有问题，可以直接上传构建好的文件：

### 步骤1：准备文件
当前 `dist/` 文件夹包含：
- index.html
- favicon.ico
- assets/ (CSS和JS文件)

### 步骤2：手动上传到GitHub Pages
1. 在仓库中创建 `docs/` 文件夹
2. 将 `dist/` 中的所有文件上传到 `docs/`
3. 在Pages设置中选择 "Deploy from a branch"
4. 选择 "main" 分支的 "docs" 文件夹

## 预期结果

部署成功后，网站将在以下地址可用：
```
https://superfrenkie.github.io/FIT5032_2025_Yikang_Chen_35523182_/health-charity-app/
```

## 故障排除

### 如果页面显示404：
1. 检查仓库名称是否正确
2. 确认Pages设置已启用
3. 验证文件路径是否正确

### 如果资源加载失败：
1. 检查 `vite.config.js` 中的 `base` 配置
2. 确认所有assets文件都已上传

### 如果GitHub Actions失败：
1. 检查 `package-lock.json` 是否存在
2. 确认Node.js版本兼容性
3. 查看Actions日志获取详细错误信息
