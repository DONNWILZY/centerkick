const fixturesModel = require('../models/Fixtures');

// Create a new fixture
const createFixture = async (req, res) => {
  try {
    const newFixture = await fixturesModel.create(req.body);
    res.status(201).json(newFixture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all fixtures
const getAllFixtures = async (req, res) => {
  try {
    const allFixtures = await fixturesModel.find();
    res.status(200).json(allFixtures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get fixture by ID
const getFixtureById = async (req, res) => {
  const { id } = req.params;
  try {
    const fixture = await fixturesModel.findById(id);
    if (fixture) {
      res.status(200).json(fixture);
    } else {
      res.status(404).json({ message: 'Fixture not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update fixture by ID
const updateFixtureById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFixture = await fixturesModel.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedFixture) {
      res.status(200).json(updatedFixture);
    } else {
      res.status(404).json({ message: 'Fixture not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete fixture by ID
const deleteFixtureById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFixture = await fixturesModel.findByIdAndDelete(id);
    if (deletedFixture) {
      res.status(200).json({ message: 'Fixture deleted successfully' });
    } else {
      res.status(404).json({ message: 'Fixture not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createFixture,
  getAllFixtures,
  getFixtureById,
  updateFixtureById,
  deleteFixtureById,
};
