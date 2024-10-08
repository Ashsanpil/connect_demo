import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import fs from 'fs';
import path from 'path';

// Import routes
import JobRoutes from './routes/job.route';

// Import logger
import { logger } from './utils/logger.utils';

import { readConfiguration } from './utils/config.utils';
import { errorMiddleware } from './middleware/error.middleware';

// Ensure csv directory exists
const csvDir = path.join(__dirname, '../csv');
if (!fs.existsSync(csvDir)) {
  fs.mkdirSync(csvDir);
}

// Read env variables
readConfiguration();

const PORT = 8080;

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define routes
app.use('/job', JobRoutes);

// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Job application listening on port ${PORT}`);
});

export default server;
