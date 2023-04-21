
import React, { useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_02 } from "../Entryfile/imagepath";
import $ from 'jquery'; 
import { Table } from 'antd';
//import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../Page/paginationfunction";
import "../Page/antdstyle.css";

const ProvidentFund = () => {
  const [data, setData] = useState([
    {id:1,image:Avatar_02,name:"John Doe",role:"Web Designer",fundtype:"Percentage of Basic Salary",employeeshare:"2%",organizationshare:'2%',status:"Pending"},
  ]);

  // useEffect( ()=>{
  //   if($('.select').length > 0) {
  //     $('.select').select2({
  //       minimumResultsForSearch: -1,
  //       width: '100%'
  //     });
  //   }
  // });  
  
      const columns = [
        
        {
          title: 'Employee Name',
          dataIndex: 'name',
          render: (text, record) => (            
              <h2 className="table-avatar">
                <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
                <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
              </h2>
            ), 
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
          title: 'Provident Fund Type',
          dataIndex: 'fundtype',
          sorter: (a, b) => a.fundtype.length - b.fundtype.length,
        },
        {
          title: 'Employee Share',
          dataIndex: 'employeeshare', 
          sorter: (a, b) => a.employeeshare.length - b.employeeshare.length,
        },
        {
          title: 'Organization Share',
          dataIndex: 'organizationshare', 
          sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
        },
        {
          title: 'Status',
          dataIndex: 'status', 
          render: (text, record) => (
            <div className="dropdown action-label">
              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i className={text === "Pending" ?"fa fa-dot-circle-o text-danger" : "fa fa-dot-circle-o text-success"} /> {text}
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Pending</a>
                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Approved</a>
              </div>
            </div>
            ),
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="dropdown dropdown-action text-end">
                 <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_pf"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_pf"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
              </div>
            ),
        },        
      ]
      return ( 
        
      <div className="page-wrapper">
      {/* Page Content */}
      <div className="content container-fluid">
      
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
               <Table className="table-striped" 
                  pagination= { {total : data.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                 
                  columns={columns}                 
                   //bordered
                  dataSource={data}
                  rowKey={record => record.id}
                  // onChange={this.handleTableChange}
                />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Delete PF Modal */}
      <div className="modal custom-modal fade" id="delete_pf" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Provident Fund</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete PF Modal */}
    </div>
      );
   
}

export default ProvidentFund;
