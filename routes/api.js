const TodoController = require('../Controllers/TodoController');
const UserController = require('../Controllers/UserController');


module.exports = function(express) {

    var router = express.Router()

    /*
    |--------------------------------------------------------------------------
    |  Todo Routes
    |--------------------------------------------------------------------------
    */
    router.get('/todos', TodoController.fetch);
    router.get('/todos/:id', TodoController.single);
    router.post('/todos', TodoController.create);
    router.put('/todos/:id', TodoController.update);
    router.delete('/todos/:id', TodoController.delete);

    /*
    |--------------------------------------------------------------------------
    |  User Routes
    |--------------------------------------------------------------------------
    */
    router.get('/login', UserController.login);
    router.get('/users', UserController.fetch);
    router.get('/users/:id', UserController.single);
    router.post('/users', UserController.create);
    router.put('/users/:id', UserController.update);
    router.delete('/users/:id', UserController.delete);
   
    return router ;
}