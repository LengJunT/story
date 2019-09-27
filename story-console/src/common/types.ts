export interface CommonRes {
    code: string;
    content: any;
    message: string;
}
export interface ArticleDataType {
    creatTime: string;
    updateTime: string;
    uid: string
    id: string;
    title: string;
    content: string;
    isDraft:boolean;
    likeCount?: number | null;
    read?: number | null;
    collectionCount?: number | null;
    draft?: boolean;
}