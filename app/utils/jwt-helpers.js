const jwt = require("jsonwebtoken");

function generateAccessToken({ email,password, pseudo ,birthdate, role_id, id }) {
  const user = { email,password, pseudo ,birthdate, role_id, id}; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1y' });
  return ({ accessToken});
}

// function generateRefreshToken({ email,password, pseudo ,birthdate, role_id }) {
//   const user = { email,password, pseudo ,birthdate, role_id}; 
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1200s' });
//   return ({refreshToken });
// }

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err){
      return res.sendStatus(401);
    }
    req.user = user;
    next();
   
  });   
   
}

module.exports = {generateAccessToken, authenticateToken};