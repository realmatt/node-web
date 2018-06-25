const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs'); // key - value


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(`${now}: ${req.method}: ${req.url}`);
    fs.appendFileSync('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next(); // next to move on the code. if not next, stop in here
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// }); // static page after maintenance because, 

app.use(express.static(__dirname+'/public')); // this is for static pages. under public folder help.html --> localhost:3000/help.html ; this is middlaware

hbs.registerHelper('getCurrentYear',()=>{ // to pass same argument once
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    //var text1 = text.toUpperCase();
    //new String(text);
    return  text.toUpperCase();
});


app.get('/', (req,res)=>{
    //res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name:'MATT',
    //     likes: [
    //         'foot','cities'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to my site'
        // ,currentYear:new Date().getFullYear()
    })
});

app.get('/about',(req,res)=>{
   // res.send('<h1>My Name is Matt</h1>');
   res.render('about.hbs',{
       pageTitle:'About Page'
    //    ,currentYear:new Date().getFullYear()
   });

});

app.get('/bad',(req,res)=>{
    res.send({
        errorCode:400,
        status:'NOT WORKING'
    });
}); 

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});