import express, {Express} from 'express';
import path from 'path';
import {Server} from 'node:net';

let testsServerProcess: Server;

export const createTestsServer = (): void => {
  console.log('Creating new tests server...');
  const app: Express = express();
  app.use(express.json());
  const folderPath = path.resolve(import.meta.dirname, '');
  app.use(express.static(path.join(folderPath, 'pages')));

  testsServerProcess = app.listen('8080', (): void => {
    console.log(`Tests server is running on http://localhost:8080`);
  });
};

export const stopTestsServer = (): void => {
  testsServerProcess.close();
}