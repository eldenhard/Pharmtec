import { api } from '../helpers/axios'

export const resourse = 'invites'

const createNewInvite = (data) => {
    return api.post(`${resourse}/`, data)
}

const confirmNewInvite = (id) => {
    return api.post(`${resourse}/${id}/confirm/`)
}
export default {
    createNewInvite,
    confirmNewInvite,
}
