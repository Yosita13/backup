import axios from 'axios';
import React, { useState,useEffect} from 'react';
import { Helmet } from "react-helmet";
import AWS from 'aws-sdk';
import { Link, useLocation } from 'react-router-dom';

AWS.config.update({
  accessKeyId: 'AKIASCA774D2ELBG4DKG',
  secretAccessKey: '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',
  region: 'us-west-2',
  signatureVersion: 'v4',
});

export default function ImageUploader() {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [count, setCount] = useState(false);
  const [open, setOpen] = useState(false);
  const [case_image,setCase_image] = useState('');
  const [image,setImage] = useState('');
 
  const[images,setImages] = useState([]);
  const[URLsImage,setURLsImage] = useState([]);
  const location = useLocation()


  console.log( 'ID of user',location.state);
  
  



  useEffect(()=>{
    if (images.length < 1) return;
    const newURLsImage = [];
    images.forEach(image => newURLsImage.push(URL.createObjectURL(image)))
    setURLsImage(newURLsImage)
  },[images]);

    const onImageChange = (e) => {
    setImages([...e.target.files]);
    //console.log(e.target.files)
    // setImage1(e.target.files[0])
    setFile(e.target.files[0]);
  }

  const uploadToS3 = async  (values) => {
    
    if (!file) {
      return;
    }
    const params = { 
      Bucket: 'image-upload-s3-bucket-csae-datail-thing', 
      Key: `${Date.now()}.${file.name}`, 
      Body: file 
    };
    const { Location } = await s3.upload(params).promise();
    setImageUrl(Location);
    console.log('uploading to s3', Location);

    setOpen(false);
    // form.resetFields();
    // console.log('Received values of form: ', values);
    try {
       console.log('Received values of form: ', values);
      const {data} = await axios.post('http://localhost:5000/DB/tbl_list_repair2',{
        admin_id:values.state,
        case_image:values.imageUrl
       
      })
      console.log(data);

      alert('success!!')

    }catch(e){

    }

  }
  console.log('image',imageUrl);

  const showImage = (Url) =>{

    console.log('url',Url);
    setCount(true)
  }
  //---------------------------

    return ( 
       <div className="page-wrapper">
       <Helmet>
           <title>แจ้งซ่อม</title>
           <meta name="description" content="Login page"/>					
       </Helmet>
       {/* Page Content */}
       <div className="content container-fluid">
         <div className="row">
           <div className="col-md-8 offset-md-2">
             {/* Page Header */}
             <div className="page-header">
               <div className="row">
                 <div className="col-sm-12">
                   <h3 className="page-title">Theme Settings</h3>
                 </div>
               </div>
             </div>
             {/* /Page Header */}

               <div className="form-group row">
                 
                 <div className="col-lg-2">
                   
                 </div>
               </div>
               <div className="form-group row">
                 <label className="col-lg-3 col-form-label">Upload image</label>
                 <div className="col-lg-7">
                    <input type="file" className="form-control" filename={file} onChange={onImageChange} accept="image/*"/><br></br>
                    {URLsImage.map((imageSrc,idx) => ( <img key={idx} width = '1080' height='1080' src ={imageSrc}/>)) }
                    {file && (
  
                      <div style={{ marginTop: '5px' }} className="submit-section">

                      {/* <Link to={{
                        pathname: "/webapp/RepairDetails",
                        state: location.state}}> */}

                        <button className="btn btn-greensushi submit-btn" onChange={(event) => { setCase_image(event.target.value) }} onClick={uploadToS3}>Upload</button>
                       
                      {/* </Link> */}
                      </div>
                     
                    )}

                    {imageUrl && count && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={imageUrl} alt="uploaded" />
                      </div>
                    )}
                    
                 </div>
                 <div className="col-lg-2">
                   
                 </div>
               </div>
              
               {/* <Form
                onFinish={onFinish}
              >
        
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className="btn btn-primary" type="primary" htmlType="submit">
                Submit
                </Button>
                </Form.Item>
               
              <Form.Item >
              <div className="submit-section">
                  <Button type="primary" className="btn-gray-1000" htmlType="submit" onClick={() => showImage(imageUrl)}>Show Img</Button>
              </div>
              </Form.Item>
          </Form> */}
               </div>
         </div>
       </div>
       {/* /Page Content */}
     </div>
      );
}
//---------------------------
// import React ,{useState} from 'react';
// import AWS from 'aws-sdk'

// const S3_BUCKET ='image-upload-s3-bucket-csae-datail-thing';
// const REGION ='us-west-2';


// AWS.config.update({
//     accessKeyId: 'AKIASCA774D2ELBG4DKG',
//     secretAccessKey: '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'
// })

// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET},
//     region: REGION,
// })

// const UploadImageToS3WithNativeSdk = () => {

//     const [progress , setProgress] = useState(0);
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const uploadFile = (file) => {

//         const params = {
//             ACL: 'public-read',
//             Body: file,
//             Bucket: S3_BUCKET,
//             Key: file.name
//         };

//         myBucket.putObject(params)
//             .on('httpUploadProgress', (evt) => {
//                 setProgress(Math.round((evt.loaded / evt.total) * 100))
//             })
//             .send((err) => {
//                 if (err) console.log(err)
//             })
//     }


//     return <div>
//         <div>Native SDK File Upload Progress is {progress}%</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default UploadImageToS3WithNativeSdk;

//----------------ใช้จริงโค้ดนี้---------------------------------------------
// import AWS from 'aws-sdk';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Form, Input } from 'antd';



// AWS.config.update({
//   accessKeyId: 'AKIASCA774D2ELBG4DKG',
//   secretAccessKey: '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',
//   region: 'us-west-2',
//   signatureVersion: 'v4',
// });

// export default function ImageUploader() {
//   const s3 = new AWS.S3();
//   const [imageUrl, setImageUrl] = useState(null);
//   const [file, setFile] = useState(null);
//   const [count, setCount] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [case_image,setCase_image] = useState('');

//   const onFinish = async (Url) => {
//     setOpen(false);
//     console.log('Received values of Url: ', Url);
//     try {
//         console.log('Received values of form: ', Url);
//         const { data } = await axios.post('http://localhost:5000/DB/tbl_list_repair', {
//             case_image: Url.imageUrl
//         })
//         console.log(data);
//     } catch (e) {

//     }
// };


//   const handleFileSelect = (e) => {
//     setFile(e.target.files[0]);
//   }

  
//   const uploadToS3 = async () => {
//     if (!file) {
//       return;
//     }
//     const params = { 
//       Bucket: 'image-upload-s3-bucket-csae-datail-thing', 
//       Key: `${Date.now()}.${file.name}`, 
//       Body: file 
//     };
//     const { Location } = await s3.upload(params).promise();
//     setImageUrl(Location);
//     console.log('uploading to s3', Location);
//   }
//   console.log('image',imageUrl);


//   const showImage = (Url) =>{

//     console.log('url',Url);
//     setCount(true)
//   }
//   return (

    
//     <div style={{ marginTop: '150px' }}>
//       <h1>Test Image Upload</h1>
//       <input type="file" onChange={handleFileSelect} />
//       {file && (
//         <div style={{ marginTop: '10px' }}>
//           <button onChange={(event) => {setCase_image(event.target.value) }} onClick={uploadToS3}>Upload</button>
//         </div>
//       )}
       

//       { imageUrl && count &&(
//         <div style={{ marginTop: '10px' }}>
//           <img src={imageUrl} alt="uploaded" />
//         </div>
//       )}

//           <Form
              
             
//               onFinish={onFinish}
             
//           >
        
//               {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                 <Button className="btn btn-primary" type="primary" htmlType="submit">
//                 Submit
//                 </Button>
//                 </Form.Item> */}
               
//               <Form.Item >
                  
//                   <Button type="primary" className="btn-greensushi" htmlType="submit" onClick={() => showImage(imageUrl)}>Save</Button>
//               </Form.Item>
//           </Form>
     
//      {/* <button onClick={() => showImage(imageUrl)}> img </button> */}
//     </div>
   
//   );
// }