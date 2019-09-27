import { jFetch } from '../common'
export function setArticle(data){
    return jFetch.post('/saveArticle',{data});
}

export function getMyArticle(id){
    let url = '/myArticle'
    if(id){
        url = `/myArticle/${id}`
    }
    return jFetch.get(url);
}