function throwError(type, message, status = 400) {
    const error = new Error(message);
    error.status = status;
    error.type = type;
    throw error;
}

function PostID(min = 100000, max = 999999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PostDate() {
    const date = new Date();
    const options = {
        weekday: 'long', 
        year: 'numeric',
        month: 'long',
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hourCycle: 'h24'};

    return date.toLocaleString('en-US', options);
}

function LogDate() {
    const date = new Date();
    return (new Date()).toISOString();
}

export class SuccessEvent {
    constructor({type, status, message, data}) {
        if(typeof type === 'string')
            this.type = type;
        else throwError('SuccessEvent', 'Type is not in correct format');

        if(typeof status === 'number')
            this.status = status;
        else throwError('SuccessEvent', 'Status is not in correct format');

        if(typeof data === 'object')
            this.data = data;
        else throwError('SuccessEvent', 'Data is not in correct format');

        if(typeof message === 'string')
            this.message = message;
        else throwError('SuccessEvent', 'Message is not in correct format');

        this.timeStamp = LogDate();
        this.dataSTR = JSON.stringify(this);
    }
}

export class ErrorEvent {
    constructor({type, status, message}) {
        if(typeof type === 'string')
            this.type = type;
        else throwError('ErrorEvent', 'Type is not in correct format');

        if(typeof status === 'number')
            this.status = status;
        else throwError('ErrorEvent', 'Status is not in correct format');

        if(typeof message === 'string')
            this.message = message;
        else throwError('ErrorEvent', 'Message is not in correct format');

        this.timeStamp = LogDate();
        this.dataSTR = JSON.stringify(this);
    }
}

export class Log {
    constructor(event, ip) {
        this.timeStamp = LogDate();
        if(typeof event === 'string')
            this.event = event;
        else throwError('Log', 'Event is not in correct format')

        if(typeof ip === 'string')
            this.ip = ip;
        else throwError('Log', 'IP is not in correct format')
        this.dataSTR = JSON.stringify(this);
    }
}

export class Post {
    constructor({title, author, content, tags, cAuthor = undefined, id = undefined, timeStamp = undefined, dataSTR = undefined}) {
            if(typeof title === 'string' && title.length <= 50)
                this.title = title;
            else throwError('Post', 'Title is not in correct format');
            
            if(typeof author === 'string') {
                if(cAuthor && typeof cAuthor === 'string')
                    this.cAuthor = cAuthor;
                else this.cAuthor = author;
                this.author = author;
            } else  throwError('Post', 'Author is not in correct format');

            if(typeof content === 'string' && content.length <= 2000)
                this.content = content;
            else throwError('Post', 'Content is not in correct format');
    
            if(Array.isArray(tags) && tags.length <= 10 && tags.every(tag => typeof tag === 'string' && tag.length <= 10)) 
                this.tags = tags;
            else throwError('Post', 'Tags are not properly set');
            
            if(id)
                if(typeof id === 'number')
                    this.id = id;
                else throwError('Post', 'ID is not in correct format')
            else this.id = PostID();
            
            if(timeStamp)
                if(typeof timeStamp === 'string')
                    this.timeStamp = timeStamp;
                else throwError('Post', 'TimeStamp is not in correct format');
            else this.timeStamp = PostDate(); 

            if(dataSTR)
                if(typeof dataSTR === 'string')
                    this.dataSTR = dataSTR
                else throwError('Post', 'DataSTR is not in correct format');
            else this.dataSTR = JSON.stringify(this);
    }

    editPost(postItem) {
        const noEdit = ['id', 'timeStamp', 'cAuthor'];
        if(typeof postItem === 'object') {
            for(const el in postItem) {
                if(postItem[el].length !== 0 && !noEdit.includes(el))
                    this[el] = postItem[el];
            }
            this.dataSTR = JSON.stringify(this);
            return this;
        } else throwError('EditPost[]', 'PostItem needs to be a Post Object to edit the current Post Object');
    }
}