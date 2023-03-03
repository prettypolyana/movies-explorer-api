const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateMeValidation } = require('../validation/users');

router.get('/me', getUserInfo);

router.patch('/me', updateMeValidation, updateUserInfo);

module.exports = router;
