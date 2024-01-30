import { api } from '../helpers/axios'

export const resourse = 'orders'

const createNewOrder = (data) => {
    return api.post(`${resourse}/`, data)
}


export default{
    createNewOrder
}