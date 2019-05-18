const TodoModel = require('../Models/TodoModel');

/**
 * GET /todo
 * Get All Todos
 */
exports.fetch = function (req, res) {
    TodoModel.find({}, function (err, product) {
        if (err) return next(err);
        res.json({"success": true, "product": product});
    })
};

/**
 * GET /todo/:id
 * Get Single Todo
 */
exports.single = function (req, res) {
    TodoModel.findById(req.params.id, function (err, data) {
        if (err) return next(err);
        res.json({"success": true, "data": data});
    })
};

/**
 * POST /todo
 * Create new Todo
 */
exports.create = function (req, res) {
    // Prepare object
    let todoModel = new TodoModel(
        {
            title: req.body.title,
            description: req.body.description,
            is_done: req.body.is_done
        }
    );

    // Save
    todoModel.save(function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "Todo Created successfully"});
    });
};

/**
 * PUT /todo
 * Update Todo
 */
exports.update = function (req, res, next) {
    TodoModel.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.json({"success": true, "message": "Product udpated."});
    });
};

/**
 * DELETE /todo
 * Delete todo
 */
exports.delete = function (req, res) {
    TodoModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "Deleted successfully!"});
    })
};