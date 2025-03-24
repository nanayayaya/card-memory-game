// 生成分享图
function generateShareImage() {
    // 获取游戏成绩数据
    const time = document.getElementById('totalTime').textContent;
    const moves = document.getElementById('finalMove').textContent;
    const rating = document.getElementById('starRating').innerHTML;
    
    // 获取当前语言
    const lang = translations[currentLanguage];
    
    // 获取Canvas元素和上下文
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置画布尺寸
    canvas.width = 800;
    canvas.height = 600;
    
    // 绘制背景 - 苹果风格的渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#f2f2f7');   // 浅灰色
    gradient.addColorStop(1, '#e5e5ea');   // 更深的灰色
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // 添加顶部装饰性元素 - 彩色条纹
    const colors = ['#007AFF', '#AF52DE', '#FF2D55', '#34C759', '#FFCC00'];
    let startX = 0;
    const stripeWidth = 800 / colors.length;
    
    colors.forEach(color => {
        ctx.fillStyle = color;
        ctx.fillRect(startX, 0, stripeWidth, 10);
        startX += stripeWidth;
    });
    
    // 绘制装饰性卡片图案
    drawCards(ctx);
    
    // 绘制标题 - 游戏标题
    ctx.fillStyle = '#1C1C1E';
    ctx.font = 'bold 40px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lang.gameTitle, 400, 100);
    
    // 绘制游戏成绩
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#007AFF';
    ctx.fillText(lang.myGameResults, 400, 180);
    
    // 绘制分割线
    ctx.strokeStyle = '#e5e5ea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 210);
    ctx.lineTo(600, 210);
    ctx.stroke();
    
    // 绘制详细成绩
    ctx.font = '26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#1C1C1E';
    ctx.textAlign = 'left';
    
    // 创建装饰性圆圈
    ctx.fillStyle = '#007AFF';
    ctx.beginPath();
    ctx.arc(250, 260, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1C1C1E';
    ctx.fillText(`${lang.time.replace(':', '')} ${time}`, 270, 270);
    
    ctx.fillStyle = '#34C759';
    ctx.beginPath();
    ctx.arc(250, 310, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1C1C1E';
    ctx.fillText(`${lang.moves.replace(':', '')} ${moves}`, 270, 320);
    
    ctx.fillStyle = '#FFCC00';
    ctx.beginPath();
    ctx.arc(250, 360, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制星级评分
    ctx.fillStyle = '#1C1C1E';
    ctx.fillText(`${lang.rating.replace(':', '')}`, 270, 370);
    
    // 解析HTML星级评分并绘制星星
    const starCount = (rating.match(/<i class="fa fa-star">/g) || []).length;
    for (let i = 0; i < starCount; i++) {
        drawStar(ctx, 350 + i * 40, 363, 15, '#FFCC00');
    }
    
    // 添加挑战信息
    ctx.fillStyle = '#007AFF';
    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lang.challengeText, 400, 450);
    
    // 添加网站域名
    ctx.fillStyle = '#6C6C70';
    ctx.font = '22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('cardmemorygame.space', 400, 500);
    
    // 添加二维码提示
    ctx.fillStyle = '#1C1C1E';
    ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang.scanToVisit, 400, 530);
    
    // 添加版权信息
    ctx.fillStyle = '#8E8E93';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(lang.copyright, 400, 570);
    
    // 将Canvas转换为图片
    const dataURL = canvas.toDataURL('image/png');
    document.getElementById('share-image').src = dataURL;
    
    // 显示分享容器
    document.getElementById('share-container').style.display = 'flex';
}

// 绘制星星
function drawStar(ctx, cx, cy, radius, color) {
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius / 2;
    
    ctx.beginPath();
    ctx.fillStyle = color;
    
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

// 绘制装饰性卡片
function drawCards(ctx) {
    // 左上角卡片
    drawCard(ctx, 100, 80, 60, 90, '#007AFF', -15);
    
    // 右上角卡片
    drawCard(ctx, 650, 80, 60, 90, '#FF3B30', 15);
    
    // 左下角卡片
    drawCard(ctx, 120, 450, 60, 90, '#34C759', -10);
    
    // 右下角卡片
    drawCard(ctx, 680, 450, 60, 90, '#FFCC00', 10);
}

// 绘制单张卡片
function drawCard(ctx, x, y, width, height, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);
    
    // 绘制卡片阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    // 绘制卡片主体
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(-width/2, -height/2, width, height, 10);
    ctx.fill();
    
    ctx.restore();
}

// 下载分享图
function downloadShareImage() {
    const image = document.getElementById('share-image').src;
    const link = document.createElement('a');
    link.href = image;
    link.download = '卡片记忆游戏成绩.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 关闭分享图
function closeShareImage() {
    document.getElementById('share-container').style.display = 'none';
}

// Polyfill for roundRect if not supported
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
        return this;
    };
}
