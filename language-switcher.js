// 默认语言
let currentLanguage = 'en';

// 获取浏览器语言并自动设置
function detectBrowserLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    if (translations[browserLang]) {
        currentLanguage = browserLang;
        document.getElementById('language-select').value = browserLang;
        updateContent(browserLang);
    }
}

// 当页面加载时，尝试检测浏览器语言
document.addEventListener('DOMContentLoaded', function() {
    detectBrowserLanguage();
});

// 更新所有页面内容的函数
function updateContent(language) {
    const lang = translations[language];
    if (!lang) return;

    // 更新网页标题
    document.querySelector('h1').textContent = lang.gameTitle;
    document.querySelector('.tagline').textContent = lang.tagline;
    
    // 更新游戏描述
    const gameDescriptionParagraphs = document.querySelectorAll('.game-description p');
    gameDescriptionParagraphs[0].textContent = lang.gameDescription1;
    gameDescriptionParagraphs[1].textContent = lang.gameDescription2;
    gameDescriptionParagraphs[2].textContent = lang.gameDescription3;
    gameDescriptionParagraphs[3].textContent = lang.gameDescription4;
    
    // 更新步数标签
    document.querySelector('.score-panel-inner').innerHTML = document.querySelector('.score-panel-inner').innerHTML.replace(/Moves|Movimientos|Mouvements|Züge|手数|이동|步数/, lang.moves);
    
    // 更新特性卡片
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards[0].querySelector('.feature-title').textContent = lang.featureTitle1;
    featureCards[0].querySelector('p').textContent = lang.featureDesc1;
    featureCards[1].querySelector('.feature-title').textContent = lang.featureTitle2;
    featureCards[1].querySelector('p').textContent = lang.featureDesc2;
    featureCards[2].querySelector('.feature-title').textContent = lang.featureTitle3;
    featureCards[2].querySelector('p').textContent = lang.featureDesc3;
    
    // 更新"如何游玩"部分
    document.querySelector('.how-to-play h2').textContent = lang.howToPlay;
    const steps = document.querySelectorAll('.step-text');
    steps[0].textContent = lang.step1;
    steps[1].textContent = lang.step2;
    steps[2].textContent = lang.step3;
    steps[3].textContent = lang.step4;
    steps[4].textContent = lang.step5;
    
    // 更新弹窗内容
    document.querySelector('.popup h2').textContent = lang.congratulations;
    document.querySelector('.content-1').textContent = lang.gameComplete;
    
    // 更新统计信息标签
    const statsItems = document.querySelectorAll('.stats-item');
    statsItems[0].innerHTML = lang.time + ' <span id="totalTime" class="stats-highlight"></span>';
    statsItems[1].innerHTML = lang.moves + ' <span id="finalMove" class="stats-highlight"></span>';
    statsItems[2].innerHTML = lang.rating + ' <span id="starRating" class="stats-highlight"></span>';
    
    // 更新按钮文本
    document.getElementById('play-again').textContent = lang.playAgain;
    document.getElementById('share-result').textContent = lang.challengeFriends;
    
    // 更新分享图相关文本
    const shareActions = document.querySelectorAll('.share-actions button');
    if (shareActions.length >= 2) {
        shareActions[0].textContent = lang.saveImage;
        shareActions[1].textContent = lang.close;
    }
    
    // 更新页脚版权信息
    document.querySelector('.copyright').textContent = lang.copyright;
}

// 切换语言的函数
function changeLanguage(language) {
    currentLanguage = language;
    updateContent(language);
    
    // 存储用户语言偏好
    localStorage.setItem('preferred-language', language);
}

// 页面加载时检查存储的语言偏好
window.addEventListener('load', function() {
    const preferredLanguage = localStorage.getItem('preferred-language');
    if (preferredLanguage && translations[preferredLanguage]) {
        document.getElementById('language-select').value = preferredLanguage;
        changeLanguage(preferredLanguage);
    } else {
        detectBrowserLanguage();
    }
});
