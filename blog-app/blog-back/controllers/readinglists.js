const router = require('express').Router()
const { User, ReadingList } = require('../models/index')
const tokenExtractor = require('../customMW/tokenExtractor')
const sessionExtractor = require('../customMW/sessionExtractor')


router.post('/', sessionExtractor, async (req, res, next) => {
    try {
        const user = req.user

        if (user.id === req.body.user_id) {
            const rl = await ReadingList.create({
                "userId": req.body.user_id,
                "blogId": req.body.blog_id,
                "isRead": false
            })
            return res.json(rl)
        } else {
            return res.status(400).send({ error: 'You can only add blog to yourself'})
        }
    } catch (error) {
        next(error)
    }
})

router.put('/:id', sessionExtractor, async (req, res, next) => {
    try {
        const user = req.user
        const reading = await ReadingList.findByPk(req.params.id)

        if (!reading) {
            return res.status(400).json({ error: 'Reading not found' })
        }

        if (user.id !== reading.userId) {
            return res.status(400).json({ error: 'You can only mark read in your own list'})
        }

        reading.isRead = req.body.read
        await reading.save()

        res.json(reading)

    } catch (error) {
        next (error)
    }
})


module.exports = router