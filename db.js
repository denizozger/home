'use strict'

const
  pg = require('pg');

exports.addReading = (data, cb) => {
  pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
    client.query('INSERT INTO readings (temperature, pressure, humidity, created_at) VALUES($1, $2, $3, $4) RETURNING id',
      [req.body.temperature, req.body.pressure, req.body.humidity, req.body.time],
      function(err, result) {
        done();
        if (err) {
          console.error(err);
          return cb(err);
        }

        console.log('Reading [%j] inserted with id [%s] ', req.body, result.rows[0].id);
        return cb(null, result.rows[0].id)
    });
  });
};

exports.getReadings = (cb) => {
  pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
    client.query('SELECT * FROM readings', function(err, result) {
      done();
      if (err) {
        console.error(err);
        return cb(err);
      }

      return cb(null, result.rows);
    });
  });
};
