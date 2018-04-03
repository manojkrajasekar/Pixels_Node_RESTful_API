const con = require('./connection');

getpostsbytopic = (values) => {
    return new Promise ((resolve, reject) => {
        con.query('CALL get_posts_by_topic(?)', [values],  (err, result) => {
            if(err) {
               return reject(err);
            }
            resolve(result);
            //console.log(result);
        });
    });
};


getinitialinfo = (userid) => {
    return new Promise ((resolve, reject) => {
        con.query('CALL get_initial_info(?)', [userid], (err, result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        });
     });
};

module.exports = {
    getpostsbytopic: getpostsbytopic,
    getinitialinfo: getinitialinfo
};
