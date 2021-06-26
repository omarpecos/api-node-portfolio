const mongoose = require('mongoose');
const request = require('supertest');
const { MONGO_URI } = require('../config');
const { Technology, Profile, Course, Project, User } = require('../models');
const app = require('../app');
const { hashPassword } = require('../utils');

const mongoURITest = MONGO_URI.replace(
  'omarpv_portfolio_db',
  'omarpv_portfolio_db_test'
);
console.log('mi cadena de tests !! >>> ', mongoURITest);

describe('Endpoint E2E integration tests', () => {
  let adminId;
  let userId;
  let userToken;
  let adminToken;

  beforeAll(async () => {
    await mongoose.connect(mongoURITest, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    mongoose.Promise = Promise;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it.only('should return a 404 if the route is not defined', async () => {
    const res = await request(app).get('/api/v1/false_route');

    expect(res.status).toBe(404);
  });

  describe.only('Auth endpoints', () => {
    it('should create a admin user', async () => {
      const hashedPass = hashPassword('omar');
      const admin = await User.create({
        nickname: 'omarpv',
        email: 'o@o.com',
        role: 1,
        password: hashedPass,
      });

      adminId = admin._id;

      expect(admin.role).toBe(1);
      expect(admin.email).toBe('o@o.com');
    });

    it('should create a regular user', async () => {
      const res = await request(app).post('/api/auth/register').send({
        nickname: 'manuel',
        email: 'm@m.com',
        password: 'manuel',
        passwordConfirmation: 'manuel',
      });

      userId = res.body.data._id;

      expect(res.status).toBe(201);
    });

    it('admin should login successfully', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'o@o.com',
        password: 'omar',
      });

      adminToken = res.body.data.token;

      expect(res.status).toBe(200);
    });

    it('user should login successfully', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'm@m.com',
        password: 'manuel',
      });

      userToken = res.body.data.token;

      expect(res.status).toBe(200);
    });
  });

  describe('Users endpoints', () => {
    it('should return a list of users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', adminToken);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
    });

    it('should return 403 trying to edit other user (not admin)', async () => {
      const res = await request(app)
        .patch('/api/users/' + adminId)
        .send({
          nickname: 'newNick',
        })
        .set('Authorization', userToken);

      expect(res.status).toBe(403);
    });

    it('should grant successfully a user', async () => {
      const res = await request(app)
        .post('/api/users/' + userId + '/admin')
        .send({
          admin: true,
        })
        .set('Authorization', adminToken);

      expect(res.status).toBe(200);
      expect(res.body.data.role).toBe(1);
    });

    it('should revoke successfully a user', async () => {
      const res = await request(app)
        .post('/api/users/' + userId + '/admin')
        .send({
          admin: false,
        })
        .set('Authorization', adminToken);

      expect(res.status).toBe(200);
      expect(res.body.data.role).toBe(0);
    });

    it('should edit other user (admin)', async () => {
      const res = await request(app)
        .patch('/api/users/' + userId)
        .send({
          nickname: 'newNick',
        })
        .set('Authorization', adminToken);

      expect(res.status).toBe(200);
      expect(res.body.data.nickname).toBe('newNick');
    });

    it('should delete other user (admin)', async () => {
      const resCreate = await request(app).post('/api/auth/register').send({
        nickname: 'otro',
        email: 'otro@otro.com',
        password: 'otro',
        passwordConfirmation: 'otro',
      });

      let otherUserId = resCreate.body.data._id;

      const res = await request(app)
        .delete('/api/users/' + otherUserId)
        .set('Authorization', adminToken);

      expect(res.status).toBe(200);
    });

    it('should throw 403 trying to delete other user (no admin)', async () => {
      const resCreate = await request(app).post('/api/auth/register').send({
        nickname: 'otro',
        email: 'otro@otro.com',
        password: 'otro',
        passwordConfirmation: 'otro',
      });

      let otherUserId = resCreate.body.data._id;

      const res = await request(app)
        .delete('/api/users/' + otherUserId)
        .set('Authorization', userToken);

      expect(res.status).toBe(403);
    });
  });

  describe.only('Techs endpoints', () => {
    let techId;

    afterEach(async () => {
      await Technology.deleteMany({});
    });

    it('should create a technology (only admin)', async () => {
      const res = await request(app)
        .post('/api/techs')
        .set('Authorization', adminToken)
        .send({
          name: 'GraphQL',
          type: 'backend',
          icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
        });
      const techsCount = await Technology.countDocuments();

      expect(res.status).toBe(200);
      expect(techsCount).toBe(1);
    });

    it('should return a list of techs', async () => {
      const res = await request(app)
        .post('/api/techs')
        .set('Authorization', adminToken)
        .send({
          name: 'GraphQL',
          type: 'backend',
          icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
        });
      const techs = await request(app).get('/api/techs');

      expect(techs.status).toBe(200);
      expect(techs.body.data).toHaveLength(1);
    });

    it('should update a tech (only admin)', async () => {
      const resCreate = await request(app)
        .post('/api/techs')
        .set('Authorization', adminToken)
        .send({
          name: 'GraphQL',
          type: 'backend',
          icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
        });

      techId = resCreate.body.data._id;

      const resUpdate = await request(app)
        .put(`/api/techs/${techId}`)
        .set('Authorization', adminToken)
        .send({
          name: 'Apollo Server',
        });

      expect(resUpdate.status).toBe(200);
      expect(resUpdate.body.data).toHaveProperty('name', 'Apollo Server');
    });

    it('should throw 404 trying to delete not existing tech', async () => {
      const resDelete = await request(app)
        .delete('/api/techs/' + techId)
        .set('Authorization', adminToken);

      expect(resDelete.status).toBe(404);
    });

    it('should throw 401 trying to delete tech (invalid or null token)', async () => {
      const resCreate = await request(app)
        .post('/api/techs')
        .set('Authorization', adminToken)
        .send({
          name: 'GraphQL',
          type: 'backend',
          icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
        });

      techId = resCreate.body.data._id;
      const resDelete = await request(app).delete('/api/techs/' + techId);

      expect(resDelete.status).toBe(401);
    });

    it('should throw 403 trying to delete tech (with regular user token)', async () => {
      const resCreate = await request(app)
        .post('/api/techs')
        .set('Authorization', adminToken)
        .send({
          name: 'GraphQL',
          type: 'backend',
          icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
        });
      techId = resCreate.body.data._id;

      const resDelete = await request(app)
        .delete('/api/techs/' + techId)
        .set('Authorization', userToken);

      expect(resDelete.status).toBe(403);
    });

    it('should delete a tech (only admin)', async () => {
      const resCreate = await request(app)
        .post('/api/techs')
        .set('Authorization', adminToken)
        .send({
          name: 'GraphQL',
          type: 'backend',
          icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
        });

      techId = resCreate.body.data._id;

      const resDelete = await request(app)
        .delete('/api/techs/' + techId)
        .set('Authorization', adminToken);

      expect(resDelete.status).toBe(204);
    });
  });

  describe('Profile endpoints', () => {
    let techId;
    let techName;

    beforeAll(async () => {
      const tech = await Technology.create({
        name: 'GraphQL',
        type: 'backend',
        icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
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
        .set('Authorization', userToken)
        .send({
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text: 'En mi ciclo hemos trabajado bastante PHP sobretodo Laravel y JavaScript . Yo por mi cuenta me he puesto a aprender más tecnologías para poder ampliar mis posibilidades y este es mi stack tecnológico ',
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
        .set('Authorization', userToken)
        .send({
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text: 'En mi ciclo hemos trabajado bastante PHP sobretodo Laravel y JavaScript . Yo por mi cuenta me he puesto a aprender más tecnologías para poder ampliar mis posibilidades y este es mi stack tecnológico ',
            skills: [{ tech: techId, percentage: 60 }],
          },
          version: 1,
        });
      const res = await request(app)
        .get('/api/profile')
        .set('Authorization', userToken);

      expect(res.status).toBe(200);
      expect(res.body.data.about.skills[0].tech).toHaveProperty(
        'name',
        techName
      );
    });

    it('should update a profile', async () => {
      const resCreate = await request(app)
        .post('/api/profile')
        .set('Authorization', userToken)
        .send({
          intro:
            'HTML5, CSS3, JavaScript, Angular, (React y Vue algo más basico pero me defiendo) , PHP, Laravel , MySQL, MongoDB, NodeJS, Express y GraphQL tanto la parte backend (ApolloServer) y la parte frontend (ApolloClient - ApolloAngular)',
          about: {
            text: 'En mi ciclo hemos trabajado bastante PHP sobretodo Laravel y JavaScript . Yo por mi cuenta me he puesto a aprender más tecnologías para poder ampliar mis posibilidades y este es mi stack tecnológico ',
            skills: [{ tech: techId, percentage: 60 }],
          },
          version: 1,
        });

      let profileId = resCreate.body.data._id;

      const resUpdate = await request(app)
        .post('/api/profile')
        .set('Authorization', userToken)
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
        icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
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
        .set('Authorization', adminToken)
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/ultimate-react-native-with-firebase',
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
        .set('Authorization', adminToken)
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });
      const courses = await request(app)
        .get('/api/courses')
        .set('Authorization', adminToken);

      expect(courses.status).toBe(200);
      expect(courses.body.data).toHaveLength(1);
    });

    it('should update a course', async () => {
      const resCreate = await request(app)
        .post('/api/courses')
        .set('Authorization', adminToken)
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });

      courseId = resCreate.body.data._id;

      const resUpdate = await request(app)
        .post('/api/courses')
        .set('Authorization', adminToken)
        .send({
          _id: courseId,
          platform: 'OpenWebinars',
        });

      expect(resUpdate.status).toBe(200);
      expect(resUpdate.body.data).toHaveProperty('platform', 'OpenWebinars');
    });

    it('should throw 404 trying to delete not existing course', async () => {
      const resDelete = await request(app)
        .delete('/api/courses/' + courseId)
        .set('Authorization', adminToken);

      expect(resDelete.status).toBe(404);
    });

    it('should throw 403 trying to delete course not created by this user', async () => {
      const resCreate = await request(app)
        .post('/api/courses')
        .set('Authorization', adminToken)
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });

      courseId = resCreate.body.data._id;

      const resDelete = await request(app)
        .delete('/api/courses/' + courseId)
        .set('Authorization', userToken);

      expect(resDelete.status).toBe(403);
    });

    it('should delete a course', async () => {
      const resCreate = await request(app)
        .post('/api/courses')
        .set('Authorization', adminToken)
        .send({
          name: 'Crypto App with React Native',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/ultimate-react-native-with-firebase',
          language: 'Inglés',
          duration: 51,
          techs: [techId],
          done: true,
        });

      courseId = resCreate.body.data._id;

      const resDelete = await request(app)
        .delete('/api/courses/' + courseId)
        .set('Authorization', adminToken);

      expect(resDelete.status).toBe(200);
    });
  });

  describe('Projects endpoints', () => {
    let techId;
    let projectId;

    beforeAll(async () => {
      const tech = await Technology.create({
        name: 'GraphQL',
        type: 'backend',
        icon: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/034/square_256/graphqllogo.png',
      });
      techId = tech._id;
    });

    afterEach(async () => {
      await Project.deleteMany({});
    });

    afterAll(async () => {
      await Technology.deleteMany({});
    });

    it('should create a project', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          name: 'API Cuak',
          type: 'backend',
          techs: [techId],
          images: [
            'https://devopedia.org/images/article/147/8496.1558526064.jpg',
          ],
          description: 'API with GraphQL (Apollo Server)',
          url: 'https://api-graphql-cuak.glitch.me/graphql',
          files: ['https://drive.com/apicuak.zip'],
          pinned: true,
        });

      projectId = res.body.data._id;
      const projectsCount = await Project.countDocuments();

      expect(res.status).toBe(200);
      expect(projectsCount).toBe(1);
    });

    it('should return a list of projects', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          name: 'API Cuak',
          type: 'backend',
          techs: [techId],
          images: [
            'https://devopedia.org/images/article/147/8496.1558526064.jpg',
          ],
          description: 'API with GraphQL (Apollo Server)',
          url: 'https://api-graphql-cuak.glitch.me/graphql',
          files: ['https://drive.com/apicuak.zip'],
          pinned: true,
        });
      const projects = await request(app)
        .get('/api/projects')
        .set('Authorization', userToken);

      expect(projects.status).toBe(200);
      expect(projects.body.data).toHaveLength(1);
    });

    it('should update a project', async () => {
      const resCreate = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          name: 'API Cuak',
          type: 'backend',
          techs: [techId],
          images: [
            'https://devopedia.org/images/article/147/8496.1558526064.jpg',
          ],
          description: 'API with GraphQL (Apollo Server)',
          url: 'https://api-graphql-cuak.glitch.me/graphql',
          files: ['https://drive.com/apicuak.zip'],
          pinned: true,
        });

      projectId = resCreate.body.data._id;

      const resUpdate = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          _id: projectId,
          description: 'new description',
        });

      expect(resUpdate.status).toBe(200);
      expect(resUpdate.body.data).toHaveProperty(
        'description',
        'new description'
      );
    });

    it('should throw 404 trying to delete not existing project', async () => {
      const resDelete = await request(app)
        .delete('/api/projects/' + projectId)
        .set('Authorization', userToken);

      expect(resDelete.status).toBe(404);
    });

    it('should throw 401 trying to delete project (invalid token or null)', async () => {
      const resCreate = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          name: 'API Cuak',
          type: 'backend',
          techs: [techId],
          images: [
            'https://devopedia.org/images/article/147/8496.1558526064.jpg',
          ],
          description: 'API with GraphQL (Apollo Server)',
          url: 'https://api-graphql-cuak.glitch.me/graphql',
          files: ['https://drive.com/apicuak.zip'],
          pinned: true,
        });

      projectId = resCreate.body.data._id;

      const resDelete = await request(app).delete('/api/projects/' + projectId);

      expect(resDelete.status).toBe(401);
    });

    it('should throw 403 trying to delete project (other user token)', async () => {
      const resCreate = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          name: 'API Cuak',
          type: 'backend',
          techs: [techId],
          images: [
            'https://devopedia.org/images/article/147/8496.1558526064.jpg',
          ],
          description: 'API with GraphQL (Apollo Server)',
          url: 'https://api-graphql-cuak.glitch.me/graphql',
          files: ['https://drive.com/apicuak.zip'],
          pinned: true,
        });

      projectId = resCreate.body.data._id;

      const resDelete = await request(app)
        .delete('/api/projects/' + projectId)
        .set('Authorization', adminToken);

      expect(resDelete.status).toBe(403);
    });

    it('should delete a project', async () => {
      const resCreate = await request(app)
        .post('/api/projects')
        .set('Authorization', userToken)
        .send({
          name: 'API Cuak',
          type: 'backend',
          techs: [techId],
          images: [
            'https://devopedia.org/images/article/147/8496.1558526064.jpg',
          ],
          description: 'API with GraphQL (Apollo Server)',
          url: 'https://api-graphql-cuak.glitch.me/graphql',
          files: ['https://drive.com/apicuak.zip'],
          pinned: true,
        });

      projectId = resCreate.body.data._id;

      const resDelete = await request(app)
        .delete('/api/projects/' + projectId)
        .set('Authorization', userToken);

      expect(resDelete.status).toBe(200);
    });
  });
});
