import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { axiosCMMS as axios } from "../config/axios";
import { MoreOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

//import "../path/to/thai/font.css";
import {
  Form,
  Input,
  Select,
  Row,
  DatePicker,
  Dropdown,
  Button,
  Col,
  Modal,
  Space,
  Table,
  Tag,
} from "antd";
import { itemRender, onShowSizeChange } from "../Page/paginationfunction";
import { useLocation } from "react-router-dom";

const { Option } = Select;

const Assetreport = () => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [Admin, setAdmin] = useState([]);
  const [activity, setActivity] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [admin_id, setAdmin_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [Status, setStatus] = useState(false);
  const [priority, setPriority] = useState(); //edit 16/04/2023
  const [responsible, setResponsible] = useState(false); //edit 17/04/2023
  const [data, setData] = useState([]);
  const [editStatus, setEditStatus] = useState();
  const [forsendEmail, setForsendEmail] = useState();
  const [activity_email, setActivity_email] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const location = useLocation();
  const conponentPDF = useRef();
  //const [menu, setMenu] = useState(false);
  //const [open, setOpen] = useState(false);
  // const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([]);
  //const [form] = Form.useForm();
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
  const [device_status, setdevice_status] = useState("");
  const [datadevice, setDatadevice] = useState();
  //const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();
  const [Device, setDevice] = useState([]);

  //-----

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  //const [value, setValue] = React.useState(dayjs());
  const [generated, setGenerated] = useState(false);
  const { RangePicker } = DatePicker;

  const [device_spare, setdevice_spare] = useState("");

  const [device_date, setDevice_date] = useState("");
  const [device_month, setDevice_month] = useState("");
  const [device_year, setDevice_yesr] = useState("");
  const [owner_note, setOwner_note] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [device_category_id, setDevice_category_id] = useState("");
  const [id_device, setId_device] = useState("");

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

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
  const onReset2 = () => {
    form2.resetFields();
    getDevice();
  };

  //   const onReset = () => {
  //     form2.resetFields();
  //     getforjoin();
  //   };
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
  //edit 16/04/2023
  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.put(`/DB/update/status/${editStatus}`, {
        id: values.editStatus,
        status: values.Status,
        priority: values.Priority,
        admin_id: values.Responsible,
      });
      console.log(values.Responsible);
      //alert('success!!')
      window.location.reload();
    } catch (error) {}
  };
  //edit 16/04/2023

  //edit 17/04/2023
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

  // useEffect(() => {
  //   getDevice();
  // }, []);

  // const getDevice = async () => {
  //   try {
  //     const { data } = await axios.get("/DB/tbl_device");
  //     // console.log(data.length)
  //     setDevice(data);
  //   } catch (error) {}
  // };
  //edit 17/04/2023

  //edit 17/04/2023

  //edit 17/04/2023

  const getID = (values) => {
    console.log("value", values);
    setEditStatus(values.id);
    setActivity_email(values.employee_email);
    setStatus(values.status);
    setPriority(values.priority);
    setResponsible(values.admin_name);
    console.log("sta", values.status);
    console.log("email", values.employee_email);
    //form.setFieldValue({Satus:values.status })
  };
  //console.log('from2', form3.getFieldValue('admin_email'));

  const showModal2 = () => {
    setIsModalOpen(true);
  };

  const hideModal2 = () => {
    setForsendEmail(false);
    form3.resetFields();
    //console.log('111',activity_email)
    form3.setFieldValue({ admin_email: activity_email });
  };

  const handleOk = (values) => {
    console.log("va", values);
    //setIsModalOpen(false);
    hideModal2();

    const { data } = axios.post("/DB/sendEmail", {
      status: Status,
      employee_email: values,
    });
    console.log(data);
    //form3.resetFields()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (e) => {
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModalForEmail = () => {
    setForsendEmail(true);
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
  // const generatePDF = useReactToPrint({
  //   content: () => conponentPDF.current,
  //   documentTitle: "Activity Report",
  //   onAfterPrint: () => alert("data save in PDF"),
  // });
  // const generatePDF = {
  //   content: () => conponentPDF.current,
  //   documentTitle: "Activity Report",
  //   onAfterPrint: () => alert("data save in PDF"),
  // };
  //   const downloadPDF = (data) => {
  //     console.log("data", data);
  //     const doc = new jsPDF();

  //     doc.text("Devices Report", 20, 10);
  //     //const data = [getActivity2()];
  //     const headers = [
  //       [
  //         "device_id",
  //         "device_name",
  //         "warranty",
  //         "Producer",
  //         "Cost",
  //         "Note",
  //         "Serial",
  //         "Model",
  //       ],
  //     ];
  //     var newDatas = [];
  //     data.forEach((item) => {
  //       var newData = [];
  //       newData[0] = item["device_id"];
  //       newData[1] = item["device_name"];
  //       newData[2] = item["device_warranty"];
  //       newData[3] = item["device_producer"];
  //       newData[4] = item["device_cost"];
  //       newData[5] = item["device_note"];
  //       newData[6] = item["device_serial"];
  //       newData[7] = item["deive_model"];

  //       newDatas.push(newData);
  //     });
  //     console.log("newDatas", newDatas);
  //     // columns={columns}
  //     //               dataSource={activity}
  //     //               rowKey={(record) => record.id}
  //     autoTable(doc, {
  //       // body: [
  //       //   // { europe: "Sweden", america: "Canada", asia: "China" },
  //       //   // { europe: "Norway", america: "Mexico", asia: "Japan" },
  //       //   // { id: "test", employee_name: "Canada", device_id: "China" },
  //       //   // { id: "Norway", employee_name: "Mexico", device_id: "Japan" },
  //       //   { dataSource: { activity } },
  //       // ],
  //       head: headers,
  //       body: newDatas,
  //       // columns: [
  //       //   { header: "id", dataKey: "id" },
  //       //   { header: "employee_name", dataKey: "employee_name" },
  //       //   { header: "device_id", dataKey: "device_id" },
  //       //   { header: "device_serial", dataKey: "device_serial" },
  //       //   { header: "device_model", dataKey: "device_model" },
  //       //   { header: "case_detail", dataKey: "case_detail" },
  //       //   { header: "status", dataKey: "status" },
  //       //   { header: "admin_name", dataKey: "admin_name" },
  //       // ],
  //     });

  //     doc.save("Devicesreport.pdf");
  //   };
  const downloadPDF = (data) => {
    console.log("data", data);
    const doc = new jsPDF();

    // doc.addFont("THSarabunNew", "normal", "normal");
    // doc.setFont("THSarabunNew");
    doc.text("Devices Report", 20, 10);
    //const data = [getActivity2()];
    const headers = [
      [
        // "id",
        // "employee_name",
        // "device_id",
        // "device_serial",
        // "device_model",
        // "case_detail",
        // "status",
        // "admin_name",
        "device_id",
        "device_name",
        "warranty",
        "Producer",
        "Cost",
        "Note",
        "Serial",
      ],
    ];
    var newDatas = [];
    data.forEach((item) => {
      var newData = [];
      newData[0] = item["device_id"];
      newData[1] = item["device_name"];
      newData[2] = item["device_warranty"];
      newData[3] = item["device_producer"];
      newData[4] = item["device_cost"];
      newData[5] = item["device_note"];
      newData[6] = item["device_serial"];
      //newData[7] = item["deive_model"];
      newDatas.push(newData);
    });
    console.log("newDatas", newDatas);

    autoTable(doc, {
      head: headers,
      body: newDatas,
    });

    doc.save("Devicesreport-CMMS.pdf");
  };

  const columns = [
    {
      title: "device_id",
      dataIndex: "device_id",

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: "device_name",
      dataIndex: "device_name",
      sorter: (a, b) => a.device_name.length - b.device_name.length,
    },

    {
      title: "warranty",
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

    // {
    //   title: 'Status',
    //   dataIndex: 'device_status',
    //   sorter: (a, b) => a.device_stautus.length - b.device_stautus.length,
    // },

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
      title: "Asset Tag",
      dataIndex: "device_asset_tag",
      sorter: (a, b) => a.device_asset_tag.length - b.device_asset_tag.length,
    },
    {
      title: "Date",
      dataIndex: "created_timestamp",
      sorter: (a, b) => a.created_timestamp.length - b.created_timestamp.length,
    },

    // {
    //   title: "Action",
    //   render: (value) => (
    //     <>
    //       <Dropdown
    //         menu={menuProps}
    //         placement="bottomRight"
    //         trigger={["click"]}
    //       >
    //         <Button type="text" onClick={() => getID(value)}>
    //           <MoreOutlined />
    //         </Button>
    //       </Dropdown>
    //     </>
    //   ),
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
              <div className="col-sm-6 col-md-2">
                <CSVLink
                  data={Device}
                  headers={headers}
                  filename="Activities Report.csv"
                >
                  <Button
                    type="primary"
                    onClick={showModal}
                    shape="round"
                    className="btn add-btn"
                    data-bs-toggle="modal"
                    //data-bs-target="#add_device"
                  >
                    <i className="fa fa-plus" />
                    Export CSV
                  </Button>
                </CSVLink>
              </div>
              <div className="col-sm-6 col-md-2">
                <Button
                  data={Device}
                  type="primary"
                  //onClick={downloadPDF(activity)}
                  onClick={() => downloadPDF(Device)}
                  shape="round"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  //data-bs-target="#add_device"
                >
                  <i className="fa fa-plus" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          {/* model2 */}

          <div
            className="modal custom-modal fade"
            id="delete_approve"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <Modal
                    open={forsendEmail}
                    // onOk={hideModal}
                    footer={null}
                    //onOk={handleOk}
                    onCancel={hideModal2}
                    okText="submit"
                    cancelText="cancle"
                  >
                    <div className="form-header">
                      <h3>Send Email</h3>
                      <p>Are you sure want to send this email?</p>

                      <Form
                        initialValues={{ admin_email: activity_email }}
                        {...formItemLayout}
                        form={form3}
                        name="save"
                        onFinish={handleOk}
                        scrollToFirstError
                      >
                        <Form.Item
                          name="admin_email"
                          label="E-mail"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        {/* <Row>
                    <Col span={6} offset={1}>
                        <div className="text-left mt-2">
                            <Button
                                ghost
                                type="primary"
                                className="mr-2"
                                onClick={hideModal2}

                                htmlType="submit"
                                // disabled={disableForm || loadingButton}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Col>
                    <Col span={12} offset={4}>
                        <div className="text-right mt-2">
                            <Button 
                                type="primary"
                                htmlType="submit"
                                // disabled={disableForm || loadingButton}
                            >
                                APPLY
                            </Button>
                        </div>
                    </Col>

                </Row> */}
                      </Form>
                    </div>

                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a
                            className="btn btn-primary continue-btn"
                            onClick={() =>
                              handleOk(form3.getFieldValue("admin_email"))
                            }
                          >
                            Confirm
                          </a>
                          {/* <a  type = 'submit' className="btn btn-primary continue-btn"  >Confirm</a> */}
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
                  </Modal>
                </div>
              </div>
            </div>
          </div>

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
        </div>

        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {/* <div ref={conponentPDF} style={{ overflowX: "auto" }}>
                  <Table
                    className="table-striped"
                    pagination={{
                      total: activity?.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    dataSource={activity}
                    rowKey={(record) => record.id}
                  />
                </div> */}
                <Table
                  id="my-table"
                  className="table-striped"
                  pagination={{
                    total: Device?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={Device}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assetreport;
