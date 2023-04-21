// let mysql = require('mysql');

// let connection = mysql.createConnection({
//     host: '192.168.168.28',
//     user: 'efuser',
//     password: 'EFT3805325',
//     database: 'device_asset'
// });

// connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   });

const {createPool} = require('mysql')

const Pool = createPool({
  host:"192.168.168.28",
  user:"efuser",
  password: 'EFT3805325',
  database: 'device_asset'
})

Pool.query(`selece*from device_asset.tbl_admin`),(err,res) => {
  return console.log(res)
}