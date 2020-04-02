class Chat{

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.messages = document.getElementById(`${id}Messages`);
    }

    sortByTimeStamp(){
        // done on snapshot listeners?
        // probably
    }


}