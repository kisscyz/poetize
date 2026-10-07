# 诗语 POETIZE · 暖纸诗意风博客

手写纯静态博客（HTML / CSS / JS，无构建、无后端），暖纸诗意视觉风格。

- `index.html` —— 首页：在山水之间，寻一句诗
- `gallery.html` —— 漫步：旅行照片墙（筛选：All / Sea / City / Nature / Mountains）
- `timeline.html` —— 诗集：纵向时间线
- `article.html` —— 文章页：双栏 + 右侧目录

## 本地预览

```bash
cd poetize-classic
python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 换图片

`images/` 下的图片多为效果图裁出的占位图，直接替换同名文件即可（建议尺寸见原图比例）。

## 部署

推送到 GitHub 仓库后，在仓库 Settings → Pages 里选择 `main` 分支根目录即可上线。
