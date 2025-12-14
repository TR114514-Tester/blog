/* ================= 全局配置 ================= */

// 站点背景图片（全站统一）
const SITE_BG_IMAGE = 'https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg';

// 是否开启下雨特效：1 开启，0 关闭
const RAIN_ENABLE = 1;

/* ========================================== */

document.addEventListener('DOMContentLoaded', function() {

    // 下雨 -------------------------------------------------------------------------------------------
    if (RAIN_ENABLE === 1) {

        let rainstyle = document.createElement('style');
        rainstyle.type = 'text/css';
        rainstyle.innerHTML = `
            * {
                padding: 0;
                margin: 0;
            }
            .raincontent {
                width: 100%;
                height: 100%;
            }
            #rainBox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
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

        window.onload = function () {
            boxHeight = box.clientHeight;
            boxWidth = box.clientWidth;
        };

        window.onresize = function () {
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

    }

    // 判断 URL，添加主题 ------------------------------------------------------------------------
    let currentUrl = window.location.pathname;

    // 首页主题（包含 index.html 和 page1,page2,...）
    const isHomeTheme =
        currentUrl === "/" ||
        currentUrl.endsWith("/index.html") ||
        /\/page\d+\.html$/.test(currentUrl);

    if (isHomeTheme) {
        console.log('应用主页主题');

        // 主页主题 ------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        /* header布局*/
        .blogTitle { display: unset; }
        #header { height: 340px; }
        #header h1 { position: absolute; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; }
        .title-right { margin: unset; margin-top: 295px; margin-left: 50%; transform: translateX(-50%); }
        .avatar { width: 200px; height: 200px; }
        #header h1 a { margin-top: 30px; font-family: fantasy; margin-left: unset; }

        html { background: url('${SITE_BG_IMAGE}') no-repeat center center fixed; background-size: cover; }
        body {
            margin: 30px auto; padding: 20px; font-size: 16px; font-family: sans-serif; line-height: 1.25;
            background: rgba(255, 255, 255, 0.8); border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); overflow: auto;
        }
        .SideNav { background: rgba(255, 255, 255, 0.6); border-radius: 10px; min-width: unset; }
        .SideNav-item:hover { background-color: #c3e4e3; border-radius: 10px; transform: scale(1.02); box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); }
        .SideNav-item { transition: 0.5s; }

        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus { border-color: rebeccapurple; }

        div.title-right .btn { display: inline-flex; align-items: center; width: auto; height: 40px; margin: 0 3px; border-radius: 2em !important; transition: 0.3s; }
        div.title-right .btn:hover { width: auto; border-radius: 2em !important; background-color: #3cd2cd; }
        div.title-right .btn .btndescription { display: none; margin-left: 3px; white-space: nowrap; color: black; font-weight: bold; }
        div.title-right .btn:hover .btndescription { display: inline; }
        `;
        document.head.appendChild(style);

        // 右上角按钮描述
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
        console.log('应用文章页主题');

        let style = document.createElement("style");
        style.innerHTML = `
        html { background: url('${SITE_BG_IMAGE}') no-repeat center center fixed; background-size: cover; }
        body {
            min-width: 200px; max-width: 1100px; margin: 30px auto; font-size: 16px; font-family: sans-serif; line-height: 1.25;
            background: rgba(255, 255, 255, 0.85); border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); overflow: auto;
        }
        @media (min-width: 1001px) { body { padding: 45px; } }
        @media (max-width: 1000px) { body { padding: 20px; } }

        .markdown-body img { border-radius: 10px; border: 2px solid #a3e0e4; }
        .markdown-alert { border-radius: 10px; }
        .markdown-body .highlight pre, .markdown-body pre { background: rgba(255, 255, 255, 0.85); border-radius: 10px; }
        .markdown-body code, .markdown-body tt { background-color: rgb(141 150 161 / 20%); }
        video { border-radius: 10px; }

        div.title-right .btn { display: inline-flex; align-items: center; width: auto; height: 40px; margin: 0 3px; border-radius: 2em !important; transition: 0.3s; }
        div.title-right .btn:hover { width: auto; border-radius: 2em !important; background-color: #3cd2cd; }
        div.title-right .btn .btndescription { display: none; margin-left: 3px; white-space: nowrap; color: black; font-weight: bold; }
        div.title-right .btn:hover .btndescription { display: inline; }
        `;
        document.head.appendChild(style);

        // 右上角按钮描述
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
        console.log('应用搜索页主题');

        let style = document.createElement("style");
        style.innerHTML = `
        .title-right { align-items: flex-end; }
        @media (max-width: 600px) { .tagTitle { display: unset; font-size: 14px; white-space: unset; } }

        html { background: url('${SITE_BG_IMAGE}') no-repeat center center fixed; background-size: cover; }
        body {
            margin: 30px auto; padding: 20px; font-size: 16px; font-family: sans-serif; line-height: 1.25;
            background: rgba(255, 255, 255, 0.8); border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); overflow: auto;
        }
        .SideNav { background: rgba(255, 255, 255, 0.6); border-radius: 10px; min-width: unset; }
        .SideNav-item:hover { background-color: #c3e4e3; border-radius: 10px; transform: scale(1.02); box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); }
        .SideNav-item { transition: 0.5s; }

        div.title-right .btn { display: inline-flex; align-items: center; width: auto; height: 40px; margin: 0 3px; border-radius: 2em !important; transition: 0.3s; }
        div.title-right .btn:hover { width: auto; border-radius: 2em !important; background-color: #3cd2cd; }
        div.title-right .btn .btndescription { display: none; margin-left: 3px; white-space: nowrap; color: black; font-weight: bold; }
        div.title-right .btn:hover .btndescription { display: inline; }

        .subnav-search-input { border-radius: 2em; float: unset !important; }
        .subnav-search-icon { top: 9px; }
        button.btn.float-left { display: none; }
        .subnav-search { width: unset; height: 36px; }
        `;
        document.head.appendChild(style);

        // 右上角按钮描述
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

        // 回车触发搜索
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

    } else {
        console.log('未应用主题');
    }

});
