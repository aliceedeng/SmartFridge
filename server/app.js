import path from 'path';
import app from './config/express';
import routes from './routes/index.route';
import cache from './config/cache';
import * as errorHandler from './middlewares/errorHandler';
import joiErrorHandler from './middlewares/joiErrorHandler';
import express from 'express';

// enable webpack hot module replacement in development mode
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config.dev';

const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const sqlinjection = require('sql-injection');

// set up database
async function db_init() {
  try {
    console.log('Initializing database module');

    await database.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1); // code failure
  }
}

db_init();

cache.start(function(err) {
    if (err) {
        console.error(err);
        process.exit(1); // code failure
    }
})


app.use('/dist', express.static('./dist'));

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
    app.use(webpackHotMiddleware(compiler, {path: '/__webpack_hmr'}));
}

// Router
app.use('/api', routes);

// Landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Joi Error Handler
app.use(joiErrorHandler);
app.use(sqlinjection);
// Error Handler
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.errorHandler);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
