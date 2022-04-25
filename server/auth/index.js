const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

// Route "/auth"

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})
router.post('/comparepassword', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    console.log('user?',user)
    res.send({ isTrue: await user.correctPassword(req.body.oldPassword)}); 
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
router.put('/edit', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const updated_user = await user.update(req.body)
    res.send(updated_user)
  } catch (err) {
      next(err)
  }
})

router.put('/changepassword', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    console.log('oldpass',user)
    const updated_user = await user.update(req.body)
    console.log('pass',updated_user)
    res.send(user)
  } catch (err) {
      next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
