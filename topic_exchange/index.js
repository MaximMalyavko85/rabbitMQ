const amqplib = require('amqplib/callback_api');
const queue1 = 'topic_logs-1';
const queue2 = 'topic_logs-2';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertExchange(queue1, 'topic', {durable: true});
    //ch1.assertExchange(queue2, 'topic',{durable: true});
    
    let counter = 0;
    const routingKey = 'anonymous.info.aa.message';

    setInterval(() => {
      ch1.publish(queue1, routingKey, Buffer.from('Task-'+counter), {persistent: true});
      //ch1.publish(queue2, routingKey, Buffer.from('Task-'+counter), {persistent: true});
      console.log("Task-"+counter+ " was published");
      counter++;
    }, 1000);
  });
});
