'use strict'

const
  pg = require('pg');

exports.addReading = (req, res) => {
  pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
    client.query('INSERT INTO readings (temperature, pressure, humidity, created_at) VALUES($1, $2, $3, $4) RETURNING id',
      [req.body.temperature, req.body.pressure, req.body.humidity, req.body.time],
      function(err, result) {
        done();
        if (err) {
          console.error(err);
          res.send('Error ' + err);
        }

        console.log('Reading [%j] inserted with id [%s] ', req.body, result.rows[0].id);

        res.sendStatus(200);
    });
  });
};

exports.getReadings = (req, res) => {
  pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
    client.query('SELECT * FROM readings', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.send('Error ' + err);
      }

      let results = result.rows.sort((r1, r2) => r2.id - r1.id)

      res.render('pages/db', { results: results } );
    });
  });
};
