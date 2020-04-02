class Chat{

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.list = `<div class="chat d-none" id="${this.id}">
                        <h2>${this.name}</h2>
                        <ul id="${this.id}Messages" class="messages">
                        </ul>
                     </div>`;
    }

    sortByTimeStamp(){
        // done on snapshot listeners?
        // probably
    }

    async getMessages(){
        const messages = await db.collection("rooms").doc(this.id)
                                .collection("messages").get();
        const docs = await messages.docs;

        return docs;
    }

    displayMessage(doc){
        const message = doc.data();

        renderMessage(message, doc.id, this.id);
        return this;
    }

}

