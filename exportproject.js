var express=require('express');
var router=express.Router();
const mongoose = require('mongoose');
const Class = require("./model/classschema");
const Student = require("./model/studentschema");


//take class data from the database
router.get("/class", function (req, res) {
    Class.find(function (err, response) {
      if (err) res.json({ message: err });
      else res.json(response);
    });
  });


  //dd class data to the database

  router.post("/class", function (req, res) {
    var length1=0;
    console.log(1);
    console.log(req.body);
    const classInfo = req.body;
  
    //Check if all fields are provided and are valid:
    if (
      !req.body.standard ||
      !req.body.division 
      
    ) 
    {
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      
          
      Class.find(function (err, response) {
        if (err) res.send(err);
        else {
          const data = response;
          console.log("data is" + data);
  
          //sometimes duplicate data comes in the database so inorder to avoid duplcatedata i set one pkey .for pkey we need length1 is used.
          //data.length have many data inthe database.
          length1 = data.length + 1;
          console.log("length is" + length1);
          var newClass = new Class({
            pkey:length1+classInfo.standard+classInfo.division,
            standard: classInfo.standard,
            division: classInfo.division,
           
          });
          newClass.save(function (err, Person) {
            if (err) res.json(err);
            else res.json("New class created");
          });
        }
        })
        }
      
  });

  //add student details to the database.we  must give proper classId from the class collection
  

  router.post("/student", function (req, res) {
    console.log(1);
    var length1=0;
    console.log(req.body);
    const studentInfo = req.body;
  
    //Check if all fields are provided and are valid:
    if (
      !req.body.name ||
      !req.body.rollno||
      !req.body.mobileno||
      !req.body.classId 
      
    ) 
    {
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      
     Student.find(function (err, response) {
        if (err) res.send(err);
        else {
          const data = response;
          console.log("data is" + data);
         //sometimes duplicate data comes in the database so inorder to avoid duplcatedata i set one pkey .for pkey we need length1 is used.
          //data.length have many data inthe database.
         
          length1 = data.length + 1;
          console.log("length is" + length1);
           
          var newStudent = new Student({
            pkey:length1+studentInfo.name+studentInfo.rollno+studentInfo.mobileno,
            name:studentInfo.name,
            rollno:studentInfo.rollno,
            mobileno:studentInfo.mobileno,
            classId:studentInfo.classId
           
          });
          newStudent.save(function (err, response) {
            if (err) res.json(err);
            else res.json("New Student created and  ");
          });
        }
      })
        }
      
  });

  /*router.get("/student", function (req, res) {

    Student.
    find().
    populate
      ('classId')
    .
    exec(function (err, response) {
      if (err) console.log(err);
      else
      {
      console.log('The author is '+ response);
      res.json(response);
      }
      // prints "The author is Ian Fleming"
    })*/


    /*Student.
  find().
  populate({
    path: 'classId',
    
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: ['standard','division']
  }).
  exec(function (err, response) {
    if (err) console.log(err);
    else
    {
    console.log('The author is '+ response);
    res.json(response);
    }
    // prints "The author is Ian Fleming"
  });*/
  /*Student.aggregate([{
        $lookup: {
            from: "classes", // collection name in db
            localField: "_id",
            foreignField: "classid",
            as: "classstandard"
        }
    }]).exec(function(err, response) {
        // students contain WorksnapsTimeEntries
        console.log(response);
    });*/

    /*var dbclass = [];
    var totalinformation=[];
   Class.find()

    .then(data => {
        console.log("Class:")
        console.log(data);
        totalinformation=data;
        console.log(totalinformation);
  
        // Putting all course id's in dbcourse array
        data.map((d, k) => {
            dbclass.push(d._id);
        })
  
        // Getting students who are enrolled in any
        // database course by filtering students
        // whose courseId matches with any id in
        // dbcourse array
        Student.find({ classid: { $in: dbclass } })
            .then(data => {
                console.log("Students in Database class:")
                console.log(data);
                const student_data=data;
                totalinformation.push(student_data)
                console.log("total"+totalinformation);
            })
            .catch(error => {
                console.log(error);
            })
    })
    .catch(error => {
        console.log(error);
    })*/
    
  //});

 
/*router.get("/student/classanddivision", function (req, res) {

    Student.
    find().
    populate
      ('classId')
    .
    exec(function (err, response) {
      if (err) console.log(err);
      else
      {
      console.log('The author is '+ response);
      res.json(response);
      }
      // prints "The author is Ian Fleming"
    })*/


    /*Student.
  find().
  populate({
    path: 'classId',
    
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: ['standard','division']
  }).
  exec(function (err, response) {
    if (err) console.log(err);
    else
    {
    console.log('The author is '+ response);
    res.json(response);
    }
    // prints "The author is Ian Fleming"
  });*/
 
  //});


  //read the data from the database acoording to standarad and division.
  router.get("/student/:standard/:division", function (req, res) {

    const standard=req.params.standard;
    const division=req.params.division;
    //take class Id from the corresponding standard and division.if the class Id is found get all the  the studentdata with this classId.

    Class.find({$and:[{standard:standard},{division:division}]},function(err, response)
    {
      if(err)
      res.json(err);
      else{
      const data=response;
      console.log(data);
      if(data.length==0)
      {
        res.json("Not class found")
      }
      else{
      const id=data[0]._id;
      console.log(response);
      console.log(data[0]._id);
      Student.find(({classId:id}),function(err, response)
      {
        if(err)
        res.send(err);
        else{
          res.json(response)
        }


      })
    }
    }
      



  })
})


//get all student data for  particular standard

router.get("/student/:standard", function (req, res) {
   var fullData=[];
    const standard=req.params.standard;
  const division=req.params.division;

  //get all class Id from paricular standard.answer  is array.after take class Id then do mapping for taking only the object _id.
  Class.find({standard:standard},function(err, response)
  {
    
    if(err)
    res.json(err);
    else{
    const classInfo=response;
    console.log(classInfo)

    //take only the classid from this classInfo and assig to newid
    const newid=classInfo.map((item)=>
    {
       return item._id
    })
    console.log(newid);
   
    /*Student.find({classId:[newid]},function(err, response)
    {
      if(err)
      res.send(err);
      else{
        console.log(response);
             res.json(response)
        
      }


    })*/


    //get all student details and map the student info according to studentclassId=newid and push to one array
    Student.find(function(err, response)
    {
      if(err)
        res.send(err);
      else{
        const studentInfo=response;

        for(i=0;i<classInfo.length;i++)
        {
          studentInfo.map((item)=>
          {
            if(item.classId==newid[i])
            {
              fullData.push(item);
            }

          })
          
        }
        res.json(fullData);
        
      }  

    })
  }
    



})
})
//update the student of standard and division with correspnding studentobjectid 

router.put("/student/:studentobjid/:standard/:division", function (req, res) {
  var classId=[];

  //check the db if correspoding standard and division in class collection.if found the update the student with classId.

Class.find({$and:[{standard:req.params.standard},{division:req.params.division}]},(function(err, response)

    {

      if(err)
        res.json(err);
      else{
        const classInfo=response;
        console.log(response);
       
        if(classInfo.length!=0)
        {
        classId=response[0]._id;
        Student.findByIdAndUpdate(req.params.studentobjid, {$set:{classId:classId}},function(err, response){
            if (err) res.json(err);
            else {
              console.log(response);
              res.json({ message: "student " + req.params.studentobjid + " updated." });
            }
          }
        );


        }
        else
        res.json("no class")
      }
    }) )


})

//delete student with this corresponding student objectid.

router.delete("/student/:id", function (req, res) {
  console.log(req.params.id);
  console.log(req.body);
  Student.deleteOne({_id: req.params.id }, function (err, response) {
    if (err) res.json(err);
    else {
      console.log(response);
      res.json({ message: "Student " + req.params.id + " deleted." });
    }
  });
});

//delete class with this corresponding class objectid.

router.delete("/class/:id", function (req, res) {
  console.log(req.params.id);
  console.log(req.body);
 Class.findOneAndDelete({_id:req.params.id }, function (err, response) {
    if (err) res.json(err);
    else {
      console.log(response);
      res.json({ message: "Class " + req.params.id + " deleted." });
    }
  });
});

  module.exports=router;