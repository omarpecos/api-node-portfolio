const mongoose = require('mongoose');
const request = require('supertest');
const { MONGO_URI } = require('../config');
const { Technology, Profile, Course } = require('../models');
const app = require('../app');

const mongoURITest = MONGO_URI + '_test';

describe('Endpoint E2E integration tests', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoURITest, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    mongoose.Promise = Promise;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a 404 if the route is not defined', async () => {
    const res = await request(app).get('/api/v1/false_route');

    expect(res.status).toBe(404);
  });

  describe('Techs endpoints', () => {
    let techId;

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

  describe('Profile endpoints', () => {
    let techId;
    let techName;

    beforeAll(async () => {
      const tech = await Technology.create({
        name: 'GraphQL',
        type: 'backend',
        icon:
          'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });
      techId = tech._id;
      techName = tech.name;
    });
    afterEach(async () => {
      await Profile.deleteMany({});
    });

    afterAll(async () => {
      await Technology.deleteMany({});
    });

    it('should create a profile', async () => {
      const res = await request(app)
        .post('/api/profile')
        .send({
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text:
              'En mi ciclo hemos trabajado bastante PHP sobretodo Laravel y JavaScript . Yo por mi cuenta me he puesto a aprender más tecnologías para poder ampliar mis posibilidades y este es mi stack tecnológico ',
            skills: [{ tech: techId, percentage: 60 }],
          },
          version: 1,
        });
      const profileCount = await Profile.countDocuments();

      expect(res.status).toBe(200);
      expect(profileCount).toBe(1);
    });

    it('should return most recent profile', async () => {
      const resCreate = await request(app)
        .post('/api/profile')
        .send({
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text:
              'En mi ciclo hemos trabajado bastante PHP sobretodo Laravel y JavaScript . Yo por mi cuenta me he puesto a aprender más tecnologías para poder ampliar mis posibilidades y este es mi stack tecnológico ',
            skills: [{ tech: techId, percentage: 60 }],
          },
          version: 1,
        });
      const res = await request(app).get('/api/profile');

      expect(res.status).toBe(200);
      expect(res.body.data.about.skills[0].tech).toHaveProperty(
        'name',
        techName
      );
    });

    it('should update a profile', async () => {
      const resCreate = await request(app)
        .post('/api/profile')
        .send({
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text:
              'En mi ciclo hemos trabajado bastante PHP sobretodo Laravel y JavaScript . Yo por mi cuenta me he puesto a aprender más tecnologías para poder ampliar mis posibilidades y este es mi stack tecnológico ',
            skills: [{ tech: techId, percentage: 60 }],
          },
          version: 1,
        });

      let profileId = resCreate.body.data._id;

      const resUpdate = await request(app)
        .post('/api/profile')
        .send({
          _id: profileId,
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text: 'nuevo text',
            skills: [{ tech: techId, percentage: 60 }],
          },
          version: 1,
        });

      expect(resUpdate.status).toBe(200);
      expect(resUpdate.body.data.about.text).toBe('nuevo text');
    });
  });

  describe('Courses endpoints', () => {
    let techId;
    let courseId;

    beforeAll(async () => {
      const tech = await Technology.create({
        name: 'GraphQL',
        type: 'backend',
        icon:
          'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });
      techId = tech._id;
    });

    afterEach(async () => {
      await Course.deleteMany({});
    });

    afterAll(async () => {
      await Technology.deleteMany({});
    });

    it('should create a course', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url:
            'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });

      courseId = res.body.data._id;
      const coursesCount = await Course.countDocuments();

      expect(res.status).toBe(200);
      expect(coursesCount).toBe(1);
    });

    it('should return a list of courses', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url:
            'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });
      const courses = await request(app).get('/api/courses');

      expect(courses.status).toBe(200);
      expect(courses.body.data).toHaveLength(1);
    });

    it('should update a course', async () => {
      const resCreate = await request(app)
        .post('/api/courses')
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url:
            'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });

      courseId = resCreate.body.data._id;

      const resUpdate = await request(app).post('/api/courses').send({
        _id: techId,
        platform: 'OpenWebinars',
      });

      expect(resUpdate.status).toBe(200);
      expect(resUpdate.body.data).toHaveProperty('platform', 'OpenWebinars');
    });

    it('should throw 404 trying to delete course', async () => {
      const resDelete = await request(app).delete('/api/courses/' + courseId);

      expect(resDelete.status).toBe(404);
    });

    it('should delete a course', async () => {
      const resCreate = await request(app)
        .post('/api/courses')
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url:
            'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });

      courseId = resCreate.body.data._id;

      const resDelete = await request(app).delete('/api/courses/' + courseId);

      expect(resDelete.status).toBe(200);
    });
  });
});
