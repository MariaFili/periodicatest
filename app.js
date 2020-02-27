const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
 
const app = express();
const jsonParser = bodyParser.json();


 
app.use(express.static(__dirname + "./public"));


app.get("/api/users", function(req, res){

    let sorty = req.query.sortBy;
    let dir = req.query.sortDirection;
    let filt = req.query.query; // получаем id
    let content = fs.readFileSync("data.json", "utf8");
    let users = JSON.parse(content);
    // let ress = users.find (u => u.orderItems.price == price)
    let mass = [];
    // находим в массиве пользователя по id
    for(let i=0; i<users.length; i++){
        // for (let j=0; j<users[i].orderItems.length; j++){

        if(users[i].id==filt || users[i].fullName==filt || users[i].address==filt || users[i].email==filt ){
            mass.push (users[i]);
            console.log(mass);
        }
        for (let j=0; j<users[i].orderItems.length; j++){if(users[i].orderItems[j].productName ==filt){
            mass.push (users[i]); 
        };
    }
    
}
if (filt) {users = mass}

if (sorty == "status" && dir=="desc" ){
    users.sort((a, b) => a.status > b.status ? -1 : 1)}


    // отправляем пользователя
    if(users){
        res.send(users);
    }
    // else{
    //     res.send(users);
    // }
    
    
});




app.listen(4000, function(){
    console.log("Сервер ожидает подключения...");
});