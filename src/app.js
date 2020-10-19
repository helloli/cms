const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const router = require('./router')

const log = require('./utils/log')
const errorHandle = require('./utils/error')

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
};

require('./db')

const app = new Koa()

app.context.log = log
app.keys = ['cms']

app.use(session(CONFIG, app))

app.use(bodyParser({
  enableTypes: ['text', 'json'],
  extendTypes: {
    text: ['text/xml'],
  }
}))
app.use(errorHandle())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app