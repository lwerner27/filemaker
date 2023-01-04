const express = require('express')
const fs = require('fs')

const app = express()

PORT = 3000 || process.env.PORT

app.get('/', (req, res) => {
    fs.writeFile('data.json', JSON.stringify({"Hello":"World"}), (err) => {
        if (err) throw err
        console.log("Saved!")
    })

    res.download("data.json", "YourData.json", (err) => {
        if (err) throw err
        fs.unlink("data.json", () => {
            console.log("File Deleted.")
        })
    })
})

app.listen(PORT, () => {
    console.log("The app is listening on port 3000")
})