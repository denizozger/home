// 'use strict';

const
  express     = require('express'),
  app         = express(),
  bodyParser  = require('body-parser'),
  db          = require('./db'),
  mqtt        = require('mqtt'),
  url         = require('url');

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

/**
 * MQTT Broker
 */
var mqttUrl = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqttUrl.auth || ':').split(':');

var client = mqtt.createClient(mqttUrl.port, mqttUrl.hostname, {
  username: auth[0], password: auth[1]
});

client.on('connect', () => {

  client.subscribe('hello/world', function() {
    client.on('message', (topic, message, packet) => {
      console.log(`Received ${message} on ${topic}`);
    });
  });

  client.publish('hello/world', 'node publised this message', function() {
    console.log('Message is published');
    client.end();
  });
});

