const {Athlete, Stats, Transfer, NextMatch, CareerStat} = require('../models/Athlete');
const User = require('../models/User')

// Update athlete information
const updateAthlete = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user || !user.isAthlete) {
        return res.status(403).json({
          status: 'failed',
          message: 'User not found or is not authorized as an athlete.',
        });
      }
  
      // Prepare athlete update data
      const athleteUpdateData = {
        name: user.fullname, // Update the athlete's name with the user's full name
        bio: req.body.bio,
        dob: req.body.dob,
        age: req.body.age,
        placeOfBirth: req.body.placeOfBirth,
        location: req.body.location,
        nationality: req.body.nationality,
        position: req.body.position,
        otherPosition: req.body.otherPosition,
        yearJoined: req.body.yearJoined,
        Honours: req.body.Honours,
        height: req.body.height,
        weight: req.body.weight,
        citizenship: req.body.citizenship,
        gender: req.body.gender,
        agent: req.body.agent,
        foot: req.body.foot,
        CoverPhoto: req.body.CoverPhoto,
        currentClub: req.body.currentClub,
        currentSalary: req.body.currentSalary,
        images: req.body.images,
        socialMedia: req.body.socialMedia,
        user: userId, // Set the user ID
        email: user.email, // Include the user's email
        phoneNumber: user.phoneNumber, // Include the user's phoneNumber
        fullname: req.body.fullname, // Update the user's fullname
        email: req.body.email, // Update the user's email
      };
  
      // Find the athlete by the user's ID
      const athlete = await Athlete.findOne({ user: userId });
  
      if (athlete) {
        athlete.set(athleteUpdateData);
        await athlete.save();
      } else {
        // Create an Athlete profile
        const newAthlete = new Athlete(athleteUpdateData);
  
        await newAthlete.save();
      }
  
      // Update the User model
      await User.updateOne({ _id: userId }, athleteUpdateData);
  
      return res.status(200).json({
        status: 'success',
        message: 'Athlete profile updated successfully.',
        data: athleteUpdateData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while processing your request.',
      });
    }
  };
  
  
  

  const getAthleteProfile = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId).populate('athlete');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  


  
  


const athleteControllers = { 
    updateAthlete,
    getAthleteProfile,

};

module.exports = {
    updateAthlete,
  getAthleteProfile,
};
