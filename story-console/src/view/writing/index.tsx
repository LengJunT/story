import React, { useState } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
export default function Dashboard() {
    const [editorState, setEditorState] = useState()
    const submitContent = () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = editorState.toHTML()
        console.log(htmlContent)
    }
    return (
        <div className="page-writing">
            <BraftEditor
                value={editorState}
                onChange={setEditorState}
                onSave={submitContent}
            />
        </div>
    )
}