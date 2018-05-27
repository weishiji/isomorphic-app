import qs from 'qs';
import fetch from 'isomorphic-fetch';

const handleResponse = (response) => {
  if (response.ok) {
    return response.json().then((result) => {
      if ('code' in result) {
        if (result.code === 0) {
          return 'data' in result ? result.data : result;
        }
        return Promise.reject(result);
      }
      return result;
    });
  }
  return response.json().then(error => Promise.reject(error));
};

export const get = (url, query = {}) => fetch(url + qs.stringify(query, { addQueryPrefix: true }), {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(handleResponse);


export const post = (url, params = {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(params),
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(handleResponse);

export const put = (url, params = {}) => fetch(url, {
  method: 'PUT',
  body: JSON.stringify(params),
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(handleResponse);

export const del = (url, query = {}) => fetch(url + qs.stringify(query, { addQueryPrefix: true }), {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(handleResponse);

export const upload = (url, file, params = {}) => {
  const formData = new global.FormData();
  formData.append('file', file);
  Object.keys(params).map(item => formData.append(item, params[item]));
  const headers = new global.Headers({
    Accept: 'application/json, */*',
  });
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  }).then(handleResponse);
};

