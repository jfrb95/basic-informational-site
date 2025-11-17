import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const log = console.log;

async function generateRoutes() {
  try {
    const pages = await fs.readdir(import.meta.dirname + '/pages');

    const routes = pages.reduce((routesObject, pageFileName) => {
      const pageRoute = '/' + path.parse(pageFileName).name;
      routesObject[pageRoute] = pageFileName;
      return routesObject;
    }, { '/': 'index.html' });

    return routes;

  } catch(error) {
    throw new Error(`Failed to generate routes: ${error.message}`);
  }
}


const server = http.createServer((req, res) => {
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end();
})

//server.listen(8080);

