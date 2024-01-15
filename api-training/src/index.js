
////////////////////////////////////////////////////////////////imports////////////////////////////////
const express  = require("express")
require("dotenv/config");
const bp = require("body-parser")
const cors = require("cors")
const DB = require("./config/config-database.js")
const moment = require("moment");
////////////////////////////////export////////////////////////////////
const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.setTimeout(120000, function () {
        res.send(408);

    });
    next();
})
  

app.listen(5000, () => console.log(`Listening on port${5000}...`));

app.get("/getUser", async (req, res) => {
    const qry = "SELECT * from user"; 
    DB.query(qry, function (error,result,fields) {
        return res.json(result);
    });
});

app.post("/createUser", async (req, res) => {
    try{
    const qry = `INSERT INTO user (id, username,password,create_date)
    values (NULL,'${req.body.username}','${req.body.password}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;

    DB.query(qry, function (error,result,fields) {
            return res.send("Success");
        });
    } catch (error) {
            return res.send("Failed")
        }

        // return res.json(result);
    });

//start path
app.post("/getUserByID/:id", async (req, res) => {
    // res.json(req.params.id);

    try{
    const id = req.params.id;
    const qry = `SELECT * from user where id = '${id}' `;
    
        DB.query(qry, function (error,result,fields) {
            if (error) {
                return res.send({message: "error", errors: error});
            }
            return res.json(result);
            });
        } catch (error) {
            res.send({message: "Failed", errors: error});
            } 
    
    });
//end path

//start query
app.post("/getUserByID", async (req, res) => {
    try{
        const {id,id2} = req.query;
        const qry = `SELECT * from user where id = '${id}' `;
        
            DB.query(qry, function (error,result,fields) {
                if (error) {
                    return res.send({message: "error", errors: error});
                }
                return res.json(result);
                });
            } catch (error) {
                res.send({message: "Failed", errors: error});
                }

    });
//end query

app.post("/updateUser/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const {username, password} = req.body
        const qry = `update user SET username= '${username}', password ='${password}' where id = '${id}'`; 

        DB.query(qry, function (error,result,fields) {
            if (error) {
                return res.send({message: "error", errors: error});
            }
            return res.json(result);
                }); 
            }catch (error) {
                
        }

    });

app.delete("/deleteUser/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const qry = ` DELETE from user where id = '${id}' `;
        
        DB.query(qry, function (error,result,fields) {
            if (error) {
                return res.send({message: "error", errors: error});
            }
            return res.json(result);
                }); 
            }catch (error) {
                
        }

    });

