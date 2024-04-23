import { api } from '../helpers/axios'

export const resourse = 'trademarks'

const getAllProducts = () => {
    return api.get(`${resourse}/`,)
}
const changeOneCellInTAble = (id, value) => {
    return api.patch(`${resourse}/${id}/`, value)
}

export default{
    getAllProducts,
    changeOneCellInTAble,
}