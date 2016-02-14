
const
  mqtt = require('mqtt'),
  url = require('url');

module.exports = () => {
  var mqttUrl = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
  var auth = (mqttUrl.auth || ':').split(':');

  var client = mqtt.createClient(mqttUrl.port, mqttUrl.hostname, {
    username: auth[0], password: auth[1]
  });

  client.on('connect', () => {

    client.subscribe('hello/world', function() {
      // when a message arrives, do something with it
      client.on('message', (topic, message, packet) => {
        console.log(`Received ${message} on ${topic}`);
      });
    });

    client.publish('hello/world', 'my message', function() {
      console.log('Message is published');
      client.end();
    });
  });
}
