const jwt = require("jsonwebtoken")
const requireLogin = (req, res, next) => {
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Authorization failed" })
            } else {
                req.user = decoded.user
                next()
            }
        })
        if (!token) {
            return res.status(400).json({ error: "Authorization failed" })
        }
    }
}
module.exports = requireLogin