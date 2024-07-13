const { getAsync, setAsync } = require('../redis')

const getAddCount = async () => {
    try {
        let todoCount = await getAsync('added_todos');

        if (todoCount === null) {

            await setAsync('added_todos', 0);

            return 0;
        } else {
            return Number(todoCount)
        }
    } catch (error) {
        console.log('Todo count haku ei onnistunut.')
        throw error;
    }
}


const increaseByOne = async () => {
  try {
    let todoCountNum;
    let todoCount = await getAsync('added_todos');

    console.log(`Koitetiin hake count, se olis: ${todoCount}, ja typeof: ${typeof todoCount}`);

    if (todoCount === null || Number(todoCount) === 0) {
        todoCountNum = 1;
    } else {
        todoCountNum = Number(todoCount);
        todoCountNum++;
    }

    await setAsync('added_todos', todoCountNum);
    return todoCountNum;
  } catch (error) {
    console.log('ei onnistunut')
    throw error;
  }
};

module.exports = {
    increaseByOne,
    getAddCount
};