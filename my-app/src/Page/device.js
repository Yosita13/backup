import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { Button, Col, Modal,} from "antd";
import { Form, Input, Select, Row ,DatePicker} from "antd";
import Deviceslist from "../Page/devicelist";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import { axiosCMMS as axios } from '../config/axios';
import { useHistory } from "react-router-dom";
import {  EditOutlined, MailOutlined } from "@ant-design/icons";



const { Option } = Select;

const AllAsset = () => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [Device, setDevice] = useState([]);
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [device_name, setdevice_name] = useState("");
  const [device_warranty, setDevice_warranty] = useState("");
  const [device_producer, setdevice_producer] = useState("");
  const [device_cost, setdevice_cost] = useState("");
  const [type, setType] = useState("");
  const [device_model, setdevice_model] = useState("");
  const [device_serial, setdevice_serial] = useState("");
  const [device_asset_tag, setdevice_asset_tag] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [device_note, setdevice_note] = useState("");
  const [device_status, setdevice_status] = useState("");
  const [device_spare, setdevice_spare] = useState("");
  const [device_date, setDevice_date] = useState("");
  const [device_month, setDevice_month] = useState("");
  const [device_year, setDevice_year] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [device_category_id, setdevice_category_id] = useState("");
  const [deviceWarranty, setDeviceWarranty] = useState();
  const [editStatus, setEditStatus] = useState();
  const [device_id, setdevice_id] = useState("");
  const [dataAsset, setDataAsset] = useState();
  const [data, setData] = useState();
  const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();
  const [AssetID, setAssetID] = useState(null);
  const [AssetName, setAssetName] = useState(null);
  const location = useLocation();
  const [forsendEmail, setForsendEmail] = useState();
  const [QrCodeVisible, setQrCodeVisible] = useState(false);
  let history = useHistory();
  const id = location.state;
  console.log("ID", location.state);

  
  useEffect(() => {
    getDevice();
  }, []);

  const getDevice = async () => {
    try {
      const { data } = await axios.get("/DB/tbl_device");
      // console.log(data.length)
      setDevice(data);
    } catch (error) {}
  };
  
  const getAssets = (values) => {
    debugger;
    //console.log(values);
    axios
      .get(`/DB/getAsset/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        debugger;
        setDataAsset(response.data);
        const defaultValue = {
          device_id: response.data.device_id,
          device_name: response.data.device_name,
          device_warranty: response.data.warranty,
          device_producer: response.data.producer,
          device_cost: response.data.device_cost,
          device_image: response.data.device_image,
          device_note: response.data.device_note,
          device_status: response.data.device_status,
          device_model: response.data.device_model,
          device_serial: response.data.device_serial,
          device_asset_tag: response.data.device_asset_tag,
          employee_id: response.data.employee_id,
          device_category_id: response.data.device_category_id,
          device_spare: response.data.device_spare,
          device_date: response.data.device_date,
          device_month: response.data.device_month,
          device_year: response.data.device_year,
          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
  };
  const getQR = (values) => {
    debugger;
    //console.log(values);
    axios
      .get(`/DB/getQR/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        debugger;
        setData(response.data);
        const defaultValue = {
          device_id: response.data.device_id,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
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

 
  
  const onFinish = async (values) => {
    setOpenAdd(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      console.log("Received values of form: ", values);
      const { data } = await axios.post(
        "/DB/tbl_device2",
        {
          device_id: values.ID,
          device_name: values.Name,
          device_warranty: device_warranty,
          device_producer: values.producer,
          device_cost: values.cost,
          device_note: values.note,
          device_status: values.status,
          device_model: values.model,
          device_serial: values.serial,
          device_asset_tag: values.asset_tag,
          device_type:values.type,
         
         
        }
      );
      console.log(data);
      alert("success!!");
      getDevice()
    } catch (e) {}
  };


  const onFinish2 = (value) => {
    console.log("fillter", value);
    console.log("device", Device);
    if (value.name === undefined) {
      const emp = Device.filter((emp) => emp.device_id === Number(value.id));
      setDevice(emp);
      console.log("emp.deviceid", value.id);
      console.log("name_undefine", emp);
      console.log("แต๋มสวย");
  
    } else if (value.id === undefined) {
      const emp = Device.filter(
        (emp) => emp.device_name.split(" ")[0] === value.name
      );
      setDevice(emp);
      console.log("id undefind", emp);
      console.log("แต๋มขี้เหล่");
    }
    else if (value.name !== undefined &&value.id !== undefined ) {
      const emp1 = Device.filter(
        (emp1) =>
          emp1.device_id === Number(value.id) &&
          emp1.device_name.split(" ")[0] === value.name
      );
      setDevice(emp1);
      console.log("1", emp1);
     
    }
  };

  const onReset = () => {
    form2.resetFields();
    getDevice();
  };


  

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const items = [
    {
      label: <a onClick={getDevice}>edit</a>,
      key: "0",
      icon: <EditOutlined />,
    },
    {
      label: <a onClick={() => setForsendEmail(true)}>send email</a>,
      key: "1",
      icon: <MailOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
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

  const deleAssets = (values) => {
    debugger;
    //console.log(admin_id);
    axios
      .delete(`/DB/delete/${values.device_id}`)
      .then((response) => {
        setDevice(
          Device.filter((values) => {
            return values.device_id != device_id;
          })
        );
        console.log(response);

        alert("success!!");
      });
  };

  const showModalAdd = () => {
    setOpenAdd(true);
  };

  const hideModalAdd = () => {
    setOpenAdd(false);
  };

  // const handlepassword = (e) => {

  //   form.setFieldValue({ employee_password: e.target.value })
  // }

  // const QRCodeGen = () => {
  //   const [QrCodeVisible, setQrCodeVisible] = useState(false)
  // };

  const handleClear = async () => {
    setAssetID(null);
    setAssetName(null);
    getDevice();
  };
  const getID = (values) => {
    console.log("value", values);
    setEditStatus(values.id);
    //setEmployee_id(values.employee_id);
    setdevice_status(values.status);
    //setPriority(values.priority);
    //setResponsible(values.admin_name);
    setEmployee_id(values.employee_id);
    console.log("sta", values.status);
    console.log("email", values.employee_email);
    //form.setFieldValue({Satus:values.status })
  };

  

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>IT</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">IT</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/Page/admindashboard">Category</Link>
                  </li>
                  <li className="breadcrumb-item active">IT</li>
                </ul>
              </div>

              <div className="col-sm-6 col-md-2">

                <Button
                  type="primary"
                  onClick={showModalAdd}
                  shape="round"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#add_device"
                >
                  <i className="fa fa-plus" />
                  Add Asset
                </Button>

                <Modal
                  width={650}
                  title="Add Asset"
                  open={openAdd}
                  // onOk={hideModal}
                  footer={null}
                  onCancel={hideModalAdd}
                  okText="submit"
                  cancelText="cancel"
                >
                  <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                      residence: ["zhejiang", "hangzhou", "xihu"],
                      prefix: "86",
                    }}
                    scrollToFirstError
                  >
                    <Form.Item
                      name="Name"
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


                    {/* <Form.Item
                      name="warranty"
                      label="warranty"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Warranty!",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_warranty(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item> */}

                    <Form.Item label="Warranty Expired">
                      <DatePicker onChange={setDevice_warranty}/>
                    </Form.Item>

                    <Form.Item
                      name="producer"
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
                      name="cost"
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
                      name="note"
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
                      name="status"
                      label="Status"
                      rules={[{ required: true, message: "Please select status!" }]}
                      onChange={(event) => {
                        setdevice_status(event.target.value);
                      }}
                    >
                      <Select placeholder="select status device">
                        <Option value="Available">Available</Option>
                        <Option value="Not Available">Not Available</Option>
                        {/* <Option value="Send Out">Send Out</Option> */}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="model"
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
                      name="serial"
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
                      name="asset_tag"
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
                      name="type"
                      label="type"
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

                    
                   
                    <Form.Item {...tailFormItemLayout}>
                      <Row>
                        <Col span={12} style={{ textAlign: "left" }}>
                          <Button type="primary" htmlType="submit">
                            Register
                          </Button>
                        </Col>
                        <Col span={12} style={{ textAlign: "right" }}>
                          <Button type="primary" danger onClick={hideModalAdd}>
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </Modal>

                {/* employeeslist */}
              </div>
            </div>
          </div>

          <Form
            // {...layout}

            form={form2}
            name="control-hooks"
            onFinish={onFinish2}
            // style={{
            //   maxWidth: 600,
            // }}
          >
            <div className="row filter-row">
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  name="id"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <input
                    className="form-control floating"
                    placeholder="Asset ID"
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <input
                    className="form-control floating"
                    placeholder="Asset Name"
                  />
                </Form.Item>
              </Form.Item>
            </div>

            <Form.Item>
              {/* <Button type="primary" htmlType="submit">
        Search
        </Button> */}

              <div className="col-sm-6 col-md-4" style={{ textAlign: "left" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-success btn-block w-20"
                >
                  Search
                </Button>
                <Button
                  htmlType="button"
                  className="btn btn-danger btn-block w-20 "
                  style={{ marginLeft: "5px" }}
                  onClick={onReset}
                >
                  Reset
                </Button>

                {/* <a href="#" className="btn btn-success btn-block w-20" htmlType="submit"> Search </a> */}
                {/* <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a> */}
                <div></div>
              </div>
            </Form.Item>

            {/* <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
              <a href="#" className="btn btn-success btn-block w-20" > Search </a>
              <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a>
              <div></div>
            </div> */}
          </Form>

          {/* </div> */}

          {/* <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
              <a href="#" className="btn btn-success btn-block w-20" > Search </a>
              <a href="#" className="btn btn-danger btn-block w-20 " style={{ marginLeft : '5px' }}  onClick={handleClear} > Clear </a>

            </div> */}
        </div>

        <Deviceslist Asset={Device}  getDevice= {getDevice}/>
        
      </div>
    </div>
  );
};

export default AllAsset;
