const express = require('express')
const fs = require('fs')

const app = express()

PORT = 3000 || process.env.PORT

app.get('/', (req, res) => {

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

app.listen(PORT, () => {
    console.log("The app is listening on port 3000")
})