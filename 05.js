/**
 * Created by Jne on 2017-07-22.
 */
var express = require("express");

var app = express();

var session = require("express-session");
/*详情请看npm包*/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true

}));
app.get("/",function(request,response){
    if(request.session.login == "1"){
        response.send("欢迎"+request.session.username)
    }else{
        response.send("没有登陆成功")
    }

});

app.get("/longin",function(request,response){
    request.session.login = "1";
    request.session.username = "考拉"
    response.send("恭喜你成功登陆了")


})

app.listen(3000)