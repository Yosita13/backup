import React, { useState } from 'react';
//import axios from 'axios';
import { axiosCMMS as axios } from '../config/axios';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import { CheckCircleOutlined } from '@ant-design/icons';
import WebappHeader from './webappHeader';
import complete from './imgWebapp/complete.svg';


function SendRepairFinish() {

    let history = useHistory()
    const [imageID, setImageID] = useState("");
    const location = useLocation()

    const id = location.state

    console.log(id);


    console.log('ID of user', location.state);

    // const [isSucces, setSuccess] = useState(null);

    // const [picture, setPicture] = useState({
    //     file: [],
    //     filepreview: null,
    // });

    // const [userInfo, setuserInfo] = useState({
    //     file: [],
    //     filepreview: null,
    // });

    // const [postImage, setPostImage] = useState({
    //     myFile: "",
    // });


    const createImage = (newImage) => console.log('newimg', newImage);;

    // const createPost = async (post) => {
    //     try {
    //         await createImage(post);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    // const handleSubmit = (e) => {
    //     // axios.post("http://localhost:5000/DB/tbl_list_repair2", postImage)
    //     // .then(res=>console.log(res))
    //     // e.preventDefault();
    //     console.log('postImage', postImage);

    //     var blob = new Blob(['1678684514063-8853042000109.jpg'], { type: 'image/jpeg' });
    //     var blobUrl = URL.createObjectURL(blob);
    //     console.log('blob', blob);
    //     console.log('blobURL', blobUrl);
    //     setPicture({
    //         ...picture,
    //         file: blob,
    //         filepreview: blobUrl,
    //     });
    //     setPicture(blobUrl);
    //     createPost(postImage);

    // };
    // console.log('pic', picture);
    // console.log('useinfo', userInfo);

    // const convertToBase64 = (file) => {
    //     console.log('file', file);
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };



    // const handleInputChange = async (event) => {
    //     setuserInfo({
    //         ...userInfo,
    //         file: event.target.files[0],
    //         filepreview: URL.createObjectURL(event.target.files[0]),
    //     });
    //     console.log('event', event.target.files[0]);

    //     const file = event.target.files[0];
    //     console.log('file0', file);
    //     const base64 = await convertToBase64(file);
    //     setPostImage({ ...postImage, myFile: base64 });

    // }



    // const submit = async () => {
    //     const formdata = new FormData();
    //     var blob = new Blob([userInfo], { type: 'image/jpeg' });
    //     var blobUrl = URL.createObjectURL(blob);
    //     console.log('blob', blob);
    //     console.log('blobURL', blobUrl);
    //     formdata.append('avatar', userInfo.file);
    //     formdata.append('id', id);
    //     const image = { headers: { "Content-Type": "multipart/form-data" } }

    //     console.log('id');

    //     // axios.post("http://localhost:5000/DB/tbl_list_repair2", blobUrl, image)
    //     axios.post("/DB/tbl_list_repair2", {
    //         body: {
    //             userInfo,
    //             id
    //         }
    //     })
    //         .then(res => { // then print response status
    //             console.warn(res);
    //             console.log('res', res)
    //             setImageID(res.data.insertId)
    //             if (res.data.success === 1) {
    //                 setSuccess("Image upload successfully");
    //             }
    //             // console.log('res.data',res.data);
    //             // const file = new Blob ([res.data],{type:'image/jpeg'})

    //             history.push({ pathname: '/webapp/RepairDetails', state: res.data.insertId })
    //         })

    //     //history.push({pathname:'/webapp/RepairDetails',state:imageID})
    // }

    return (

        <div className="container mr-60">
            <WebappHeader />

            <div className="account-content">
                <div className="container">
                    {/* Page Content */}
                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <Helmet>
                                    <title>UserHome</title>
                                    {/* <meta name="description" content="Login page" /> */}
                                </Helmet>
                                {/* Page Content */}
                                <div className="page-wrapper-webapp">
                                    <div className="content container-fluid">
                                        <div className="form-header">

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {/* <h4 className="page-title">ส่งเรื่องแจ้งซ่อมสำเร็จ</h4><br></br> */}
                                                    
                                                        <div className="card">
                                                            <div className="card-body">
                                                           
                                                                <img src={complete} style={{width:280}}/><br></br><br></br>
                                                               
                                                                    <h2>ส่งเรื่องแจ้งซ่อมสำเร็จ</h2>
                                                                    {/* <span>ส่งเรื่องแจ้งซ่อมสำเร็จ</span> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-lg-2">
                                            {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}
                                        </div>

                                        {/* {isSucces !== null ? <h4> {isSucces} </h4> : null} */}
                                        <div className="form-group row">
                                            <div className="form-row">
                                                {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}




                                                <div style={{ marginTop: '5px' }} className="submit-section">
                                                    <div className="form-row">

                                                        <Link to={{
                                                            pathname: "/webapp/userhome",
                                                            state: location.state
                                                        }}>
                                                            <button type="submit" className="btn btn-greensushi submit-btn"  > OK </button></Link>

                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       

    );
}

export default SendRepairFinish;

