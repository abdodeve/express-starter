const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

// const crypto = require('crypto');


/**
 * GET /api/users
 * Get All Users
 */
exports.fetch = function (req, res) {
    UserModel.find({}, function (err, data) {
        if (err) return next(err);
        res.json({"success": true, "users": data});
    })
};

/**
 * GET /api/users/:id
 * Get Single User
 */
exports.single = function (req, res, next) {
  UserModel.findById(req.params.id, function (err, data) {
        if (err) return next(err);
        res.json({"success": true, "user": data});
    })
};

/**
 * POST /api/users
 * Create new User
 */
exports.create = function (req, res, next) {
    // Prepare object
    let userModel = new UserModel({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
    );

    // Save
    userModel.save(function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "User created"});
    });
};

/**
 * PUT /api/users
 * Update User
 */
exports.update = function (req, res, next) {

  UserModel.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json({"success": true, "message": "User upated"});
  });

};

/**
 * DELETE /api/users
 * Delete User
 */
exports.delete = function (req, res, next) {
    UserModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "User deleted"});
    })
};


/**
 * GET /api/login
 * Login User
 */
exports.login = async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let getUser = await UserModel.findOne({ username: username });

    // Controlls
    if( !getUser || getUser.username != username || getUser.password != password ) 
            return res.status(403).json({error:'invalid_credentials', message: 'Username and/or password are incorrect'});

    let token = jwt.sign( {userData: { username: username }}, 'passphrase');
    res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });

}