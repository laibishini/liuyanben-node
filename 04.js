/**
 * Created by Jne on 2017-07-22.
 */
/*cookie使用express框架猜你喜欢*/
var express = require("express");
var cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser());

app.get("/",function(request,response){
    /*设置他的cookie*/
    response.send("猜你喜欢"+request.cookies.mudidi)

});

//查询一个地方的攻略，URL语法： http://127.0.0.1/gonglue?mididi=北京
//此时北京就能记录在cookie中

app.get("/gonglue",function(request,response){
    var mudidi = request.query.mudidi;
    /*记录用户的喜好然后在设置cookie*/
    var mudidiarry = request.cookies.mudidi || [];
    mudidiarry.push(mudidi);
    response.cookie("mudidi",mudidiarry,{ expires: new Date(Date.now() + 900000), httpOnly: true })
    response.send(mudidi+"旅游攻略")



})

app.listen(3000)