/* eslint no-console: 0 */
import path from 'path'
import express from 'express'
import session from 'express-session'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.config.js'
import Grant from 'grant-express'
import TumblrAdapter from './adapters/tumblr-adapter.js'
import {user, linkedAccount} from '../shared/models/schema.js'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT
const app = express()

const tumblrAdapter = new TumblrAdapter()
const grantConfig = require('../config/grant-config.json')

app.use(session({secret: 'shh dont tell', resave: false, saveUninitialized: false}))
app.use(new Grant(grantConfig))
app.use('/api/tumblr',tumblrAdapter.middleware())

app.use('/api/session', function(req, res){
  req.session.userId = req.session.userId || 1
    user.findAll({where: {id: req.session.userId}, include: [{model: linkedAccount}]}).then(result => {
      res.send(JSON.stringify(result))
    })
})

app.get('/api/logout', function(req, res){
  req.session.destroy()
  res.redirect('/home')
})

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('/home', function response(req, res) {
    var p = path.join(__dirname, '..', '..', 'dist', 'index.html')

    res.write(middleware.fileSystem.readFileSync(p))
    res.send()
  })
} else {
  app.use(express.static(__dirname + '/dist'))
  app.get('/home', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
})
