const { Client } = require('minecraft-launcher-core');
const helper = require("./install_helper.js")

const launcher = new Client();
exports.launchVanilla = function launchVanila(send, args){
    send("mc-init")
    send("mc-mod-sum")
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
            min: String(Math.round(args.XmxRam-1024))
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

exports.launchModded = function launchModded(send, args){
    var pack = args.package
    send("mc-init")
    helper.compareCheckSums(args.package, args.currpack, function(data){
        if(data.equal && !args.reinstall){pack=null}
        var credentials = args.credentials
        let opts = {
            clientPackage: pack,
            forge: args.forge,
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
                min: String(Math.round(args.XmxRam-1024))
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
    }, function(err){
        console.error(err)
        send("mc-error", err)
    })
}

exports.launchCustomMod = function launchCustomMod(send, args){
    send("mc-init")
    var credentials = args.credentials
    let opts = {
        forge: args.forge,
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
            type: args.type,
            custom: args.custom
        },
        memory: {
            max: String(args.XmxRam),
            min: String(Math.round(args.XmxRam-1024))
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