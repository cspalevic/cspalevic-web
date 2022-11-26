---
title: HTTP/3 Deep Dive
date: 11-25-2022
image: <image url that you're going to put in cloudinary>
alt: <alt text of the image you placed in cloudinary>
---

## Introduction

I've been hearing all the fuss about QUIC and HTTP/3 and how they will make the web faster. So, I wanted to dig in and learn some of this myself.

I'll be sharing with you what I've learned so far, like:

- The difference between QUIC and HTTP/3
- Why is this expected to be so much faster
- How you can utilize HTTP/3 today in the JavaScript world
- Where the NodeJS support is for HTTP/3

## QUIC vs HTTP/3

I quickly learned that QUIC and HTTP/3 are not the same things. To explain this, let's dive a bit deeper into computer networking.

To power the magic of the internet, a computer must be able to send information to another computer. To do this, it must follow 4 steps (better known as layers):
| Order | Name | Description |
| ----- | ---- | ----------- |
| 4 | Application Layer | // TODO |
| 3 | Transport Layer | // TODO |
| 2 | Internet Layer | // TODO |
| 1 | Network Layer | // TODO |

Together, this makes up the TCP/IP Model. This is a foundational networking model that defines how computers can communicate with each other.

HTTP, the protocol which we all know and love, is used at layer 4 of the model. As developers, we are most likely going to use standards created for this layer for any applications that we create. Some of those are:

- HTTP
- WebSocket
- Server-Sent Events

Under the hood of HTTP, it uses TCP. Any information we are sending over HTTP will be piggybacking on the TCP request to a different computer. TCP will be found at the transport layer of the OSI model.

Now that we have some of that background information, we can explain the difference between QUIC and HTTP/3.

HTTP/3 is the next version of the protocol. Under the hood, it will be using the QUIC protocol to send the request to different computers.

## Speed improvements with HTTP/3

As we learned above, HTTP/3 is an application layer protocol and QUIC is a transport layer protocol.

QUIC was implemented to try and solve head-of-line blocking issues found within HTTP/2.

These blocking issues would occur when a packet is lost in transmission for TCP. TCP would have to resubmit and wait for the response before processing any other requests. This is called head-of-line blocking.

QUIC is trying to solve this problem by utilizing UDP instead. TCP promises that the data will be correct and in order whereas UDP does not. On top of UDP, QUIC has implemented their own algorithm for detecting packet loss and be able to fix it.

Because of this transition from TCP -> UDP, QUIC is expected to create a faster internet.

## HTTP/3 Utilization in JavaScript

There are browsers that already allow support of `WebTransport`. `WebTransport` is a web API that uses the HTTP/3 protocol under the hood. However, you need to sending your request to a server that supports HTTP/3.

// Any example applications/demo's I can put here for this?

## NodeJS HTTP/3 Support

For all of us NodeJS fans ready for HTTP/3, don't worry! Support is here and it is, quite literally, in progress.

GitHub issue - https://github.com/nodejs/node/issues/38478
PR - https://github.com/nodejs/node/pull/44325
