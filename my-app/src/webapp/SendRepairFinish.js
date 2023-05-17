import React, { useState } from 'react';
//import axios from 'axios';
import { axiosCMMS as axios } from '../config/axios';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Space , Alert,Popconfirm} from "antd";
import WebappHeader from './webappHeader';
import complete from './imgWebapp/complete.svg';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";



function SendRepairFinish() {

    let history = useHistory()
    const [imageID, setImageID] = useState("");
    const location = useLocation()
    const [data, setData] = useState()
    const [device_id, setDevice_id] = useState("");
    const [device_name, setdevice_name] = useState("");
    const [initialValues, setInitialValues] = useState();
    const [qrCodeClicked, setQrCodeClicked] = useState(false);
   


    const id = location.id_device
    console.log(id);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
    THSarabunNew: {
      normal: 'THSarabunNew.ttf',
      bold: 'THSarabunNew-Bold.ttf',
      italics: 'THSarabunNew-Italic.ttf',
      bolditalics: 'THSarabunNew-BoldItalic.ttf'
    },
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
  }


  const getQRcode = (values) => {
    axios
      .get(`/DB/getQR/${id}`)
      .then((response) => {
        console.log('123',id);
        console.log(response.data);
        // setData(response.data);
        setData(id);
        const defaultValue = {
          device_id: response.data.device_id,
          device_name: response.data.device_name,
          device_model: response.data.device_model,
          device_serial: response.data.device_serial,
          device_asset_tag: response.data.device_asset_tag,
          employee_name: response.data.employee_name
        };
        console.log(device_name);
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
        console.log(defaultValue);
        generatePDF(defaultValue);
      });
      
    // setOpen2(true);
  };

  const generatePDF = (defaultValue) => {
    // Define the PDF document content
  // Define data rows
  const dataRows = [  ["Device name ", defaultValue.device_name],
    ["Model", defaultValue.device_model],
    ["Asset tag", defaultValue.device_asset_tag],
    ["Serial number", defaultValue.device_serial],
    // ["ผู้รับผิดชอบ", defaultValue.employee_name]
   
  ];
  
  // Generate QR code data URL
  const qrCodeUrl = defaultValue.device_id;
  const qrCodeSize = 100;
  
  // Define PDF document definition
  const docDefinition = {
    content: [
      {
        columns: [
          // Define QR code cell in left column
          {
            width: qrCodeSize + 10,
            qr: qrCodeUrl.toString(),
            alignment: "center"
          },
          // Define data cells in right column
          {
            width: "*",
            margin: [10, 0, 0, 0],
            table: {
              body: dataRows
            },
            font:"THSarabunNew"
          }
        ]
      }
    ]
  };
  
    // Generate the PDF and open it in a new tab
    pdfMake.createPdf(docDefinition).download();
  };

  const handleGetQRCode = () => {
    setQrCodeClicked(true);
    // call getQRcode function
  }

  

  const handleOkClick = () => {
    if (!qrCodeClicked) {
      const result = window.confirm(
        "คุณต้องการสิ้นสุดการแจ้งซ่อม โดยไม่ดาวน์โหลด QR code เพื่อตรวจสอบสถานะการซ่อม ?"
      );
      if (result) {
        // ตกลงให้ไปหน้าอื่นได้เลย
        window.location.href = "/webapp/userhome";
      } else {
        // ไม่ตกลงให้อยู่หน้าเดิม
      }
    } else {
      // หากเคยกด QR แล้วก็ให้ไปหน้าอื่นได้เลย
      
      window.location.href = "/webapp/userhome";
    }
  }




  

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
                                                                    {/* <h4>สามารถดาวน์โหลด QR Code เพื่อตรวจสอบสถานะการซ่อม</h4> */}
                                                                    <Alert message="สามารถดาวน์โหลด QR Code ไว้เพื่อตรวจสอบสถานะการซ่อม" type="warning" />
                                                            {/* <Space
                                                                direction="vertical"
                                                                style={{
                                                                    width: '100%',
                                                                    height : '100%'
                                                                }}
                                                            >
                                                                <Alert
                                                                    message="อะไรซักอย่าง"
                                                                    description="ตกลงกดตกลง ไม่ตกลงก็ไปไกลๆ"
                                                                    type="info"
                                                                    action={
                                                                        <Space direction="vertical">
                                                                            <Button size="small" type="primary">
                                                                                Accept
                                                                            </Button>
                                                                            <Button size="small" danger type="ghost">
                                                                                Decline
                                                                            </Button>
                                                                        </Space>
                                                                    }
                                                                    closable
                                                                /></Space> */}
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




                                                        <div style={{ marginTop: "5px" }} className="submit-section">
                                                            <div className="form-row">
                                                                <button
                                                                    className="btn btn-greensushi submit-btn"
                                                                    type="submit"
                                                                    onClick={getQRcode}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#add_device"
                                                                >
                                                                    <i className="fa fa-plus" /> Download QR Code
                                                                </button>

                                                                
                                                                
                                                                <Link to={{
                                                            pathname: "/webapp/userhome",
                                                            state: location.id_device
                                                        }}>
                                                            <button type="submit" className="btn btn-gray-1000 submit-btn"  > OK </button></Link>
                                                                
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

