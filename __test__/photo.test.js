const request = require('supertest')

const app = require('../app');
const { sequelize } = require('../models');

let photoResponse;
let token;
beforeAll(() => {
  const userData = {
    username: 'pertama',
    email: 'pertama@gmail.com',
    password: '123456'
  }
  return request(app).post('/users/register').send(userData).then((res) => {
    return request(app).post('/users/login').send(userData).then(res => token = res.body.token);
  });
})

const photo = {
  title: 'photo user 1',
  caption: 'Photo saya lagi di pantai',
  image_url: 'https://asset.farhan.com'
}

describe('GET /photos', () => {
  it('should send response with 200 status code even empty', (done) => {
    request(app)
    .get('/photos')
    .set('token', token)
    .end((err, res) => {
      if(err) {
        done(err);
      }
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      done()
    })
  })
  it('should send response with 401 status code when token not given', (done) => {
    request(app)
    .get('/photos')
    .end((err, res) => {
      if(err) {
        done(err);
      }
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      done();
    })
  })
})

describe('POST /photos', () => {
  it('should send response with 201 status code', (done) => {
    request(app)
    .post('/photos')
    .send(photo)
    .set('token', token)
    .end((err, res) => {
      if(err) {
        done(err);
      }
      photoResponse = res.body.id
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('image_url');
      expect(res.body).toHaveProperty('UserId');
      done();
    })
  })
  it('should send response with 401 status code when token not given', (done) => {
    request(app)
    .post('/photos')
    .send(photo)
    .end((err, res) => {
      if(err) {
        done(err);
      }
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      done();
    })
  })
})

describe('GET But Have Data /photos', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
    .get('/photos')
    .set('token', token)
    .end((err, res) => {
      if(err) {
        done(err);
      }
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('caption');
      expect(res.body[0]).toHaveProperty('image_url');
      expect(res.body[0]).toHaveProperty('User');
      expect(typeof res.body[0].User).toEqual('object');
      done();
    })
  })
})

describe('GET ONE /photos', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
    .get(`/photos/${photoResponse}`)
    .set('token', token)
    .end((err, res) => {
      if(err) {
        done(err);
      }
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('caption');
      expect(res.body).toHaveProperty('image_url');
      expect(res.body).toHaveProperty('UserId');
      done();
    })
  })
  it('should send response with 401 status code when token not given', (done) => {
    request(app)
    .get(`/photos/${photoResponse}`)
    .end((err, res) => {
      if(err) {
        done(err);
      }
      expect(res.statusCode).toEqual(401);
      expect(typeof res.body).toEqual('object');
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('message')
      done();
    })
  })
})

afterAll((done) => {
  sequelize.queryInterface.bulkDelete('Users', {})
    .then((res) => {
      return done();
    })
    .catch((err) => {
      return done(err)
    })
  sequelize.queryInterface.bulkDelete('Photos', {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      return done(err);
    })
})