// Kun useampia tauluja -> tuodaan tänne -> muualla ohjelmassa importataan vain tämä
const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

// Omistajuussuhde
User.hasMany(Blog, { as: 'ownBlogs' })
Blog.belongsTo(User, { as: 'user' })
// Lukulistasude
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })
// Sessionsuhde
User.hasOne(Session)
Session.belongsTo(User)


module.exports = {
  Blog, User, ReadingList, Session
}