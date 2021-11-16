const converToRoman = require('../utils/convertToRoman')
const convertToArabic = require('../utils/convertToArabic');
const convertNumeral = async (req, res, next) => {
    const { value, type } = req.params;

    let numeral;
    if(type === 'roman') {
        numeral = await converToRoman(value);
    } else if (type === 'arabic') {
        numeral = await convertToArabic(value);
    }

    res.status(200).json({numeral});

}

exports.convertNumeral = convertNumeral;