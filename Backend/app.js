const express = require('express');
const createNumeralsRoutes = require('./routes/numerals-routes');
const HttpError = require('./models/http-error');
var cors = require('cors');
const app = express();
app.use(cors());

app.use('/api/numerals', createNumeralsRoutes);

//Error handling for unsupported routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})


//error middleweare 
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "OOPS an unknow error occured!"})
});


app.listen(5000);