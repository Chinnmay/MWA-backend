module.exports = (req, res) => {
    const Issue = require("../../../models/issue");
    
    Issue.find(
        { $and:
            [ 
                {
                    farmerID : req.params.farmerID
                }, 
                {
                    $or : 
                    [
                        { status: 'Done' },
                        { status: 'Rejected' },
                    ]
                }
            ]
        },'issueCode title status')
        .then((issues) => {
            res.statusCode = 200;
            res.send({issues});
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send({error : err});
            console.log("Issue error");
        });
    };
      