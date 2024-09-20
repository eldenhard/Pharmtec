import { api } from '../helpers/axios'

export const resourse = 'invites'

const createNewInvite = (data) => {
    return api.post(`${resourse}/`, data)
}

const confirmNewInvite = (id) => {
    return api.post(`${resourse}/${id}/confirm/`)
}
const getAllInvites = () => {
    return api.get(`${resourse}/`)
}
const editInvite = (id, data) => {
    return api.patch(`${resourse}/${id}/`, data)
}
export default {
    createNewInvite,
    confirmNewInvite,
    getAllInvites,
    editInvite,
}
