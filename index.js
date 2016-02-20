'use strict';

const
  express     = require('express'),
  app         = express(),
  bodyParser  = require('body-parser'),
  BBPromise 	= require('bluebird'),
  utils 			=	require('./utils'),
  db          = BBPromise.promisifyAll(require('./db'));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views
app.get('/', (req, res, next) => {
	db.getReadingsAsync()
		.then(readings => {
			res.render('pages/index', { readings: utils.convertRecordsForGoogleCharts(readings) })
		})
		.catch(next)
});

// api
app.post('/readings', (req, res, next) => {
	db.addReadingAsync()
		.then(() => res.sendStatus(200))
		.catch(next)
});
app.get('/readings', (req, res, next) => {
	db.getReadingsAsync()
		.then(readings => res.render('pages/db', { 
			readings: readings.sort((r1, r2) => r2.created_at - r1.created_at) 
		}))
		.catch(next)
});

// mqtt broker TODO: disabled until we need it
// require('./mqtt')();

app.listen(app.get('port'), () => {
  console.log('Home is running on port ◕‿◕', app.get('port'));

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set!');
  }
});

