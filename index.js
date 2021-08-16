const { PORT, MONGO_URI } = require('./src/config');

const moongose = require('mongoose');
const app = require('./src/app');
const { createDefaultUsers } = require('./src/utils/helpers');

moongose
  .connect(MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      //if no users create 2 default users
      createDefaultUsers();

      app.listen(PORT, () => {
        console.log(
          'Connected successfully to mongo!',
          MONGO_URI.includes('localhost')
            ? 'on localhost:27017'
            : 'on MongoDB Atlas'
        );
        console.log(`Listening at http://localhost:${PORT}`);
      });
    },
    (error) =>
      console.log('Something failed connecting to mongo', error.message)
  );
