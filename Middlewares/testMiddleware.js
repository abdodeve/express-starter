module.exports = function(app) {
    
        app.use('/product/fetch', function (req, res, next) {
            console.log('Request Type:', req.method);
            next()
        });

}