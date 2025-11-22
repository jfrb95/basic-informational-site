import http from 'http';
import fs from 'fs';
import path from 'path';

const log = console.log;

const routes = generateRoutes();

//This creates a server that executes the function in the argument when a request is made
const server = http.createServer(loadPage);

server.listen(8080);

//this function determines a corresponding path to the request url, which takes from the href of an <a>
// in this case. Then the page at that path is loaded
function loadPage(request, response) {

  const pageRoute =
    request.url === '/'
      ? 'index.html'
      : 'pages/' + (routes[request.url] || '404.html');

  fs.readFile(pageRoute, (error, data) => {
    if (error) {
      throw new Error('Failed to read file', error.message);
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(data);
  });
}

//this function creates an object whose keys are request urls and items are paths to the corresponding documents
function generateRoutes() {
  try {
    const pages = fs.readdirSync(import.meta.dirname + '/pages');

    const routes = pages.reduce((routesObject, pageFileName) => {
      const pageRoute = '/' + path.parse(pageFileName).name;
      routesObject[pageRoute] = pageFileName;
      return routesObject;
    }, { '/': 'index.html' });

    return routes;

  } catch (error) {
    throw new Error(`Failed to generate routes: ${error.message}`);
  }
}