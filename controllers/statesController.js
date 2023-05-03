const States = require('../model/States');

// Function to get all states
const getAllStates = async (req, res) => {
  const states = await res.states;
  const mongoStates = await States.find({}).exec();

  let merged = [];
  states.forEach((state) => {
    const stateExists = mongoStates.find((st) => st.stateCode === state.code);
    if (stateExists) {
      const funfacts = stateExists.funfacts;
      merged.push({ ...state, funfacts });
    } else {
      merged.push(state);
    }
  });
  res.json(merged);
};

// Function to get a single state
const getOneState = async (req, res) => {
  const state = await res.state;
  const mongoState = await States.findOne({ stateCode: state.code }).exec();

  if (mongoState) {
    const funfacts = mongoState.funfacts;
    res.json({ ...state, funfacts });
  } else {
    res.json(state);
  }
};

// Functions to get specific state attributes
const getCapital = async (req, res) => {
  const state = await res.state.state;
  const capital = await res.state.capital_city;
  res.json({ state, capital });
};

const getNickname = async (req, res) => {
  const state = await res.state.state;
  const nickname = await res.state.nickname;
  res.json({ state, nickname });
};

const getPopulation = async (req, res) => {
  const state = await res.state.state;
  let population = await res.state.population;
  population = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  res.json({ state, population });
};

const getAdmission = async (req, res) => {
  const state = await res.state.state;
  const admitted = await res.state.admission_date;
  res.json({ state, admitted });
};

// Exporting the functions
module.exports = {
  getAllStates,
  getOneState,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
};
