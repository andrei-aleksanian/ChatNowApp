class Blog{
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.allPosts = [];
        this.template = `<div class="${this.id}">
                            <h1>${this.name}</h1>
                            <ul class="${this.id} list"></ul>
                         </div>`;
    }

    getBlog(){
        return document.getElementsByClassName(`${this.id}`)[1];
    }

    addPost(post){
        this.allPosts.push(post.id);
        this.getBlog().innerHTML += post.template;

    }
}