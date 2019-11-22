const API = require('./api.controller')

module.exports = (router) => {

    router.get('/chat', API.chat)

}