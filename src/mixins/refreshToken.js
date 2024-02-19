import api from '@/api/user.js'
export  async function refreshToken(){
    try{
        let token = JSON.parse(localStorage.getItem('refreshToken'))
        let response = await api.refreshUserJWTToken({refresh: token})
        localStorage.setItem('accessToken', JSON.stringify(response.data.access))
    } catch(err) {
        console.log(err)
        localStorage.clear()
        window.location.href = '/login'
       
    }
     
        
}