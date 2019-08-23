import { jFetch } from '../common'
export function setArticle(data){
    return jFetch.post('/saveArticle',{data});
}