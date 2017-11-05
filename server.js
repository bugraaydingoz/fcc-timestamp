const dateformat = require("dateformat")
const express = require("express")
const app = express()

app.use("/", express.static(__dirname + "/public"))
app.get("*", (req, res) => {
    let u = req.url.split("")
    u.shift()
    u = u.join("")
    let jsonDate = {}
    let date

    // if it is natural time
    if (RegExp(/[a-z]/, "i").test(u)) {
        u = u.replace(/%20/g, " ")
        date = new Date(u)
        if (date != "Invalid Date") {
            jsonDate.unix = date.getTime() / 1000
            jsonDate.natural = dateformat(date, "mmmm dd, yyyy")
        } else {
            jsonDate.unix = null
            jsonDate.natural = null
        }
    } else { // if it is unix time
        date = new Date(Number(u) * 1000)
        if (date != "Invalid Date") {
            jsonDate.unix = date.getTime() / 1000
            jsonDate.natural = dateformat(date, "mmmm dd, yyyy")

        } else {
            jsonDate.unix = null
            jsonDate.natural = null
        }
    }


    res.send(JSON.stringify(jsonDate))
})

app.listen(3000, () => console.log("Server started on 3000..."))