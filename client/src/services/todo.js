import config from '../config';
import { handleResponse } from '../utils/serverResponse';
import { appendAccessHeader } from '../utils/headers';

const saveTodo = (text) => {
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
    console.log(options);

    return fetch(`${config.apiUrl}/todos`, options)
      .then(handleResponse);
}

const getTodos = () => {
    return fetch(`${config.apiUrl}/todos`)
      .then(handleResponse);
}

export const todoService = {
  saveTodo,
  getTodos
};