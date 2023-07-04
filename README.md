# rabbitMQ

### Сегодня практически все высоконагруженные системы используют очереди сообщений, что позволяет им оперативно обрабатывать миллионы заявок с минимальными задержками и эффективно использовать ресурсы.

### Брокер сообщений представляет собой тип построения архитектуры, при котором элементы системы «общаются» друг с другом с помощью посредника.

#### Брокер сообщений - это:
- Архитектурный паттерн построения информационных систем, позволяющий организовать асинхронный обмен между сервисами.
- Специальные сервисы (программы) осуществляющие прием и отправку сообщений. Они являются промежуточным элементом, через который проходят все сообщения.

#### Когда нужно использовать брокеры:
- Когда необходимо реализовать сложную бизнес логику, в которой задействовано несколько компонентов информационной системы. Например, если используется событийно-ориентированная архитектура (Event-driven architecture).
- Если нужно обеспечить асинхронный обмен между сервисами и обеспечить буферизацию сообщений.
- Требуется рассылать сообщения нескольким получателям от одного отправителя (push уведомления или sms).
- Необходимо сгладить пиковые нагрузки.
- Нужно собрать данных телеметрии, логи и статистику;
- Требуется агрегировать и выполнять задачи по расписанию;
- Разные сервисы написаны на разных языках

### Плюсы
- Повысить производительность за счет того, что отправителю нет необходимости ожидать ответа на свой запрос к другому сервису или системе.
- Обеспечить определенный уровень надежности, т.к. сообщения могут сохраняться (буферизироваться) и затем повторно отправляться, если получатель был недоступен или по каким-то причинам не смог принять их.
- Уменьшить зависимость между сервисами. Отправителю нет необходимости знать сетевой адрес того или иного сервиса.
- Сглаживать пиковые нагрузки на сервисы.

### Минусы
- Повышается сложность системы, усложняется отладка, обслуживание и администрирование.
- Необходимы дополнительные усилия для обеспечения целостности и непротиворечивости данных. Например, нужно решить проблему дубликатов.
- Это потенциальное узкое «горлышко» в производительности. Поэтому современные брокеры проектируются с возможностью высокой масштабируемости.
- Это место возможного критического отказа, при котором большинство систем не смогут функционировать. Однако, многие брокеры обеспечивают высокую доступность и надежность функционирования.


### Брокер сообщений — это программный компонент, который служит посредником между различными компонентами распределенной системы. В его работе используются две основные сущности: producer (отправитель) и consumer (потребитель/подписчик). Он обрабатывает сообщения, полученные от отправителей, и перенаправляет к соответствующим потребителям. Такое ПО реализуется как часть общей архитектуры системы, либо как отдельный сервис

### По смыслу - одни сервисы знают, куда писать сообщения, а вторые сервисы знают откуда читать
##### технологии: Amazon MQ, Apache Kafka, RabbitMQ, Message Bus, Apollo
##### протоколы: MQ, XMPP, WTF, MQTT, STOMP ...

#### Обменник (exchenge)
#### Очередь (name, duration, auto-delete, arguments (TTL message))
#### Routing key (связь или маршрут)

Publisher ---> exchange ---> routing key ---> queue ---> consumer

### Установить сервис локально (как service)

rabitMq написан на языке Erlang (должна быть установлена последняя версия)

- brew info rabbitmq (MacOS)  https://www.rabbitmq.com/install-homebrew.html
- CONF_ENV_FILE="/opt/homebrew/etc/rabbitmq/rabbitmq-env.conf" /opt/homebrew/opt/rabbitmq/sbin/rabbitmq-server
- brew services start rabbitmq
- http://localhost:15672/ (guest guest)

### Функционал web интерфейса

##### Отправитель --> сотрудник почты --> Абонентский ящик --> получатель
##### Publisher   --> Exchange        --> Queue            --> Consumer

- Overview (общая информация по серверу)
- Connections (все соединения с сервером)
- Channels  (каналы)
- Exchanges (сотрудник)

1. можно завести своего exchanges (Add a new exchange -> name: dev-ex -> type:fanout)
2. создать свою очередь (Add a new queue -> name:dev-queue)
___
###### Но, на данный момент наша очередь ничего не знает про исполнителя - надо связать через bindings
###### exchanges -> dev-ex -> bindings -> To queue (dev-queue)

### Отправка сообщений

сообщения отправляются сотруднику почты (Exchange)
___
###### Exchanges -> dev-queue -> publish message
###### Queues -> dev-queue -> overview

### Получение сообщений
___
###### Queues -> dev-queue -> get messages
###### Ack Mode(подтверждение) - этот параметр отвечает за сохранность данных - прочитать и вернуть, прочитать и удалить
###### Automatic ack (не планируем возвращать в очередь), Messages - кол-во сообщений, забираемых за один раз
- delivery_mode - уровент сохранность сообщения (default)
