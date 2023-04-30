import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Dropdown, Table, Tag } from "antd";
//import { MoreOutlined } from "@ant-design/icons";
import { axiosCMMS as axios } from '../config/axios';
//import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction";
//import "../../antdstyle.css"
import {
  Avatar_02,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_13,
} from "../Entryfile/imagepath";
//import  Editemployee from "../../../_components/modelbox/Editemployee"
//import  Addemployee from "../../../_components/modelbox/Addemployee"
import "../Page/antdstyle.css";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import $, { data } from "jquery";
import { useLocation } from "react-router-dom";
// import QRCode from "qrcode.react";
import QRCode from "qrcode.react";
//import QRCode from "react-qr-code";
import { Button, Col, Modal, Space } from "antd";
import { Form, Input, Select, Row, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import { MoreOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
const { Option } = Select;

const Deviceslist = ({ Asset,getDevice }) => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openChek, setOpenChek] = useState(false);
  // const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [formCheck] = Form.useForm();

  const [device_id, setDevice_id] = useState("");
  const [device_name, setdevice_name] = useState("");
  const [device_warranty, setDevice_warranty] = useState("");
  const [device_producer, setdevice_producer] = useState("");
  const [device_cost, setdevice_cost] = useState("");
  const [device_image, setdevice_image] = useState("");
  const [device_model, setdevice_model] = useState("");
  const [device_serial, setdevice_serial] = useState("");
  const [device_asset_tag, setdevice_asset_tag] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [device_note, setdevice_note] = useState("");
  const [device_status, setdevice_status] = useState("");
  const [device_spare, setdevice_spare] = useState("");
  const [editStatus, setEditStatus] = useState();
  const [device_date, setdevice_date] = useState("");
  const [device_month, setdevice_month] = useState("");
  const [owner_note, setOwner_note] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [device_category_id, setDevice_category_id] = useState("");
  const [id_device, setId_device] = useState("");
  const [data, setData] = useState();
  const [dataDevice, setDataDevice] = useState();
  const [initialValues, setInitialValues] = useState();
  const [forComfirmDelete, setForComfirmDelete] = useState();
  const [newPassword, setNewPassword] = useState();
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  

  const location = useLocation();
  const [QrCodeVisible, setQrCodeVisible] = useState(false);
  let history = useHistory();
  const id = location.state;
  const [options, setOptions] = useState([]);

  console.log("ID", location.state);

  const showModalEdit= () => {
    setOpenEdit(true);
  };

  const hideModalEdit = () => {
   form.resetFields()
    setOpenEdit(false);
     
  };

  const showModalCheck= () => {
    setOpenChek(true);
  };

  const hideModalCheck = () => {
    setOpenChek(false);
  };


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

  const createImage = (newImage) => console.log("newimg", newImage);

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };


  const hideModal = () => {
    setOpen(false);
    setOpen2(false);
  };

  //getDevice
  const getAssets = (values) => {
    //console.log(values);
    console.log(form.getFieldValue('Name'));
    axios
      .get(`/DB/getAsset/${values.device_id}`)
      .then((response) => {
        console.log('123',response.data.device_name);
        console.log(response);
        form.setFieldValue({Name:response.data.device_name})
        console.log(response.data);
        setDataDevice(response.data);
        const defaultValue = {
          device_id: response.data.device_id,
          device_name: response.data.device_name,
          device_warranty: response.data.device_warranty,
          device_producer: response.data.device_producer,
          device_cost: response.data.device_cost,
          device_image: response.data.device_image,
          device_note: response.data.device_note,
          device_status: response.data.device_status,
          device_model: response.data.device_model,
          device_serial: response.data.device_serial,
          device_asset_tag: response.data.device_asset_tag,
          device_type: response.data.device_type,
          device_date: response.data.device_date,
          device_month: response.data.device_month,
          device_year: response.data.device_year,
          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
        };
        console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
    // showModal()
    setOpenEdit(true);
    console.log(initialValues);
    console.log(dataDevice);
  };

 //edit

  const onFinish = async (values) => {
    setOpenEdit(false);
    console.log(values);
    console.log(form.getFieldValue('device_id'));
    const device_id = form.getFieldValue('device_id');
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.put(
        `/DB/update/Device/${device_id}`,
        {
          device_id: values.device_id,
          device_name: values.device_name,
          device_warranty: device_warranty,
          device_producer: values.device_producer,
          device_cost: values.device_cost,
          device_note: values.device_note,
          device_status: values.device_status,
          device_model: values.device_model,
          device_serial: values.device_serial,
          device_asset_tag: values.device_asset_tag,
          device_year: values.device_year,
          device_month: values.device_month,
          device_date: values.device_date,
          device_type :values.device_type,
      
        }
      );
      // console.log(data.length)
      //alert('success!!')
      getDevice()
    } catch (error) { }
  };

  
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };


  

  const getQRcode = (values) => {
    
    //console.log(values);
    axios
      .get(`/DB/getQR/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        
        // setData(response.data);
        setData(device_id);
        const defaultValue = {
          device_id: response.data.device_id,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
    setOpen2(true);
  };
  const getChecks = (values) => {
    
    //console.log(values);
    axios
      .get(`/DB/getCheck/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        
        // setData(response.data);
        setData(device_id);
        const defaultValue = {
          device_id: response.data.device_id,
          device_status: response.data.device_status,
          employee_id: response.data.employee_id,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
    setOpen2(true);
  };

  

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


  const hideModal2 = () => {
    setForComfirmDelete(false);
  };

  
  
  const columns = [
    {
      title: "ID",
      dataIndex: "device_id",

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: "name",
      dataIndex: "device_name",
      sorter: (a, b) => a.device_name.length - b.device_name.length,
    },

   

    {
      title: "Producer",
      dataIndex: "device_producer",
      sorter: (a, b) => a.device_producer.length - b.device_producer.length,
    },


    {
      title: "Status",
      dataIndex: "device_status",
      render: (text, record) => (
        <div>
          <span
            className={
              text === "Sold out"
                ? "badge bg-inverse-warning"
                : text === "Not used"
                ? "badge bg-inverse-success"
                : "badge bg-inverse-blue"
            }
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Note",
      dataIndex: "device_note",
      sorter: (a, b) => a.device_note.length - b.device_note.length,
    },
  
    {
      title: "Serial",
      dataIndex: "device_serial",
      sorter: (a, b) => a.device_serial.length - b.device_serial.length,
    },
    {
      title: "Model",
      dataIndex: "device_model",
      sorter: (a, b) => a.device_model.length - b.device_model.length,
    },
    {
      title: "Type",
      dataIndex: "device_type",
      sorter: (a, b) => a.device_type.length - b.device_type.length,
    },
  

    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown profile-action">
          <Button
            type="primary"
            success
            onClick={() => getAssets(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_device"
          >
            <i className="fa fa-plus" />
            Edit
          </Button>

         

          <Button
            type="primary"
            danger
            onClick={() => getQRcode(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_device"
          >
            <i className="fa fa-plus" />
            QR
          </Button>
          
        </div>
      ),
    },

   
  ];

  console.log(data);
  //console.log(QrCodeVisible);
  //-----------------------------------EDIT 26-04---------------------------------------------
  const handleInputChange3 = (event) => {
    setText(event.target.value);
  };
  const handleDownload = () => {
    
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    downloadURI(pngUrl, "qrcode.png");
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //-----------------------------------EDIT 26-04---------------------------------------------

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              pagination={{
                total: Asset?.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              style={{ overflowX: "auto" }}
              columns={columns}
              // bordered
              dataSource={Asset}
              rowKey={(record) => record.id}
              // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>

      {/* model Edit */}
      <Modal
                  width={650}
                  title="Edit"
                  open={openEdit}
                  // onOk={hideModal}
                  footer={null}
                  onCancel={hideModalEdit}
                  okText="submit"
                  cancelText="cancel"
                >
                  {initialValues && (
                  <Form
                  initialValues={initialValues}
                    {...formItemLayout}
                    form={form}
                    name="Save"
                    onFinish={onFinish}
                    
                    scrollToFirstError
                  >
                    <Form.Item
                      name="device_name"
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your  Name",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_name(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>


                    <Form.Item label="Warranty Expired">
                      <DatePicker onChange={setDevice_warranty}/>
                    </Form.Item>

                    <Form.Item
                      name="device_producer"
                      label="Producer"
                      rules={[
                        {
                          required: true,
                          message: "Please input your producer",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_producer(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="device_cost"
                      label="Cost"
                      rules={[
                        {
                          required: true,
                          message: "Please input your cost",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_cost(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>
              
                    <Form.Item
                      name="device_note"
                      label="Note"
                      rules={[
                        {
                          required: true,
                          message: "Please input your status",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_note(event.target.value);
                      }}
                    >
                      <Select placeholder="select">
                        <Option value="Real">Real</Option>
                        <Option value="Spare">Spare</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="device_status"
                      label="Status"
                      rules={[{ required: true, message: "Please select status!" }]}
                      onChange={(event) => {
                        setdevice_status(event.target.value);
                      }}
                    >
                     <Select placeholder="select status device">
                        <Option value="Available">Available</Option>
                        <Option value="Not Available">Not Available</Option>
                        <Option value="Send Out">Send Out</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="device_model"
                      label="Model"
                      rules={[
                        {
                          required: true,
                          message: "Please input your model",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_model(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="device_serial"
                      label="Serial"
                      rules={[
                        {
                          required: true,
                          message: "Please input your serial",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_serial(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="device_asset_tag"
                      label="asset tag"
                      rules={[
                        {
                          required: true,
                          message: "Please input your asset tag",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_asset_tag(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="device_type"
                      label="Type"
                      rules={[{ required: true, message: "Please select status!" }]}
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      <Select placeholder="select type of device">
                        <Option value="monitor">Monitor</Option>
                        <Option value="PC">PC</Option>
                        <Option value="Phone">Phone</Option> 
                      </Select>
                    </Form.Item> 

                    

                    <Form.Item
                      name="device_date"
                      label="date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date",
                          whitespace: true,
                        },
                      ]}
                     
                    >
                      <Input />
                    </Form.Item>


                    <Form.Item
                      name="device_month"
                      label="month"
                      rules={[
                        {
                          required: true,
                          message: "Please input month",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_asset_tag(event.target.value);
                      }}
                    >
                      <Select
                        //className="form-control floating"
                        placeholder="month"
                      >
                        <Option value="January">January</Option>
                        <Option value="Fabuary">Fabuary</Option>
                        <Option value="March">March</Option>
                        <Option value="April">April</Option>
                        <Option value="May">May</Option>
                        <Option value="June">June</Option>
                        <Option value="July">July</Option>
                        <Option value="August">August</Option>
                        <Option value="September">September</Option>
                        <Option value="October">October</Option>
                        <Option value="November">November</Option>
                        <Option value="December">December</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="device_year"
                      label="year"
                      rules={[
                        {
                          required: true,
                          message: "Please input year ex.2023",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_asset_tag(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>
                   
                    <Form.Item {...tailFormItemLayout}>
                      <Row>
                        
                        <Col span={12} style={{ textAlign: "left" }}>
                          <Button type="primary" htmlType="submit">
                          Save
                          </Button>
                          
                        </Col>
                        <Col span={12} style={{ textAlign: "right" }}>
                        
                          <Button type="primary" danger onClick={hideModalEdit}>
                            Cancle
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>)}
                </Modal>

              
      {/* -------------------------------------------------EDIT QR 26-04 -------------------------------------------------*/}
      <Modal
        width={650}
        title="QR"
        open={open2}
        // onOk={hideModal}
        footer={null}
        onCancel={hideModal}
        okText="Generate QR"
        cancelText="cancel"
      >
        {initialValues && (
          <Form
            initialValues={initialValues}
           
            {...formItemLayout}
            form={form3}
            name="qr-code"
            onFinish={'onFinish'}
            scrollToFirstError
          >
            <Form.Item
              name="device_id"
              label="ID"
              rules={[{ required: true, message: "Please input your ID!" }]}
            >
              <Input
                //disabled
                type="text"
                value={text}
                onChange={(e) => {
                  handleInputChange3(e);
                }}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Row>
                <QRCode id="qrcode" value={text} className="qr-code" />
              </Row>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </Col>
              
              </Row>
            </Form.Item>
          </Form>
        )}
      </Modal>
      {/* -------------------------------------------------EDIT QR 26-04 -------------------------------------------------*/}

      {/* model Delete */}

      <div
        className="modal custom-modal fade"
        // id="delete_approve"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <Modal
                width={650}
                title="Delete"
                open={forComfirmDelete}
                onOk={hideModal}
                footer={null}
                onCancel={hideModal2}
                okText="submit"
                cancelText="cancle"
                // width={650}
                // title="QR"
                // open={open}
                // // onOk={hideModal}
                // footer={null}
                // onCancel={hideModal}
                // okText="Generate QR"
                // cancelText="cancel"
              >
                {/* <Modal
        width={650}
        title="QR"
        open={open}
        // onOk={hideModal}
        footer={null}
        onCancel={hideModal}
        okText="Generate QR"
        cancelText="cancel"
      ></Modal> */}
                <Form
                  form={form2}
                  //name="Delete"
                  onFinish={'deleAssets'}
                  scrollToFirstError
                >
                  <Form.Item>
                    <div className="form-header">
                      <h3>Delete Leave</h3>
                      <p>Are you sure want to delete this leave?</p>
                    </div>

                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a
                            className="btn btn-primary continue-btn"
                            onClick={'deleAssets'}
                          >
                            Delete
                          </a>
                        </div>
                        <div className="col-6">
                          <a
                            data-bs-dismiss="modal"
                            className="btn btn-primary cancel-btn"
                            onClick={hideModal2}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>

        {/* QR */}
      </div>
    </div>
  );
};

export default Deviceslist;
