import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import WebappHeader from './webappHeader';

function UploadImage() {

    let history = useHistory()
    const [imageID, setImageID] = useState("");
    const [data, setData] = useState();

    const location = useLocation()
    
    const id = location.state


    console.log('ID of user', location.state);

    const [isSucces, setSuccess] = useState(null);

    const [picture, setPicture] = useState({
        file: [],
        filepreview: null,
    });

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const [postImage, setPostImage] = useState({
        myFile: "",
      });
    
   
    const createImage = (newImage) => console.log('newimg',newImage);;
    
      const createPost = async (post) => {
        try {
          await createImage(post);
        } catch (error) {
          console.log(error.message);
        }
      };

      
    
      const handleSubmit = (e) => {
        // axios.post("http://localhost:5000/DB/tbl_list_repair2", postImage)
        // .then(res=>console.log(res))
        // e.preventDefault();
        console.log('postImage',postImage);
        
        var blob = new Blob(['1678684514063-8853042000109.jpg'], { type: 'image/jpeg' });
                var blobUrl = URL.createObjectURL(blob);
                console.log('blob',blob);
                console.log('blobURL',blobUrl);
                setPicture({
                    ...picture,
                    file:blob,
                    filepreview:blobUrl,
                });
                setPicture(blobUrl);
        createPost(postImage);
        
      };
      console.log('pic',picture);
      console.log('useinfo',userInfo);
    
      const convertToBase64 = (file) => {
        console.log('file',file);
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

   

    const handleInputChange = async (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });
        console.log('event',event.target.files[0]);

        const file = event.target.files[0];
        console.log('file0',file);
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });

    }
    

   
    const submit = async () => {
        
        const formdata = new FormData();
        var blob = new Blob([userInfo], { type: 'image/jpeg' });
        var blobUrl = URL.createObjectURL(blob);
                console.log('blob',blob);
                console.log('blobURL',blobUrl);
        formdata.append('avatar', userInfo.file);
        formdata.append('id', id);
        const image = { headers: { "Content-Type": "multipart/form-data" } }

        console.log('id',id);

        // axios.post("http://localhost:5000/DB/tbl_list_repair2", blobUrl, image)
        axios.post("http://localhost:5000/DB/tbl_list_repair2",{
            body:{
                userInfo,
                id
            }
        })
            .then(res => { // then print response status
                console.warn(res);
                console.log('res',res)
                setImageID(res.data.insertId)
                if (res.data.success === 1) {
                    setSuccess("Image upload successfully");
                }
                // console.log('res.data',res.data);
                // const file = new Blob ([res.data],{type:'image/jpeg'})
                
                 history.push({pathname:'/webapp/RepairDetails',state:res.data.insertId,id})
                
            })
            
            //history.push({pathname:'/webapp/RepairDetails',state:imageID})
    }

    return (
       
            <div className="container mr-60">
                <WebappHeader/>
                <Helmet>
                    <title>แจ้งซ่อม</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="page-wrapper-webapp">
                                <div className="content container-fluid">
                                        <div className="form-header">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4 className="page-title">อัปโหลดรูปภาพอุปกรณ์ เพื่อแจ้งซ่อม</h4><br></br>
                                    </div>
                                </div>
                            </div>
                            {/* /Page Header */}
                        
                                <div className="col-lg-2">
                                    {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}
                                </div>
                           
                                    {/* {isSucces !== null ? <h4> {isSucces} </h4> : null} */}
                                    <div className="form-group row">
                                        <div className="form-row">
                                        {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}
                                            <div className="col-lg-14">
                                                <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} /><br></br>
                                            </div>

                                            <div style={{ marginTop: '5px' }} className="submit-section">
                                                <div className="form-row">
                                                    
                                                {userInfo.filepreview !== null ?
                                            <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                                            : null}
                                                    <Link to="/webapp/userhome" type="submit" className="btn btn-primary-gray submit-btn" > กลับ </Link>

                                                    <button type="submit" className="btn btn-primary-green submit-btn" onClick={() => submit ()} > บันทึก </button>
                                                </div>
                                            </div>
                                        </div>

                                        

                                    </div>
                                
                                </div>
                            </div>
                        </div>
                
    );
}

export default UploadImage;

