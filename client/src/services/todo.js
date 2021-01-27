import config from '../config';
import {authService} from './auth'
import { handleResponse } from '../utils/serverResponse';
import { appendAccessHeader } from '../utils/headers';

const todos = []
let setToStorage = {}

function addToLocalStorage(value) {
  setToStorage = {
    key: authService.getCurrentUserName()+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
    value: value.text
  }
  localStorage.setItem(setToStorage.key, setToStorage.value)
}

function removeFromLocalStorage(valueToRemove) {
  for(let i=0, len=localStorage.length; i<len; i++) {
    let key = localStorage.key(i);
    let value = localStorage[key];
    if(value === valueToRemove) localStorage.removeItem(key);
}
}


const saveTodo = async (text) => {
  const newTodo = {
    text: text,
    id: text+ Date.now().toString()
  };
  todos.push(newTodo);

  addToLocalStorage(newTodo);
  console.log("Local Storage Key : "+localStorage.getItem(setToStorage.key))
  console.log("Local Storage Value : "+localStorage.getItem(setToStorage.value))
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
      let text = todos[i].text
      todos.splice(i, 1);
      removeFromLocalStorage(text);
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