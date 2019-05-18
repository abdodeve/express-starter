const productController = require('../Controllers/ProductController');
const TodoController = require('../Controllers/TodoController');

module.exports = function(express) {

    var router = express.Router()

    /*
    |--------------------------------------------------------------------------
    |  Product Routes
    |--------------------------------------------------------------------------
    */
    router.get('/product/fetch', productController.fetch);
    router.get('/product/:id/single', productController.single);
    router.post('/product/create', productController.create);
    router.put('/product/:id/update', productController.update);
    router.delete('/product/:id/delete', productController.delete);
    router.get('/product/test', productController.test);

    /*
    |--------------------------------------------------------------------------
    |  Todo Routes
    |--------------------------------------------------------------------------
    */
    router.get('/todo', TodoController.fetch);
    router.get('/todo/:id', TodoController.single);
    router.post('/todo', TodoController.create);
    router.put('/todo/:id', TodoController.update);
    router.delete('/todo/:id', TodoController.delete);

    
    return router ;
}