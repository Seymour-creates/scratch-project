const User = require('../models/userModel');

const cookieController = {};

/* use an ssid to store user id in a  cookie */

cookieController.setSSIDCookie = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
    .catch((err) => { if (err) console.log(err); res.render('index')});
};

// module.exports = cookieController;
//     .exec()
//     .then(() => {
        
//     });
// }
