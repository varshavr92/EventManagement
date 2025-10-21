const express = require('express');
const router = express.Router();

const { registerUser, loginUser, loginAdmin } = require('../controllers/authController');
const { verifyUserToken, verifyAdminToken } = require('../middleware/authMiddleware');

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin Route
router.post('/admin/login', loginAdmin);

// Example protected routes
router.get('/user/protected', verifyUserToken, (req, res) => {
    res.json({ message: "User protected route accessed" });
});

router.get('/admin/protected', verifyAdminToken, (req, res) => {
    res.json({ message: "Admin protected route accessed" });
});

module.exports = router;
