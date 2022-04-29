const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const port = 8000;

const server = http.createServer(app);

async function start() {
    await loadPlanetsData();
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

start();



