const { query } = require("express");

module.exports = (req, res) => {
    const Issue = require("../../../models/issue");
    const Label = require("../../../models/label");
    //console.log("test")
    //console.log(req.body)
    //console.log("Label IDS")
    const issueLabels = []
    for(let label of req.body.labels){
      issueLabels.push(label._id)
    }
    //console.log(issueLabels)
    var query = {};
    if(req.body.issueType == "Crop Related"){
      if(req.body.cropID){
        query["cropID"] = req.body.cropID
        if(req.body.categoryID){
          query["categoryID"] = req.body.categoryID
          if(req.body.problemID){
            query["problemID"] = req.body.problemID
          }
        }
      }
      query["issueCode"] = {$ne: req.body.issueCode}
    }
    else{
      //logic for other issues
      query["issueCode"] = "OK"
    }    
    console.log(query)
    Issue.find(query, 'issueCode title status labels')
      .then((issues) => {
        console.log(issues)
        for(let issue of issues){
          issue.labels = issueLabels.filter(value => issue.labels.includes(value));          
        }
        issues = issues.sort(function(a,b){
          return b.labels.length - a.labels.length;
        })
        console.log(issues)        
        res.statusCode = 200;
        res.send({issues});
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({error : err});
        console.log("Issue error");
      });
  };
  