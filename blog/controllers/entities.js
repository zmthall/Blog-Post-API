function throwError(type, message, status) {
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
    constructor(type, status, data) {
        if(typeof type === 'string')
            this.type = type;
        else throwError('SuccessEvent', 'Type is not in correct format.', 400);

        if(typeof status === 'number')
            this.status = status;
        else throwError('SuccessEvent', 'Status is not in correct format.', 400);

        if(typeof body === 'object')
            this.data = data;
        else throwError('SuccessEvent', 'Body is not in correct format.', 400);

        this.timeStamp = LogDate();
        this.dataSTR = JSON.stringify(this);
    }
}

export class ErrorEvent {
    constructor(type, status, error) {
        if(typeof type === 'string')
            this.type = type;
        else throwError('ErrorEvent', 'Type is not in correct format.', 400);

        if(typeof status === 'number')
            this.status = status;
        else throwError('ErrorEvent', 'Status is not in correct format.', 400);

        if(typeof error === 'object')
            this.error = error;
        else throwError('ErrorEvent', 'Erorr is not in correct format', 400);

        this.timeStamp = LogDate();
        this.dataSTR = JSON.stringify(this);
    }
}

export class Log {
    constructor(event, ip) {
        this.timeStamp = LogDate();
        if(typeof event === 'string')
            this.event = event;
        else throwError('Log', 'Event is not in correct format.', 400)

        if(typeof ip === 'string')
            this.ip = ip;
        else throwError('Log', 'IP is not in correct format.', 400)
        this.dataSTR = JSON.stringify(this);
    }
}

export class Post {
    constructor(title, author, content, tags) {
            if(typeof title === 'string' && title.length <= 50)
                this.title = title;
            else throwError('Post', 'Title is not in correct format.', 400);
            
            if(typeof author === 'string') {
                this.cAuthor = author;
                this.author = author;
            } else  throwError('Post', 'Author is not in correct format.', 400);

            if(typeof content === 'string' && content.length <= 2000)
                this.content = content;
            else throwError('Post', 'Content is not in correct format.', 400);
    
            if(tags.length <= 10 && tags.every(tag => tag.length <= 5)) {
                this.tags = tags;
            } else throwError('Post', 'Tags are not properly set.', 400);
            
            this.id = PostID();
            this.timeStamp = PostDate();
            this.dataSTR = JSON.stringify(this);
    }
}