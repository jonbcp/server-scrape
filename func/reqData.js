const cheerio = require('cheerio');
const axios = require('axios');

async function getHongkong(){
    let mainUrl = 'https://www.hongkongpools.com/live';
    
    // const html = await axios.get('https://www.yelu.sg/lottery/singapore-pools-results-today');
    // const html = await axios.get('https://www.singaporepools.com.sg/en/product/Pages/4d_results.aspx');

    const mainHtml = await axios.get(mainUrl);
    let status = 'error';
    let result = null;

    if(mainHtml.status == 200){
        const $ = await cheerio.load(mainHtml.data);
        status = mainHtml.status;

        // let pageUrl = $('body > center:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > table > tbody > tr > td > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(3) > font > b > a').attr('href');
        // pageUrl = mainUrl +  url.split("\'")[1]

        // let nextDraw = $('#ctl00_ctl36_g_06c36ce1_a880_4b71_82e6_ce448fdef295 > div > div.results-filter.row.clearfix > div.col-md-9 > div:nth-child(4)').text();

        // time function and variable
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function timeConvert(diff) {
            let minutes = diff % 60;
            let hours = (diff - minutes)/60
            return hours + ":" + minutes;
        }

        function diff_minutes(dt2, dt1) {
            let diff =(dt2 - dt1) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff));
        }

        // get current draw time
        let getTimeString = $('body > table > tbody > tr > td > center > table > tbody > tr:nth-child(1) > td > font > b').text();
        let timeArr = getTimeString.replace(',','').split(' ')
        let currentDraw = timeArr[3] + " " + timeArr[2] + " " + timeArr[4] + " " + timeArr[6] + " GMT+8";

        // get todays draw schedule "31 July 2021 23:45 GMT+8"
        let today = new Date();
        let todayDraw = today.getDate() + " " + monthNames[today.getMonth()] + " " +  today.getFullYear() + " 23:45 GMT+8";

        let curDrawUnix = Date.parse(currentDraw)
        let currUnix = Date.parse(today)
        let todayDrawUnix = Date.parse(todayDraw)

        let diffTime = timeConvert(diff_minutes(todayDrawUnix, currUnix))

        // console.log("curDrawUnix =  ", curDrawUnix)
        // console.log("currUnix =  ", currUnix)
        // console.log("todayDrawUnix = ", todayDrawUnix)
        // console.log("diffTime = ", diffTime)

        // console.log("today = ", today.getDate())
        // console.log("today = ", monthNames[today.getMonth()])
        // console.log("today = ", today.getYear())



        // let firstPrize = $('#results-singapore-pools-4d > div.lotto_con > div.lotto_numbers > div:nth-child(1) > div.numbers_title.l_prize').attr("data-lotto-n");
        // let secondPrize = $('#results-singapore-pools-4d > div.lotto_con > div.lotto_numbers > div:nth-child(3) > div.numbers_title.l_prize').attr("data-lotto-n");
        // let thirdPrize = $('#results-singapore-pools-4d > div.lotto_con > div.lotto_numbers > div:nth-child(5) > div.numbers_title.l_prize').attr("data-lotto-n");

        let firstPrize = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(2) > td:nth-child(2)").text().replace(/\n/g,'');
        let secondPrize = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(3) > td:nth-child(2)").text().replace(/\n/g,'');
        let thirdPrize = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(4) > td:nth-child(2)").text().replace(/\n/g,'');

        let starter1 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)").text().replace(/\n/g,'').replace(" ",'');
        let starter2 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)").text().replace(/\n/g,'').replace(" ",'');
        let starter3 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)").text().replace(/\n/g,'').replace(" ",'');
        let starter4 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)").text().replace(/\n/g,'').replace(" ",'');

        let consolation1 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)").text().replace(/\n/g,'').replace(" ",'');
        let consolation2 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)").text().replace(/\n/g,'').replace(" ",'');
        let consolation3 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)").text().replace(/\n/g,'').replace(" ",'');
        let consolation4 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)").text().replace(/\n/g,'').replace(" ",'');
        let consolation5 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1)").text().replace(/\n/g,'').replace(" ",'');
        let consolation6 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)").text().replace(/\n/g,'').replace(" ",'')
        let consolation7 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(1)").text().replace(/\n/g,'').replace(" ",'');
        let consolation8 = $("body > table > tbody > tr > td > center > table > tbody > tr:nth-child(6) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)").text().replace(/\n/g,'').replace(" ",'');

        
        // console.log("aa", nextDraw)
        result = {
            
            "currentDraw" : currentDraw,
            "nextDraw" : todayDraw,
            // "drawNumber" : drawNumber,
            "firstPrize" : firstPrize || null,
            "secondPrize" : secondPrize,
            "thirdPrize" : thirdPrize,
            "starterPrize" : [starter1, starter2, starter3, starter4],
            "consolationPrize" : [
                consolation1,
                consolation2,
                consolation3,
                consolation4,
                consolation5,
                consolation6,
                consolation7,
                consolation8
            ],
        }

    }

    return status == 'error' ? status : result;
    
}

module.exports = {getHongkong}
