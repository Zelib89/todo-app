import config from '../config';
import { handleResponse } from '../utils/serverResponse';
import { appendAccessHeader } from '../utils/headers';

const saveTodo = async (text) => {
    const searchParams = new URLSearchParams();
    searchParams.set('text', text);

    const options = getOptions('POST');
    options.body = searchParams;

    return fetch(`${config.apiUrl}/todos`, options)
      .then(handleResponse);
}

const getTodos = async () => {
    return fetch(`${config.apiUrl}/todos`, getOptions('GET'))
      .then(handleResponse);
}

const deleteTodo = async (todoId) => {
  return fetch(`${config.apiUrl}/todos/${todoId}`, getOptions('DELETE'))
    .then(handleResponse);
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