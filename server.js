const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./db/db.json")

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res){
    res.json(db)
});

app.post("/api/notes", function(req, res){
    var newNote = req.body;
    var notes = JSON.parse(fs.readFileSync("./db/db.json", 'utf8', function(err, data){
        if(err) 
            throw err;
        else 
            console.log("Notes Read succsefully: " + data);
    }));

    notes.push(newNote);
    console.log(notes);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
        if(err) 
            throw err;
        else 
            res.send("Note Succesfully added!")
    });
    // res.json(db)
});

app.delete("/api/notes/:id", function(req, res){
    var id = req.params.id - 1;
    console.log(id);
    var notes = JSON.parse(fs.readFileSync("./db/db.json", 'utf8', function(err, data){
        if(err) 
            throw err;
        else 
            console.log("Notes Read succsefully: " + data);
    }));
    console.log(notes);
    var newNotes = notes.slice(id);
    console.log(newNotes);
    fs.writeFile("./db/db.json", JSON.stringify(newNotes), function(err){
        if(err) 
            throw err;
        else 
            res.send("File deleted succesfully");
    });
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});