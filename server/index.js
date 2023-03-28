const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const AllWords = require("./data/data")
const app = express();
app.use(express.json());
const wordList = require("./data/words.json");
const whitelist = ["http://localhost:3001"]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))
app.listen(3000, () => console.log("API server is running..."))

// ================================== GET =================================
// get synonyms
app.get("/search-word", (req, res) => {
    if (!req.query.keyword) {
        return res.status(400).send({ message: "keyword not provided" })
    }
    let AllWords = null
    fs.readFile("./data/words.json", "utf8", (err, fileData) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        processFile(JSON.parse(fileData))
    });

    function processFile(readFileData) {
        let synonyms = []
        let searchResult = readFileData.words.find((element) => element.name === req.query.keyword);
        if (searchResult) {
            synonyms = readFileData.words.filter(
                (item) => item.groupId === searchResult.groupId
            );

        }
        return res.json({
            synonyms
        })
    }


})
// ====================================== POST ============================
// add new word API
app.post("/add-new-word", (req, res) => {
    if (!req.body.keyword) {
        return res.status(400).send({ message: "keyword not provided" })
    }
    const groupId = uuid();
    const keyword = req.body.keyword
    let newWordList = null
    fs.readFile("./data/words.json", "utf8", (err, fileData) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        processFile(JSON.parse(fileData))
    });

    function processFile(readFileData) {
        newWordList = readFileData
        const newWord = {
            name: keyword,
            id: keyword,
            groupId
        }
        newWordList.words.push(newWord)
        console.log('newWordList ', newWordList);
        fs.writeFile('./data/words.json', JSON.stringify(newWordList), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        return res.json(newWord)
    }

})
// add new synonym API
app.post("/add-new-synonym", (req, res) => {
    if (!req.body.keyword || !req.body.groupId) {
        return res.status(400).send({ message: "keyword not provided" })
    }
    const groupId = req.body.groupId;
    const keyword = req.body.keyword
    let newWordList = null
    fs.readFile("./data/words.json", "utf8", (err, fileData) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        processFile(JSON.parse(fileData))
    });

    function processFile(readFileData) {
        let words = readFileData.words
        let searchResults = words.find((element) => element.name === keyword)
        if (!searchResults) {

            newWordList = readFileData
            const newWord = {
                name: keyword,
                id: keyword,
                groupId
            }
            newWordList.words.push(newWord)
            console.log('newWordList ', newWordList);
            fs.writeFile('./data/words.json', JSON.stringify(newWordList), err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
            return res.json(newWord)
        } else {
            return res.status(400).send({ message: "The word already exists" })
        }
    }

})

