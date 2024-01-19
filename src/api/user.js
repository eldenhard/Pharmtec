import { api } from '../helpers/axios'

export const resourse = 'auth'

const getUserJWTToken = (username, password) => {
    return api.post(`${resourse}/auth/token/?username=${username}&password=${password}`)
}

export default{
    getUserJWTToken
}