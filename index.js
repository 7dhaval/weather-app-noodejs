const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temprature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temprature = temprature.replace("{%tempmin%}",orgVal.main.temp_min);
    temprature = temprature.replace("{%tempmax%}",orgVal.main.temp_max);
    temprature = temprature.replace("{%location%}",orgVal.name);
    temprature = temprature.replace("{%country%}",orgVal.sys.country);
    temprature = temprature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temprature;
}

const server = http.createServer((req,res) => {
    if (req.url = "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=7d1ffe697276fdbdc80e2421a2a800e6")
        .on("data", (chunk)  => {
            const objdata = JSON.parse(chunk); //converting
            const arrData = [objdata];
            // console.log(arrData[0].main.temp);
            const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
            // console.log(realTimeData);
            res.write(realTimeData);
        })
        .on("end", (err) => {
            if (err) return console.log("connection is closed due to server error", err);
            res.end();
            console.log(`end`);
        });
            //API TOKEN: api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=7d1ffe697276fdbdc80e2421a2a800e6

    }
});

server.listen(9000, "127.0.0.1");