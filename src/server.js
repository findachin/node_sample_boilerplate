import { createServer } from 'https';
import app from "../app/www.js";
import { readFileSync } from 'fs';
import terminate from "./utils/terminate.js";
import { join } from 'path';
import { getFolderPath } from './utils/_utils.js'


const __dirname = getFolderPath(import.meta.url);
const PORT = 2000
const options = {
    key: readFileSync(join(__dirname, '../certs/key.pem')),
    cert: readFileSync(join(__dirname, '../certs/cert.pem')),
};

const server = createServer(options, app)

console.log(`Worker PID=${process.pid}`);

const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500
})

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))


server.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})