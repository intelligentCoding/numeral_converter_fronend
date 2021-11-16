import React, { useState, useEffect } from 'react';
import ConvertToRoman from './ConvertToRoman';
import ConvertToArabic from './ConvertToArabic';
const ConvertNumerals = (props) => {

  return (
      <React.Fragment>
          <ConvertToRoman/>
          <ConvertToArabic/>
      </React.Fragment>
  );
};

export default ConvertNumerals;