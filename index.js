const express = require('express');
const bodyParser = require('body-parser');
var mysql = require("mysql");
const app = express();
const cors = require('cors')

const pool = mysql.createPool({
    host: '216.137.190.180',
    user: 'admin.d',
    password: 'spiderman2023',
    database: 'icohsa2_test'
});

pool.getConnection(function (error) {
    if (!!error) {
        console.log(error)
        console.log("Error")
    } else {
        console.log("Conected")
    }

})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})) ;


app.post("/api/icohs/insert", (req, res) => {

    const step1 = req.body.step1;
    const step2 = req.body.step2;
    const step3 = JSON.stringify(req.body.step3);
    const step4 = req.body.step4;
    const personalDataName = req.body.personalDataName;
    const personalDataLastName = req.body.personalDataLastName;
    const personalDataEmail = req.body.personalDataEmail;
    const personalDataPhone = req.body.personalDataPhone;

    const sqlInsert = "INSERT INTO `icohs-quiz` (`step1`, `step2`, `step3`, `step4`, `first_name`, `last_name`, `email`, `phone`) VALUES (? , ? , ? , ?, ?, ?, ?, ?)";
    pool.query(sqlInsert, [step1, step2, step3, step4, personalDataName, personalDataLastName, personalDataEmail, personalDataPhone], (error) => {
        if(error) {
            console.log(res.json(error))
            res.json({status:"failure",reason: error.code});
        }else{
            res.json({status:"success"})
        }

    })
})


app.get("/api/icohs/get", function (req, res) {

    pool.query("SELECT * FROM `icohs-quiz` LIMIT 100;", function (error, rows, fieds) {
        if (!!error) {
            console.log("error in the query")
            res.status(500).json(error)
        } else {
            console.log("SUCCES")
            res.status(200).json(rows);
        }
    })
});


app.get("/api/icohs/delete", function (req, res) {

    pool.query("DELETE FROM `icohs-quiz` WHERE ID = 2", function (error, rows, fieds) {
        if (!!error) {
            console.log("error in the query")
            res.status(500).json(error)
        } else {
            console.log("SUCCES")
            res.status(200).json(rows);
        }
    })
});

app.get("/api/icohs/update", function (req, res) {

    pool.query("UPDATE `icohs-quiz` SET `step1`= 'general IT training' ,`step2`= 'IT network specialist',`step3`='already working in my field of study',`step4`='paying for tuition' WHERE id=3", function (error, rows, fieds) {
        if (!!error) {
            console.log("error in the query")
            res.status(500).json(error)
        } else {
            console.log("SUCCES")
            res.status(200).json(rows);
        }
    })
});

const port = process.env.PORT || 7822
app.listen(port, () => {console.log(`running on port ${port}`)});
