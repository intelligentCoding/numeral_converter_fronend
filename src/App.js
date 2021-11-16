import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ConvertNumerals from './components/convert-numerals/ConvertNumerals';
const App = () => {
  return <Router>
    <Route path="/">
      <ConvertNumerals/>
    </Route>
  </Router>
}

export default App;
