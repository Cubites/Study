const { User } = require('../models/User');

let auth = (req, res, next) => {
    if(req.cookie !== undefined){
        let token = req.cookie.x_auth;

        User.findbyToken(token, (err, user) => {
            if(err) throw err;
            if(!user) return res.json({ isAuth: false, error: true });
            req.token = token;
            req.user = user;
            next();
        });
    }
}

module.exports = { auth }