const express=require('express');
const hbs=require('hbs');
var app=express();
const  fs=require('fs');
hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now =  new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){

            console.log('unable to append server.log');
        }
    })
    next();
});

/* app.use((req,res,next)=>{
    res.render('maintenance.hbs');
}); */
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('srinivas',(text)=>{
    return text.toUpperCase();

});
app.get('/',(req,res)=>{
//res.send('<h1>hello express</h1>');

/* res.send({
    name: 'srinivas',
    likes:[
        'biking',
        'riding'
    ]
}) */

res.render('home.hbs',{
    pageTitle:'home Page',
    welcomeMessage:'Welcome to my Message'
    
});
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to open'
    });
})
app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle:'About Page'
    
});
});
app.listen(3000);
