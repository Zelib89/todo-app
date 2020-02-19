import config from '../config';
import { handleResponse } from '../utils/serverResponse';
import { appendAccessHeader } from '../utils/headers';

const saveTodo = async (text) => {
    const searchParams = new URLSearchParams();
    searchParams.set('text', text);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: searchParams
    };
    const options = appendAccessHeader(requestOptions);

    return fetch(`${config.apiUrl}/todos`, options)
      .then(handleResponse);
}

const getTodos = async () => {
    return fetch(`${config.apiUrl}/todos`)
      .then(handleResponse);
}

const deleteTodo = async (todoId) => {
  return fetch(`${config.apiUrl}/todos/${todoId}`, 
    {
      method: 'DELETE',
    })
    .then(handleResponse);
}

export const todoService = {
  saveTodo,
  deleteTodo,
  getTodos
};