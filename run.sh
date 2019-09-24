#!/bin sh
npm install pm2 -g
pm2 stop 0 --watch
pm2 start index.js --watch --node-args="--max-old-space-size=1024"