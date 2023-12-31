/* eslint-disable no-underscore-dangle */
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import cors from 'cors';
/* import { fileURLToPath } from 'url';
import path from 'path'; */
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/index.js';
import { NotFoundError } from './errors/errors.js';
import handleError from './middlewares/handeError.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolderPath = path.join(__dirname, 'public'); */

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

/* app.use(express.static(staticFolderPath)); */

app.use(helmet());

app.use(limiter);

app.use(express.json());

app.use(requestLogger);

app.use(cors({ origin: true, credentials: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); //! удалить позже

app.use(routes);

app.use('*', () => {
  throw new NotFoundError('Данная страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
