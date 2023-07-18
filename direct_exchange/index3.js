const amqplib = require('amqplib/callback_api');
const queue = 'logExchanger';

amqplib.connect('amqp://localhost', (err, conn) => { 
  if (err) throw err;

  //Listener
  conn.createChannel((err, ch2) => {
    if (err) throw err;

    ch2.assertExchange(queue, 'direct'); //logExchanger
    ch2.assertQueue(queue, {durable: true});

    const routingKey = 'info';
    ch2.bindQueue(queue, queue, routingKey); //creating binding
    ch2.prefetch(1);
    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        console.log("listener 2 --->", msg.content.toString());
        ch2.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    }, {
      noAck: false
    });
  });
});
