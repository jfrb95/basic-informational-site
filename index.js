import http from 'http';
import fs from 'fs';
import dirname from 'path';

const log = console.log;

const allFiles = fs.readdirSync(import.meta.dirname + '/pages');
log(allFiles)


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }))
})

//server.listen(8080);