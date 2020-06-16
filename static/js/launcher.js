const { Client } = require('minecraft-launcher-core');

const launcher = new Client();

exports.launch = function launch(send, args){
    send("mc-init")
    console.log(args)
    var credentials = args.credentials
    let opts = {
        clientPackage: null,
        authorization: {
            access_token: credentials.accessToken,
            client_token: credentials.clientToken,
            uuid: credentials.uuid,
            name: credentials.username,
            selected_profile: credentials.selectedProfile,
            user_properties: credentials.user_properties
        },
        root: args.mcPath,
        version: {
            number: args.version,
            type: args.type
        },
        memory: {
            max: String(args.XmxRam),
            min: "1024"
        }
    }
    
    launcher.launch(opts);

    launcher.removeAllListeners()
    launcher.on("download-status", (e) => {send("mc-download-status", e)})
    launcher.on("download", (e) => {send("mc-download", e)})
    launcher.on("progress", (e) => {send("mc-progress", e)})
    launcher.on('debug', (e) => {send("mc-debug", e)});
    launcher.on('data', (e) => {send("mc-data", e)});
    launcher.on("close", (e) => {
        send("mc-end")
        launcher.removeAllListeners(e)
    })
}