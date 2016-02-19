const
  pg = require('pg');

var inMemoryDb = [];

exports.addReading = (req, res) => {
  console.log('Reading received: %j', req.body)
  inMemoryDb.push(req.body)
  res.sendStatus(200);
  // pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
  //   client.query('INSERT INTO readings (id, type, value, created_at) VALUES($1, $2, $3, $4) RETURNING id',
  //     [undefined, req.body.type, req.body.value, undefined],
  //     function(err, result) {
  //       done();
  //       if (err) {
  //         console.error(err);
  //         res.send('Error ' + err);
  //       }

  //       console.log('Reading inserted with id: ' + result.rows[0].id);

  //       res.sendStatus(200);
  //   });
  // });
};

exports.getReadings = (req, res) => {
  res.send(inMemoryDb)
  // pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
  //   client.query('SELECT * FROM readings', function(err, result) {
  //     done();
  //     if (err) {
  //       console.error(err);
  //       res.send('Error ' + err);
  //     }

  //     res.render('pages/db', {results: result.rows} );
  //   });
  // });
};
