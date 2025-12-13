// 添加高斯模糊程度变量（可调整）
const BLUR_INTENSITY = '8px'; // 高斯模糊程度，可修改这个值
const BUTTON_HOVER_COLOR = '#8A2BE2'; // 右上角按钮悬浮颜色，可修改这个值（支持 #000000, rgb(255,0,0), rgba(255,0,0,0.8) 等格式）
const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
document.addEventListener('DOMContentLoaded', function() {

    
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
        
        .SideNav {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.7);
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        
        .SideNav-item {
            transition: 0.5s;
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
        
        .SideNav {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.7);
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
    
    // 添加默认卡片样式（适用于所有页面）
    const defaultCardStyle = document.createElement("style");
    defaultCardStyle.innerHTML = `
        .mdui-card {
            transition: all 0.3s ease;
            min-height: 200px;
        }
        
        .mdui-card:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2) !important;
        }
    `;
    document.head.appendChild(defaultCardStyle);
});
