# ProxyIP是什么？
ProxyIP指的是在CloudFlare Workers中那些能够成功代理连接到 Cloudflare 服务的第三方 IP 地址
根据 Cloudflare Workers 的 [TCP Sockets 官方文档](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) 说明，存在以下技术限制：

> ⚠️ Outbound TCP sockets to [Cloudflare IP ranges ↗](https://www.cloudflare.com/ips/) are temporarily blocked, but will be re-enabled shortly.

这意味着 Cloudflare Workers 无法直接连接到 Cloudflare 自有的 IP 地址段。为了解决这个限制，需要借助第三方云服务商的服务器也就是Workers 节点无法直接连接到 Cloudflare 自有的 IP 地址段
所以我们要`CloudFlare Workers  发起请求 > PROXYIP/SOCKS5/HTTP 服务器  第三方代理 > Cloudflare 服务  目标服务`
# 手动获取
打开[https://ipdb.api.030101.xyz/?type=proxy](https://ipdb.api.030101.xyz/?type=proxy)获取`ProxyIP`列表
访问后如下图所示
```
8.222.139.227
150.230.96.93
144.24.243.207
143.47.235.216
130.162.161.22
8.222.207.108
138.2.122.191
152.70.93.246
141.147.71.91
146.56.156.7
129.151.198.3
141.147.185.63
8.219.92.213
138.2.28.115
155.248.170.249
8.212.41.98
8.222.202.83
141.148.234.169
...
```
`Ctrl + A`全选然后`Ctrl + C`复制
打开[https://reallyfreegeoip.org/bulk](https://reallyfreegeoip.org/bulk)
把刚才的结果`粘贴`进去，点击`Bulk Lookup`
完成后把他`下载`下来
随便用一个软件打开
搜索你需要的区域，比如`HK`
这样我们就获取了`HK`的`ProxyIP`

# cmliu大佬获取
打开 [Check ProxyIP - 代理IP检测服务](https://check.proxyip.cmliussss.net/) ，直接输入 `proxyip.cmliussss.net` 进行检测
就会显示出很多`ProxyIP`，选择自己想要的即可
或者输入`proxyip.hk.cmliussss.net`，`proxyip.us.cmliussss.net`这种带地区码的形式
这样可以只优选hk，us这种地区的`ProxyIP`

# Python脚本获取
**1.获取ip列表**
先获取`ProxyIP`列表
可以使用上面任意一种办法获取，推荐第一种
保存到`ip.txt`
注意格式
内容：
```
1.1.1.1
2.2.2.2
```
**2.创建python文件**
随便创建一个python文件，比如`cf_proxyip.py`
```python
#cf_proxyip.py
#!/usr/bin/env python3
import asyncio, aiohttp, csv

INPUT = 'ip.txt'  # 输入文件路径，假设 IP 地址都在 ip.txt 中
OUTPUT = 'results.csv'  # 输出文件路径
CONCURRENCY = 200  # 控制并发请求数
TIMEOUT = 10  # 设置超时时间
URL = 'https://check.proxyip.cmliussss.net/check?proxyip={}'  # 请求的 URL

async def fetch(session, ipraw, sem):
    if ':' not in ipraw:
        ipraw = ipraw + ':443'  # 如果没有端口，默认加上 :443
    async with sem:
        try:
            async with session.get(URL.format(ipraw), timeout=TIMEOUT) as r:
                text = await r.text()
                try:
                    data = await r.json()  # 尝试解析为 JSON
                except:
                    data = {"raw": text}  # 如果解析失败，保存原始响应
                return ipraw, data
        except Exception as e:
            return ipraw, {"error": str(e)}
			
async def main():
    ips = [line.strip() for line in open(INPUT) if line.strip()]  # 读取 IP 文件，去除空行
    sem = asyncio.Semaphore(CONCURRENCY)  # 设置并发数限制
    timeout = aiohttp.ClientTimeout(total=TIMEOUT)  # 设置总超时
    async with aiohttp.ClientSession(timeout=timeout) as sess:
        tasks = [fetch(sess, ip, sem) for ip in ips]  # 为每个 IP 创建请求任务
        results = await asyncio.gather(*tasks)  # 并发执行请求
		
    # 保存结果到 CSV 文件
    with open(OUTPUT, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['input', 'proxyIP', 'portRemote', 'success', 'colo', 'responseTime', 'message', 'timestamp', 'error', 'raw'])
        for ipraw, data in results:
            if isinstance(data, dict):
                writer.writerow([
                    ipraw,
                    data.get('proxyIP', ''),
                    data.get('portRemote', ''),
                    data.get('success', ''),
                    data.get('colo', ''),
                    data.get('responseTime', ''),
                    data.get('message', ''),
                    data.get('timestamp', ''),
                    data.get('error', ''),
                    str(data.get('raw', data))  # 保留原始数据
                ])
            else:
                writer.writerow([ipraw, '', '', '', '', '', '', '', 'unexpected', ''])
	
    print("done ->", OUTPUT)  # 输出文件生成提示
	
if __name__ == "__main__":
    asyncio.run(main())  # 启动异步任务

```
**3.开始优选**
依次输入下列命令即可
```
# 创建一个虚拟环境
python3 -m venv myenv

# 激活虚拟环境
source myenv/bin/activate

# 安装 aiohttp
pip install aiohttp

# 运行脚本
python3 cf_proxyip.py
```
**4.查看效果**
打开`result.csv`即可
# 实际应用效果
> 👤 访问非 Cloudflare CDN 站点时（如油管、谷歌等），你的 IP 归属地由「优选 IP」决定
> 🌐 访问由 Cloudflare CDN 托管的网站时（如推特、ChatGPT等），你的 IP 归属地由「ProxyIP/SOCKS5/HTTP」决定