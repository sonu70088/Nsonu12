var express=require("express");
var MongoClient=require("mongodb").MongoClient
var cors=require("cors")
var urlstr="mongodb://127.0.0.1:27017"
var app=express()
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json()) 
app.use(cors()) 
app.get("/users",(req,res)=>{
MongoClient.connect(urlstr).then((obj)=>{
    var database=obj.db("utube")
    database.collection("user").find({}).toArray().then((product)=>{
        res.send(product) 
        res.end()
    })
  })
})
app.post("/register",(req,res)=>{
    var user={
        "userid":req.body.userid,
        "username":req.body.username,
        "userpassword":req.body.userpassword,
        "useremail":req.body.useremail,
        "usermobile":req.body.usermobile
    }
    MongoClient.connect(urlstr).then((object)=>{
        var database=object.db("utube")
        database.collection("user").insertOne(user).then(()=>{
            console.log("all data inserted")
        })
    })
})
app.post("/admin",(req,res)=>{
     var admin={
        "adminid":req.body.adminid,
        "adminusername":req.body.adminusername,
        "adminpassword":req.body.adminpassword
     }
     MongoClient.connect(urlstr).then((object)=>{
        var database=object.db("utube")
        database.collection("admin").insertOne(admin).then(()=>{
            console.log("admin data innserted")
        })
     })
})
app.get("/admin",(req,res)=>{
    MongoClient.connect(urlstr).then((obj)=>{
        var database=obj.db("utube")
        database.collection("admin").find({}).toArray().then((products)=>{
            res.send(products)
            res.end()
        })
    })
})
app.post("/addvideos",(req,res)=>{
  var video={
    "videoid":req.body.videoid,
    "videoname":req.body.videoname,
     "liks":req.body.liks,
     "subscribers":req.body.subscribers,
     "videourl":req.body.videourl,
     "videofaculty":req.body.videofaculty
  }
  MongoClient.connect(urlstr).then((obj)=>{
    var database=obj.db("utube")
    database.collection("video").insertOne(video).then(()=>{
        console.log("videoinserted")
    })
  })
})
app.get("/videos",(req,res)=>{
    MongoClient.connect(urlstr).then((obj)=>{
       var database=obj.db("utube")
       database.collection("video").find({}).toArray().then((product)=>{
           res.send(product)
           res.end()
       })
    })
})
app.get("/videos/:id",(req,res)=>{
    var id=parseInt(req.params.id)
    MongoClient.connect(urlstr).then((obj)=>{
        var database=obj.db("utube")
        database.collection("video").find({videoid:id}).toArray().then((document)=>{
            res.send(document)
            res.end()
        })
    })
})
app.put("/modify",(req,res)=>{
    MongoClient.connect(urlstr).then((obj)=>{
        var database=obj.db("utube")
        videoid={videoid:parseInt(req.body.videoid)}
        videoupdate={$set:{videoname:req.body.videoname,liks:parseInt(req.body.liks),suscribers:req.body.suscribers,videourl:req.body.videourl,videofaculty:req.body.videofaculty}}
        database.collection("video").updateOne(videoid,videoupdate).then((succ)=>{
            res.send(succ)
            console.log("video modify")
            res.end()
        })
    })

})
app.delete("/delete/:id",(req,res)=>{
    var id=parseInt(req.params.id)
    MongoClient.connect(urlstr).then((obj)=>{
        var database=obj.db("utube")
        database.collection("video").deleteOne({videoid:id}).then(()=>{
            console.log("data deleted")
            res.end()
        })
    })
})
app.get("/category",(req,res)=>{
    MongoClient.connect(urlstr).then((obj)=>{
        var database=obj.db("utube")
        database.collection("categories").find({}).toArray().then((products)=>{
            res.send(products)
            res.end()
        })
    })
})
app.get("/categories",(req,res)=>{
    MongoClient.connect(urlstr).then((object)=>{
        var database=object.db("utube")
        database.collection("catagory").find({}).toArray().then((allproduct)=>{
           res.send(allproduct)
           res.end() 
        })
    })
})
app.listen(4137)
console.log("data base connected  http://127.0.1:5500")