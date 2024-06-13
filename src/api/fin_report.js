import { api } from '../helpers/axios'

export const resourse = 'financial-reports'

const getFinanialReports = (data) => {
    return api.get(`${resourse}/`, data)
}
export default {
    getFinanialReports
}
