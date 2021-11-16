async function convertToArabic(arabicNumeral) {
    let num = returnIntValue(arabicNumeral.charAt(0));
    let previous, current;
    
    for(var i = 1; i < arabicNumeral.length; i++){
        current = returnIntValue(arabicNumeral.charAt(i));
        previous = returnIntValue(arabicNumeral.charAt(i-1));
        if(current <= previous){
            num += current;
        } else {
            num = num - previous*2 + current;
        }
        }
        return num;
    }
    
function returnIntValue(c){
    switch (c){
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return -1;
    }
}

module.exports = convertToArabic;