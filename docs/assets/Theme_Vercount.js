// ================= 配置区域 =================
const BLUR_INTENSITY = '8px'; // 高斯模糊
const BUTTON_HOVER_COLOR = '#8A2BE2'; // 按钮悬浮色
const BACKGROUND = "https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg"; // 背景图
const ENABLE_RAIN_EFFECT = true; // 下雨开关
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------------------------------------------
    // 第一步：加载 MDUI 基础样式
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
    // 第二步：页面结构重构 (将 body 内容移入卡片)
    // ------------------------------------------------------------------
    const cardContainer = document.createElement('div');
    cardContainer.className = 'mdui-card mdui-card-content';
    // 设置 z-index 为 10，确保内容在雨水上面
    cardContainer.style.cssText = `
        backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        background: rgba(255, 255, 255, 0.15) !important;
        position: relative;
        z-index: 10; 
    `;
    
    // 使用 DocumentFragment 安全移动节点，保留事件绑定
    const fragment = document.createDocumentFragment();
    while (document.body.firstChild) {
        fragment.appendChild(document.body.firstChild);
    }
    cardContainer.appendChild(fragment);
    document.body.appendChild(cardContainer);
    
    // ------------------------------------------------------------------
    // 第三步：插入 Vercount 统计元素 (确保 DOM 稳定后执行)
    // ------------------------------------------------------------------
    // 1. 查找文章页的阅读量容器
    var postBody = document.getElementById('postBody');
    if (postBody && !document.getElementById('busuanzi_container_page_pv')) {
        postBody.insertAdjacentHTML('afterend',
            '<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;color: #555;">' +
            '❤️ 本文浏览量 <span id="busuanzi_value_page_pv"></span> 次' +
            '</div>'
        );
    }

    // 2. 查找页脚的总访问量容器 (runday)
    var runday = document.getElementById('runday');
    if (runday && !document.getElementById('busuanzi_container_site_pv')) {
        // 这里添加了 font-weight 和 color 确保文字清晰
        runday.insertAdjacentHTML('afterend', 
            '<span id="busuanzi_container_site_pv" style="display:none; margin-left: 8px; font-weight: bold;">' +
            '❤️ 总浏览量 <span id="busuanzi_value_site_pv"></span> 次 • ' +
            '</span>'
        );
    }

    // 3. 动态加载 Vercount 脚本 (最后一步，确保元素已存在)
    var vercountScript = document.createElement('script');
    vercountScript.src = 'https://vercount.one/js';
    // 关键：脚本加载成功后，控制台输出信息
    vercountScript.onload = function() {
        console.log('MDGmeek: Vercount script loaded successfully.');
    };
    vercountScript.onerror = function() {
        console.error('MDGmeek: Vercount script failed to load. Check your network.');
    };
    document.head.appendChild(vercountScript);
    console.log("\n %c GmeekVercount Plugins Integrated \n","padding:5px 0;background:#bc4c00;color:#fff");

    // ------------------------------------------------------------------
    // 第四步：下雨特效 (作为背景层)
    // ------------------------------------------------------------------
    if (ENABLE_RAIN_EFFECT) {
        let rainstyle = document.createElement('style');
        rainstyle.innerHTML = `
            .raincontent {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                pointer-events: none; z-index: 1; overflow: hidden;
            }
            .rain {
                position: absolute; width: 2px; height: 50px;
                background: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.6));
                border-radius: 1px;
            }
        `;
        document.head.appendChild(rainstyle);
        
        let raincontent = document.createElement('div');
        raincontent.className = 'raincontent'; // 这个容器 z-index 是 1
        let rainBox = document.createElement('div');
        rainBox.id = 'rainBox';
        rainBox.style.cssText = "position: absolute; width: 100%; height: 100%;";
        raincontent.appendChild(rainBox);
        
        // 插入到 body 最前面，这样它就在卡片(z-index: 10)的下面
        document.body.insertBefore(raincontent, document.body.firstChild);
        
        // 下雨核心逻辑
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
                rain.style.height = (30 + Math.random() * 40) + 'px';
                box.appendChild(rain);
                activeRaindrops.push({ element: rain, position: -50, speed: 2 + Math.random() * 3 });
            }
            
            function update() {
                requestAnimationFrame(update);
                for (let i = activeRaindrops.length - 1; i >= 0; i--) {
                    let r = activeRaindrops[i];
                    r.position += r.speed; r.speed += 0.05;
                    r.element.style.top = r.position + 'px';
                    if (r.position > boxHeight) {
                        if(r.element.parentNode) r.element.parentNode.removeChild(r.element);
                        activeRaindrops.splice(i, 1);
                    }
                }
            }
            
            setInterval(() => { if (!document.hidden && activeRaindrops.length < 150) createRaindrop(); }, 50);
            update();
            
            window.addEventListener('resize', () => { boxHeight = window.innerHeight; boxWidth = window.innerWidth; });
        }
        setTimeout(initRainEffect, 500);
    }

    // ------------------------------------------------------------------
    // 第五步：SideNav 美化与样式注入
    // ------------------------------------------------------------------
    function beautifySideNavItems() {
        const sideNavItems = document.querySelectorAll('.SideNav-item');
        sideNavItems.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'mdui-card mdui-hoverable mdui-ripple side-nav-card';
            wrapper.style.cssText = 'margin-bottom: 10px; border-radius: 12px; overflow: hidden;';
            const content = document.createElement('div');
            content.className = 'mdui-card-primary';
            content.style.padding = '16px';
            content.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.75))';
            
            const link = item.querySelector('a');
            if (link) {
                const newLink = link.cloneNode(true);
                newLink.style.cssText = 'display:block; color:#333; text-decoration:none; font-weight:500;';
                newLink.innerHTML += `<i class="mdui-icon material-icons" style="float:right; color:${BUTTON_HOVER_COLOR};">chevron_right</i>`;
                content.appendChild(newLink);
            } else { content.innerHTML = item.innerHTML; }
            
            wrapper.appendChild(content);
            item.parentNode.replaceChild(wrapper, item);
        });
    }

    let css = `
        .side-nav-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(138,43,226,0.2) !important; }
        .SideNav { background: transparent !important; border: none !important; padding: 10px 0; }
        html { background: url('${BACKGROUND}') no-repeat center center fixed; background-size: cover; height: 100%; }
        body { background: transparent !important; font-family: 'Roboto', sans-serif; }
        .mdui-card { border-radius: 16px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important; transition: 0.3s; }
        .btndescription { display: none; margin-left: 3px; font-weight: bold; color: black; }
        div.title-right .btn:hover .btndescription { display: inline; }
        div.title-right .btn { border-radius: 2em !important; height: 40px; display: inline-flex; align-items: center; }
        div.title-right .btn:hover { background-color: ${BUTTON_HOVER_COLOR}cc !important; }
        /* 针对文章页和主页的不同内边距 */
        .post-card-padding { padding: 45px; } 
        @media (max-width: 1000px) { .post-card-padding { padding: 20px; } }
    `;
    
    // 主题判断逻辑
    let path = window.location.pathname;
    if (path.includes('/post/') || path.includes('/link') || path.includes('/about')) {
        css += ` body { max-width: 1100px; margin: 30px auto; } .mdui-card-content { padding: 45px; } @media(max-width:1000px){.mdui-card-content{padding:20px;}}`;
    } else {
        css += ` body { margin: 30px auto; } .mdui-card-content { padding: 20px; }`;
        // Header 样式
        css += ` #header { height: 340px; } #header h1 { position: absolute; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; } .title-right { margin-top: 295px; margin-left: 50%; transform: translateX(-50%); } .avatar { width: 200px; height: 200px; }`;
    }

    let styleEl = document.createElement('style');
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    // 按钮提示
    document.querySelectorAll(".title-right a.btn").forEach(b => {
        if(b.title) { 
            let span = document.createElement('span'); 
            span.className='btndescription'; span.textContent=b.title; b.appendChild(span); 
        }
    });

    // 延迟执行字体加载和SideNav美化
    setTimeout(() => {
        beautifySideNavItems();
        let font = document.createElement('link');
        font.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
        font.rel = 'stylesheet';
        document.head.appendChild(font);
    }, 500);
});
