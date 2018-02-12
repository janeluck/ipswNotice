#!/usr/bin/env node
const https = require('https')
const fs = require('fs')
const get = require('lodash/get')
const path = require('path')
const semver = require('semver')

// read local config
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json'), {
    encoding: 'utf8'
}))

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
            abstractData(config, JSON.parse(rawData))

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
    const result = firmwares.filter(firmware => {
        return firmware.signed && semver.satisfies(firmware.version, version)
    })
    if (result.length > 0) {
        // 推送
        console.log(`success! Receive under ${version} versions of Apple\'s iOS Firmware`)
        console.log(result)

    } else {
        //console.log('nonononono')
    }

}