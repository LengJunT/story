import React, { useState, useEffect} from 'react'
import { Input, Button, message } from 'antd'
import BraftEditor from 'braft-editor'
import { setArticle ,getMyArticle} from '../../action/article'
import { CommonRes, ArticleDataType } from '../../common/types'
import { RouteComponentProps } from 'react-router'
import {isEmpty} from '../../util'

import 'braft-editor/dist/index.css'
import './index.scss'
import { async } from 'q'

interface Params {
    id?:string | undefined
}
interface GetArticleData {
    content:ArticleDataType
}
interface SetArticleDataType {
    title:string;
    content:string;
    isDraft:boolean;
    id?:string;
    type?:string;
}
export default function Dashboard(props:RouteComponentProps) {
    const [editorState, setEditorState] = useState<any>()
    const [title, setTitle] = useState<string>('')
    const [articleData, setArticleData] = useState<ArticleDataType | undefined>()
    useEffect(()=>{
        const params:Params = props.match.params
        if(params.id){
            getArticle(params.id)
        }
    },[])
    const handleArticle = (isDraft: boolean) => {
        if (!title) {
            message.warning('请填写文章标题')
            return false
        }
        const htmlContent = editorState.toHTML()
        let data:SetArticleDataType = {
            title,
            content: htmlContent,
            isDraft
        }
        if(articleData){
            data.id = articleData.id
            data.type = articleData.isDraft?'draft':'formal'
        }
        if (data) {
            setArticle(data).then((res: CommonRes )=> {

            })
        }
    }
    const submitContent = () => {
        handleArticle(false)
    }
    const submitContentDraft = () => {
        handleArticle(true)
    }
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string | undefined = e.target.value
        setTitle(value)
    }
    return (
        <div className="page-writing">
            <div className="editor-title">
                <Input placeholder="标题" className="title-input" value={title} onChange={handleTitle} />
                <Button onClick={submitContent} type="primary">发布</Button>
                <Button onClick={submitContentDraft}>保存草搞</Button>
            </div>
            <BraftEditor
                value={editorState}
                onChange={setEditorState}
                onSave={submitContent}
            />
        </div>
    )

    async function getArticle(id:string) {
        const data = await getMyArticle(id)
        const { content } = data
        setArticleData(content)
        setTitle(content.title)
        setEditorState(BraftEditor.createEditorState(content.content))
    } 
}