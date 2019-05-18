const UserModel = require('../Models/UserModel');
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
exports.delete = function (req, res) {
    UserModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "User deleted"});
    })
};