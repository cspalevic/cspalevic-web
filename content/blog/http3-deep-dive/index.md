---
title: HTTP/3 Deep Dive
date: 12-17-2022
image: fast.avif
alt: A picture trying to emphasize that HTTP/3 will be fast
---

## Introduction

I've been hearing all the fuss about QUIC and HTTP/3 and how they will make the web faster. So, I wanted to dig in and learn some of this myself.

I'll be sharing with you what I've learned so far, like:

- The difference between QUIC and HTTP/3
- Why is this expected to be so much faster
- What's the status

## QUIC vs HTTP/3

I quickly learned that QUIC and HTTP/3 are not the same things. To explain this, let's dive a bit deeper into computer networking.

To power the magic of the internet, a computer must be able to send information to another computer. To do this, it must follow 4 steps (better known as layers):
| Order | Name | Description |
| ----- | ---- | ----------- |
| 4 | Application Layer | This layer is responsible for providing services to the user. It includes protocols such as HTTP, FTP, and SMTP, which are used to transfer data and communicate with servers and other devices. |
| 3 | Transport Layer | This layer is responsible for establishing and maintaining end-to-end communication between devices. It handles issues such as error checking, flow control, and data retransmission. |
| 2 | Internet Layer | This layer is responsible for routing data packets from one device to another. It uses IP addresses to identify the devices and determine the best route for the data. |
| 1 | Network Layer | This layer is responsible for sending and receiving data across the physical connection between devices. It handles issues such as data transmission errors, flow control, and media access. |

Together, this makes up the TCP/IP Model. This is a foundational networking model that defines how computers can communicate with each other.

HTTP, the protocol which we all know and love, is an **application layer protocol**. As web developers, we are most likely going to use standards created for this layer for most applications that we create. Some of those are:

- HTTP
- WebSocket
- Server-Sent Events

QUIC, on the other hand, is a **transport layer protocol**. Each HTTP/3 request will use QUIC under the hood to transmit information to another computer.

Now that we have some of that background information, we can explain the difference between QUIC and HTTP/3:

> HTTP/3 is an application layer protocol

> QUIC is a transport layer protocol that HTTP/3 will use

## Speed improvements with HTTP/3

As we learned above, HTTP/3 is an application layer protocol and QUIC is a transport layer protocol. But, this still doesn't explain why this is going to be so much faster. One of the main reasons why HTTP/3 will be faster than its previous versions is because QUIC is living up to its name. To explain, we will have to dig a bit deeper now to find out.

When you make an HTTP/2 request, information still needs to get passed down the layers. Under the hood, HTTP/2 uses a transport layer protocol (TCP) to break down the information into smaller packets that can be transmitted to another computer. Here's a little diagram explaining what I mean:

![HTTP/2 TCP Diagram](https://cedomir.mo.cloudinary.net/assets/http3-deep-dive/http2-tcp-diagram.png?tx=q_auto,f_auto)

TCP was designed to provide accurate delivery of information, rather than quick delivery. It guarantees that all bytes received will be identical and in the same order as when it was sent. However, when one packet of information was lost in transmission, TCP is designed to **wait** for this packet to get retransmitted and get to its destination. This will block the destination computer from processing any other requests that are in the queue. This is called head-of-line (HOL) blocking.

QUIC, the transport protocol used in HTTP/3, was implemented to try and solve head-of-line (HOL) blocking issues. QUIC will help solve this by using another communications protocol called User Datagram Protocol (UDP).

UDP is generally faster than TCP for a few reasons:

1. Overhead: TCP includes several features that add overhead to the transmission of data, such as error checking, flow control, and retransmission. These features are important for ensuring the reliability of the connection, but they can also add latency to the transmission of data. UDP, on the other hand, does not include these features, which makes it faster but less reliable.

2. Connection establishment: TCP requires a three-way handshake to establish a connection, which adds latency to the transmission of data. UDP does not have a connection establishment mechanism, which allows it to transmit data more quickly.

3. Stateful vs. stateless: TCP is a stateful protocol, which means that it maintains information about the state of the connection and the data being transmitted. This can add overhead to the transmission of data. UDP is a stateless protocol, which means that it does not maintain information about the state of the connection or the data being transmitted. This allows it to transmit data more quickly.

Because of this transition from TCP -> UDP, QUIC is expected to bring a faster transmission of information to HTTP/3.

## What's the status

For all the NodeJS fans out there wondering where the HTTP/3 support is in our ecosystem - QUIC is very much in progress. There is an [issue](https://github.com/nodejs/node/issues/38478) tracking its progress and a draft PR is open already.

In the meantime, if you are still antsy to try it out, some modern browsers support `WebTransport` - which is a web API that uses HTTP/3. You can learn more about it [here](https://web.dev/webtransport/).

You would still need to connect to a server that supports HTTP/3, though. There are some open-source libraries out there that will let you create HTTP/3-supported servers. There's a list of them consolidated [here](https://en.wikipedia.org/wiki/HTTP/3#Libraries)
