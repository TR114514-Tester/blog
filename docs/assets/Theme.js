document.addEventListener('DOMContentLoaded', function () {

    // 定义背景图 URL 变量，这里你可以修改它
    const backgroundUrl = 'https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg'; // 在这里修改背景图的 URL

    // 下雨效果 --------------------------------------------------------------------------------
    let rainstyle = document.createElement('style');
    rainstyle.type = 'text/css';
    rainstyle.innerHTML = `
        * { padding: 0; margin: 0; }
        .raincontent { width: 100%; height: 100%; }
        #rainBox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
        }
        .rain {
            position: absolute;
            width: 2px;
            height: 50px;
            background: linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,.6));
        }
    `;
    document.head.appendChild(rainstyle);

    let raincontent = document.createElement('div');
    raincontent.classList.add('raincontent');
    let rainBox = document.createElement('div');
    rainBox.id = 'rainBox';
    raincontent.appendChild(rainBox);
    document.body.appendChild(raincontent);

    let box = document.getElementById('rainBox');
    let boxHeight = box.clientHeight;
    let boxWidth = box.clientWidth;

    window.onresize = window.onload = function () {
        boxHeight = box.clientHeight;
        boxWidth = box.clientWidth;
    };

    setInterval(() => {
        let rain = document.createElement('div');
        rain.classList.add('rain');
        rain.style.top = '0px';
        rain.style.left = Math.random() * boxWidth + 'px';
        rain.style.opacity = Math.random();
        box.appendChild(rain);

        let race = 1;
        let timer = setInterval(() => {
            if (parseInt(rain.style.top) > boxHeight) {
                clearInterval(timer);
                box.removeChild(rain);
            }
            race++;
            rain.style.top = parseInt(rain.style.top) + race + 'px';
        }, 20);
    }, 50);

    // 当前 URL --------------------------------------------------------------------------------
    let currentUrl = window.location.pathname;

    // ======================= 主页 / 搜索页 / 通用 =======================
    if (currentUrl.includes('/index.html') || currentUrl === "/" || currentUrl.includes('/tag.html') || currentUrl.match(/page\d+\.html/)) {

        let style = document.createElement("style");
        style.innerHTML = `
        html {
            background: url('${backgroundUrl}') no-repeat center center fixed;
            background-size: cover;
        }

        /* ====== 毛玻璃主体（推荐） ====== */
        body {
            margin: 30px auto;
            padding: 20px;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;

            background: rgba(255, 255, 255, 0.55);
            backdrop-filter: blur(16px) saturate(1.2);
            -webkit-backdrop-filter: blur(16px) saturate(1.2);

            border-radius: 14px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
            overflow: auto;
            position: relative;
            z-index: 1;
        }

        /* ====== 侧边栏毛玻璃 ====== */
        .SideNav {
            background: rgba(255,255,255,0.45);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 12px;
        }

        .SideNav-item {
            transition: 0.4s;
        }

        .SideNav-item:hover {
            background: rgba(255,255,255,0.6);
            border-radius: 10px;
            transform: scale(1.03);
        }

        /* ====== 右上角毛玻璃按钮 ====== */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            height: 40px;
            margin: 0 6px;
            padding: 0 14px;

            background: rgba(255,255,255,0.35);
            backdrop-filter: blur(12px) saturate(1.2);
            -webkit-backdrop-filter: blur(12px) saturate(1.2);

            border-radius: 2em !important;
            border: 1px solid rgba(255,255,255,0.4);

            transition: all 0.3s ease;
        }

        div.title-right .btn:hover {
            background: rgba(255,255,255,0.6);
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        }

        div.title-right .btn .btndescription {
            display: none;
            margin-left: 6px;
            white-space: nowrap;
            font-weight: bold;
            color: #000;
        }

        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        `;
        document.head.appendChild(style);

        // 右上角按钮描述
        document.querySelectorAll(".title-right a.btn").forEach(button => {
            let title = button.getAttribute('title');
            if (title) {
                let span = document.createElement('span');
                span.className = 'btndescription';
                span.textContent = title;
                button.appendChild(span);
            }
        });
    }

    // ======================= 文章页 =======================
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {

        let style = document.createElement("style");
        style.innerHTML = `
        html {
            background: url('${backgroundUrl}') no-repeat center center fixed;
            background-size: cover;
        }

        body {
            max-width: 1100px;
            margin: 30px auto;
            padding: 45px;
            font-size: 16px;
            font-family: sans-serif;

            background: rgba(255,255,255,0.6);
            backdrop-filter: blur(18px) saturate(1.2);
            -webkit-backdrop-filter: blur(18px) saturate(1.2);

            border-radius: 16px;
            box-shadow: 0 10px 36px rgba(0,0,0,0.35);
        }

        .markdown-body pre,
        .markdown-body .highlight pre {
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(8px);
            border-radius: 12px;
        }

        /* 右上角毛玻璃按钮 */
        div.title-right .btn {
            background: rgba(255,255,255,0.35);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 2em;
        }
        `;
        document.head.appendChild(style);
    }

});
