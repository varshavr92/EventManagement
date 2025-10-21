const jwt = require('jsonwebtoken');

// USER TOKEN VERIFY
exports.verifyUserToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded.userId) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    });
};

// ADMIN TOKEN VERIFY
exports.verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded.admin) {
            return res.status(403).json({ message: "Invalid admin token" });
        }
        next();
    });
};
