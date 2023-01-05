import fs from "fs"

export default function createAndServeFile(req, res) {

    // Lines to write to the file 
    let lines = [
        `Hello ${req.params.name}`,
        `Goodbye ${req.params.name}`
    ]

    // Creates a very basic JSON file wth very basic data inside
    fs.writeFileSync('Hello.txt', "", (err) => {
        if (err) {
            console.log(err)
        }
    })

    // Iterates over the lines array and appends them to the file created synchronously
    lines.forEach((line) => {
        fs.appendFileSync("Hello.txt", line + "\n", (err) => {
            if (err) {
                console.log(err)
            }
        })
    })

    // Sends the response to the request using res.download 
    // This makes it so the file is downloaded by the device making the request
    res.download("Hello.txt", "Hello.txt", (err) => {
        if (err) {
            console.log(err)
        }

        // This deletes the file after it is downloaded
        fs.unlink("Hello.txt", () => {
            console.log("File Deleted.")
        })
    })

}