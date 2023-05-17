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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
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

const Activityreport = () => {
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
  const [lengthRepair, setLengthRepair] = useState();
  const [success_count, setSuccess_count] = useState();
  const [progress_count, setProgress_count] = useState();
  const [complete_count, setComplete_count] = useState();


  //console.log('data is ', data)

  //getAdmin
  useEffect(() => {
    fetch("/DB/tbl_admin")
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getforjoin();
  }, []);

  useEffect(() => {
    form3.setFieldValue({ admin_email: activity_email });
  }, [activity_email]);

  const getforjoin = async () => {
    try {
      const { data } = await axios.get("/DB/get/get/for/join");

      //console.log('help',data.admin_name)
      setData(data);
      setLengthRepair(data.length)
    } catch (error) {}
  };

  useEffect(() => {
    getCountStatus()
  })

  //getCountStatus
  const getCountStatus = async () => {
    try {
      const { data } = await axios.get('/DB/getCountStatus')

     
      setSuccess_count(data.success_count)
      setProgress_count(data.progress_count)
      setComplete_count(data.complete_count)
      

    } catch (error) {

    }
  }


  useEffect(() => {
    getActivity2();
  }, []);

  const getActivity2 = async () => {
    try {
      const { data } = await axios.get("/DB/get/get/for/join");

      //console.log('help',data.admin_name)
      setActivity(data);
    } catch (error) {}
  };
  const onReset2 = () => {
    form2.resetFields();
    getActivity2();
  };

  const onReset = () => {
    form2.resetFields();
    getforjoin();
  };
  const headers = [
    { label: "id", key: "id" },
    { label: "employee_name", key: "employee_name" },
    { label: "employee_email", key: "employee_email" },
    { label: "device_id", key: "device_id" },
    { label: "device_serial", key: "device_serial" },
    { label: "device_model", key: "device_model" },

    { label: "case_detail", key: "case_detail" },
    { label: "priority", key: "priority" },
    { label: "status", key: "status" },
    { label: "admin_name", key: "admin_name" },
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
    console.log("fillter", value);
    console.log("activity", activity);
    //console.log('value.admin_id',admin_id);
    //console.log('typeof value.id',typeof value.id)

    if (value.status === undefined) {
      const act = activity.filter(
        (act) => act.priority && act.priority.split(" ")[0] === value.priority
      );
      setActivity(act);
      //console.log("emp.activityid", value.id);
      console.log("name_undefine", act);
      console.log("แต๋มสวย");
      // alert(`${Admin}`)
    } else if (value.priority === undefined) {
      const act = activity.filter(
        (act) => act.status && act.status.split(" ")[0] === value.status
      );
      setActivity(act);
      console.log("id undefind", act);
      console.log("แต๋มขี้เหล่");
    } else if (value.priority !== undefined && value.status !== undefined) {
      const act1 = activity.filter(
        (act1) =>
          act1.priority.split(" ")[0] === value.priority &&
          act1.status.split(" ")[0] === value.status
      );
      setActivity(act1);
      console.log("1", act1);
    }
  };
  //edit 17/04/2023

  //edit 17/04/2023
  const getActivity = (values) => {
    console.log("editstatus", editStatus);
    console.log("editstatus", priority);
    const { data } = axios
      .get(`/DB/get/status/${editStatus}`)
      .then((response) => {
        const defaultValue = {
          Priority: priority,
          Status: Status,
          Responsible: responsible,
        };
        console.log("222", defaultValue);
        setInitialValues(defaultValue);
      });
    showModal();
    setOpen(true);
  };
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

  const items = [
    {
      label: <a onClick={getActivity}>edit</a>,
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
  const downloadPDF = (data) => {
    const dataRows = [[
     
      "เจ้าของเครื่อง",
      "device_id",
      "ซีเรียล",
      "โมเดลของเครื่อง",
      "รายละเอียด",
      "Priority",
      "Status",
      "ชื่อผู้รับผิดชอบ"

    ]
  ];
    data.forEach((item) => {
      var newData = [];
      
      
      newData[0] = item["employee_name"];
      newData[1] = item["device_id"];
      newData[2] = item["device_serial"];
      newData[3] = item["device_model"];
      newData[4] = item["case_detail"];
      newData[5] = item["priority"];
      newData[6] = item["status"];
      newData[7] = item["admin_name"];
      dataRows.push(newData);
      console.log(dataRows);
    });

    //pdfmake
    const docDefinition = {
      pageOrientation: 'landscape',
      defaultStyle: {
        font: 'THSarabunNew'
      },
      content: [
        // Add header with colored background
        {
          text: 'My Header',
          margin: [0, 0, 0, 10],
          color: 'white',
          fillColor: 'blue',
          fontSize: 20,
          bold: true,
          alignment: 'center'
        },
        // Add table with colored background
        {
          table: {
            headerRows: 1,
            widths: '*',
            body: dataRows
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex === 0) ? '#CCCCCC' : null;
            }
          }
        },
        {
          margin: [10, 10, 0, 10],
          text: `สรุปรายละเอียดการแจ้งซ่อม: ${lengthRepair} รายการ
          สถานะกำลังซ่อม ${progress_count} รายการ
          สถานะซ่อมเสร็จแล้ว ${success_count} รายการ
          สถานะส่งคืนเครื่องเรียบร้อย ${complete_count} รายการ`,
          //alignment: 'center',
          fontSize: 14
        }
      ],
      header: {
        margin: [20, 10, 0, 0],
        text: 'ตารางแสดงรายละเอียดการแจ้งซ่อม',
        fontSize: 14,
        bold: true,
        alignment: 'center'
      }
      
    };
    
    pdfMake.createPdf(docDefinition).download();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: "User",
      dataIndex: "employee_name",
      sorter: (a, b) => a.employee_name.length - b.employee_name.length,
    },
    {
      title: "Email",
      dataIndex: "employee_email",
      sorter: (a, b) => a.employee_email.length - b.employee_email.length,
    },
    {
      title: "Device_id",
      dataIndex: "device_id",
      sorter: (a, b) => a.device_id.length - b.device_id.length,
    },

    {
      title: "Device_serial",
      dataIndex: "device_serial",
      sorter: (a, b) => a.device_serial.length - b.device_serial.length,
    },

    {
      title: "Model",
      dataIndex: "device_model",
      sorter: (a, b) => a.device_model.length - b.device_model.length,
    },

    {
      title: "Note",
      dataIndex: "case_detail",
      sorter: (a, b) => a.case_detail.length - b.case_detail.length,
    },
    //edit 16/04/2023
    {
      title: "Priority",
      dataIndex: "priority",
      render: (text, record) => (
        <div>
          <span
            className={
              text === "Hight"
                ? "badge bg-inverse-danger"
                : "badge bg-inverse-warning"
            }
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) =>
        <div>
          <span className={
            text === "กำลังซ่อม" ? "badge bg-inverse-warning" :
              text === "ส่งคืนเครื่องเรียบร้อย" ? "badge bg-inverse-success" :
                "badge bg-inverse-blue"
          }>{text}</span>
        </div>

    },
    //edit 16/04/2023
    {
      title: "Responsible",
      dataIndex: "admin_name",
      sorter: (a, b) => a.case_detail.length - b.case_detail.length,
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
          <title>Activity</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Activity</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/Page/admindashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Activity</li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-2">
                <CSVLink
                  data={activity}
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
                  data={activity}
                  type="primary"
                  //onClick={downloadPDF(activity)}
                  onClick={() => downloadPDF(data)}
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

          <Form form={form2} name="control-hooks" onFinish={onFinish2}>
            <div className="row filter-row">
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  name="status"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  {/* <input
                    className="form-control floating"
                    placeholder="Status"
                  /> */}
                  <Select
                    //className="form-control floating"
                    placeholder="Search export status"
                  >
                    <Option value="กำลังซ่อม">กำลังซ่อม</Option>
                    <Option value="ซ่อมเสร็จแล้ว">ซ่อมเสร็จแล้ว</Option>
                    <Option value="ส่งคืนเครื่องเรียบร้อย">ส่งคืนเครื่องเรียบร้อย</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="priority"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  {/* <input
                    className="form-control floating"
                    placeholder="Priority"
                  /> */}
                  <Select
                    //className="form-control floating"
                    placeholder="Search export priority"
                  >
                    <Option value="Hight">Hight</Option>
                    <Option value="Normal">Normal</Option>
                  </Select>
                </Form.Item>
              </Form.Item>
            </div>

            <Form.Item>
              {/* <CSVLink
                data={activity}
                headers={headers}
                filename="Activities Report.csv"
              >
                <Button
                  htmlType="button"
                  className="btn btn-danger btn-block w-20 "
                  style={{ marginLeft: "5px" }}
                  //onClick={onReset}
                >
                  Export
                </Button>
              </CSVLink> */}
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
                  onClick={onReset2}
                >
                  Reset
                </Button>

                <div></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activityreport;
