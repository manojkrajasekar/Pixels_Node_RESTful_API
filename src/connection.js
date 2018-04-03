const mysql = require('mysql');


const con = mysql.createConnection({
    host: 'venkatvellaichamy.myqnapcloud.com',
    user: 'root',
    password: 'admin',
    port:3306,
});

con.connect((err) => {
    if (err) throw err;
       console.log("Connected!");
});

module.exports = con;