'use strict'
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
exports.default = async context => {
    let data = {
        owner: "Software City Team",
        repo: "https://github.com/Software-City/swc_mclauncher",
        provider: "github",
        publishAutoUpdate: true,
        releaseType: "release",
    }
    if(process.platform == "linux") {
        data.updaterCacheDirName = 'swc_mclauncher-updater'
        fs.writeFileSync(
            path.join(__dirname, 'dist','linux-unpacked','resources','app-update.yml')
            , yaml.safeDump(data)
            , 'utf8'
        )
    }
}