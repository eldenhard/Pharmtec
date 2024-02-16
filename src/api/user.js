import { api } from '../helpers/axios'

export const resourse = 'auth2'
export const users = 'users'
const getUserJWTToken = (data) => {
    return api.post(`${resourse}/token/`, data,
    {
    headers: {
        'Content-Type': 'application/json'
    }
 })
}
const refreshUserJWTToken = (data) => {
    return api.post(`${resourse}/token/refresh/`, data,
    {
    headers: {
        'Content-Type': 'application/json'
    }
 })
}

const getDepartments = () => {
    return api.get(`${resourse}/departments/`)
}

const getAllUsers = () => {
    return api.get(`${users}/`)
}
export default{
    getUserJWTToken,
    refreshUserJWTToken,
    getDepartments,
    getAllUsers,
}