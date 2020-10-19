const Router = require('koa-router')
const UserController = require('./controllers/user')

const router = new Router()

router.post('/auth', UserController.login)

module.exports = router