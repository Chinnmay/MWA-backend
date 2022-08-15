module.exports = (req, res) => {
    const Image = require("../../../models/image");
    const Issue = require("../../../models/issue");
    const image = new Image(req.body);
      image
        .save()
        .then((result) => {
            console.log(result)
            Issue.updateOne(
                {_id: result.issueID},
                { $push: {images: result.id}}
            )
            .catch((err) => {
                res.send(err);
                console.log(err);
            });  
          res.send({result, message: "Image added successfully"});
        })
        .catch((err) => {
          res.send(err);
          console.log(err);
        });
    

  };
  