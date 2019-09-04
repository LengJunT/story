import { jFetch } from '../common'
export function setArticle(data){
    return jFetch.post('/saveArticle',{data});
}

export function getMyArticle(){
    return jFetch.get('/myArticle');
}