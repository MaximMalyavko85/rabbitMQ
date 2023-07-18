const amqplib = require('amqplib/callback_api');
const queue = 'logExchanger';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertExchange(queue, 'direct'); //
    
    let counter = 0;
    const routingKey = 'info';

    setInterval(() => {
      ch1.publish(queue, routingKey, Buffer.from('Task-'+counter), {persistent: true});
      console.log("Task-"+counter+ " was published");
      counter++;
    }, 1000);
  });
});
