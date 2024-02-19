import { api } from '../helpers/axios'

export const resourse = 'invites'

const createNewInvite = (data) => {
    return api.post(`${resourse}/`, data)
}
export default {
    createNewInvite
}
