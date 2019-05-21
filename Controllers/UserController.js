const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
    // Hash password
    var hash = bcrypt.hashSync(req.body.password, 10);

    // Prepare object
    let userModel = new UserModel({
            name: req.body.name,
            username: req.body.username,
            password: hash
        }
    );

    // Save
    userModel.save(function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "User created"});
    });
};

/**
 * PUT /api/users/:id
 * Update User
 */
exports.update = function (req, res, next) {
    UserModel.findById(req.params.id, req.body, function (err, user) {
        if (err) return next(err);

        user.name = req.body.name;
        user.username = req.body.username;
        user.save();
        return res.json({"success": true, "message": "User upated"});
    });

};

/**
 * DELETE /api/users/:id
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

    // For the given username fetch user from DB
    let getUser = await UserModel.findOne({ username: req.body.username });

     // Check user existance
     if( !getUser ) 
        return res.status(404).json({error:'user_not_exist', message: 'User not found'});

    // Compare the passwords
    const isMatch  = await bcrypt.compare(req.body.password, getUser.password);

    // Check passowrd matching
    if( !isMatch ) 
            return res.status(403).json({error:'invalid_credentials', message: 'Username and/or password are incorrect'});

    // Generate token
    let token = jwt.sign( {userData: { username: getUser.username }}, process.env.JWT_SECRET_KEY);

    res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
    });

}

/**
 * PUT /api/user/reset/:id
 * Reset user password
 */
exports.resetPassword = function (req, res, next) {
    // Hash password
    var hash = bcrypt.hashSync(req.body.password, 10);

    UserModel.findById(req.params.id, req.body, function (err, user) {
        if (err) return next(err);

        user.password = hash ;
        user.save();
        return res.json({"success": true, "message": "User password reseted"});
    });

};