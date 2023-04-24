import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {axiosCMMS as axios} from '../config/axios';
import { CSVLink } from "react-csv";
import $, { event } from "jquery";
import {
  Avatar_01,
  Avatar_02,
  Avatar_03,
  Avatar_04,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_08,
  Avatar_13,
  Avatar_16,
} from "../Entryfile/imagepath";
// import AddDevice from "../_components/modelbox/Adddevice";
// import EditDevice from "../_components/modelbox/Editdevice";
import { DownOutlined } from "@ant-design/icons";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { Dropdown, Button, Col, Modal, Space, Table, Tag } from "antd";
import { Form, Input, Select, Row, DatePicker } from "antd";
import Devicesreportlist from "../Page/devicereportlist";
import { itemRender, onShowSizeChange } from "../Page/paginationfunction";
import { useLocation } from "react-router-dom";
import header from "../initialpage/Sidebar/header";

const { Option } = Select;

const AllDevicesreport = () => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [Device, setDevice] = useState([]);
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
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
  const [dataDevice, setDataDevice] = useState();

  const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();
  const [DeviceID, setDeviceID] = useState(null);
  const [DeviceName, setDeviceName] = useState(null);
  const location = useLocation();
  const [forsendEmail, setForsendEmail] = useState();

  //console.log('employeeID', EmployeeID);

  const getDevices = (values) => {
    //console.log(values);
    axios
      .get(`http://localhost:5000/DB/getDevice/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);

        setDataDevice(response.data);
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

  const headers = [
    { label: "Device id", key: "device_id" },
    { label: "device_name", key: "device_name" },
    { label: "device_warranty", key: "device_warranty" },
    { label: "device_producer", key: "device_producer" },
    { label: "device_cost", key: "device_cost" },
    { label: "device_note", key: "device_note" },
    { label: "device_model", key: "device_model" },
    { label: "device_serial", key: "device_serial" },
    { label: "device_asset_tag", key: "device_asset_tag" },
  ];

  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      console.log("Received values of form: ", values);
      const { data } = await axios.post(
        "http://localhost:5000/DB/tbl_device2",
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
      // console.log(data);
      // handleOk();
      // alert('success!!')
      // window.location.reload();
    } catch (e) {}
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
        `http://localhost:5000/DB/update/${values.device_id}`,
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
    } catch (error) {}
  };

  useEffect(() => {
    getDevice();
  }, []);

  const getDevice = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/DB/tbl_device");
      // console.log(data.length)
      setDevice(data);
    } catch (error) {}
  };
  //console.log(Admin)

  //-----------------send email after register------------------------
  // const hideModal2 = () => {

  //   setForsendEmail(false);
  //   form.resetFields()
  //   //console.log('111',activity_email)
  //   form.setFieldValue({ Device_email: Device_email })
  // };

  // const handleOk = (values) => {
  //   console.log('va', values);
  //   //setIsModalOpen(false);
  //   hideModal2()

  //   const { data } = axios.post('http://localhost:5000/DB/sendEmailAdmin', {
  //       admin_email: admin_email,
  //       admin_password : admin_password
  //   })
  //   console.log(data);
  //   //form3.resetFields()
  // };

  //-----------------send email after register------------------------
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
        <Option value="87">+87</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
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

  const deleDevices = (values) => {
    //console.log(admin_id);
    axios
      .delete(`http://localhost:5000/DB/delete/${values.device_id}`)
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

  //   form.setFieldValue({ admin_password: e.target.value })
  // }

  const handleClear = async () => {
    setDeviceID(null);
    setDeviceName(null);
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

    {
      title: "Warranty",
      dataIndex: "device_warranty",
      sorter: (a, b) => a.device_warranty.length - b.device_warranty.length,
    },

    {
      title: "Producer",
      dataIndex: "device_producer",
      sorter: (a, b) => a.device_producer.length - b.device_producer.length,
    },

    {
      title: "Cost",
      dataIndex: "device_cost",
      sorter: (a, b) => a.device_cost.length - b.device_cost.length,
    },

    // {
    //   title: 'Image',
    //   dataIndex: 'device_image',
    //   sorter: (a, b) => a.device_image.length - b.device_image.length,
    // },

    {
      title: "Note",
      dataIndex: "device_note",
      sorter: (a, b) => a.device_note.length - b.device_note.length,
    },

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
      title: "Asset Tag",
      dataIndex: "device_asset_tag",
      sorter: (a, b) => a.device_asset_tag.length - b.device_asset_tag.length,
    },

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
  ];

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Devices Report</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Devices Report</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/Page/admindashboard">Report</Link>
                  </li>
                  <li className="breadcrumb-item active">Devices Report</li>
                </ul>
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
            <Form.Item>
              {/* <Button type="primary" htmlType="submit">
        Search
        </Button> */}

              <div className="col-sm-6 col-md-4" style={{ textAlign: "left" }}>
                {/* <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-success btn-block w-20"
                >
                  Search
                </Button> */}
                {/* <Button
                  htmlType="button"
                  className="btn btn-danger btn-block w-20 "
                  style={{ marginLeft: "5px" }}
                  onClick={onReset}
                >
                  Reset
                </Button> */}
                <CSVLink
                  data={Device}
                  headers={headers}
                  filename="Devices Report.csv"
                >
                  <Button
                    htmlType="button"
                    className="btn btn-danger btn-block w-20 "
                    style={{ marginLeft: "5px" }}
                    //onClick={onReset}
                  >
                    Export
                  </Button>
                </CSVLink>

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
        <Devicesreportlist device={Device} />
        {/* Add Employee Modal */}
        {/* <AddDevice /> */}
        {/* /Add Employee Modal */}
      </div>
    </div>
  );
};

export default AllDevicesreport;
