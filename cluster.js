import cluster from 'cluster';
import { availableParallelism } from 'os';
import { getFolderPath } from './src/utils/_utils.js'
import { join } from 'path'

const CPU_CORES = availableParallelism()
console.log('', getFolderPath(import.meta.url));
cluster.setupPrimary({
    exec: join(getFolderPath(import.meta.url), 'src', "server.js")
});

console.log(`Number of CPUs is ${CPU_CORES}`);
console.log(`Primary pid=${process.pid}`);

// Fork workers
for (let index = 0; index < CPU_CORES; index++) {
    cluster.fork()
}

// Listen for worker process exits
cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
});

process.on('error', console.error)
// -- To generate local ssl run
// -- openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365