import axios from 'axios';
import * as ApiContants from '../contant/api_uri_contants'

axios.defaults.withCredentials = true;
export const callApi = (endPoint, method = 'GET', data) => {
    return axios({
        method: method,
        url: `${ApiContants.API_URL}/${endPoint}`,
        data
    }).catch(err => {
        return null
    })
}
export const getMethodApi = (endPoint, params) => {
    return axios.get(`${ApiContants.API_URL}/${endPoint}`, {
        params: params,
    })
        .catch(function (error) {
            console.log(error);
        });
}
export const checkEmailAddress =async (email) => {
   let data = await getMethodApi(ApiContants.CHECK_EMAIL,{email});
   return data.status;
}
export const signUpApi =async (formData) => {
    let data = await callApi(ApiContants.SIGN_UP,'POST',{formData});
    return data;
 }
// export const callApiAuthen = (endpoint, method = 'GET', body) => {
//     let token = Authentication.getToken();
//     return axios({
//         method: method,
//         url: `${_API_URL}/${endpoint}`,
//         data: body,
//         headers: {
//             'Authorization': token == null ? "notAuthen" : `Beare ${token}`
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }