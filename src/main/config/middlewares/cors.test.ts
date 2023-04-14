 // CORS impede que um site mal-intencionado acesse recursos de outro site sem permissão.
import request from 'supertest'
import app from '../app'

describe('CORS Middleware', () => {
  // Deve habilitar o CORS
  test ('Should enable CORS', async () => {
   app.get('/test_cors',(_req, res) => {
    res.send()
   })
   await request(app)
   .get('/test_cors')
   .expect('access-control-allow-origin', '*')
   .expect('access-control-allow-methods', '*')
   .expect('access-control-allow-headers', '*')
  })
})
