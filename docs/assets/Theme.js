document.addEventListener('DOMContentLoaded', () => {

    /* ====================== 配置区 ====================== */

    const CONFIG = {
        backgroundUrl: 'https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg',
        maxWidth: '1100px',
        padding: '24px'
    };

    /* ====================== 基础结构（Reborn 核心） ====================== */

    // 1️⃣ 锁定 viewport，永远只允许一个滚动容器
    const baseStyle = document.createElement('style');
    baseStyle.innerHTML = `
        html, body {
            height: 100%;
            margin: 0;
            overflow: hidden;
        }

        body {
            background: none;
            font-family: system-ui, -apple-system, BlinkMacSystemFont;
        }

        /* 真实滚动容器 */
        #app {
            height: 100%;
            overflow-y: auto;
            padding: 30px 0;
            position: relative;
            z-index: 1;
        }
    `;
    document.head.appendChild(baseStyle);

    // 2️⃣ 创建统一应用容器（Reborn 的关键）
    const app = document.createElement('div');
    app.id = 'app';

    // 把 body 里除 rainBox 以外的内容全部搬进 app
    Array.from(document.body.children).forEach(el => {
        if (el.id !== 'rainBox') app.appendChild(el);
    });
    document.body.appendChild(app);

    /* ====================== 背景 ====================== */

    const bgStyle = document.createElement('style');
    bgStyle.innerHTML = `
        html {
            background: url('${CONFIG.backgroundUrl}') no-repeat center center fixed;
            background-size: cover;
        }
    `;
    document.head.appendChild(bgStyle);

    /* ====================== 主体毛玻璃 ====================== */

    const glassStyle = document.createElement('style');
    glassStyle.innerHTML = `
        #app > * {
            max-width: ${CONFIG.maxWidth};
            margin: 0 auto;
            padding: ${CONFIG.padding};

            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(16px) saturate(1.2);
            -webkit-backdrop-filter: blur(16px) saturate(1.2);

            border-radius: 16px;
            box-shadow: 0 10px 36px rgba(0,0,0,.35);
        }
    `;
    document.head.appendChild(glassStyle);

    /* ====================== 下雨效果（稳定版） ====================== */

    const rainStyle = document.createElement('style');
    rainStyle.innerHTML = `
        #rainBox {
            position: fixed;
            inset: 0;
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

    let w = window.innerWidth;
    let h = window.innerHeight;

    window.addEventListener('resize', () => {
        w = window.innerWidth;
        h = window.innerHeight;
    });

    setInterval(() => {
        const drop = document.createElement('div');
        drop.className = 'rain';
        drop.style.left = Math.random() * w + 'px';
        drop.style.top = '0';
        drop.style.opacity = Math.random();
        rainBox.appendChild(drop);

        let speed = 1;
        const t = setInterval(() => {
            speed++;
            drop.style.top = parseInt(drop.style.top) + speed + 'px';
            if (parseInt(drop.style.top) > h) {
                clearInterval(t);
                drop.remove();
            }
        }, 20);
    }, 60);

    /* ====================== 右上角按钮（Reborn） ====================== */

    const btnStyle = document.createElement('style');
    btnStyle.innerHTML = `
        .title-right .btn {
            background: rgba(255,255,255,.35);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 2em;
            padding: 0 14px;
            transition: .3s;
        }

        .title-right .btn:hover {
            background: rgba(255,255,255,.6);
            box-shadow: 0 6px 18px rgba(0,0,0,.25);
        }
    `;
    document.head.appendChild(btnStyle);

    console.log(
        '%c Theme · Reborn Edition ',
        'padding:6px 12px;background:#111;color:#0f0;border-radius:6px'
    );
});
