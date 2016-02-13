// 'use strict';

const
  express = require('express'),
  app     = express(),
  db      = require('./db');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/db', db.test);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port (◕‿◕)', app.get('port'));
});


