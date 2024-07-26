const router = require('express').Router()
const sessionExtractor = require('../customMW/sessionExtractor')
const { Session } = require('../models/index')

router.delete('/', sessionExtractor, async (req, res, next) => {
    try {
        const user = req.user

        await Session.destroy({
            where: { userId: user.id }
            })

        return res.json("Session wiped out")
    } catch (error) {
        next(error)
    }
})

module.exports = router