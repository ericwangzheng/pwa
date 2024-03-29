/**
 * @file index.js
 * @description init server
 */
'use strict';
const express = require('express');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const fs = require('fs');
const http = require('http');
const spdy = require('spdy');

function startServer() {
    var app = express();

    // Redirect HTTP to HTTPS,
    app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

    // Logging for each request
    app.use((req, resp, next) => {
        const now = new Date();
        const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
        const path = `"${req.method} ${req.path}"`;
        const m = `${req.ip} - ${time} - ${path}`;
        // eslint-disable-next-line no-console
        console.log(m);
        next();
    });

    // Handle requests for static files
    app.use(express.static('public'));

    // credentials
    const credentials = {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.pem')
    };

    const httpServer = http.createServer(app);
    const httpsServer = spdy.createServer(credentials, app);

    httpServer.listen('80', '0.0.0.0', () => {
        // eslint-disable-next-line no-console
        console.log('Local DevServer Started on port 80...');
    });

    httpsServer.listen('443', '0.0.0.0', () => {
        // eslint-disable-next-line no-console
        console.log('Local DevServer Started on port 433...');
    });
}

startServer();