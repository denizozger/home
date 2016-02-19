
const
  mqtt = require('mqtt'),
  url = require('url');

module.exports = () => {
  var client  = mqtt.connect(process.env.CLOUDMQTT_URL);

  client.on('connect', function () {
    client.subscribe('hello');
    client.publish('hello', 'node published this message');
  });

  client.on('message', function (topic, message) {
    console.log(message.toString());
    client.end();
  });
}
