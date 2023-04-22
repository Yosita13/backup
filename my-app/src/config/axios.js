import axios from 'axios'


const axiosCMMS = axios.create({
    baseURL:'https://cmms-oa.herokuapp.com'
})

// const axiosCMMS = axios.create({
//     baseURL:'http://localhost:5000'
// })




// axiosCMMS.interceptors.response.use(
//     response => {
//         return handleResponse(response)
//     },
//     error => {
//         handleErrorResponse(error)
//         return Promise.reject(error)
//     }
// )

// const handleErrorResponse = (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//         // deleteUserCookie()
//         window.location.reload(false)
//     }
// }


// const handleResponse = (response) => {
//     return response
// }

export { axiosCMMS }