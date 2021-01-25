const { PORT, MONGO_URI } = require('./src/config');

const moongose = require('mongoose');
const app = require('./src/app');

moongose
  .connect(MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      app.listen(PORT, () => {
        console.log('Connected successfully to mongo!');
        console.log(`Listening at http://localhost:${PORT}`);
      });
    },
    (error) =>
      console.log('Something failed connecting to mongo', error.message)
  );
