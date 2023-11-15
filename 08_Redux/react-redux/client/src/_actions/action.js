import { LOGIN_USER, REGISTER_USER } from './type';
import axios from 'axios';

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(res => res.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(res => res.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}