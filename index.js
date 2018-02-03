const https = require('https')
const fs = require('fs')
const get = require('lodash/get')
// read local config
const config = JSON.parse(fs.readFileSync('./config.json', {
    encoding: 'utf8'
}))
console.log(config)

https.get('https://api.ipsw.me/v2.1/firmwares.json', (res) => {
    const statusCode = res.statusCode
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
            `Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
            `Expected application/json but received ${contentType}`)
    }
    if (error) {
        console.log(error.message)
        // consume response data to free up memory
        res.resume()
        return
    }

    res.setEncoding('utf8')
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        try {
            // let parsedData = JSON.parse(rawData)
            //console.log(parsedData)

            // filter the needed information


        } catch (e) {
            console.log(e.message)
        }
    });
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`)
})


function abstractData(config, data) {
    const {devices, version, mail} = config
    const firmwares = get(data, ['devices', devices, 'firmwares']) || []
    firmwares.filter(firmware => {
        return firmware.signed && firmware.version[0] <= version
    })
    if (firmwares.length > 0) {
        // 推送
        
    }

}