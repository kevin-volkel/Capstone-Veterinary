const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try{
    if(!req.headers.authorization) return res.status(401).send('Unauthorized')
    if(req.headers.authorization.split(' ')[0] !== 'Bearer') return res.status(401).send('Unauthorized')

    const auth = req.headers.authorization.split(' ')[1]
    const { userId, role } = jwt.verify(auth, process.env.JWT_SECRET)

    req.user = { userId, role };
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).send('Unauthorized')
  }
}

module.exports = {authMiddleware}