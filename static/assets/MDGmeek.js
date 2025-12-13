document.addEventListener('DOMContentLoaded', function() {
    // ==================== 可配置变量 ====================
    const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
    const BLUR_STRENGTH = '8px';
    const BUTTON_HOVER_COLOR = '#3cd2cd';
    // ====================================================
    
    // ==================== 自动导入 MDUI 2 CSS 和 JS ====================
    function loadMDUIResources() {
        if (!document.querySelector('link[href*="mdui.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/mdui@2/mdui.css';
            document.head.appendChild(link);
        }
        if (!document.querySelector('script[src*="mdui.global.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/mdui@2/mdui.global.js';
            document.body.appendChild(script);
        }
    }
    loadMDUIResources();
    // ====================================================================

    let currentUrl = window.location.pathname;

    // ==================== 最直接的修复方案 ====================
    function wrapContentInMduiCard() {
        const body = document.body;
        const originalContent = body.innerHTML;
        
        // 1. 添加全屏模糊背景
        const blurLayer = document.createElement('div');
        blurLayer.id = 'global-blur-layer';
        blurLayer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            filter: blur(${BLUR_STRENGTH});
            -webkit-filter: blur(${BLUR_STRENGTH});
        `;
        
        // 2. 创建最外层容器 - 完全复制原body的居中逻辑
        const mainWrapper = document.createElement('div');
        mainWrapper.id = 'mdui-main-wrapper';
        mainWrapper.style.cssText = `
            margin: 30px auto !important;
            padding: 20px !important;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 10px;
            overflow: auto;
            box-sizing: border-box;
            min-width: 200px;
            max-width: 1100px !important;
            width: 100% !important;
            position: relative;
            z-index: 1;
        `;
        
        // 3. 创建MDUI卡片
        const card = document.createElement('mdui-card');
        card.setAttribute('variant', 'elevated');
        card.style.cssText = `
            width: 100% !important;
            border-radius: 10px;
            overflow: hidden;
            display: block !important;
        `;
        
        // 4. 创建内容容器
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'mdui-content-wrapper';
        contentWrapper.style.cssText = `
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            width: 100%;
            min-height: 100%;
            padding: 20px;
            box-sizing: border-box;
        `;
        contentWrapper.innerHTML = originalContent;
        
        // 5. 组装结构
        card.appendChild(contentWrapper);
        mainWrapper.appendChild(card);
        
        // 6. 清空body并添加新结构
        body.innerHTML = '';
        body.appendChild(blurLayer);
        body.appendChild(mainWrapper);
        
        // 7. 添加关键CSS修复
        const globalStyles = document.createElement('style');
        globalStyles.innerHTML = `
            /* 重置基础样式 */
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100vh;
                font-family: sans-serif;
                background: transparent !important;
            }
            
            /* 确保body正确居中内容 */
            body {
                display: block !important;
                background: transparent !important;
            }
            
            /* 强制整个页面居中布局 */
            #mdui-main-wrapper {
                display: block !important;
                position: relative !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                background: transparent !important;
            }
            
            /* 修复MDUI卡片可能的问题 */
            mdui-card {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                background: transparent !important;
            }
            
            /* 确保内容区域宽度正确 */
            .mdui-content-wrapper,
            .mdui-content-wrapper > * {
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }
            
            /* 强制所有内部元素继承正确宽度 */
            #header, #main, #footer, .blogTitle, .title-right,
            .SideNav, .markdown-body, .pagination {
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }
            
            /* 针对大屏幕的额外调整 */
            @media (min-width: 1200px) {
                #mdui-main-wrapper {
                    max-width: 1100px !important;
                    width: 90% !important;
                }
            }
            
            /* 移动端调整 */
            @media (max-width: 768px) {
                #mdui-main-wrapper {
                    margin: 15px auto !important;
                    padding: 10px !important;
                    width: 95% !important;
                }
                
                .mdui-content-wrapper {
                    padding: 15px !important;
                }
            }
        `;
        document.head.appendChild(globalStyles);
    }
    
    wrapContentInMduiCard();
    // ====================================================================

    // ==================== 各页面主题调整 ====================
    // 将颜色值转换为RGBA格式
    function getHoverColorRgba() {
        const hex = BUTTON_HOVER_COLOR.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, 0.9)`;
    }
    
    const buttonHoverRgba = getHoverColorRgba();
    
    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主页主题 - 确保所有内容正确居中 */
        .mdui-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
        }
        
        /* header布局 - 保持原设计 */
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
            background: transparent !important;
        }
        
        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .title-right {
            margin: unset;
            margin-top: 295px;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        
        .avatar {
            width: 200px;
            height: 200px;
        }
        
        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
        }
        
        /* 侧边导航 */
        .SideNav {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, 
        .pagination span:hover, .pagination span:focus, 
        .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 - 确保居中 */
        div.title-right {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
        }
        
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            border-radius: 2em !important;
            background-color: ${buttonHoverRgba} !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        `;
        document.head.appendChild(style);
        
        // 右上角按钮描述
        setTimeout(() => {
            let topright_buttons = document.querySelectorAll(".title-right a.btn");
            topright_buttons.forEach(button => {
                var title = button.getAttribute('title');
                if (title) {
                    var btndescription = document.createElement('span');
                    btndescription.className = 'btndescription';
                    btndescription.textContent = title;
                    button.appendChild(btndescription);
                }
            });
        }, 100);

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 文章页主题 */
        .mdui-content-wrapper {
            background: rgba(255, 255, 255, 0.88) !important;
            padding: 45px !important;
        }
        
        @media (max-width: 1000px) {
            .mdui-content-wrapper {
                padding: 20px !important;
            }
        }
        
        /* markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
        }

        .markdown-alert {
            border-radius: 10px;
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 10px;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgb(141 150 161 / 20%);
        }

        video {
            border-radius: 10px;
        }

        /* 右上角按钮 */
        div.title-right {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
        }
        
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }

        div.title-right .btn:hover {
            border-radius: 2em !important;
            background-color: ${buttonHoverRgba} !important;
        }

        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }

        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        `;
        document.head.appendChild(style);

        // 右上角按钮描述
        setTimeout(() => {
            let topright_buttons = document.querySelectorAll(".title-right a.btn");
            topright_buttons.forEach(button => {
                var title = button.getAttribute('title');
                if (title) {
                    var btndescription = document.createElement('span');
                    btndescription.className = 'btndescription';
                    btndescription.textContent = title;
                    button.appendChild(btndescription);
                }
            });
        }, 100);

    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 搜索页主题 */
        .mdui-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
        }
        
        /* header布局 */
        .title-right {
            align-items: flex-end;
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
        }

        @media (max-width: 600px) {
            .tagTitle {
                display: unset;
                font-size: 14px;
                white-space: unset;
            }
        }
        
        /* 侧边导航 */
        .SideNav {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            border-radius: 2em !important;
            background-color: ${buttonHoverRgba} !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        /* 搜索框样式 */
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: unset; 
            height: 36px;
        }
        `;
        document.head.appendChild(style);
        
        // 右上角按钮描述
        setTimeout(() => {
            let topright_buttons = document.querySelectorAll(".title-right a.btn");
            topright_buttons.forEach(button => {
                var title = button.getAttribute('title');
                if (title) {
                    var btndescription = document.createElement('span');
                    btndescription.className = 'btndescription';
                    btndescription.textContent = title;
                    button.appendChild(btndescription);
                }
            });
        }, 100);
        
        // 搜索框回车事件
        setTimeout(() => {
            let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
            let button = document.getElementsByClassName("btn float-left")[0];
            if (input && button) {
                input.addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode === 13) {
                        button.click();
                    }
                });
            }
        }, 200);

    } else {
        console.log('MDGmeek : 应用基础样式');
        let style = document.createElement("style");
        style.innerHTML = `
        .mdui-content-wrapper {
            background: rgba(255, 255, 255, 0.85) !important;
        }
        `;
        document.head.appendChild(style);
    }
});
