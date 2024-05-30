import axios from 'axios';


const clienteAxios = axios.create({
    baseURL: 'http://localhost:3003/api/'
})

export default clienteAxios