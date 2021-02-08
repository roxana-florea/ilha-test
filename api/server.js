require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if(err){
        console.log("Error occured");
    }
    else{
        console.log("Successfuly connected to nothing!!");
    }
})