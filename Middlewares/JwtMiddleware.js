let jwt = require('jsonwebtoken');
// const config = require('./config.js');

let checkToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token)
      res.json({'error': 'Please add the token'});

  token = token.startsWith('Bearer ') ? token.slice(7, token.length) : token ;     // Remove Bearer from string

  try {
      const decoded = await jwt.verify(token, 'passphrase');
      res.locals.userData = decoded.userData;
      next();
  } catch(ex){
      return res.json({ error: 'invalid_token', message: 'Token is not valid' });
  }

  // jwt.verify(token, 'passphrase', (err, decoded) => {
  //   // If the token is invalid
  //   if (err)  return res.json({ error: 'invalid_token', message: 'Token is not valid' });

  //   req.decoded = decoded;
  //   next();
  // });
}

module.exports = {
  checkToken: checkToken
}
