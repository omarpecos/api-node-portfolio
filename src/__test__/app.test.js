const mongoose = require('mongoose');
const request = require('supertest');
const { MONGO_URI } = require('../config');
const { Technology } = require('../models');
const app = require('../app');

const mongoURITest = MONGO_URI + '_test';

let techId;

describe('Endpoint E2E integration tests', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoURITest, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    mongoose.Promise = Promise;
    await Technology.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Techs endpoints', () => {
    afterEach(async () => {
      await Technology.deleteMany({});
    });

    it('should create a technology', async () => {
      const res = await request(app).post('/api/techs').send({
        name: 'GraphQL',
        type: 'backend',
        icon:
          'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });
      const techsCount = await Technology.countDocuments();

      expect(res.status).toBe(200);
      expect(techsCount).toBe(1);
    });

    it('should return a list of techs', async () => {
      const res = await request(app).post('/api/techs').send({
        name: 'GraphQL',
        type: 'backend',
        icon:
          'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });
      const techs = await request(app).get('/api/techs');

      expect(techs.status).toBe(200);
      expect(techs.body.data).toHaveLength(1);
    });

    it('should update a tech', async () => {
      const resCreate = await request(app).post('/api/techs').send({
        name: 'GraphQL',
        type: 'backend',
        icon:
          'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });

      techId = resCreate.body.data._id;

      const resUpdate = await request(app).post('/api/techs').send({
        _id: techId,
        name: 'Apollo Server',
      });

      expect(resUpdate.status).toBe(200);
      expect(resUpdate.body.data).toHaveProperty('name', 'Apollo Server');
    });

    it('should throw 404 trying to delete tech', async () => {
      const resDelete = await request(app).delete('/api/techs/' + techId);

      expect(resDelete.status).toBe(404);
    });

    it('should delete a tech', async () => {
      const resCreate = await request(app).post('/api/techs').send({
        name: 'GraphQL',
        type: 'backend',
        icon:
          'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });

      techId = resCreate.body.data._id;

      const resDelete = await request(app).delete('/api/techs/' + techId);

      expect(resDelete.status).toBe(200);
    });
  });
});
