import express from "express"
import fs from "fs"
import crypto from "crypto"
import createAndServeFile from "./Helpers/FileCreator.js"

const app = express()

const PORT = 3000

app.get('/get/json/file', (req, res) => {

    // Creates a very basic JSON file wth very basic data inside
    fs.writeFile('data.json', JSON.stringify({"Hello":"World"}), (err) => {
        if (err) throw err
        console.log("Saved!")
    })

    // Sends the response to the request using res.download 
    // This makes it so the file is downloaded by the device making the request
    res.download("data.json", "YourData.json", (err) => {
        if (err) throw err

        // This deletes the file after it is downloaded
        fs.unlink("data.json", () => {
            console.log("File Deleted.")
        })
    })
})

app.get("/hello/:name", (req, res) => {
    createAndServeFile(req, res)
})

app.get("/generate/uuid", (req, res) => {
    res.json({newUUID: crypto.randomUUID()})
})

app.listen(PORT, () => {
    console.log("The app is listening on port 3000")
})