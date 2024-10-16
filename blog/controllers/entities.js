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

export class PostEvent {
    constructor(type, status, body) {
        this.type = type;
        this.status = status;
        this.body = body;
        this.timeStamp = LogDate();
        this.data = JSON.stringify(this);
    }
}

export class Log {
    constructor(event, ip) {
        this.timeStamp = LogDate();
        this.event = event;
        this.ip = ip;
        this.data = JSON.stringify(this);
    }
}

export class Post {
    constructor(title, author, content, tags) {
        this.postID = PostID();
        this.title = title;
        this.cAuthor = author;
        this.content = content;
        this.author = author;
        this.timeStamp = PostDate();
        this.tags = tags;
        this.data = JSON.stringify(this);
        this.post = this;
    }

}