import config from '../config';
import { handleResponse } from '../utils/serverResponse';
import { appendAccessHeader } from '../utils/headers';

const todos = []

const saveTodo = async (text) => {
    const newTodo = {
      text: text,
      id: text+ Date.now().toString()
    };
    todos.push(newTodo)

    return newTodo
}

const getTodos = async () => {
    return todos;
}

const deleteTodo = async (todoId) => {
  for (let i=0; i < todos.length; i++) {
    if (todos[i].id === todoId) todos.splice(i, 1)
  }
}

const getOptions = (method) => {
  const requestOptions = {
    method,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    },
  };
  return appendAccessHeader(requestOptions);

};

export const todoService = {
  saveTodo,
  deleteTodo,
  getTodos
};