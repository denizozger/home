const
  pg = require('pg');

exports.test = (req, res) => {
  pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client, done) {
    client.query('SELECT * FROM test', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.send('Error ' + err);
      }

      res.render('pages/db', {results: result.rows} );
    });
  });
};
