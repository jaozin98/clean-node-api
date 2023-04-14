// tipo de conteudo
import request from 'supertest';
import app from '../app';

describe('Content-Type Middleware', () => {
  // Deve retornar o tipo de conteúdo padrão como JSON
  test('Should return default Content-Type as JSON', async () => {
    app.get('/test_content_type', (_req, res) => res.send(''));

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });
      // Deve retornar xml Content-Type quando forçado
  test('Should return xml Content-Type when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml');
      return res.send('');
    });

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
