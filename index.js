const express = require("express")
const app = express();

var users = [{
    name: "John",
    kidneys: [{
        healthy: true
    },{
        healthy: false
    }]
}]

app.use(express.json());

app.get("/",function(req,res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    const healthyKidneys = johnKidneys.filter((kidney) => {
        return kidney.healthy;
    })

    const numberOfHealthyKidneys = healthyKidneys.length;
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

})


app.post("/",function(req,res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done!"
    })
})


app.put("/",function(req,res) {
     for(let i = 0; i< users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
     }

     res.json({});
})

// removing the unhealthy kidneys
app.delete("/",function(req,res) {
    if(atleastUnhealthyKidney()) {
        const newKidneys = [];
    for(let i = 0; i < users[0].kidneys.length; i++) {
        if(users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({msg : "done"})
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
    
})

function atleastUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for(let i=0; i < users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy)
        {
        atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;   
}

app.listen(3000);