const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 3000
})

module.exports = instance;