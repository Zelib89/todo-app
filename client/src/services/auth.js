import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { handleResponse } from '../utils/serverResponse';

const currentToken = new BehaviorSubject(JSON.parse(localStorage.getItem('token')));

const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            username, password
        })
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            localStorage.setItem('token', JSON.stringify(response.token));
            localStorage.setItem('userName', JSON.stringify(response.userName));
            currentToken.next(response.token);
            return response.token;
        }).catch(console.log);
}

const logout = () => {
    return fetch(`${config.apiUrl}/logout`).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        currentToken.next(null);
    });
}

const getCurrentUserName = () => {
    return localStorage.getItem('userName');
}

export const authService = {
    login,
    logout,
    currentToken: currentToken.asObservable(),
    get currentTokenValue () { return currentToken.value },
    getCurrentUserName,
};