// Reittien käsittely
const router = require('express').Router()
const { Blog, User } = require('../models/index')
const { Op } = require('sequelize')
const tokenExtractor = require('../customMW/tokenExtractor')
const sessionExtractor = require('../customMW/sessionExtractor')


router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
          order: [
            ['likes', 'DESC'],
          ],
          where: {
            [Op.or]: {
              title: {
                [Op.substring]: req.query.search ? req.query.search : ''
              },
              author: {
                [Op.substring]: req.query.search ? req.query.search : ''
              }
            }
          }
        })
        res.json(blogs)
    } catch (error) {
        next(error)
    }
})

router.post('/', sessionExtractor, async (req, res, next) => {
    try {
        const user = req.user
        const blog = await Blog.create({...req.body, userId: user.id })
        return res.json(blog)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next (error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
          blog.likes = req.body.likes
          await blog.save()
          res.json(blog)
        } else {
          res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
  })

router.delete('/:id', sessionExtractor, async (req, res, next) => {
    try {
      const user = req.user
      const blog = await Blog.findByPk(req.params.id)

        if (blog && (blog.userId === user.id)) {
            await blog.destroy();
            return res.status(204).end()
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router