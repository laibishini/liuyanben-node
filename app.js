

var express = require("express");
var app = express();
var db = require("./model/db.js");
var formidable = require('formidable');
var ObjectId = require('mongodb').ObjectID;



/*那么首先要设置模版引擎*/

app.set("view engine","ejs");

/*首页静态化*/

app.use(express.static("./public"));

app.get("/",function(request,response){
    db.getAllCount("liuyanben",function(count){
        response.render("index",{
            "pageamount":Math.ceil(count / 5)
        })

    })

})

/*读取所有的留言*/
app.get("/du",function(request,response){
    /*获取页码*/
    var page = parseInt(request.query.page)

    db.find("liuyanben",{},{"sort":{"shijian":-1},"pageamount":5,"page":page},function(err,result){

        response.json({"result":result})

    })


})



/*提交留言*/
app.post("/tijiao",function(request,response,next){
/*提交表单用的工具包*/
    var form = new formidable.IncomingForm();
    form.parse(request,function(err,fields){
        /*ajax发过来以后就写入数据库*/
            console.log(fields.xingming)
            console.log(fields.liuyan)

        db.insertOne("liuyanben",{
            "xingming":fields.xingming,
            "liuyan":fields.liuyan,
            "shijian":new Date()

        },function(err,result){
            if(err){
                response.send({"result":-1})

                return;

            }

            response.json({"result":1})
        })

    });
});

/*删除留言*/

app.get("/shanchu",function(request,response){
    /*获取urlid*/
    var id = request.query.id;

    db.deleteMany("liuyanben",{"_id":ObjectId(id)},function(err,result){
        response.redirect("/");



    })


})






/*设置监听端口*/
app.listen(2080);