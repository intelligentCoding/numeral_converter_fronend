const romanArray = require('./roman-array');

async function converToRoman(num) {
    let numeral = "";
    while(num > 0){
        let searchArray = romanArray.filter((romanArr) => {
            if(romanArr.number <= num){
                return romanArr.number
            }
        });
        let latestRoman = searchArray.pop()
        let full = Math.floor(num / latestRoman.number)
        for( let i = 0; i<full; i++ ) {
            numeral +=latestRoman.roman
        }
        num = num % latestRoman.number
    }
    return numeral;
}

module.exports = converToRoman;