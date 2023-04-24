import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Dropdown, Table, Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { axiosCMMS as axios } from '../config/axios';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction";
import "../Page/antdstyle.css";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import $, { data } from "jquery";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import { Button, Col, Modal, Space } from "antd";
import { Form, Input, Select, Row, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
const { Option } = Select;

const Deviceslist = ({ Asset,getDevice }) => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  // const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const [device_id, setdevice_id] = useState("");
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
  const [device_stautus, setdevice_status] = useState("");
  //const [employee_id, seteEmployee_id] = useState("");
  const [id_device, setId_device] = useState("");
  const [data, setData] = useState();
  const [dataDevice, setDataDevice] = useState();
  const [initialValues, setInitialValues] = useState();
  const [forComfirmDelete, setForComfirmDelete] = useState();
  const [newPassword, setNewPassword] = useState();
  const location = useLocation();
  const [QrCodeVisible, setQrCodeVisible] = useState(false);
  let history = useHistory();
  const id = location.state;

  console.log("ID", location.state);

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
    console.log("event", event.target.files[0]);

    setData(event.target.value);
    setQrCodeVisible(false);

    const file = event.target.files[0];
    console.log("file0", file);
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };
  const handleGenerateQRCode = (event) => {
    debugger;
    event.preventDefault();
    setQrCodeVisible(true);
    console.log("QRcode data", QRCode);
  };
  // useEffect(() => {
  //   form.setFieldValue({admin_name:'12345'})
  // }, [dataEmployee])

  // useEffect(() => {
  //   getAdmin()
  // }, [])

  const hideModal = () => {
    setOpen(false);
    setOpen2(false);
  };

  //edit
  const onFinish = async (values) => {
    setOpen(false);
    console.log(values);
    console.log(form.getFieldValue('device_id'));
    const device_id = form.getFieldValue('device_id');
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.put(
        `/DB/update/Device/${device_id}`,
        {
          device_id: device_id,
          device_name: values.device_name,
          device_warranty: values.device_warranty,
          device_producer: values.device_producer,
          device_cost: values.device_cost,
          device_image: values.device_image,
          device_note: values.device_note,
          device_stautus: values.device_stautus,
          device_model: values.device_model,
          device_serial: values.device_serial,
          device_asset_tag: values.device_asset_tag,
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

  // useEffect( ()=>{
  //   if($('.select').length > 0) {
  //     $('.select').select2({
  //       minimumResultsForSearch: -1,
  //       width: '100%'
  //     });
  //   }
  // });

  //-- get data from DB---
  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('/DB/tbl_admin')
  //     // console.log(data.length)
  //     setAdmin(data)
  //     console.log(data);
  //   } catch (error) {

  //   }
  // }
  const getAssetsForDelete = (values) => {
    //console.log(values);
    debugger;
    axios
      .get(`/DB/getAsset/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        console.log(response.data);
        setDataDevice(response.data);
      });
    // showModal()

    setId_device(values.device_id);
    console.log("222", id_device);
    setForComfirmDelete(true);
    console.log(dataDevice);
  };

  const deleAssets = (values) => {
    setForComfirmDelete(false);
    //console.log(admin_id);
    debugger;
    axios
      .delete(`/DB/delete/${id_device}`)
      .then((response) => {
        // setAdmin(
        //   Admin.filter((values) => {
        //     return values.admin_id != admin_id;
        //   })
        // )
        console.log(response);

        //alert('success!!')
        window.location.reload();
      });
  };

  const getAssets = (values) => {
    //console.log(values);
    console.log(form.getFieldValue('Name'));
    axios
      .get(`/DB/getAsset/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        
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
          device_stautus: response.data.device_stautus,
          device_model: response.data.device_model,
          device_serial: response.data.device_serial,
          device_asset_tag: response.data.device_asset_tag,
          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
        };
        console.log(defaultValue);
        setInitialValues(defaultValue);
      });
    // showModal()
    setOpen(true);
    console.log(initialValues);
    console.log(dataDevice);
  };
  const getQRcode = (values) => {

    //console.log(values);
    axios
      .get(`/DB/getQR/${values.device_id}`)
      .then((response) => {

        setData(device_id);
        const defaultValue = {
          device_id: response.data.device_id,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
    setOpen2(true);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
        <Option value="87">+87</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

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

  const showModal = () => {
    //console.log('66666',dataEmployee)
    setOpen(true);
  };

  const showModal2 = () => {
    //console.log('66666',dataEmployee)
    setForComfirmDelete(true);
  };

  const hideModal2 = () => {
    setForComfirmDelete(false);
  };

  // const items = [
  //   {
  //     label: <a href="\Page\Delete.js">delete</a>,
  //     key: '0',
  //   },

  // ];

  const getID = (values) => {
    console.log("value", values);

    setId_device(values.device_id);
    deleAssets(id_device);
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
            <i className="fa fa-plus"  />
            Edit
          </Button>

          {/* <Button type="primary" danger onClick={() => deleEmployees (text)} 
             data-bs-toggle="modal" data-bs-target="#add_employee" ><i className="fa fa-plus" />
            delete
          </Button> */}

          {/* <Button
            type="primary"
            danger
            onClick={() => getAssetsForDelete(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_device"
          >
            <i className="fa fa-plus" />
            delete
          </Button> */}
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
          {/* <Button
            type="primary"
            success
            onClick={() => getQR(text)}
            data-bs-toggle="modal"
            data-bs-target="#add_device"
          >
            <i className="fa fa-plus" />
            QR
          </Button> */}
        </div>
      ),
    },
  ];

 
  console.log(initialValues);
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
        open={open}
        // onOk={hideModal}
        footer={null}
        onCancel={hideModal}
      // okText="submit"
      // cancelText="cancle"
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
              name="device_warranty"
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
              name="device_note"
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
            debugger
            {...formItemLayout}
            form={form3}
            name="qr-code"
            onFinish={onFinish}
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
                    //<QRCode value="device_id" className="qr-code" />
                    //
                    <QRCode value={data} className="qr-code" />
                    //values.device_id
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
                  onFinish={deleAssets}
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
                            onClick={deleAssets}
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
