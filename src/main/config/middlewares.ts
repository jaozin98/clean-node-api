// O middleware é um software que diferentes aplicações usam para se comunicar umas com as outras
import { Express } from 'express';
import { bodyParser, cors, contentType } from '../middlewares';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
