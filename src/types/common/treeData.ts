export interface TreeDataType{
    id:number;
    name:string;
    children:TreeDataType[]
}
export type Expanded = {
    [key:string]:boolean
};
export type VisibleNodeType = {
    node:TreeDataType,
    depth:number;
    id:number
}