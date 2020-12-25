
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from 'axios';

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(3001, () => {
    console.log("We're Online @ Port 3001!");
});

//Get user id
app.get('/id', function(req, res, next){
    var id = Math.floor(Math.random() * 11);  
    console.log(id);
    res.send({id: id});
});

//Get user
app.get('/user', async function(req, res, next){
    var id = Math.floor(Math.random() * 10) + 1; 
    let value = Math.floor(Math.random() * Math.floor(3));
    var tone = ["humorous", "ironic", "cynical"]

    console.log(id);
    await axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
    }).then(result=>{
        console.log(result.data)
        var user = result.data;
        result.data.tone = tone[value];
        res.send({user: user});
    }).catch(err => {
        res.send({err: err});
    });
});

app.post('/user', postUser);


export function postUser(req, res, next){
    console.log(req.body);
    var {username, email, password} = req.body;

    console.log(username, email, password);

    res.send({message: "SUCCESS"});
}