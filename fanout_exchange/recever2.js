const amqplib = require('amqplib');
const queueName = 'fanout';

(async () => {
  const conn = await amqplib.connect('amqp://localhost');
  const channel = await conn.createChannel();

  const options = {durable: false};
  const type = 'fanout';
  //Обьявляем обменник
  await channel.assertExchange(queueName, type, options);
  //Обьявляем очередь queue - имя полеченной очереди
  // вместо fanout-2 можно '' (имя по default создасться)
  const {queue} = await channel.assertQueue('fanout-2', {exclusive: true});

  //привязываем очередь к обменнику
  channel.bindQueue(queue, queueName, "");

  channel.consume(queue, msg => {
    console.log("listener 2 --->", msg.content.toString());
  })
})();