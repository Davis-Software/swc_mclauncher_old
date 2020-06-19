const authpath = 'https://interface.software-city.org/api?mode=apprest&data=auth_mojang'



/**
 * Login from the config file detailes to mojang and get an accesskey
 * @param {Function} callback callback returns data 
 */
function loginFromConfig(callback){
    $.post(
        authpath + "&cmd=login",
        {
            username: getVal("credentials").email,
            password: decrypt(getVal("credentials").password)
        },
        callback,
        "json"
    ).fail(function(data){console.log("error: ", data)})
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
        if(getVal("loggedin")){
            loginFromConfig(
                function(data){
                    window.location.reload()
                }
            )
        }
        console.log("error: ", data)
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

const algorithm = 'aes-128-cbc'

function encrypt(text) {
    return text
}

function decrypt(text) {
    return text
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