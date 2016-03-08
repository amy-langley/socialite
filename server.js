/* eslint no-console: 0 */
import path from 'path'
import express from 'express'
import session from 'express-session'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.js'
import Grant from 'grant-express'
import TumblrAdapter from './app/server/adapters/tumblr-adapter.js'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT
const app = express()

const tumblrAdapter = new TumblrAdapter()

app.use(session({secret: 'shh dont tell', resave: true, saveUninitialized: false}))
app.use(new Grant(require('./app/config/grant-config.json')))
app.use('/api/tumblr',tumblrAdapter.middleware())

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
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
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
