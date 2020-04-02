class User{

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.messages = [];

        this.allUsers = db.collection("users");
    }

    userExists(){
        // how to check if its old or new user?
        console.log();
    }

}