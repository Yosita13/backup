import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Dropdown, Table, Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { axiosCMMS as axios } from '../config/axios';
import { itemRender, onShowSizeChange } from "./paginationfunction";
import {
  Avatar_02,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_13,
} from "../Entryfile/imagepath";
import "../Page/antdstyle.css";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import $, { data } from "jquery";

import { Button, Col, Modal, Space } from "antd";
import { Form, Input, Select, Row, DatePicker } from "antd";

const { Option } = Select;

const Devicesreportlist = ({ device }) => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  // const [Admin, setAdmin] = useState([])
  const [Edit, setEdit] = useState([]);
  const [form] = Form.useForm();
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
  const [datadevice, setDatadevice] = useState();
  const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();

  const hideModal = () => {
    setOpen(false);
  };

  //edit admin
  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.put(
        `/DB/update/${values.device_id}`,
        {
          device_id: values.ID,
          device_name: values.Name,
          device_warranty: values.warranty,
          device_producer: values.producer,
          device_cost: values.cost,
          device_image: values.image,
          device_note: values.note,
          device_stautus: values.status,
          device_model: values.model,
          device_serial: values.serial,
          device_asset_tag: values.asset_tag,
        }
      );
      // console.log(data.length)
      alert("success!!");
    } catch (error) {}
  };

  // const toggleMobileMenu = () => {
  //   setMenu(!menu)
  // }

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 8 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 16 },
  //   },
  // };
  // const tailFormItemLayout = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //       offset: 0,
  //     },
  //     sm: {
  //       span: 16,
  //       offset: 8,
  //     },
  //   },
  // };

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

  const deleDevices = (values) => {
    //console.log(admin_id);
    axios
      .delete(`/DB/delete/${values.device_id}`)
      .then((response) => {
        // setAdmin(
        //   Admin.filter((values) => {
        //     return values.admin_id != admin_id;
        //   })
        // )
        console.log(response);

        alert("success!!");
      });
  };

  const getDevices = (values) => {
    //console.log(values);
    axios
      .get(`/DB/getDevices/${values.device_id}`)
      .then((response) => {
        //console.log('123',response.data.admin_name);
        console.log(response.data);
        setDatadevice(response.data);
        const defaultValue = {
          device_id: values.ID,
          device_name: values.Name,
          device_warranty: values.warranty,
          device_producer: values.producer,
          device_cost: values.cost,
          device_image: values.image,
          device_note: values.note,
          device_stautus: values.status,
          device_model: values.model,
          device_serial: values.serial,
          device_asset_tag: values.asset_tag,
          created_timestamp: response.data.created_timestamp,
          updated_timestamp: response.data.updated_timestamp,
        };
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);
      });
    // showModal()
    setOpen(true);
    console.log(initialValues);
    console.log(datadevice);
  };
  console.log(initialValues);

  //   const handlepassword = (e) =>{

  //       form.setFieldValue({admin_password:e.target.value})
  //   }

  // const items = [
  //   {
  //     key: '1',
  //     label: (
  //       <a target="_blank" >
  //         Edit
  //       </a>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <a href="\Page\Delete.js" >

  //         delete
  //       </a>
  //     ),
  //   },

  // ]

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
    setOpen(true);
  };

  // const items = [
  //   {
  //     label: <a href="\Page\Delete.js">delete</a>,
  //     key: '0',
  //   },

  // ];

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
      title: "Month",
      dataIndex: "device_month",
      sorter: (a, b) => a.device_month.length - b.device_month.length,
    },
    {
      title: "Year",
      dataIndex: "device_year",
      sorter: (a, b) => a.device_year.length - b.device_year.length,
    },
  ];

  //console.log(Admin);

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
                total: device?.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              style={{ overflowX: "auto" }}
              columns={columns}
              // bordered
              dataSource={device}
              rowKey={(record) => record.id}
              // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devicesreportlist;
