const CronJob = require('cron').CronJob;
const job = new CronJob({
    cronTime: '00 5 11 * * *',
    onTick: function () {
        console.log('Asia/ShanghaiAsia/ShanghaiAsia/ShanghaiAsia/ShanghaiAsia/Shanghai')
    },
    start: false,
    timeZone: 'Asia/Shanghai'
});
job.start()