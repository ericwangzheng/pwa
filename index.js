/**
 * @file index.js
 * @description init server
 */
'use strict';
const express = require('express');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const fs = require('fs');

function startServer() {
    // credentials
    const credentials = {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.pem')
    };

    var app = express(credentials);

    // Redirect HTTP to HTTPS,
    // app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

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

    // Start the server
    return app.listen('80', '0.0.0.0', () => {
        // eslint-disable-next-line no-console
        console.log('Local DevServer Started on port 80...');
    });
}

startServer();