// rain.js - 自动创建Canvas的下雨效果
// 只需在HTML中引入此JS文件，无需任何额外代码

(function() {
    'use strict';
    
    // 创建Canvas元素并添加到页面
    function createCanvas() {
        // 检查是否已存在Canvas
        if (document.getElementById('rainCanvas')) {
            return document.getElementById('rainCanvas');
        }
        
        // 创建Canvas元素
        const canvas = document.createElement('canvas');
        canvas.id = 'rainCanvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        `;
        
        // 添加到页面
        document.body.appendChild(canvas);
        
        // 确保body有最小高度
        if (document.body.style.minHeight === '') {
            document.body.style.minHeight = '100vh';
        }
        
        return canvas;
    }
    
    // 主初始化函数
    function initRain() {
        // 创建Canvas
        const canvas = createCanvas();
        const ctx = canvas.getContext('2d');
        
        // 设置Canvas尺寸
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // 雨滴数组
        const raindrops = [];
        const ripples = [];
        
        // 创建雨滴
        function createRaindrop() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                length: 15 + Math.random() * 15,
                speed: 5 + Math.random() * 5,
                opacity: Math.random() * 0.5 + 0.3,
                wind: Math.random() * 0.6 - 0.3
            };
        }
        
        // 创建涟漪
        function createRipple(x, y) {
            return {
                x: x,
                y: y,
                radius: 0,
                maxRadius: 8 + Math.random() * 12,
                opacity: 0.7
            };
        }
        
        // 初始化雨滴
        for (let i = 0; i < 180; i++) {
            raindrops.push(createRaindrop());
        }
        
        // 动画循环
        function animate() {
            // 使用半透明填充创造拖尾效果
            ctx.fillStyle = 'rgba(10, 25, 49, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 更新和绘制雨滴
            for (let i = 0; i < raindrops.length; i++) {
                const drop = raindrops[i];
                
                // 更新位置
                drop.y += drop.speed;
                drop.x += drop.wind;
                
                // 如果雨滴超出画布，重置并创建涟漪
                if (drop.y > canvas.height - 10) {
                    ripples.push(createRipple(drop.x, canvas.height - 5));
                    Object.assign(drop, createRaindrop());
                }
                
                // 如果雨滴超出左右边界，重置
                if (drop.x < 0 || drop.x > canvas.width) {
                    Object.assign(drop, createRaindrop());
                }
                
                // 绘制雨滴
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // 更新和绘制涟漪
            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i];
                ripple.radius += 0.5;
                ripple.opacity -= 0.015;
                
                // 移除已消失的涟漪
                if (ripple.opacity <= 0) {
                    ripples.splice(i, 1);
                    continue;
                }
                
                // 绘制涟漪
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(79, 195, 247, ${ripple.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // 继续动画循环
            requestAnimationFrame(animate);
        }
        
        // 开始动画
        animate();
        
        // 提供全局控制方法
        window.rainEffect = {
            setRainAmount: function(amount) {
                raindrops.length = 0;
                for (let i = 0; i < amount; i++) {
                    raindrops.push(createRaindrop());
                }
            },
            
            setRainSpeed: function(speed) {
                for (let i = 0; i < raindrops.length; i++) {
                    raindrops[i].speed = speed + Math.random() * 2;
                }
            },
            
            setRainLength: function(length) {
                for (let i = 0; i < raindrops.length; i++) {
                    raindrops[i].length = length + Math.random() * 10;
                }
            },
            
            setWind: function(wind) {
                for (let i = 0; i < raindrops.length; i++) {
                    raindrops[i].wind = (Math.random() - 0.5) * wind;
                }
            },
            
            start: function() {
                // 如果动画已停止，重新开始
                if (!window.rainEffect._animationRunning) {
                    window.rainEffect._animationRunning = true;
                    animate();
                }
            },
            
            stop: function() {
                window.rainEffect._animationRunning = false;
                // 清除Canvas
                ctx.fillStyle = 'rgba(10, 25, 49, 1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            },
            
            remove: function() {
                // 移除Canvas元素
                if (canvas && canvas.parentNode) {
                    canvas.parentNode.removeChild(canvas);
                }
                // 移除事件监听器
                window.removeEventListener('resize', resizeCanvas);
                // 删除全局对象
                delete window.rainEffect;
            }
        };
        
        window.rainEffect._animationRunning = true;
        
        // 在控制台输出可用方法
        console.log('下雨效果已自动启用！在控制台中使用 rainEffect 对象控制：');
        console.log('rainEffect.setRainAmount(数量) - 设置雨滴数量');
        console.log('rainEffect.setRainSpeed(速度) - 设置雨滴速度');
        console.log('rainEffect.setRainLength(长度) - 设置雨滴长度');
        console.log('rainEffect.setWind(风力) - 设置风力影响');
        console.log('rainEffect.stop() - 停止下雨');
        console.log('rainEffect.start() - 开始下雨');
        console.log('rainEffect.remove() - 完全移除下雨效果');
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRain);
    } else {
        // DOMContentLoaded 已经触发
        initRain();
    }
})();
