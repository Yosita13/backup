import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { axiosCMMS as axios } from '../config/axios';
import { CSVLink } from "react-csv";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { Button } from "antd";
import { Form, Input, Select, Row,DatePicker,Space} from "antd";
import Devicesreportlist from "../Page/devicereportlist";
import { useLocation } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";


const { Option } = Select;

const AllDevicesreport = () => {
  
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [Device, setDevice] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [startDate,setStartDate] = useState();
  const [endDate,setEndDate] = useState();
  const [value, setValue] = React.useState(dayjs());

  const { RangePicker } = DatePicker;
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// const disabledDate = (current) => {
//   // Can not select days before today and today
//   return current && current < dayjs().endOf('day');
// };
 

  const toggleMobileMenu = () => {
    setMenu(!menu);
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

 
  
 
  // const onFinish2 = (value) => {
  //   console.log("fillter", value);
  //   console.log("device", Device);

  //   if (value.month === undefined) {
  //     const emp = Device.filter(
  //       (emp) => emp.device_year === Number(value.year)
  //     );
  //     setDevice(emp);
  //     console.log("emp.deviceid", value.year);
  //     console.log("name_undefine", emp);
  //   } else if (value.year === undefined) {
  //     const emp = Device.filter(
  //       (emp) => emp.device_month.split(" ")[0] === value.month
  //     );
  //     setDevice(emp);
  //     console.log("id undefind", emp);
  //   } else if (value.month !== undefined && value.year !== undefined) {
  //     const emp1 = Device.filter(
  //       (emp1) =>
  //         emp1.device_year === Number(value.year) &&
  //         emp1.device_month.split(" ")[0] === value.month
  //     );

  //     setDevice(emp1);
  //     console.log("1", emp1);
  //   }
  // };
  const getdate = async () => {
    console.log('555');

    try {
     
      const { data } = await axios.post("/DB/startdate",{ 

          startDate: startDate,
          endDate: endDate,

    })
    setDevice(data)
    } catch (error) {}
  };

  const onFinish2 = (value) => {
    console.log("filter", value);
    console.log("device", Device);
  
    if (value.date !== undefined) {
      const emp = Device.filter(
        (emp) =>
          emp.device_year === Number(value.date.format("YYYY")) &&
          emp.device_month.split(" ")[0] === value.date.format("MMMM")
      );
      setDevice(emp);
      console.log("filtered device", emp);
    }
  };

  const onReset = () => {
    form2.resetFields();
    getDevice();
  };

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
  
  const showModal = () => {
    setOpen(true);
  };

  

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
              <div className="col-sm-12 col-md-2">
                <CSVLink
                  data={Device}
                  headers={headers}
                  filename="Devices Report.csv"
                >
                  <Button
                    type="primary"
                    onClick={showModal}
                    shape="round"
                    className="btn add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_device"
                  >
                    <i className="fa fa-plus" />
                    Export
                  </Button>
                </CSVLink>
              </div>
              
            </div>
          </div>

    {/* <Form>
      <Form.Item>
          < Space direction="vertical" size={50} >
                  <RangePicker style={{width:'100%'}}/></Space>
                  </Form.Item>
                  </Form> */}

         

          <Form
            form={form2}
            name="control-hooks"
            onFinish={getdate}
          >
            <div className="row filter-row">
              <Form.Item name="date">
              <RangePicker style={{width:'100%'}}
               onChange={(dates, dateStrings) => {
                 setStartDate(dateStrings[0]);
                 setEndDate(dateStrings[1]);
               }}/>
              </Form.Item>

             
            </div>


            <Form.Item>
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
              </div>
            </Form.Item>
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
       
        {/* /Add Employee Modal */}
      </div>
    </div>
  );
};

export default AllDevicesreport;
