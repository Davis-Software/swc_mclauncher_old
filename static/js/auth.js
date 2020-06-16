const authpath = 'https://interface.software-city.org/api?mode=apprest&data=auth_mojang'
const minecraftAgent = 
{
    name: 'Minecraft',
    version: 1
}


/**
 * Login to mojang and get an accesskey
 * @param {string} username login email
 * @param {string} password login password
 * @param {Function} callback callback returns data 
 */
function login(username, password, callback){
    $.post(
        authpath + "&cmd=login",
        {
            username: username,
            password: password
        },
        callback,
        "json"
    ).fail(function(data){console.log("error: ", data)})
}

/**
 * validate and refresh (if possible) accesskey
 * @param {string} token accesstoken 
 * @param {string} clienttoken clienttoken
 * @param {Function} callback callback function
 */
function validate(token, clienttoken, callback){
    $.post(
        authpath + `&cmd=validate`,
        {
            accessToken: token,
            clientToken: clienttoken
        },
        callback,
        "json"
    ).fail(function(data){
        console.log("error: ", data)
        setVal("loggedin", false)
        window.location.reload()
    })
}


function logout(token, clienttoken, callback){
    $.post(
        authpath + `&cmd=logout`,
        {
            accessToken: token,
            clientToken: clienttoken
        },
        callback,
        "json"
    ).fail(function(data){console.log("error: ", data)})
}




function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


try {
    exports.login = login
    exports.validate = validate
    exports.logout = logout

    exports.encrypt = encrypt
    exports.decrypt = decrypt
} catch (error) {
    
}



// loginrp("davidkober6@gmail.com", "")