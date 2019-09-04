import React, { useState, useEffect } from 'react'
import {getMyArticle} from '../../action/article'
import { List, message } from 'antd'
// import { async } from 'q';

export default function ArticleList() {
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [data, setData] = useState([])
    useEffect(()=>{
        getArt()
    },[])
    return (<div>1</div>)

    async function getArt(){
       const data = await getMyArticle()
       console.log('getArt', data)
    }
}