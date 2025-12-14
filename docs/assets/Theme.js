document.addEventListener('DOMContentLoaded', function () {

    /* ====================== 可配置区域 ====================== */

    // 👉 修改这里即可更换全站背景
    const BACKGROUND_URL = 'https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg';

    /* ====================== 基础修复（防抖动） ====================== */

    const baseStyle = document.createElement('style');
    baseStyle.innerHTML = `
        html, body {
            height: 100%;
            overflow: hidden;
        }

        body {
            margin: 0;
            display: flex;
            justify-content: center;
            background: none;
        }
    `;
    document.head.appendChild(baseStyle);

    /* ====================== 下雨效果 ====================== */

    const rainStyle = document.createElement('style');
    rainStyle.innerHTML = `
        #rainBox {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .rain {
            position: absolute;
            width: 2px;
            height: 50px;
            background: linear-gradient(
                rgba(255,255,255,.3),
                rgba(255,255,255,.6)
            );
        }
    `;
    document.head.appendChild(rainStyle);

    const rainBox = document.createElement('div');
    rainBox.id = 'rainBox';
    document.body.appendChild(rainBox);

    let boxWidth = window.innerWidth;
    let boxHeight = window.innerHeight;

    window.addEventListener('resize', () => {
        boxWidth = window.innerWidth;
        boxHeight = window.innerHeight;
    });

    setInterval(() => {
        const rain = document.createElement('div');
        rain.className = 'rain';
        rain.style.left = Math.random() * boxWidth + 'px';
        rain.style.top = '0px';
        rain.style.opacity = Math.random();
        rainBox.appendChild(rain);

        let speed = 1;
        const timer = setInterval(() => {
            speed++;
            rain.style.top = parseInt(rain.style.top) + speed + 'px';
            if (parseInt(rain.style.top) > boxHeight) {
                clearInterval(timer);
                rain.remove();
            }
        }, 20);
    }, 50);

    /* ====================== 页面判断 ====================== */

    const path = window.location.pathname;

    const isHomeTheme =
        path === '/' ||
        path.includes('/index.html') ||
        path.includes('/tag.html') ||
        /page\d+\.html$/.test(path);

    const isPostTheme =
        path.includes('/post/') ||
        path.includes('/about.html') ||
        path.includes('/link.html');

    /* ====================== 主页主题（毛玻璃） ====================== */

    if (isHomeTheme) {

        const style = document.createElement('style');
        style.innerHTML = `
        html {
            background: url('${BACKGROUND_URL}') no-repeat center center fixed;
            background-size: cover;
        }

        /* 主内容滚动容器 */
        body > *:not(#rainBox) {
            margin: 30px auto;
            padding: 20px;
            max-width: 1100px;

            height: calc(100vh - 60px);
            overflow-y: auto;

            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(16px) saturate(1.2);
            -webkit-backdrop-filter: blur(16px) saturate(1.2);

            border-radius: 14px;
            box-shadow: 0 8px 32px rgba(0,0,0,.35);
            position: relative;
            z-index: 1;
        }

        /* 侧边栏 */
        .SideNav {
            background: rgba(255,255,255,.45);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 12px;
        }

        .SideNav-item {
            transition: .4s;
        }

        .SideNav-item:hover {
            background: rgba(255,255,255,.6);
            transform: scale(1.03);
            border-radius: 10px;
        }

        /* 右上角毛玻璃按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            height: 40px;
            padding: 0 14px;
            margin: 0 6px;

            background: rgba(255,255,255,.35);
            backdrop-filter: blur(12px) saturate(1.2);
            -webkit-backdrop-filter: blur(12px) saturate(1.2);

            border-radius: 2em !important;
            border: 1px solid rgba(255,255,255,.4);
            transition: .3s;
        }

        div.title-right .btn:hover {
            background: rgba(255,255,255,.6);
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(0,0,0,.25);
        }

        .btndescription {
            display: none;
            margin-left: 6px;
            font-weight: bold;
        }

        .btn:hover .btndescription {
            display: inline;
        }
        `;
        document.head.appendChild(style);

        // 按钮描述
        document.querySelectorAll('.title-right a.btn').forEach(btn => {
            const title = btn.getAttribute('title');
            if (title) {
                const span = document.createElement('span');
                span.className = 'btndescription';
                span.textContent = title;
                btn.appendChild(span);
            }
        });
    }

    /* ====================== 文章页主题 ====================== */

    if (isPostTheme) {

        const style = document.createElement('style');
        style.innerHTML = `
        html {
            background: url('${BACKGROUND_URL}') no-repeat center center fixed;
            background-size: cover;
        }

        body > *:not(#rainBox) {
            margin: 30px auto;
            padding: 45px;
            max-width: 1100px;

            height: calc(100vh - 60px);
            overflow-y: auto;

            background: rgba(255,255,255,.6);
            backdrop-filter: blur(18px) saturate(1.2);
            -webkit-backdrop-filter: blur(18px) saturate(1.2);

            border-radius: 16px;
            box-shadow: 0 10px 36px rgba(0,0,0,.35);
        }
        `;
        document.head.appendChild(style);
    }

});
