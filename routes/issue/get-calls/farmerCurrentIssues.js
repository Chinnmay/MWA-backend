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
                        { status: 'New' },
                        { status: 'In Progress' },
                        { status: 'In Follow Up' },
                        { status: 'On Hold' },
                        { status: 'SolutionProvided' },
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
      