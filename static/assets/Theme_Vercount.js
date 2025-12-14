// ================= 配置区域 =================
const BLUR_INTENSITY = '8px'; // 高斯模糊程度
const BUTTON_HOVER_COLOR = '#8A2BE2'; // 右上角按钮悬浮颜色
const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png"; // 背景图片
const ENABLE_RAIN_EFFECT = true; // 是否启用下雨效果

document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------------------------------------------
    // 1. 加载 MDUI 基础资源
    // ------------------------------------------------------------------
    const mduiCSS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css';
    const mduiJS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js';
    
    if (!document.querySelector(`link[href="${mduiCSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet'; link.href = mduiCSS;
        document.head.appendChild(link);
    }
    
    if (!document.querySelector(`script[src="${mduiJS}"]`)) {
        const script = document.createElement('script');
        script.src = mduiJS;
        document.head.appendChild(script);
    }
    
    // ------------------------------------------------------------------
    // 2. 页面结构重构 (关键修复：使用节点移动代替innerHTML重写)
    // ------------------------------------------------------------------
    const cardContainer = document.createElement('div');
    cardContainer.className = 'mdui-card mdui-card-content';
    // 设置 z-index 确保内容在雨水上方
    cardContainer.style.cssText = `
        backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        background: rgba(255, 255, 255, 0.15) !important;
        position: relative;
        z-index: 10; 
    `;
    
    // 创建文档片段，将 body 原有的子元素搬运进去
    // 这样做可以保留原有元素的事件绑定和引用，确保 Vercount 能找到它们
    const fragment = document.createDocumentFragment();
    while (document.body.firstChild) {
        fragment.appendChild(document.body.firstChild);
    }
    
    // 将内容放入卡片，再将卡片放入 body
    cardContainer.appendChild(fragment);
    document.body.appendChild(cardContainer);
    
    // ------------------------------------------------------------------
    // 3. 插入 Vercount 统计插件 (在页面结构稳定后执行)
    // ------------------------------------------------------------------
    function createVercount() {
        // 文章页：插入阅读量
        var postBody = document.getElementById('postBody');
        if (postBody) {
            // 避免重复插入
            if (!document.getElementById('busuanzi_container_page_pv')) {
                postBody.insertAdjacentHTML('afterend',
                    '<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;">' +
                    '❤️ 本文浏览量 ❤️<span id="busuanzi_value_page_pv"></span>次' +
                    '</div>'
                );
            }
        }
        
        // 全站：插入页脚总访问量
        var runday = document.getElementById('runday');
        if (runday) {
            if (!document.getElementById('busuanzi_container_site_pv')) {
                runday.insertAdjacentHTML('afterend', 
                    '<span id="busuanzi_container_site_pv" style="display:none; margin-left: 5px;">' +
                    '❤️ 总浏览量 ❤️<span id="busuanzi_value_site_pv"></span>次 • ' +
                    '</span>'
                );
            }
        }
    }

    // 执行插入逻辑
    createVercount();

    // 加载 Vercount 核心脚本
    var vercountScript = document.createElement('script');
    vercountScript.src = 'https://vercount.one/js';
    document.head.appendChild(vercountScript);
    console.log("\n %c GmeekVercount Plugins https://github.com/Meekdai/Gmeek \n","padding:5px 0;background:#bc4c00;color:#fff");
    
    // ------------------------------------------------------------------
    // 4. 下雨特效逻辑
    // ------------------------------------------------------------------
    if (ENABLE_RAIN_EFFECT) {
        console.log('MDGmeek : 启用下雨效果');
        
        let rainstyle = document.createElement('style');
        rainstyle.type = 'text/css';
        rainstyle.innerHTML = `
            .raincontent {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 1; /* 雨水在底层 */
                overflow: hidden;
            }
            #rainBox {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .rain {
                position: absolute;
                width: 2px;
                height: 50px;
                background: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.6));
                border-radius: 1px;
            }
        `;
        document.head.appendChild(rainstyle);
        
        let raincontent = document.createElement('div');
        raincontent.classList.add('raincontent');
        let rainBox = document.createElement('div');
        rainBox.id = 'rainBox';
        raincontent.appendChild(rainBox);
        
        // 将下雨容器插入到body的最前面（作为背景）
        document.body.insertBefore(raincontent, document.body.firstChild);
        
        function initRainEffect() {
            let box = document.getElementById('rainBox');
            let boxHeight = window.innerHeight;
            let boxWidth = window.innerWidth;
            let activeRaindrops = [];
            
            function createRaindrop() {
                let rain = document.createElement('div');
                rain.classList.add('rain');
                rain.style.top = '-50px';
                rain.style.left = Math.random() * boxWidth + 'px';
                rain.style.opacity = 0.3 + Math.random() * 0.5;
                let rainHeight = 30 + Math.random() * 40;
                rain.style.height = rainHeight + 'px';
                let rainWidth = 1 + Math.random();
                rain.style.width = rainWidth + 'px';
                let colorValue = 150 + Math.random() * 100;
                rain.style.background = `linear-gradient(rgba(${colorValue}, ${colorValue}, 255, .3), rgba(255, 255, 255, .6))`;
                box.appendChild(rain);
                
                const raindropData = {
                    element: rain,
                    position: -50,
                    speed: 2 + Math.random() * 3,
                    acceleration: 0.05
                };
                activeRaindrops.push(raindropData);
            }
            
            function updateRaindrops() {
                requestAnimationFrame(updateRaindrops);
                for (let i = activeRaindrops.length - 1; i >= 0; i--) {
                    const raindrop = activeRaindrops[i];
                    raindrop.position += raindrop.speed;
                    raindrop.speed += raindrop.acceleration;
                    raindrop.element.style.top = raindrop.position + 'px';
                    
                    if (raindrop.position > boxHeight) {
                        if (raindrop.element.parentNode === box) {
                            box.removeChild(raindrop.element);
                        }
                        activeRaindrops.splice(i, 1);
                    }
                }
            }
            
            // 启动循环
            setInterval(() => {
                if (!document.hidden && activeRaindrops.length < 200) {
                   createRaindrop();
                }
            }, 50);
            
            updateRaindrops();
            
            window.addEventListener('resize', function() {
                boxHeight = window.innerHeight;
                boxWidth = window.innerWidth;
            });
        }
        
        window.addEventListener('load', function() {
            setTimeout(initRainEffect, 500);
        });
    }

    // ------------------------------------------------------------------
    // 5. 侧边栏美化 (保持原有逻辑)
    // ------------------------------------------------------------------
    function beautifySideNavItems() {
        const sideNavItems = document.querySelectorAll('.SideNav-item');
        sideNavItems.forEach(item => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'mdui-card mdui-hoverable mdui-ripple side-nav-card';
            cardWrapper.style.cssText = `margin-bottom: 10px; border-radius: 12px; overflow: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);`;
            
            const cardContent = document.createElement('div');
            cardContent.className = 'mdui-card-primary';
            cardContent.style.cssText = `padding: 16px; background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 100%);`;
            
            const link = item.querySelector('a');
            if (link) {
                const linkClone = link.cloneNode(true);
                linkClone.style.cssText = `display: block; color: #333; text-decoration: none; font-weight: 500; font-size: 16px; transition: color 0.3s ease;`;
                const icon = document.createElement('i');
                icon.className = 'mdui-icon material-icons';
                icon.style.cssText = `float: right; color: ${BUTTON_HOVER_COLOR}; opacity: 0.7; font-size: 20px;`;
                icon.textContent = 'chevron_right';
                linkClone.appendChild(icon);
                cardContent.appendChild(linkClone);
            } else {
                cardContent.innerHTML = item.innerHTML;
            }
            cardWrapper.appendChild(cardContent);
            item.parentNode.replaceChild(cardWrapper, item);
        });
    }
    
    // ------------------------------------------------------------------
    // 6. 主题样式应用 (原有逻辑)
    // ------------------------------------------------------------------
    const sideNavStyle = document.createElement('style');
    sideNavStyle.innerHTML = `
        .side-nav-card { border: 1px solid rgba(255, 255, 255, 0.5) !important; backdrop-filter: blur(5px); }
        .side-nav-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(138, 43, 226, 0.2) !important; }
        .side-nav-card .mdui-card-primary a:hover { color: ${BUTTON_HOVER_COLOR} !important; }
        .SideNav { background: transparent !important; border: none !important; padding: 10px 0; }
    `;
    document.head.appendChild(sideNavStyle);
    
    let currentUrl = window.location.pathname;
    const isHomePage = currentUrl.includes('/index.html') || currentUrl === "/";
    const isPageWithNumber = /\/page\d+\.html$/i.test(currentUrl);

    if (isHomePage || isPageWithNumber) {
        console.log('MDGmeek : 应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        html { background: url('${BACKGROUND}') no-repeat center center fixed; background-size: cover; height: 100%; }
        body { margin: 30px auto; padding: 0; font-family: sans-serif; background: transparent !important; }
        .mdui-card { margin: 0 auto; padding: 20px; border-radius: 16px !important; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.3) !important; }
        .blogTitle { display: unset; }
        #header { height: 340px; }
        #header h1 { position: absolute; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; }
        .title-right { margin: unset; margin-top: 295px; margin-left: 50%; transform: translateX(-50%); }
        .avatar { width: 200px; height: 200px; }
        div.title-right .btn { display: inline-flex; align-items: center; height: 40px; border-radius: 2em !important; transition: 0.3s; }
        div.title-right .btn:hover { background-color: ${BUTTON_HOVER_COLOR}cc !important; }
        div.title-right .btn .btndescription { display: none; margin-left: 3px; font-weight: bold; color: black;}
        div.title-right .btn:hover .btndescription { display: inline; }
        `;
        document.head.appendChild(style);
        
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        topright_buttons.forEach(button => {
            if (button.title) {
                var span = document.createElement('span');
                span.className = 'btndescription'; span.textContent = button.title; button.appendChild(span);
            }
        });

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        html { background: url('${BACKGROUND}') no-repeat center center fixed; background-size: cover; height: 100%; }
        body { max-width: 1100px; margin: 30px auto; background: transparent !important; padding: 0 !important; }
        .mdui-card { width: 100%; border-radius: 16px !important; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.3) !important; }
        @media (min-width: 1001px) { .mdui-card { padding: 45px; } }
        @media (max-width: 1000px) { .mdui-card { padding: 20px; } }
        .markdown-body img { border-radius: 10px; border: 2px solid #a3e0e4; }
        .markdown-body pre { background: rgba(255, 255, 255, 0.85); border-radius: 10px; }
        div.title-right .btn { display: inline-flex; align-items: center; height: 40px; border-radius: 2em !important; }
        div.title-right .btn:hover { background-color: ${BUTTON_HOVER_COLOR}cc !important; }
        div.title-right .btn .btndescription { display: none; margin-left: 3px; font-weight: bold; color: black; }
        div.title-right .btn:hover .btndescription { display: inline; }
        `;
        document.head.appendChild(style);
        
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        topright_buttons.forEach(button => {
            if (button.title) {
                var span = document.createElement('span');
                span.className = 'btndescription'; span.textContent = button.title; button.appendChild(span);
            }
        });
        
    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        .title-right { align-items: flex-end; }
        @media (max-width: 600px) { .tagTitle { display: unset; font-size: 14px; white-space: unset; } }
        html { background: url('${BACKGROUND}') no-repeat center center fixed; background-size: cover; height: 100%; }
        body { margin: 30px auto; padding: 0; background: transparent !important; }
        .mdui-card { margin: 0 auto; padding: 20px; border-radius: 16px !important; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.3) !important; }
        div.title-right .btn { display: inline-flex; align-items: center; height: 40px; border-radius: 2em !important; }
        div.title-right .btn:hover { background-color: ${BUTTON_HOVER_COLOR}cc !important; }
        div.title-right .btn .btndescription { display: none; margin-left: 3px; font-weight: bold; color: black; }
        div.title-right .btn:hover .btndescription { display: inline; }
        .subnav-search-input { border-radius: 2em; float: unset !important; }
        .subnav-search-icon { top: 9px; }
        button.btn.float-left { display: none; }
        .subnav-search { width: unset; height: 36px; }
        `;
        document.head.appendChild(style);
        
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        topright_buttons.forEach(button => {
            if (button.title) {
                var span = document.createElement('span');
                span.className = 'btndescription'; span.textContent = button.title; button.appendChild(span);
            }
        });
        
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        if (input && button) {
            input.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) button.click();
            });
        }
    }

    // ------------------------------------------------------------------
    // 7. 字体与模糊效果 (notranslate)
    // ------------------------------------------------------------------
    const notranslateStyle = document.createElement("style");
    notranslateStyle.innerHTML = `
        .notranslate { font-family: 'Roboto', sans-serif !important; backdrop-filter: blur(${BLUR_INTENSITY}) !important; background: rgba(255, 255, 255, 0.15) !important; border-radius: 8px; padding: 10px; margin: 10px 0; }
        .notranslate h1, .notranslate h2, .notranslate h3 { font-family: 'Roboto', sans-serif !important; }
        .notranslate code, .notranslate pre { font-family: 'Roboto Mono', monospace !important; backdrop-filter: blur(4px) !important; background: rgba(255, 255, 255, 0.2) !important; }
        .notranslate blockquote { font-style: italic; background: rgba(255, 255, 255, 0.1) !important; border-left: 4px solid rgba(138, 43, 226, 0.5); }
    `;
    document.head.appendChild(notranslateStyle);
    
    // 添加默认卡片样式
    const defaultCardStyle = document.createElement("style");
    defaultCardStyle.innerHTML = `.mdui-card { transition: all 0.3s ease; min-height: 200px; } .mdui-card:hover { box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2) !important; }`;
    document.head.appendChild(defaultCardStyle);
    
    // 加载字体与执行美化
    const loadRobotoFont = () => {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono&display=swap';
        fontLink.rel = 'stylesheet';
        if (document.querySelectorAll('link[href*="fonts.googleapis.com/css2?family=Roboto"]').length === 0) {
            document.head.appendChild(fontLink);
        }
    };
    
    setTimeout(() => {
        loadRobotoFont();
        beautifySideNavItems();
    }, 500);
});
