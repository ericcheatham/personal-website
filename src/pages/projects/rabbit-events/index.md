---
title: Consuming AMQP Messages using Alpakka
intro: Walking through consuming AMQP messages using Alpakka
tags: scala, alpakka, amqp, postgres
featuredImage: ./screenshot.png
date: 2019-12-03
---

[Alpakka](https://doc.akka.io/docs/alpakka/current/index.html) is a library written in both Scala and Java that provides a way to implement stream-aware pipelines for streaming data from one source to another.

One such source that Alpakka supports is from [AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol) (Advanced Message Queuing Protocol) servers. Alpakka allows a consumer to treat an AMQP server as either a source (origin) or a sink (destination).

We will be exploring an example of using an AMQP server as a source as well as exploring another of Alpakka's features, using a relational database as the sink.

## Overview

At a high level our example will be doing the following steps:

- Declaring and attaching to an AMQP queue
- Creating a consumer to consume messages off previously declared queue
- Transforming the data into something that can be further manipulated
- Writing our data to our database

In pictures, our steps would look a little something like this: ![high level architecture overview](https://thepracticaldev.s3.amazonaws.com/i/su0i83z9wfawduyqct6q.png)

This may seem fairly complicated at first, however, Alpakka handles a lot of the heavy lifting for us and makes setting all this up a breeze!

## Declaring a Queue and Creating a Consumer

Our first two steps go hand-in-hand; declaring our queue and creating our consumer.

We will begin by choosing a name for our queue and a connection provider for our queue. For this example our queue will be named `amqp-test-queue-example` and we will be going with `AmqpLocalConnectionProvider`. Our choice of connection provider will handle connecting to a local instance of an AMQP server for us. Alpakka provides several [other connection providers](https://doc.akka.io/docs/alpakka/current/amqp.html#connecting-to-server) to handle connecting to non-local servers.

```scala
val queueName = "amqp-test-queue-example"
val queueDeclaration = QueueDeclaration(queueName)
val connectionProvider = AmqpLocalConnectionProvider

object MessageQueue {
  def createQueue(connectionProvider: AmqpConnectionProvider,
                  queueName: String,
                  queueDeclaration: Declaration,
                  bufferSize: Int = 10): Source[ReadResult, NotUsed] =
    AmqpSource.atMostOnceSource(
      NamedQueueSourceSettings(connectionProvider, queueName)
        .withDeclaration(queueDeclaration)
        .withAckRequired(true),
      bufferSize = bufferSize
    )
}
```

It is also worth noting in our above code that we have limited our queue's buffer size to 10 messages. This will limit the number of messages to pre-fetch from the AMQP server.

We are also telling our consumer to ACK all messages that are consumed by using the `withAckRequired()` method on the `NamedQueueSourceSettings` class. More complex models allow for custom ACKing/NAKing policies. To learn more about that visit [the Alkpakka article about stream graphs](https://doc.akka.io/docs/akka/current/stream/stream-graphs.html)

## Transforming our Data

Now that we have a consumer that will take consume messages from an AMQP server and ACK those messages we can begin to use the contents of those messages. One hang up though: all our messages will be coming in the form of byte arrays! No worries, we can make use of [JSON4s](https://github.com/json4s/json4s) to unmarshall or convert our message from the form that was transmitted to a form we can use.

```scala
import org.json4s.native.Serialization.read

case class CustomerCreated(name: String, email: String)

val result =
    MessageQueue.createQueue(connectionProvider, queueName, queueDeclaration, bufferSize)
        .take(bufferSize)
        .map({ x => read[CustomerCreated](x.bytes.utf8String) })
        .log("Received message", x ⇒ println(x))
```

In our example we are:

- Creating our consumer using `MessageQueue.createQueue()`
- Telling our consumer to take up to our buffer size of 10 messages
- Iterating over the messages that we get and letting JSON4s convert them into our `CustomerCreated` case class
- Logging out the result of each message

## Writing to a Sink

At this point JSON4s has done us a huge favor and converted our message into something we can do some work with. For our purposes we will be writing our data to a PostgreSQL database. A look into our database structure is seen below.

```
 Column |          Type          | Collation | Nullable |                Default
--------+------------------------+-----------+----------+---------------------------------------
 id     | integer                |           | not null | nextval('customers_id_seq'::regclass)
 name   | character varying(100) |           |          |
 email  | character varying(100) |           |          |
```

To write to a SQL based database we will have to make use of another of Alpakka's many connectors: [Slick](https://doc.akka.io/docs/alpakka/current/slick.html). Slick handles connecting to and writing to a database of our choosing.

It's honestly pretty slick.

Slick requires you to provide a configuration file that describes how to connect to a database. For our example we'll be using the following:

```conf
slick-postgres {
  profile = "slick.jdbc.PostgresProfile$"

  db = {
    password = "password"
    user = "example"
    url = "jdbc:postgresql://127.0.0.1/exampledb"
  }
}
```

Going back to our created consumer, we can now tell our consumer where to write our consumed and transformed data. We will do so by telling slick to use our configuration file and writing each item to our sink as sql inserts.

```scala
import akka.stream.alpakka.slick.javadsl.SlickSession
import akka.stream.alpakka.slick.scaladsl.Slick

case class CustomerCreated(name: String, email: String)

MessageQueue.createQueue(connectionProvider, queueName, queueDeclaration, bufferSize)
    .take(bufferSize)
    .map({ x => read[CustomerCreated](x.bytes.utf8String) })
    .log("Received message", x ⇒ println(x))
    .runWith(
        Slick.sink({ x ⇒ sqlu"INSERT INTO customers (name, email) VALUES(${x.name}, ${x.email})" })
    )
```

Wrapping our database sink in a `runWith()` allows us to materialize our flow. Until now we have merely been describing what we intend to do. Materializing our consumer tells Alpakka to allocate all the necessary resources in order to run our flow. To further explore stream materialization visit the [Alpakka article on Stream Materailzation](https://doc.akka.io/docs/akka/2.5.23/stream/stream-flows-and-basics.html#stream-materialization)

## Seeing this all work

All the code that we have constructed above can be found on my github repository. The README.md will walk you through the process of starting up a local RabbitMq instance (our AMQP server) as well as a Postgres database (our relational database sink).

{% github https://github.com/ericcheatham/event-streaming-example no-readme %}

---

In conclusion we explored one of many ways to use Alpakka to consume asynchronous messages from an AMQP source. Alpakka provides connectors for a vast many more connectors and functions aside from what we've explored here. No matter the situation you are approaching, Alpakka has it covered in [their incredible documenation](https://doc.akka.io/docs/alpakka/current/index.html)

---

If you ever want to talk Scala or have really _spicy_ takes about food, send me a message over on [Twitter](https://twitter.com/_echeatham) or [LinkedIn](https://www.linkedin.com/in/ericcheatham/)
