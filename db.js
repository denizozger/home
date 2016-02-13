const
  pg = require('pg');

exports.addReading = (req, res) => {
  pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
    client.query('INSERT INTO readings (id, type, value, created_at) VALUES($1, $2, $3, $4) RETURNING id',
      [undefined, req.body.type, req.body.value, undefined],
      function(err, result) {
        done();
        if (err) {
          console.error(err);
          res.send('Error ' + err);
        }

        console.log('Reading inserted with id: ' + result.rows[0].id);

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

      res.render('pages/db', {results: result.rows} );
    });
  });
};
