const mongoose = require('mongoose');
const State = require('./models/States');

mongoose.connect('mongodb://localhost:27017/USStates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const statesFunFacts = [

  {
    stateCode: 'KS',
    funfacts: [
      'Kansas Fun Fact 1',
      'Kansas Fun Fact 2',
      'Kansas Fun Fact 3',
    ],
  },
  {
    stateCode: 'MO',
    funfacts: [
      'Missouri Fun Fact 1',
      'Missouri Fun Fact 2',
      'Missouri Fun Fact 3',
    ],
  },
  {
    stateCode: 'OK',
    funfacts: [
      'Oklahoma Fun Fact 1',
      'Oklahoma Fun Fact 2',
      'Oklahoma Fun Fact 3',
    ],
  },
  {
    stateCode: 'NE',
    funfacts: [
      'Nebraska Fun Fact 1',
      'Nebraska Fun Fact 2',
      'Nebraska Fun Fact 3',
    ],
  },
  {
    stateCode: 'CO',
    funfacts: [
      'Colorado Fun Fact 1',
      'Colorado Fun Fact 2',
      'Colorado Fun Fact 3',
    ],
  },
];

State.insertMany(statesFunFacts, { ordered: false })
  .then(() => {
    console.log('Fun facts added');
    mongoose.connection.close();
  })
  .catch((err) => {
  if (err.name === 'BulkWriteError' && err.result && err.result.result && err.result.result.writeErrors) {
    for (let i = 0; i < err.result.result.writeErrors.length; ++i) {
      console.log(err.result.result.writeErrors[i].errmsg);
    }
  } else {
    console.log(err);
  }
});

