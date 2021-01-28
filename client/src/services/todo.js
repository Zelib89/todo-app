import config from '../config';
import {authService} from './auth'
import { handleResponse } from '../utils/serverResponse';
import { appendAccessHeader } from '../utils/headers';

const todos = []
let setToStorage = {}

function addToLocalStorage(newTodo) {
  setToStorage = {
    key: authService.getCurrentUserName()+newTodo.id,
    value: newTodo.text
  }
  localStorage.setItem(setToStorage.key, setToStorage.value)
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

const saveTodo = async (text) => {
  const newTodo = {
    text: text,
    id: text+ Date.now().toString()
  };
  todos.push(newTodo);  
  addToLocalStorage(newTodo);
  return newTodo
}

const getTodos = async () => { 
  if (todos.length < 1) {
    let values = getTodosThatStartsFrom(authService.getCurrentUserName())
    for (let i=0;i<values.length; i++) {
      const newTodo = {
        text: values[i],
        id: values[i] + Date.now().toString()
      };
      todos.push(newTodo);
    }  
  }
    return todos;
}

const deleteTodo = async (todoId) => {
  for (let i=0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos.splice(i, 1);  
      removeFromLocalStorage(authService.getCurrentUserName()+todos[i].id);
    }
  };

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

function getTodosThatStartsFrom(userName) {
  return Object.keys(localStorage)
      .filter( (key)=> key.startsWith(userName) )
      .map( (key)=> localStorage[key] );
}

export const todoService = {
  saveTodo,
  deleteTodo,
  getTodos
};