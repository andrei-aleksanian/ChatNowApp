// const col = {
//     title: "ss"
// };
//
// db.collection("recipies").add(col)
//     .then(()=>{console.log("done");
//     })
//     .catch(err =>{});

db.collection("recipies").get()
    .then(data => {
        console.log(data.docs[0].data());
    }).catch(err => {

});
