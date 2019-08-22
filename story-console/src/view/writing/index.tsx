import React, { useState } from 'react';
import { Input, Button, message } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './index.scss'
export default function Dashboard() {
    const [editorState, setEditorState] = useState<any>()
    const [title, setTitle] = useState<string>('')

    const handleArticle = (): boolean | Object => {
        if (!title) {
            message.warning('请填写文章标题')
            return false
        }
        const htmlContent = editorState.toHTML()
        return {
            title,
            content: htmlContent
        }
    }
    const submitContent = () => {
        const data = handleArticle()
        if (data) {
            // ajax
        }
    }
    const submitContentDraft = () => {
        const data = handleArticle()
        if (data) {
            // ajax
        }
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
}