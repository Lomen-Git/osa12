const router = require('express').Router()
const { Blog, ReadingList, User } = require('../models/index')
const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: {
                model: Blog,
                as: 'ownBlogs'
            }
        })
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        next (error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        let readContidion = {
            [Op.in]: [true, false]
        }
        if (req.query.read) {
            readContidion = req.query.read === "true"
        }

        const user = await User.findByPk(req.params.id, {
            include: {
                model: Blog,
                as: 'readings',
                through: {
                    model: ReadingList,
                    attributes: ['id', 'isRead'],
                    where: { isRead: readContidion }
                }
            }
        })
        if (user) {
          res.json(user)
        } else {
          res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

router.put('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username }
        })
        if (user) {
            user.name = req.body.name
            await user.save()
            res.json(user)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router