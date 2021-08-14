
const fs = require("fs");
const reqData = require('./reqData.js')


function read(filename){
    // return jsonString
    try {
        const jsonString = fs.readFileSync("./data/"+ filename +".json", {encoding:'utf8'})
        const jsonFile =  JSON.parse(jsonString);
        return jsonFile;
    } catch (err) {
        return null;
    }
}

function write(filename, data){
    try {
        const jsonString = JSON.stringify(data)
        fs.writeFileSync("./data/"+ filename +".json", jsonString)
        return 'ok';
    } catch (error) {
        console.log(error)
        return null;
    }

}

function checkFile(file){
    if(file == null) return false;
    if(Object.keys(file).length == 0) return false;
    return true;
}


function diff_minutes(dt2, dt1) {
    let diff = (dt2 - dt1) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


async function HongkongUpdate(){
    let file = read("hongkong")
    console.log("updating hongkong ...")

    let getNewFile = await reqData.getHongkong();
    file = getNewFile;
    write('hongkong', file)
}

async function SydneyUpdate(){
    let file = read("sydney")
    console.log("updating sydney ...")

    let getNewFile = await reqData.getSydney();
    file = getNewFile;
    write('sydney', file)
}

async function aHongkongUpdate(){
    // check current file
    let file = read("hongkong")
    // console.log("updating hongkong", file, checkFile(file))

    if(!checkFile(file)){
        let getNewFile = await reqData.getHongkong();
        file = getNewFile;
        console.log("----- 1", getNewFile)
        write('hongkong', file)
    }

    //check time draw
    let currentTime = new Date();
    let currUnix = Date.parse(currentTime)
    let nextDrawUnix = Date.parse(file.nextDraw)
    let diffTime = diff_minutes(nextDrawUnix, currUnix)
    console.log(diffTime)
    // jika kurang dua minute start draw
    if (!file.startDraw && diffTime < 2) {
        file.startDraw = true;
    }

    // renew draw
    if(file.startDraw && !file.finishDraw){
        let getNewFile = await reqData.getHongkong();
        file = getNewFile;
        if(file.finishDraw != null){
            file.finishDraw = true;
            file.startDraw = false;
        }

        write('hongkong', file)
    }
}

async function SGPUpdate(){
    let file = read("sgp")
    console.log("updating SGP ...")

    let getNewFile = await reqData.getSGP();
    file = getNewFile;
    write('sgp', file)
}

function getHongkong(){
    return read("hongkong")
}

function getSydney(){
    return read("sydney")
}

function getSGP(){
    return read("sgp")
}

module.exports = {getHongkong, HongkongUpdate, SydneyUpdate, getSydney, SGPUpdate, getSGP}
