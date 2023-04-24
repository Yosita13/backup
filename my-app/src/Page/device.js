import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { axiosCMMS as axios } from '../config/axios';
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { Dropdown, Button, Col, Modal, Space, Table, Tag } from "antd";
import { Form, Input, Select, Row, DatePicker } from "antd";
import Deviceslist from "../Page/devicelist";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const AllAsset = () => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [Device, setDevice] = useState([]);
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [device_name, setdevice_name] = useState("");
  const [device_warranty, setdevice_warranty] = useState("");
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
  const getAssets = (values) => {
   
    //console.log(values);
    axios
      .get(`/DB/getAsset/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
       
        setDataAsset(response.data);
        const defaultValue = {
          device_id: response.data.device_id,
          device_name: response.data.device_name,
          device_warranty: response.data.warranty,
          device_producer: response.data.producer,
          device_cost: response.data.device_cost,
          device_image: response.data.device_image,
          device_note: response.data.device_note,
          device_stautus: response.data.device_stautus,
          device_model: response.data.device_model,
          device_serial: response.data.device_serial,
          device_asset_tag: response.data.device_asset_tag,
          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
  };
  const getQR = (values) => {
   
    //console.log(values);
    axios
      .get(`/DB/getQR/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        
        setAssetID(response.data);
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

  const handleSubmit = (e) => {
    // axios.post("/DB/tbl_list_repair2", postImage)
    // .then(res=>console.log(res))
    // e.preventDefault();
    console.log("postImage", postImage);

    var blob = new Blob(["1678684514063-8853042000109.jpg"], {
      type: "image/jpeg",
    });
    var blobUrl = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("blobURL", blobUrl);
    setPicture({
      ...picture,
      file: blob,
      filepreview: blobUrl,
    });
    setPicture(blobUrl);
    createPost(postImage);
  };
  console.log("pic", picture);
  console.log("useinfo", userInfo);

  const convertToBase64 = (file) => {
    console.log("file", file);
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
    setAssetID(event.target.value);
    setQrCodeVisible(false);

    console.log("event", event.target.files[0]);

    const file = event.target.files[0];
    console.log("file0", file);
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const handleGenerateQRCode = (event) => {
    event.preventDefault();
    setQrCodeVisible(true);
  };
  //console.log('employeeID', EmployeeID);

  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      console.log("Received values of form: ", values);
      const { data } = await axios.post(
        "/DB/tbl_device2",
        {
          device_id: values.ID,
          device_name: values.Name,
          device_warranty: values.warranty,
          device_producer: values.producer,
          device_cost: values.cost,
          device_image: values.image,
          device_note: values.note,
          device_status: values.status,
          device_model: values.model,
          device_serial: values.serial,
          device_asset_tag: values.asset_tag,
        }
      );
      console.log(data);
      //handleOk();
      alert("success!!");
      window.location.reload();
    } catch (e) { }
  };

  const onFinish2 = (value) => {
    console.log("fillter", value);
    console.log("device", Device);
    //console.log('value.admin_id',admin_id);
    //console.log('typeof value.id',typeof value.id)

    if (value.name === undefined) {
      const emp = Device.filter((emp) => emp.device_id === Number(value.id));
      setDevice(emp);
      console.log("emp.deviceid", value.id);
      console.log("name_undefine", emp);
      console.log("แต๋มสวย");
      // alert(`${Admin}`)
    } else if (value.id === undefined) {
      const emp = Device.filter(
        (emp) => emp.device_name.split(" ")[0] === value.name
      );
      setDevice(emp);
      console.log("id undefind", emp);
      console.log("แต๋มขี้เหล่");
    } else if (value.name !== undefined && value.id !== undefined) {
      const emp1 = Device.filter(
        (emp1) =>
          emp1.device_id === Number(value.id) &&
          emp1.device_name.split(" ")[0] === value.name
      );
      //const emp2 = Admin.filter((emp2) => emp2.admin_name.split(" ")[0] === value.name)
      setDevice(emp1);
      console.log("1", emp1);
      //console.log('2',emp2);

      // if(Admin.filter((Admin) => Admin.admin_id !== value.id) ||  Admin.filter((Admin) => Admin.admin_name.split(" ")[0] !== value.name)){
      //   setAdmin([])
      //   console.log('3');
      // }
      // else if(Admin.filter((Admin) => Admin.admin_id === value.id) &&  Admin.filter((Admin) => Admin.admin_name.split(" ")[0] === value.name)){
      //   setAdmin(emp1)
      //   console.log('4');
      // }
    }
  };

  const onReset = () => {
    form2.resetFields();
    getDevice();
  };

  const Finish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.put(
        `/DB/update/${values.device_id}`,
        {
          device_id: values.device_id,
          device_name: values.device_name,
          device_warranty: values.device_warranty,
          device_producer: values.device_producer,
          device_cost: values.device_cost,
          device_image: values.device_image,
          device_note: values.device_note,
          device_status: values.device_status,
          device_model: values.device_model,
          device_serial: values.device_serial,
          device_asset_tag: values.device_asset_tag,
        }
      );
      // console.log(data.length)
      alert("success!!");
    } catch (error) { }
  };

  useEffect(() => {
    getDevice();
  }, []);

  const getDevice = async () => {
    try {
      const { data } = await axios.get("/DB/tbl_device");
      // console.log(data.length)
      setDevice(data);
    } catch (error) { }
  };

 
  const toggleMobileMenu = () => {
    setMenu(!menu);
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

  // useEffect( ()=>{
  //   if($('.select').length > 0) {
  //     $('.select').select2({
  //       minimumResultsForSearch: -1,
  //       width: '100%'
  //     });
  //   }
  // });

  const deleAssets = (values) => {
   
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

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
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

    // {
    //   title: 'Warranty',
    //   dataIndex: 'device_warranty',
    //   sorter: (a, b) => a.device_warranty.length - b.device_warranty.length,
    // },

    // {
    //   title: 'Producer',
    //   dataIndex: 'device_producer',
    //   sorter: (a, b) => a.device_producer.length - b.device_producer.length,
    // },

    // {
    //   title: 'Cost',
    //   dataIndex: 'device_cost',
    //   sorter: (a, b) => a.device_cost.length - b.device_cost.length,
    // },

    // {
    //   title: 'Image',
    //   dataIndex: 'device_image',
    //   sorter: (a, b) => a.device_image.length - b.device_image.length,
    // },

    // {
    //   title: 'Note',
    //   dataIndex: 'device_note',
    //   sorter: (a, b) => a.device_note.length - b.device_note.length,
    // },

    {
      title: "Stautus",
      dataIndex: "device_producer",
      sorter: (a, b) => a.device_stautus.length - b.device_stautus.length,
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
    // {
    //   title: 'Asset Tag',
    //   dataIndex: 'device_asset_tag',
    //   sorter: (a, b) => a.device_asset_tag.length - b.device_asset_tag.length,
    // },

    // {
    //   title: 'Join Date',
    //   dataIndex: 'created_timestamp',
    //   sorter: (a, b) => a.created_timestamp.length - b.created_timestamp.length,
    // },

    // {
    //   title: 'Role',
    //   dataIndex: 'admin_designation',
    //   render: (text, record) => <Tag>{text}</Tag>
    //console.log(text)

    // <div className="dropdown">
    // <a href="" className="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{text} </a>
    // <div className="dropdown-menu">
    //   <a className="dropdown-item" href="#">Software Engineer</a>
    //   <a className="dropdown-item" href="#">Software Tester</a>
    //   <a className="dropdown-item" href="#">Frontend Developer</a>
    //   <a className="dropdown-item" href="#">UI/UX Developer</a>
    // </div>
    // </div>

    //},
    // {
    //   title: 'Action',
    //   render: (text, record) =>
    //     <div >

    //       <Dropdown
    //         menu={{
    //           items,
    //         }}
    //         placement="bottomRight"
    //       >
    //         <Button type='text' ><MoreOutlined /></Button>
    //       </Dropdown>

    //     </div>

    // },

    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown profile-action">
          {/* <Col span={12} style={{ textAlign: 'left' }}>
            <Button  type="primary" htmlType="submit"  >Edit  </Button>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary" danger onClick={() => {deleteEmployees()}}>Delete</Button>
          </Col> */}

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
            success
            onClick={() => getQR(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_device"
          >
            <i className="fa fa-plus" />
            QR
          </Button>

          {/* <Button type="primary" danger onClick={() => deleEmployees(text)}
            data-bs-toggle="modal" data-bs-target="#add_employee" ><i className="fa fa-plus" />
            delete
          </Button> */}

          {/* <Button
            type="primary"
            danger
            data-bs-toggle="modal"
            data-bs-target="#add_device"
          >
            <i className="fa fa-plus" />
            delete
          </Button> */}

          <Modal
            width={650}
            title="Edit"
            open={open}
            // onOk={hideModal}
            footer={null}
            onCancel={hideModal}
            okText="submit"
            cancelText="cancel"
          >
            {initialValues && (
              <Form
                initialValues={initialValues}
                
                {...formItemLayout}
                form={form}
                name="save"
                onFinish={Finish}
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
                // onChange={(event) => {
                //   setAdmin_name(event.target.value)
                // }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_id"
                  label="ID"
                  rules={[{ required: true, message: "Please input your ID!" }]}
                  onChange={(event) => {
                    setdevice_id(event.target.value);
                  }}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  name="device_warranty"
                  label="warranty"
                  rules={[
                    {
                      required: true,
                      message: "Please input your warranty!",
                      whitespace: true,
                    },
                  ]}
                  onChange={(event) => {
                    setdevice_warranty(event.target.value);
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_producer"
                  label="producer"
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
                  label="cost"
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

                {/* <Form.Item
                  name="device_image"
                  label="image"
                  rules={[
                    {
                      required: true,
                      message: "Please input your image",
                      whitespace: true,
                    },
                  ]}
                  onChange={(event) => {
                    setdevice_image(event.target.value);
                  }}
                >
                  <Input
                    type="file"
                    className="form-control"
                    name="upload_file"
                    onChange={handleInputChange}
                  />
                </Form.Item> */}

                <Form.Item
                  name="device_note"
                  label="note"
                  rules={[
                    {
                      required: true,
                      message: "Please input your note",
                      whitespace: true,
                    },
                  ]}
                  onChange={(event) => {
                    setdevice_note(event.target.value);
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_status"
                  label="stautus"
                  rules={[
                    {
                      required: true,
                      message: "Please input your stautus",
                      whitespace: true,
                    },
                  ]}
                  onChange={(event) => {
                    setdevice_status(event.target.value);
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="device_model"
                  label="model"
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
                  label="serial"
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
                  label="asset_tag"
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

                <Form.Item {...tailFormItemLayout}>
                  <Row>
                    <Col span={12} style={{ textAlign: "left" }}>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Button type="primary" danger onClick={hideModal}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            )}
          </Modal>

          <Modal
            width={650}
            title="QR"
            open={open}
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
                name="save"
                onFinish={Finish}
                scrollToFirstError
              >
                <Form.Item
                  name="device_id"
                  label="ID"
                  rules={[{ required: true, message: "Please input your ID!" }]}
                  // onChange={(event) => {
                  //   setdevice_id(event.target.value);
                  // }}
                  onChange={handleInputChange}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Row>
                    <Col span={12} style={{ textAlign: "left" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleGenerateQRCode}
                      >
                        Generate QR
                      </Button>
                      {QrCodeVisible && data && (
                        <QRCode value={data} className="qr-code" />
                      )}
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Button type="primary" danger onClick={hideModal}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            )}
          </Modal>
        </div>
      ),
    },
  ];

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
                  onClick={showModal}
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
                  open={open}
                  // onOk={hideModal}
                  footer={null}
                  onCancel={hideModal}
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
                      name="ID"
                      label="ID"
                      rules={[{ required: true, message: 'Please input your ID!' }]}
                      onChange={(event) => {
                        setAdmin_id(event.target.value)
                      }}
                    >
                      <Input />
                    </Form.Item> */}

                    <Form.Item
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

                    {/* <Form.Item
                      name="image"
                      label="Image"
                      rules={[
                        {
                          required: true,
                          message: "Please input your image",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_image(event.target.value);
                      }}
                    >
                      <Input
                        type="file"
                        className="form-control"
                        name="upload_file"
                        onChange={handleInputChange}
                      />
                    </Form.Item> */}

                    <Form.Item
                      name="note"
                      label="Note"
                      rules={[
                        {
                          required: true,
                          message: "Please input your note",
                          whitespace: true,
                        },
                      ]}
                      onChange={(event) => {
                        setdevice_note(event.target.value);
                      }}
                    >
                      <Input />
                    </Form.Item>

                    {/* <Form.Item
                      name="status"
                      label="Status"
                      rules={[{ required: true, message: 'Please input your status', whitespace: true }]}
                      onChange={(event) => {
                        setdevice_status(event.target.value)
                      }}
                    >
                      <Input />
                    </Form.Item> */}

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
                    <Form.Item {...tailFormItemLayout}>
                      <Row>
                        <Col span={12} style={{ textAlign: "left" }}>
                          <Button type="primary" htmlType="submit">
                            Register
                          </Button>
                        </Col>
                        <Col span={12} style={{ textAlign: "right" }}>
                          <Button type="primary" danger onClick={hideModal}>
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
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
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

              {/* <Form.Item
        name="id"
       
      >
       
          <div className="col-sm-6 col-md-3"> 
              <div className="form-group form-focus">
        <input className="form-control floating" placeholder="Employee ID"/>
        </div>
        </div>
        </div>
      </Form.Item> */}
              {/* <input type="text" className="form-control floating" onChange={(e) => setEmployeeID(e.target.value)} placeholder="Employee ID"/> */}

              {/* <Form.Item name="name"
              
              >
               <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input className="form-control floating" placeholder="Employee Name" />
                
              </div>
            </div> 
              </Form.Item> */}

              {/* </div>
            </div> */}

              {/* <div className="col-sm-6 col-md-2">
                <section className="form-group form-focus select-focus">
                  <div className="btn-group">
                    <select type="button" className="btn btn-secondary dropdown-toggle me-1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <option>Select Designation</option>
                      <option>Admin</option>
                      <option>IT Support</option>

                    </select>

                    <label className="focus-label">Designation</label>
                  </div>
                </section>
              </div> */}
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

        {/* /employee */}
        <Deviceslist Asset={Device} getDevice= {getDevice}/>
        {/* Add Employee Modal */}
        {/* <AddDevice /> */}
        {/* /Add Employee Modal */}
      </div>
    </div>
  );
};

export default AllAsset;
