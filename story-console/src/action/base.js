import { jFetch } from '../common'
export function login(data){
    return jFetch.post('/login',{data});
}
export function registered(data){
    return jFetch.post('/registered',{data});
}