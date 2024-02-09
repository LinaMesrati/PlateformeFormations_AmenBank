
export interface Formation
{
    visible: boolean;
    id:number,
    title:string,
    price:string
    categ:string,
    description:string,
    image:string
    sessions: { date: string, duration: number, location: string }[];
    formateurId:string
    niveau:string
    
}