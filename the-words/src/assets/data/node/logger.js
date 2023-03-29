const url = 'https://myappIsNotWorking.com/com'

function log(message) {
    //send an HTTP req
    console.log(message)
}

module.exports.log = log;