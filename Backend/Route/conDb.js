const { request } = require('express')
const connect = require('../Database/DB')
const router = require('express-promise-router')()


// router.get('/test',async (req,res,next) => {
//     try {
//         connect.query('SELECT * FROM device_asset.acc_adm',(err,rows) => {
//             if (err){
//                 res.send(err)
//             }
//             else{
//                 res.send(rows)
//             }
//         }) 
//     }
//     catch (e) {
//         res.send(e)
//     }
// })


router.get('/notebook',async (req,res,next) => {
    try {
        connect.query('SELECT * FROM device_asset.notebook_it_atess',(err,rows) => {
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        }) 
    }
    catch (e) {
        res.send(e)
    }
})

//get Admin
router.get('/tbl_admin',async (req,res,next) => {
    try {
        connect.query('SELECT * FROM device_asset.tbl_admin',(err,rows) => {
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        }) 
    }
    catch (e) {
        res.send(e)
    }
})

//get Admin for search
router.get('/tbl_admin/Search',async (req,res,next)=> {
    try {
        connect.query('SELECT * FROM device_asset.tbl_admin',(err,rows) => {
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        }) 
    }
    catch (e) {
        res.send(e)
    }
})


//add employee
router.post("/tbl_admin2" ,(req,res,next) => {
    
    const admin_name = req.body.admin_name;
    const admin_designation = req.body.admin_designation;
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
    const confirmpassword = req.body.confirmpassword;
    const admin_phone = req.body.admin_phone;
    const created_timestamp = req.body.created_timestamp ;
    const updated_timestamp = req.body.updated_timestamp ;
    const admin_address = req.body.admin_address;
    const admin_id = req.body.admin_id;

    console.log(req.body);
    // console.log(next);
    // res.send('hello')
    connect.query('INSERT INTO tbl_admin (admin_name,admin_designation,admin_email,admin_password,admin_phone,admin_address,admin_id,created_timestamp,updated_timestamp) VALUES(?,?,?,?,?,?,?,now(),now())',
    [admin_name,admin_designation,admin_email,admin_password,admin_phone,admin_address,admin_id,created_timestamp,updated_timestamp],
    (err,result) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values inserted");
        }
    }
    )
})

//update dataEmployee
router.put ("/update/:admin_id" ,(req,res,next) => {
    
    const admin_name = req.body.admin_name;
    const admin_designation = req.body.admin_designation;
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
    const confirmpassword = req.body.confirmpassword;
    const admin_phone = req.body.admin_phone;
    const created_timestamp = req.body.created_timestamp ;
    const updated_timestamp = req.body.updated_timestamp ;
    const admin_address = req.body.admin_address;
    const admin_id = req.body.admin_id;
    
    console.log(req.body)
    connect.query('UPDATE tbl_admin SET admin_name=?,admin_designation=?,admin_email=?,admin_password=?,admin_phone=?,admin_address=?,admin_id=?,created_timestamp=now(),updated_timestamp=now() WHERE admin_id = ?',[admin_name,admin_designation,admin_email,admin_password,admin_phone,admin_address,admin_id,admin_id,created_timestamp,updated_timestamp],
    (err,result) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values updated");
        }
    })
})

//get Employee for edit employee
router.get ("/get/employee/:admin_id" ,(req,res,next) => {
    const admin_id = req.params.admin_id;
    console.log(req.params)

    connect.query('SELECT * FROM device_asset.tbl_admin WHERE admin_id = ? ',admin_id,
    (err,rows) => {
        if (err){
            res.send(err)
        }
        else {
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                res.send(row)
            })
        }
    }) 
})

//delete employee
router.delete('/delete/:admin_id',(req,res) => {
    
    const admin_id = req.params.admin_id;
    connect.query('DELETE FROM tbl_admin WHERE admin_id = ?',admin_id,(err,result) => {
        if(err){
        
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
    console.log('success');
}) 

// router.post("/tbl_list_repair" ,(req,res,next) => {
    
//     const case_detail = req.body.case_detail;
//     const created_timestamp = req.body.created_timestamp ;
//     const updated_timestamp = req.body.updated_timestamp ;
//     const owner_id = req.body.owner_id;
//     const admin_id = req.body.admin_id;
//     const case_image = req.body.case_image
//     const case_note = req.body.case_note


//     console.log(req.body);
//     // console.log(next);
//     // res.send('hello')
//     connect.query('INSERT INTO tbl_list_repair (case_note,case_image,admin_id,owner_id,case_detail,created_timestamp,updated_timestamp) VALUES(?,?,?,?,?,now(),now())',
//     [case_note,case_image,admin_id,owner_id,case_detail,created_timestamp,updated_timestamp],
//     (err,resul) => {
//         if (err){
//             console.log(err);
        
//         }
//         else{
//             res.send("Values inserted");
//         }
//     }
//     )
// })

router.post("/tbl_list_repair" ,(req,res,next) => {
    
    const case_detail = req.body.case_detail.case_detail;
    const created_timestamp = req.body.created_timestamp ;
    const updated_timestamp = req.body.updated_timestamp ;
    const owner_id = req.body.owner_id;
    const admin_id = req.body.admin_id;
    const case_image = req.body.case_image
    const case_note = req.body.case_note


    console.log(req.body.case_detail.case_detail);
    // console.log(next);
    // res.send('hello')
    connect.query('INSERT INTO tbl_list_repair (case_detail,created_timestamp,updated_timestamp) VALUES(?,now(),now())',
    [case_detail,created_timestamp,updated_timestamp],
    (err,resul) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values inserted");
        }
    }
    )
})


router.get('/getstatus/:id',async (req,res) => {

        const id = req.params.id

        console.log(id);
    
    try {
        const id = req.params.id;
    
        connect.query(`SELECT * FROM boi_it_smt WHERE id= '\t${id}\t'`, (err, result) => {
            if (err) {

                console.log(err);
            }
            else {
                res.send(result);
            }
        })

        
    }
    catch (e) {
        res.send(e)
    }
})


//search employee

router.get('/search/:admin_id',(req,res) => {
    
    const admin_id = req.params.admin_id;
    connect.query('SELETE * FROM tbl_admin WHERE admin_id LIKE = %??????%',admin_id,(err,result) => {
        if (err){
            res.send(err)
        }
        else{
            res.send(rows)
        }
    })
    console.log('success');
}) 









module.exports = router;