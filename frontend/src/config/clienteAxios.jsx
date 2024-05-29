import axios from 'axios';


const clienteAxios = axios.create({
    baseURL: 'https://scp5krc6-3002.use2.devtunnels.ms/api'
})

export default clienteAxios