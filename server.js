/* eslint no-console: 0 */
import path from 'path'
import express from 'express'
import session from 'express-session'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.js'
import Grant from 'grant-express'
import Tumblr from 'tumblr.js'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT
const app = express()
const grantconfig = require('./grant-config.json')
const grant = new Grant(grantconfig)

app.use(session({secret: 'shh dont tell', resave: false, saveUninitialized: false}))
app.use(grant)

app.get('/api/logout', function(req, res){
  req.session.destroy()
  res.redirect('/home')
})

app.get('/api/posts', function(req, res){
  if(!req.session.credentials)
    throw 'not logged in'

  var tumblr = Tumblr.createClient(req.session.credentials)
  tumblr.posts('aetherstragic', (err, resp) => {
    if(err) res.status(500).end(JSON.stringify(err))
    else res.end(JSON.stringify(resp.posts))
  })

  // res.end(JSON.stringify({title: 'title4', contents: 'contents 4'}))
})

app.get('/handle_tumblr_callback', function(req,res){
  req.session.credentials = {
    consumer_key: grantconfig.tumblr.key,
    consumer_secret: grantconfig.tumblr.secret,
    token: req.query.access_token,
    token_secret: req.query.access_secret
  }

  req.session.save()
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
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
    res.end()
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
