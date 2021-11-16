import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';


const ConvertToRoman = () => {
const [arabicValue, setArabicValue] = useState();
const [arabicFocused, setArabicFocused] = useState(false);
const [laoding, setLoading] = useState(false);
const [apiError, setApiError] = useState();
const[apiResponse, setApiResponse] = useState();


//if input value is changed we call this function
const arabicValueChanged = event => {
    event.preventDefault();
    setArabicValue(event.target.value)
}


const validateArabic = (value) => {
    if(value > 3999 || value < 0 || isNaN(value) || value === null) {
        return true;
    }
    return false;
}
const isArabicValid = validateArabic(arabicValue);

const onFocusArabic = () => {
    setArabicFocused(true)
}

const submitRequest = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`http://localhost:5000/api/numerals/${arabicValue}/roman`)
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
            setApiError(`Error: Invalid Request`)
            setLoading(false);
        })
    
}
const hasError = arabicFocused && isArabicValid;
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
              <label htmlFor="name">Arabic Numeral to Roman Numeral</label>
              {hasError && <p className="error-text" id="arabicError">Arabic Numeral Must be between 0 - 3999</p>}
              <input
                type="text"
                id="ArabicValue"
                onChange={arabicValueChanged}
                onFocus={onFocusArabic}
              //   onBlur={onBlurArabic}
                value={arabicValue || ""}
                />
              <div>
              {apiResponse && <p className={responseClass}>{apiError ? apiError : apiResponse}</p>}
              <button id="submitArabic" onClick={submitRequest} disabled={arabicFocused ? isArabicValid : true} className="button">Submit</button>
              </div>
            </div>
        )}
    </form>
  );
};

export default ConvertToRoman;