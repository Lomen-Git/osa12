const { Session, User } = require('../models')

const sessionExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const sessionId = authorization.substring(7)
      
      const session = await Session.findOne({ 
        where: { sessionId },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'name', 'isDisabled']
          }
        ]
      })

      if (!session) {
        return res.status(401).json({ error: 'session not found' })
      }

      if (session.isDisabled || session.user.isDisabled) {
        return res.status(403).json({ error: 'account or session is disabled' })
      }

      // Aseta käyttäjä ja sessio request-objektiin
      req.session = session
      req.user = session.user

      next()

    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'session invalid' })
    }
  } else {
    return res.status(401).json({ error: 'authorization header missing or invalid' })
  }
}

module.exports = sessionExtractor