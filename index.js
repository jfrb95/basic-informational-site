import http from 'http';
import fs from 'fs';
import path from 'path';

const log = console.log;

const pages = fs.readdirSync(import.meta.dirname + '/pages');

const routes = pages.reduce((routesObject, pageFileName) => {
  const pageRoute = '/' + path.parse(pageFileName).name;
  routesObject[pageRoute] = pageFileName;
  return routesObject;
}, { '/': 'index.html' });



const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }))
})

//server.listen(8080);