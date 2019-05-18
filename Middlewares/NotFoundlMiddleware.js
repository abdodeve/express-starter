/**
 * Show error in json format instead HTML/TEXT
 */
module.exports =  function(req, res){
        res.json(404, { error: 'Not Found'});
}
