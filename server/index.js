const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
const AllWords = require("./data/data")
const app = express();
app.use(express.json());
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
// ================================== GET =================================
app.get("/search-word", (req, res) => {
    if (!req.query.keyword) {
        return res.status(400).send({ message: "keyword not provided" })
    }
    console.log(AllWords);
    let searchResult = AllWords.AllWords.find((element) => element.name === req.query.keyword);
    if (searchResult) {
        let synonyms = AllWords.AllWords.filter(
            (item) => item.groupId === searchResult.groupId
        );
        res.json({
            synonyms
        })
    } else {
        localStorage.setItem("newWord", word);
        res.json({ synonyms: [] })
    }

})
// ====================================== POST ============================
app.post("/add-new-word", (req, res) => {
    const id = uuid();
    const keyword = req.body.keyword
})

app.listen(3000, () => console.log("API server is running..."))
