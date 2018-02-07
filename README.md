# ipswNotice
Receive push notifications when Apple's IOS firmwares are released.
获取苹果系统版本开放信息
在config.json里面配置机型和需要低于的版本号
# 配合crontab使用自动推送
MAILTO=example@gmail.com
* * * * * path/node path/index.js