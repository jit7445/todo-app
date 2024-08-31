
import Todo from '../model/Todo.js'


export const addTodo = async (request, response) => {
    try {
      const { title} = request.body
        const newTodo = await Todo.create({
            data: title,
            createdAt: Date.now()
        })
        console.log("tit:",title)

        await newTodo.save();

        return response.status(200).json(newTodo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getAllTodos = async (request, response) => {
    try {
        const todos = await Todo.find({}).sort({ 'createdAt': -1 })

        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const toggleTodoDone = async (request, response) => {
    try {
        const todoRef = await Todo.findById(request.params.id);
        console.log("toggle:", !todoRef.done);

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { done: !todoRef.done },
            { new: true } // Return the updated document
        )
        console.log("after:", todo);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
export const updateTodo = async (request, response) => {
    try {
        console.log("id:",request.params.id);
        console.log("data:",request.body)
        console.log("update:",request.params.id);
        await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { data: request.body.title }
        )
        console.log("update:",request.params.id);


        const todo = await Todo.findById(request.params.id);
        console.log("update:",todo);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteTodo = async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id)
        console.log("delete:",todo)
        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}