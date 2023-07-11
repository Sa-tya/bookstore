import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3002/api/v1/",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    },
    timeout: 2*60*1000
})  
