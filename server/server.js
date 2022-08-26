const express = require("express")
const app = express()

require("dotenv").config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = process.env.PORT || 5001;
const fileAPI = require("./routes/fileRoutes");
const path = require("path")
/* 
        ---------------- Configuring body and Cookie parser ----------------
*/



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
    );
} else {
    app.get('/', (req, res) => {
        res.send("Hello This is working fine.")
    })
}
app.use(cors())
app.options("*", cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, "/public", "build")));





app.use("/api/file", fileAPI)

const onListeningEvent = () => {
    bootstrapServerMessage()
}
const bootstrapServerMessage = () => {
    console.info(`\n\t SERVER IS ONLINE & RUNNING \n
        \n\t - ON PORT :- ${PORT}
        \n\t - STARTED AT:- ${new Date()}
        \n\t ---------------- WELCOME TO NOWIGENCE -----------------------------\n
    `)
}

app.listen(PORT).on('listening', onListeningEvent)