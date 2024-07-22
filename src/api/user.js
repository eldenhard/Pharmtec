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

const getAllUsers = (data) => {
    return api.get(`${users}/`, {params: data})
}
const getFullDataUserById = (id) => {
    return api.get(`${users}/${id}`)
}
const getUserById = (id) => {
    return api.get(`${users}/${id}/`)
}
const putUserById = (id, data) => {
    return api.patch(`${users}/${id}/`, data)
}
// смена пароля
const changePassword = (data) => {
    return api.post(`${resourse}/signup/password/confirm-change`, data)
}
const sendEmailForGetNewPassword = (data) => {
    return api.post(`${resourse}/signup/password/init-change`, data)
}
export default{
    getUserJWTToken,
    refreshUserJWTToken,
    getDepartments,
    getAllUsers,
    getUserById,
    putUserById,
    changePassword,
    sendEmailForGetNewPassword,
    getFullDataUserById,
}