const amqplib = require('amqplib');
const queueName = 'fanout';

(async () => {

  const conn = await amqplib.connect('amqp://localhost');
  const channel = await conn.createChannel();

  const options = {durable: false};
  const type = 'fanout';
  //Обьявляем обменник
  await channel.assertExchange(queueName, type, options);

  let counter = 0;
  setInterval(() => {
    channel.publish(queueName, "", Buffer.from('Task-'+counter));
    console.log("Task-"+counter+ " was published");
    counter++;
  }, 1000);
})();
