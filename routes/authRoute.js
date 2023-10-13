const express = require('express');
const router = express.Router();

// const {handleValidationErrors} = require('../validator/validate');
// const {registerValidator} = require('../validator/authValidator');

const {
    registerUser,
    loginUser,
    requestOTP,
    verifyOTP,
    changePassword,
    resetPassword,
    verifyPasswordOtp,
    newPassword } = require('../controllers/authContollers'
    );

const {
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyModerator, } = require('../middlewares/UserAuth');

    // default route
router.get('/', (req, res) => {
    res.send('YOU GO FILL FORM TIRE. LOL. EVERUTHING AUTH DEH HERE')
})

// User registration route registerUser
router.post('/register', registerUser);

/////// LOGIN-ROUTE loginUser
router.post('/login', loginUser);

//////REQUEST OTP requestOTP
router.post('/requestotp', requestOTP);

////////VERIFY OTP verifyOTP
router.post('/verifyotp', verifyOTP);


///// CHANGE PASSWORD changePassword
router.put('/changePassword', verifyToken, changePassword);

////////RESET PASSWORD restPassword
router.post('/resetPasswordRequest', resetPassword);

//////// VERIFY PASSWORD RESET OTP verifyPasswordOtp
router.post('/verifyPasswordOTP', verifyPasswordOtp);

////// new pssword newPassword
router.put('/newPassword', newPassword);











module.exports = router;