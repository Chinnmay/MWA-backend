module.exports = async(req, res) => {
    const Issue = require("../../../models/issue");

    Issue.findOneAndUpdate({ issueCode: req.body.issueCode }, req.body, { new: true }, (err, result) => {
        if (!err) {
        res.statusCode = 200;
        res.send({ message: "Issue details updated successfully", updatedIssue: result });
        } 
        else {
        console.log(err);
        res.statusCode = 500;
        res.send(err);
        }
    });
    };


//     try{
//         var updatedIssue = await Issue.findOneAndUpdate({ issueCode: req.body.issueCode }, req.body, { new: true });
//         res.statusCode = 200;  
//         res.send({ message: "Issue details updated successfully", updatedIssue: updatedIssue });
//     }catch (err) {
//     console.log(err);
//     res.statusCode = 500;
//     res.send(err);
//   }
//   };