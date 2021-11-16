import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';


const ConvertToRoman = () => {
const [romanValue, setRomanValue] = useState();
const [romanFocused, setRomanFocused] = useState(false);
const [laoding, setLoading] = useState(false);
const [apiError, setApiError] = useState();
const[apiResponse, setApiResponse] = useState();


//if input value is changed we call this function
const romanValueChanged = event => {
    event.preventDefault();
    setRomanValue(event.target.value)
}

const includeInvalidAlphabet = (value) => {
    const romanArray = ["I", "IV", "V", "IX", "X","XL","L","XC","C","CD","D","CM","M"];
    //convert string to an array
    const valueArray = Array.from(value.toUpperCase());
    let returnedBoolean = true;
    valueArray.some((arr) => {
        if(!romanArray.includes(arr)) {
            returnedBoolean = false;
        } 
    })
    return returnedBoolean;
}
const validateRoman = (value) => {
    if(value){   
        if(typeof value !== 'string' || !includeInvalidAlphabet(value)) {
            return true;
        }
        return false;
    } else {
        return false;
    }
}
const isRomanValid = romanFocused && validateRoman(romanValue);

const onFocusRoman = () => {
    setRomanFocused(true)
}

const submitRequest = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://localhost:5000/api/numerals/${romanValue.toUpperCase()}/arabic`)
        .then((res) => {
            if(!res.ok){
                //handle error
                throw new Error(res.status)
            } else {
                return res.json()
            }
        }).then((data) => {    
            setApiResponse(data.numeral);
            setLoading(false);
        }).catch((error) => {
            setApiError(`Error: ${error}`)
            setLoading(false);
        })
    
}
const hasError = romanFocused && isRomanValid;
const arabicClass = hasError ? 'invalid' : '';
const responseClass = apiError ? 'api-result-errort' : 'api-result';
  return (
    <form className="form-css">
        {laoding ? (
            <Loader
                type="Puff"
                color="#b40e0e"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        ) : (
            <div className={arabicClass}>
              <label htmlFor="name">Roman Numeral to Arabic Numeral</label>
              {hasError && <p className="error-text" id="romanError">Invalid Roman Numeral</p>}
              <input
                type="text"
                id="romanValue"
                onChange={romanValueChanged}
                onFocus={onFocusRoman}
              //   onBlur={onBlurArabic}
                value={romanValue || ""}
                />
              <div>
              {apiResponse && <p className={responseClass}>{apiResponse}</p>}
              <button id="submitRoman" onClick={submitRequest} disabled={romanFocused ? isRomanValid : true} className="button">Submit</button>
              </div>
            </div>
        )}
    </form>
  );
};

export default ConvertToRoman;