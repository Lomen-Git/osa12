const router = require('express').Router()
const { sequelize } = require('../util/db')

router.get('/', async (req, res, next) => {
    try {
        const QUERY = `
        SELECT author, COUNT(*) AS blogs, SUM(likes) AS likes
        FROM Blogs
        GROUP BY author
        ORDER BY likes DESC;
        `        
        
        const authors = await sequelize.query(QUERY, {
            type: sequelize.QueryTypes.SELECT
        })

        res.json(authors)
    } catch (error) {
        next(error)
    }
})

module.exports = router