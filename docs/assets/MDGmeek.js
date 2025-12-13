// 添加高斯模糊程度变量（可调整）
const BLUR_INTENSITY = '10px'; // 高斯模糊程度，可修改这个值
const BUTTON_HOVER_COLOR = '#3cd2cd'; // 右上角按钮悬浮颜色，可修改这个值（支持 #000000, rgb(255,0,0), rgba(255,0,0,0.8) 等格式）

document.addEventListener('DOMContentLoaded', function() {
    const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
    
    // 导入MDUI样式（如果尚未导入）
    const mduiCSS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css';
    const mduiJS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js';
    
    // 检查是否已加载MDUI CSS
    if (!document.querySelector(`link[href="${mduiCSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = mduiCSS;
        document.head.appendChild(link);
    }
    
    // 检查是否已加载MDUI JS
    if (!document.querySelector(`script[src="${mduiJS}"]`)) {
        const script = document.createElement('script');
        script.src = mduiJS;
        document.head.appendChild(script);
    }
    
    // 创建MDUI卡片容器并包装body内容
    const bodyContent = document.body.innerHTML;
    const cardContainer = document.createElement('div');
    cardContainer.className = 'mdui-card mdui-card-content';
    cardContainer.style.cssText = `
        backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        background: rgba(255, 255, 255, 0.15) !important;
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(cardContainer);
    cardContainer.innerHTML = bodyContent;
    
    // 为SideNav-item添加MDUI卡片样式 - 简化版本
    function applySideNavCardStyles() {
        // 直接重置SideNav-item的样式
        const sideNavStyle = document.createElement('style');
        sideNavStyle.id = 'sidenav-card-styles';
        sideNavStyle.textContent = `
            .SideNav-item {
                background: rgba(255, 255, 255, 0.25) !important;
                backdrop-filter: blur(5px) !important;
                -webkit-backdrop-filter: blur(5px) !important;
                border-radius: 8px !important;
                margin: 8px 0 !important;
                padding: 12px !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                min-height: auto !important;
                height: auto !important;
                line-height: normal !important;
                display: block !important;
                text-align: center !important;
            }
            
            .SideNav-item:hover {
                background: rgba(255, 255, 255, 0.35) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
            }
            
            .SideNav-item a {
                display: block !important;
                width: 100% !important;
                text-decoration: none !important;
                color: inherit !important;
                font-weight: 500 !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            
            /* 覆盖任何可能继承的样式 */
            .SideNav {
                background: transparent !important;
                padding: 0 !important;
                margin: 10px 0 !important;
            }
            
            .SideNav * {
                box-sizing: border-box !important;
            }
        `;
        
        // 如果已经存在这个样式，先移除
        const existingStyle = document.getElementById('sidenav-card-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        document.head.appendChild(sideNavStyle);
        
        // 确保所有SideNav-item都有正确的样式
        setTimeout(() => {
            const sideNavItems = document.querySelectorAll('.SideNav-item');
            sideNavItems.forEach(item => {
                // 移除所有可能的内联样式
                item.removeAttribute('style');
                
                // 添加MDUI卡片类
                if (!item.classList.contains('mdui-card')) {
                    item.classList.add('mdui-card');
                }
                
                // 设置内联样式以确保优先级
                item.style.cssText = `
                    background: rgba(255, 255, 255, 0.25) !important;
                    backdrop-filter: blur(5px) !important;
                    -webkit-backdrop-filter: blur(5px) !important;
                    border-radius: 8px !important;
                    margin: 8px 0 !important;
                    padding: 12px !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                    transition: all 0.3s ease !important;
                    cursor: pointer !important;
                    min-height: auto !important;
                    height: auto !important;
                    line-height: normal !important;
                    display: block !important;
                    text-align: center !important;
                `;
            });
        }, 100);
    }
    
    //判断url，添加主题------------------------------------------------------------------------
    let currentUrl = window.location.pathname;

    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题');

        //主页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
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
        
        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        body {
            margin: 30px auto;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
        }
        
        /* MDUI卡片样式 */
        .mdui-card {
            margin: 0 auto;
            padding: 20px;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
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
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
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
        
        //右上角按钮描述
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

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题');

        //文章页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `

        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }

        body {
            min-width: 200px;
            max-width: 1100px;
            margin: 30px auto;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
            padding: 0 !important;
        }

        /* MDUI卡片样式 */
        .mdui-card {
            width: 100%;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }

        @media (min-width: 1001px) {
        .mdui-card {
            padding: 45px;
        }
        }

        @media (max-width: 1000px) {
        .mdui-card {
            padding: 20px;
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
            background-color: rgba(141, 150, 161, 0.2);
        }

        video {
            border-radius: 10px;
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
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
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

        //右上角按钮描述
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

    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题');

        // 搜索页主题--------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        
        .title-right {
            align-items: flex-end;
        }

        @media (max-width: 600px) {
            .tagTitle {
                display: unset;
                font-size: 14px;
                white-space: unset;
            }
        }
        
        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        body {
            margin: 30px auto;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
        }
        
        /* MDUI卡片样式 */
        .mdui-card {
            margin: 0 auto;
            padding: 20px;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
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
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
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
        
        //右上角按钮描述
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
        
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });

    } else {
        console.log('MDGmeek : 未应用主题');
    }
    
    // 延迟执行，确保DOM完全加载
    setTimeout(() => {
        applySideNavCardStyles();
        console.log('MDGmeek : SideNav卡片样式已应用');
    }, 500);
    
    // 添加一个更强的覆盖样式
    const overrideStyle = document.createElement('style');
    overrideStyle.textContent = `
        /* 强制覆盖所有SideNav-item样式 */
        .SideNav-item {
            all: unset !important;
            background: rgba(255, 255, 255, 0.25) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border-radius: 8px !important;
            margin: 8px 0 !important;
            padding: 12px 16px !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
            display: block !important;
            text-align: center !important;
            min-height: auto !important;
            height: auto !important;
            line-height: 1.5 !important;
        }
        
        .SideNav-item:hover {
            background: rgba(255, 255, 255, 0.35) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
        }
        
        .SideNav-item a {
            display: block !important;
            width: 100% !important;
            text-decoration: none !important;
            color: inherit !important;
            font-weight: 500 !important;
        }
        
        .SideNav {
            background: transparent !important;
            padding: 0 !important;
            margin: 10px 0 !important;
        }
    `;
    document.head.appendChild(overrideStyle);
});
