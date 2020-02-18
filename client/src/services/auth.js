import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { handleResponse } from '../utils/serverResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const login = (username, password) => {
    const searchParams = new URLSearchParams();
    searchParams.set('username', username);
    searchParams.set('password', password);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: searchParams
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

const logout = () => {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export const authService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};