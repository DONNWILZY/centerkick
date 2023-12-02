const Team = require('../models/Team');
const User = require('../models/User'); // Assuming there's a User model

const createTeam = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (deletedTeam) {
      res.status(200).json({ message: 'Team deleted successfully' });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedTeam) {
      res.status(200).json(updatedTeam);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const allTeams = await Team.find().populate('players');
    res.status(200).json(allTeams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id).populate('players');
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addPlayersToTeam = async (req, res) => {
  const { id } = req.params;
  const { playerIds } = req.body;
  try {
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const players = await User.find({ _id: { $in: playerIds } });
    if (players.length !== playerIds.length) {
      return res.status(400).json({ message: 'One or more players not found' });
    }

    team.players = [...new Set([...team.players, ...playerIds])];
    await team.save();

    res.status(200).json({ message: 'Players added successfully', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAndRemovePlayersInTeam = async (req, res) => {
  const { id } = req.params;
  const { addPlayerIds, removePlayerIds } = req.body;
  try {
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (addPlayerIds) {
      const playersToAdd = await User.find({ _id: { $in: addPlayerIds } });
      if (playersToAdd.length !== addPlayerIds.length) {
        return res.status(400).json({ message: 'One or more players to add not found' });
      }
      team.players = [...new Set([...team.players, ...addPlayerIds])];
    }

    if (removePlayerIds) {
      team.players = team.players.filter(playerId => !removePlayerIds.includes(playerId.toString()));
    }

    await team.save();

    res.status(200).json({ message: 'Players updated/removed successfully', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createTeam,
  deleteTeamById,
  updateTeamById,
  getAllTeams,
  getTeamById,
  addPlayersToTeam,
  updateAndRemovePlayersInTeam,
};
