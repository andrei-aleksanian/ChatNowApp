class Post{
    constructor(name, text, id) {
        this.name = name;
        this.text = text;
        this.id = id;
        const post = "post";
        this.template = `<li class="${post} ${this.id}">
                            <h2>${this.name}</h2>
                            <p class="post_text">${this.text}</p>
                            <i class="nice_icon">D</i>
                         </li>`;
    }

    getPost(id = this.id){
        return document.getElementsByClassName(`${id}`)[0];
    }

    toggleHighlightPost(){
        this.getPost().classList.toggle("highlighted");
    };
}