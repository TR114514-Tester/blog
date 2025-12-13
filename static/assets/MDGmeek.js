// 添加高斯模糊程度变量（可调整）
const BLUR_INTENSITY = '10px'; // 高斯模糊程度，可修改这个值
const BUTTON_HOVER_COLOR = '#3cd2cd'; // 右上角按钮悬浮颜色，可修改这个值（支持 #000000, rgb(255,0,0), rgba(255,0,0,0.8) 等格式）
const SIDENAV_HOVER_COLOR = '#3cd2cd'; // SideNav-item 悬停颜色，可修改这个值

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
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(cardContainer);
    cardContainer.innerHTML = bodyContent;
    
    // 为SideNav-item添加美化效果
    function applySideNavBeautify() {
        // 创建美化样式
        const beautifyStyle = document.createElement('style');
        beautifyStyle.id = 'sidenav-beautify-styles';
        beautifyStyle.textContent = `
            /* 主容器美化 */
            .SideNav {
                background: transparent !important;
                padding: 0 !important;
                margin: 20px 0 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 12px !important;
            }
            
            /* SideNav-item卡片美化 */
            .SideNav-item {
                all: unset !important;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05)) !important;
                backdrop-filter: blur(8px) saturate(180%) !important;
                -webkit-backdrop-filter: blur(8px) saturate(180%) !important;
                border-radius: 16px !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.08),
                    0 1px 2px rgba(255, 255, 255, 0.1) inset,
                    0 -1px 1px rgba(0, 0, 0, 0.05) inset !important;
                padding: 16px 20px !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                cursor: pointer !important;
                position: relative !important;
                overflow: hidden !important;
                display: block !important;
                text-align: center !important;
                color: #333 !important;
                font-weight: 500 !important;
                font-size: 15px !important;
                letter-spacing: 0.3px !important;
                min-height: auto !important;
                height: auto !important;
                line-height: 1.5 !important;
                opacity: 0 !important;
                transform: translateY(10px) !important;
                animation: cardEntrance 0.6s ease forwards !important;
            }
            
            /* 卡片悬浮发光效果 */
            .SideNav-item::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 100%) !important;
                opacity: 0 !important;
                transition: opacity 0.4s ease !important;
                pointer-events: none !important;
                border-radius: 16px !important;
            }
            
            /* 卡片悬停效果 */
            .SideNav-item:hover {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1)) !important;
                transform: translateY(-3px) scale(1.02) !important;
                box-shadow: 
                    0 12px 28px rgba(0, 0, 0, 0.15),
                    0 2px 4px rgba(255, 255, 255, 0.1) inset,
                    0 -1px 1px rgba(0, 0, 0, 0.05) inset !important;
                border-color: rgba(255, 255, 255, 0.3) !important;
                color: ${SIDENAV_HOVER_COLOR} !important;
            }
            
            .SideNav-item:hover::before {
                opacity: 1 !important;
            }
            
            /* 卡片点击效果 */
            .SideNav-item:active {
                transform: translateY(-1px) scale(0.99) !important;
                transition: all 0.1s ease !important;
            }
            
            /* 卡片链接样式 */
            .SideNav-item a {
                display: block !important;
                width: 100% !important;
                height: 100% !important;
                text-decoration: none !important;
                color: inherit !important;
                font-weight: inherit !important;
                position: relative !important;
                z-index: 1 !important;
                transition: color 0.3s ease !important;
            }
            
            /* 卡片动画延迟 */
            .SideNav-item:nth-child(1) { animation-delay: 0.1s !important; }
            .SideNav-item:nth-child(2) { animation-delay: 0.2s !important; }
            .SideNav-item:nth-child(3) { animation-delay: 0.3s !important; }
            .SideNav-item:nth-child(4) { animation-delay: 0.4s !important; }
            .SideNav-item:nth-child(5) { animation-delay: 0.5s !important; }
            .SideNav-item:nth-child(6) { animation-delay: 0.6s !important; }
            .SideNav-item:nth-child(7) { animation-delay: 0.7s !important; }
            .SideNav-item:nth-child(8) { animation-delay: 0.8s !important; }
            .SideNav-item:nth-child(9) { animation-delay: 0.9s !important; }
            .SideNav-item:nth-child(10) { animation-delay: 1.0s !important; }
            
            /* 动画关键帧 */
            @keyframes cardEntrance {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* 添加微妙的悬浮边框动画 */
            .SideNav-item::after {
                content: '' !important;
                position: absolute !important;
                top: -2px !important;
                left: -2px !important;
                right: -2px !important;
                bottom: -2px !important;
                background: linear-gradient(45deg, 
                    transparent 0%, 
                    ${SIDENAV_HOVER_COLOR}20 25%, 
                    transparent 50%, 
                    ${SIDENAV_HOVER_COLOR}20 75%, 
                    transparent 100%) !important;
                border-radius: 18px !important;
                z-index: 0 !important;
                opacity: 0 !important;
                transition: opacity 0.4s ease !important;
                pointer-events: none !important;
            }
            
            .SideNav-item:hover::after {
                opacity: 1 !important;
            }
            
            /* 添加图标效果（可选） */
            .SideNav-item a::before {
                content: '→' !important;
                margin-right: 8px !important;
                opacity: 0.7 !important;
                transition: all 0.3s ease !important;
                display: inline-block !important;
            }
            
            .SideNav-item:hover a::before {
                transform: translateX(3px) !important;
                opacity: 1 !important;
                color: ${SIDENAV_HOVER_COLOR} !important;
            }
        `;
        
        // 如果已经存在这个样式，先移除
        const existingStyle = document.getElementById('sidenav-beautify-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        document.head.appendChild(beautifyStyle);
        
        // 添加卡片类并应用内联样式
        setTimeout(() => {
            const sideNavItems = document.querySelectorAll('.SideNav-item');
            sideNavItems.forEach((item, index) => {
                // 添加MDUI卡片类
                item.classList.add('mdui-card', 'mdui-card-content');
                
                // 设置动画延迟
                item.style.animationDelay = `${0.1 + index * 0.1}s`;
                
                // 添加点击效果
                item.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A') return;
                    const link = this.querySelector('a');
                    if (link) {
                        link.click();
                    }
                });
                
                // 添加波纹效果
                item.addEventListener('mousedown', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        width: ${size}px;
                        height: ${size}px;
                        top: ${y}px;
                        left: ${x}px;
                        pointer-events: none;
                        z-index: 0;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // 添加波纹动画
            const rippleStyle = document.createElement('style');
            rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
            
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
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(${BLUR_INTENSITY}) !important;
            -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        }
        
        /* 分页条美化 */
        .pagination {
            margin-top: 30px !important;
            display: flex !important;
            justify-content: center !important;
            gap: 8px !important;
        }
        
        .pagination a, .pagination span, .pagination em {
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 10px !important;
            padding: 8px 16px !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
        }
        
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
            background: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-2px) !important;
        }
        
        /* 右上角按钮美化 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: all 0.3s ease !important;
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
            padding: 0 16px !important;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15) !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 8px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        /* 标题美化 */
        .blogTitle {
            color: #333 !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
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
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(${BLUR_INTENSITY}) !important;
            -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        }

        @media (min-width: 1001px) {
        .mdui-card {
            padding: 45px;
        }
        }

        @media (max-width: 1000px) {
        .mdui-card {
            padding: 25px;
        }
        }

        /* markdown内容美化 */
        .markdown-body {
            color: #333 !important;
        }
        
        .markdown-body img {
            border-radius: 12px;
            border: 2px solid rgba(163, 224, 228, 0.6);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .markdown-body img:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .markdown-alert {
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) inset;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgba(141, 150, 161, 0.2);
            padding: 2px 6px;
            border-radius: 6px;
            border: 1px solid rgba(141, 150, 161, 0.1);
        }

        video {
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* 文章标题美化 */
        .markdown-body h1, 
        .markdown-body h2, 
        .markdown-body h3, 
        .markdown-body h4 {
            color: #333 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            border-bottom: 2px solid rgba(60, 210, 205, 0.3) !important;
            padding-bottom: 8px !important;
        }

        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: all 0.3s ease !important;
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
            padding: 0 16px !important;
        }

        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15) !important;
        }

        div.title-right .btn .btndescription {
            display: none;
            margin-left: 8px;
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
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(${BLUR_INTENSITY}) !important;
            -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        }
        
        /* 搜索框美化 */
        .subnav-search {
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 2em !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease !important;
        }
        
        .subnav-search:hover {
            border-color: rgba(255, 255, 255, 0.3) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
            transform: translateY(-1px);
        }
        
        .subnav-search-input {
            background: transparent !important;
            border: none !important;
            color: #333 !important;
            font-weight: 500 !important;
        }
        
        .subnav-search-input::placeholder {
            color: rgba(51, 51, 51, 0.7) !important;
        }
        
        .subnav-search-icon {
            color: rgba(51, 51, 51, 0.8) !important;
            transition: color 0.3s ease !important;
        }
        
        .subnav-search:hover .subnav-search-icon {
            color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: all 0.3s ease !important;
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
            padding: 0 16px !important;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15) !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 8px;
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
            height: 40px;
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
        applySideNavBeautify();
        console.log('MDGmeek : SideNav美化效果已应用');
    }, 500);
    
    // 添加全局美化样式
    const globalStyle = document.createElement('style');
    globalStyle.textContent = `
        /* 全局滚动条美化 */
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
        }
        
        /* 全局链接美化 */
        a {
            transition: color 0.3s ease !important;
        }
        
        a:hover {
            color: ${SIDENAV_HOVER_COLOR} !important;
        }
        
        /* 卡片悬停通用效果 */
        .mdui-card:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;
    document.head.appendChild(globalStyle);
});
