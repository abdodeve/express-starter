const Product = require('../Models/ProductModel');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.fetch = function (req, res) {
    console.log('From controller');
    Product.find({}, function (err, product) {
        if (err) return next(err);
        res.json({"success": true, "product": product});
    })
};

exports.single = function (req, res) {
    Product.findById(req.params.id, function (err, data) {
        if (err) return next(err);
        res.json({"success": true, "data": data});
    })
};

exports.create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save(function (err) {
        if (err)
            return next(err);

        res.json({"success": true, "message": "Product Created successfully"});
    });
};

exports.update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.json({"success": true, "message": "Product udpated."});
    });
};

exports.delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "Deleted successfully!"});
    })
};