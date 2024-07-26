const jwt = require('jsonwebtoken')
const router = require('express').Router()
const crypto = require('crypto')
const Session = require('../models/session')
const { SECRET } = require('../util/config')
const User = require('../models/user')

function generateId() {
  return crypto.randomBytes(10).toString('hex')
}

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.isDisabled) {
    return response.status(400).json({ error: 'account is disabled' })
  }

  await Session.destroy({
    where: {userId: user.id }
  })

  const sessionId = generateId()

  await Session.create({
    sessionId: sessionId,
    userId: user.id
  })

  response
    .status(200)
    .send({ sessionId, username: user.username, name: user.name })
})

module.exports = router