const amqplib = require('amqplib/callback_api');
const queue = 'tasks';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue); //создаем очередь, если не создана
    
    let counter = 0;
    setInterval(() => {
      ch1.sendToQueue(queue, Buffer.from('Task-'+counter));
      counter++;
    }, 1000);
  });
});
