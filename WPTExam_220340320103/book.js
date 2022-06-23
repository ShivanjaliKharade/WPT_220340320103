let dbparams  = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306,
};

const mysql = require('mysql2');
const con = mysql.createConnection(dbparams);

const express = require('express');
const app = express();

app.use(express.static("abc"));

    //addbook

    app.get("/mdel", (req, res1) => {
        let bid = req.query.x;
        let bname = req.query.y;
        let bprice = req.query.z;

        console.log(bid);
        let result = {bookfoundstatus : false};

        con.query(
            "insert into book (bookid, bookname, price) values(?,?,?)", [bid, bname, bprice],
            (error, rows) => {
                if(rows.affectedRows >0) {
                    result.bookfoundstatus = true;
                }
                else{
                    result = error; 
                    console.log("trouble " + error);
                }

                console.log("38");
                res1.send(result);
            }
        ) ;

    });

    //showbooks
    app.get("/getall",(req, res1) => {

        con.query("select * from book", [], (error, rows) => {
            res1.send(rows);

        });

    });


    app.listen(8081, function(){
        console.log("Server listening at 8081");

    });
