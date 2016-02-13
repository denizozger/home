// 'use strict';

const
  express     = require('express'),
  app         = express(),
  bodyParser  = require('body-parser'),
  db          = require('./db');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views
app.get('/', (req, res) => res.render('pages/index'));

// api
app.post('/readings', db.addReading);
app.get('/readings', db.getReadings);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port (◕‿◕)', app.get('port'));

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set!');
  }
});


