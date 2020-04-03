class Chat{

    constructor(name) {
        this.name = name;
        this.id = name;
        this.list = `<div class="chat d-none" id="${this.id}">
                        <h2>${this.name}</h2>
                        <ul id="${this.id}Messages" class="messages">
                        </ul>
                     </div>`;
        this.messages = [];
    }

    sortByTimeStamp(messages){

        messages.sort( (a,b) => {
            return a.started_at.seconds - b.started_at.seconds;
        });
        messages.forEach(message => {
            renderMessage(message, this.name, this.name);

        });
    }

    getMessage(message){
        this.messages.push(message);

        return this;
    }

    addMessage(text, username="anon") {
        const now = new Date();
        const started_at = firebase.firestore.Timestamp.fromDate(now);
        const message = {
          message: text,
          username: username,
          room: this.name,
          started_at
        };
        db.collection("chats").add(message);

    }

}

