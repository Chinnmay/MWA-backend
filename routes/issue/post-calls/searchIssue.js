module.exports = (req, res) => {
    const Issue = require("../../../models/issue");
    let accessTokenDetails;
    if (req.body.accessTokenDetails) {
      accessTokenDetails = req.body.accessTokenDetails;
      delete req.body.accessTokenDetails;
    }
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      res.statusCode = 200;
      res.send({ message: "No issues Found" });
    } else {
      const query = req.body;
      for(let x in query){
        if(x === "issueCode")
        query[x] = { $regex: new RegExp(`${query[x]}`), $options: 'i' };
      }
      Issue.find(query)
        .then((result) => {
          if (result.length > 0) {
            res.statusCode = 200;
            res.send(result);
          } else {
            res.statusCode = 200;
            res.send({ message: "No issues Found" });
          }
        })
        .catch((err) => {
          res.statusCode = 500;
          res.send(JSON.stringify(err));
          console.log(err);
        });
    }
  };
  