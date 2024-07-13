const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { increaseByOne, getAddCount} = require('./increaseByOne')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (req, res) => {
  const addCount =  await getAddCount();

  resObject = {
    "added_todos": addCount
  }

  res.send(resObject)
});

router.get('/:id', async (req, res) => {

  Todo.findById(req.params.id)
    .then(todo => {
      if (todo) {
        res.send(todo)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  increaseByOne();
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* PUT todo. */
router.put('/:id', async (req, res) => {
  const { text, done } = req.body;

  console.log(`nyt pitäisi muokata todo: ${text} ja ${done}`);
  Todo.findByIdAndUpdate(req.params.id, { text, done}, { new: true })
    .then(updatedTodo => res.json(updatedTodo))
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
