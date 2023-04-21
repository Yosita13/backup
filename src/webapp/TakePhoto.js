

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { Component } from 'react';
// import { useState } from "react";
// import ReactDOM from 'react-dom';
// import axios from 'axios';


// import '../assets/css/style.css';



// const TakePhoto= () => {


//     // Upload to local seaweedFS instance
//     const uploadImage = async file => {
//         const formData = new FormData();
//         formData.append('file', file);

//         // Connect to a seaweedfs instance
//     };

//     class CameraFeed extends Component {
//         /**
//          * Processes available devices and identifies one by the label
//          * @memberof CameraFeed
//          * @instance
//          */
//         processDevices(devices) {
//             devices.forEach(device => {
//                 console.log(device.label);
//                 this.setDevice(device);
//             });
//         }

//         /**
//          * Sets the active device and starts playing the feed
//          * @memberof CameraFeed
//          * @instance
//          */
//         async setDevice(device) {
//             const { deviceId } = device;
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
//             this.videoPlayer.srcObject = stream;
//             this.videoPlayer.play();
//         }

//         /**
//          * On mount, grab the users connected devices and process them
//          * @memberof CameraFeed
//          * @instance
//          * @override
//          */
//         async componentDidMount() {
//             const cameras = await navigator.mediaDevices.enumerateDevices();
//             this.processDevices(cameras);
//         }

//         /**
//          * Handles taking a still image from the video feed on the camera
//          * @memberof CameraFeed
//          * @instance
//          */
//         takePhoto = () => {
//             const { sendFile } = this.props;
//             const context = this.canvas.getContext('2d');
//             context.drawImage(this.videoPlayer, 0, 0, 680, 360);
//             this.canvas.toBlob(sendFile);
//         };



//         render() {
//             return (
//                 <div className="c-camera-feed">
//                     <div className="c-camera-feed__viewer">
//                         <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" />
//                     </div>
//                     <button onClick={this.takePhoto}>Take photo!</button>


//                     <div className="c-camera-feed__stage">
//                         <canvas width="680" height="360" ref={ref => (this.canvas = ref)} />
//                     </div>
//                 </div>
//             );
//         }
//     }
//     return (
//         <div className="TakePhoto">
//             <h1>Image capture test</h1>
//             <p>Capture image from USB webcamera and upload to form</p>
//             <CameraFeed sendFile={uploadImage} />
//         </div>
//     );
// }

// const rootElement = document.getElementById('root');
// ReactDOM.render(<TakePhoto />, rootElement);

// export default TakePhoto;

//---------------------------------------------------------------------------------------------------------------------------------------------------------

import { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react'


const TakePhoto = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const[image1,setImage1] = useState('');
  const[imageURLs,setImageURLs] = useState('');
  const[images,setImages] = useState([]);
  const[URLsImage,setURLsImage] = useState([]);

    const [hasPhoto, setHasPhoto] = useState(false);



    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true
                // video:{width: 1920,height:1080}
            })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.err(err);
            })

    }

    useEffect(()=>{
        if (images.length < 1) return;
        const newURLsImage = [];
        images.forEach(image => newURLsImage.push(URL.createObjectURL(image)))
        setURLsImage(newURLsImage)
      },[images]);
    

    const takeAPhoto = (e) => {
        // const width = 414;
        // const height = width / (16 / 9);
        const width = 1080;
        const height = 1080;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);

        setImages([...e.target.files]);
    //console.log(e.target.files)
    setImage1(e.target.files[0])
    }
    console.log("Image",images);
  console.log("URLSImage",URLsImage);

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);


    }

    const imageUpload = () => {
        console.log(photoRef.current);
    }    
    useEffect(() => {
        getVideo();
    }, [videoRef])
    return (

        <div className="account-content">
            <div className="container">
                <div classname="col-sm-6 col-md-4">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="form-header">
                                <div className="row align-items-center">
                                    {/* Page Content */}
                                    <div className="content container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12">

                                                <Helmet>
                                                    <title>Blank - HRMS admin Template</title>
                                                    <meta name="description" content="Reactify Blank Page" />
                                                </Helmet>
                                                {/* Page Content */}
                                                <div className="content container-fluid">
                                                    {/* Page Header */}
                                                    <div className="page-header">
                                                        <div className="row">
                                                            <div className="col-sm-12">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='photo'>
                                                        <div className="camera">
                                                            <video ref={videoRef}></video>
                                                            <button className='bottonPhoto' type="primary" onClick={takeAPhoto}>SNAP</button>
                                                        </div>

                                                        <div className={'result ' + (hasPhoto ? 'hasPhoto '
                                                            : '')}>
                                                            <canvas ref={photoRef}></canvas>
                                                            <button className='bottonPhoto' onClick={closePhoto}>CLOSE</button>
                                                            <div >
                                                                <Link to="/webapp/RepairDetails">
                                                                    <button className='bottonPhoto' type="primary" onClick={imageUpload}  >Upload</button>
                                                                </Link>

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
export default TakePhoto;