module.exports = (req, res) => {
  const Farmer = require("../../../models/farmer");
  let accessTokenDetails;
  if (req.body.accessTokenDetails) {
    accessTokenDetails = req.body.accessTokenDetails;
    delete req.body.accessTokenDetails;
  }

  if (Object.keys(req.body).length === 0) {
    res.statusCode = 200;
    res.send({ message: "No farmer Found" });
  } else {
    const query = req.body;
    for(let x in query){
      query[x] = { $regex: new RegExp(`${query[x]}`), $options: 'i' };
    }
    Farmer.find(query)
      .then((result) => {
        if (result.length > 0) {
          res.statusCode = 200;
          res.send(result);
        } else {
          res.statusCode = 200;
          res.send({ message: "No farmer Found" });
        }
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send(JSON.stringify(err));
      });
  }
};
