import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import {isAuth, handleResponse} from './auth'

export const createSubmission = (submission, token) => {

    let createSubmissionEndpoint;

    if(isAuth() && isAuth().role == 1){
        createSubmissionEndpoint = `${API}/submission`
    } else if (isAuth() && isAuth().role == 0){
        createSubmissionEndpoint = `${API}/user/submission`
    }

    return fetch(`${createSubmissionEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: submission
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSubmissionsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/submissions-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleSubmission = slug => {
    return fetch(`${API}/submission/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = submission => {
    return fetch(`${API}/submissions/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listSubmissionsEndpoint;

    if (username) {
        listSubmissionsEndpoint = `${API}/${username}/submissions`;
    } else {
        listSubmissionsEndpoint = `${API}/submissions`;
    }

    return fetch(`${listSubmissionsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeSubmission = (slug, token) => {
    let deleteSubmissionEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteSubmissionEndpoint = `${API}/submission/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteSubmissionEndpoint = `${API}/user/submission/${slug}`;
    }

    return fetch(`${deleteSubmissionEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateSubmission = (submission, token, slug) => {
    let updateSubmissionEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateSubmissionEndpoint = `${API}/submission/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateSubmissionEndpoint = `${API}/user/submission/${slug}`;
    }

    return fetch(`${updateSubmissionEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: submission
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/submissions/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};