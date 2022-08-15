module.exports = (req, res) => {
    const Image = require("../../../models/image");
    const Issue = require("../../../models/issue");
      Image.deleteOne({_id : req.body.imageID})
        .then((result) => {
            console.log(result)
            Issue.updateOne(
                {_id: req.body.issueID},
                { $pull: {images: req.body.imageID}}
            )
            .catch((err) => {
                res.send(err);
                console.log(err);
            });  
          res.send({result, message: "Image deleted successfully"});
        })
        .catch((err) => {
          res.send({err, message: "Image deletion failed. Please try again"});
          console.log(err);          
        });
    

  };
  