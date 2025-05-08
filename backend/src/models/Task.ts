export class Task {
    
    private id : number ;
    private userId : number  ;
    private title : string ;
    private description : string ;
    private status : "incompleted" | "completed" ;
    private type : string ;
    private createdAt : Date ;

    constructor(id : number  , userId : number  , title : string , description : string , status : "incompleted" | "completed" , type : string , cvreatedAt ?: Date ) {
        this.id = id ;
        this.userId = userId ;
        this.title = title ;
        this.description = description ;
        this.status = status ;
        this.type = type ;
        this.createdAt = cvreatedAt ? cvreatedAt : new Date() ;
    }

    getId() : number  {
        return this.id ;
    }
    getUserId() : number {
        return this.userId ;
    }
    getTitle () : string {
        return this.title ;
    }   
    getDescription () : string {
        return this.description ;
    }
    getStatus () : "incompleted" | "completed" {
        return this.status ;
    }
    getType () : string {
        return this.type ;
    }
    getCreatedAt () : Date {
        return this.createdAt ;
    }       
    public setId(newId: number) {
        this.id = newId;
    }
}