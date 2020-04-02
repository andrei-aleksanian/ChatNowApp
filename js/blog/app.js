const showBlog = (blog) => {
    wrapper.innerHTML += blog.template;
};

const highlightPost = (PostID) =>{
    if(Blog1.allPosts.includes(PostID)){
        const post = document.getElementsByClassName(PostID)[0];
        post.classList.toggle("highlighted");
    }
};

const wrapper = document.querySelector(".Blog");
const Blog1 = new Blog("OOP Principles for non-JS people", "Blog1");
const BlogForm = document.querySelector("form");
let id = 3;

const Post1 = new Post("You are an object", "Who would've thought", "Post1");
const Post2 = new Post("Objects don't exist here", "Who would've thought", "Post2");

showBlog(Blog1);

Blog1.addPost(Post1);
Blog1.addPost(Post2);

BlogForm.addEventListener("submit", e => {
    e.preventDefault();

    const title = BlogForm.inputPostHeader.value.trim();
    const text = BlogForm.inputPostText.value.trim();

    console.log(id);
    const post = new Post(title, text, `Post${id}`);
    Blog1.addPost(post);

    id += 1;
    BlogForm.reset();
});

Blog1.getBlog().addEventListener("click", e =>{
    let classList = Array.from(e.target.classList);

    if(classList[0] === "post"){
        const PostID = classList[1];
        console.log(PostID);
        highlightPost(PostID);
    }

    if(classList[0] === "nice_icon"){
        e.target.parentElement.remove();
    }

});