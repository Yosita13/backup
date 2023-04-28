// import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Home from './Page/home';
// import Estimates from './Page/estimate';
// import Admindashboard from './Page/admindashboard';
// import Header from './initialpage/Sidebar/header';
// import Sidebar from './initialpage/Sidebar/sidebar';
// import Allemployees from './Page/allemployees';
// import Navbar from './Page/Navbar';
// import Employeeslist from './Page/employeeslist';
// import Userhome from './webapp/usrehome';
// import QR from './webapp/QR';
// import TakePhoto from './webapp/TakePhoto';
// import RepairDetails from './webapp/RepairDetails';
// import Status from './webapp/status';
// import DataDevice from './webapp/DataDevice';
// import Employee from './Page/employee';
// import UploadImage from './webapp/uploadImage';
// import Test from './Page/test'
// import Activity from './Page/activity';
// import SendRepairFinish from './webapp/SendRepairFinish';
// import WebappHeader from './webapp/webappHeader';


// const App = () => {

//   return (
//       <Router>
//           <Switch>
//               {/* <Route exact path="/Page/admindashboard" render={(props) => (<Admindashboard/>)}></Route>
//               <Route path="/Page/estimate" render={(props) => (<Estimates/>)}></Route>
//               <Route path="/Page/home" render={(props) => (<Home/>)}></Route>
//               <Route path="/Page/header" render={(props) => (<Header/>)}></Route>
//               <Route path="/Page/sidebar" render={(props) => (<Sidebar/>)}></Route>
//               <Route path="/Page/allemployees" render={(props) => (<Allemployees/>)}></Route>
//               <Route path="/Page/navbar" render={(props) => (<Navbar/>)}></Route>
//               <Route path="/Page/employeeslist" render={(props) => (<Employeeslist/>)}></Route>
//               <Route path="/Page/employee" render={(props) => (<Employee/>)}></Route>
//               <Route path="/Page/test" render={(props) => (<Test/>)}></Route>
//               <Route path="/Page/activity" render={(props) => (<Activity/>)}></Route>
//               <Redirect to={{pathname: '/Page/admindashboard'}}/> */}

//               <Route exact path="/webapp/QR" render={(props) => (<QR/>)}></Route>
//               <Route path="/webapp/QR" render={(props) => (<QR/>)}></Route>
//               <Route path="/webapp/userhome" render={(props) => (<Userhome/>)}></Route>
//               <Route path="/webapp/TakePhoto" render={(props) => (<TakePhoto/>)}></Route>
//               <Route path="/webapp/RepairDetails" render={(props) => (<RepairDetails/>)}></Route>
//               <Route path="/webapp/Status" render={(props) => (<Status/>)}></Route>
//               <Route path="/webapp/DataDevice" render={(props) => (<DataDevice/>)}></Route>
//               <Route path="/webapp/uploadImage" render={(props) => (<UploadImage/>)}></Route>
//               <Route path="/webapp/WebappHeader" render={(props) => (<WebappHeader/>)}></Route>
//               <Route path= "/webapp/sendRepairFinish" render={(props) => (<SendRepairFinish/>)}></Route>
//               <Redirect to={{pathname: '/webapp/QR'}}/>
//           </Switch>
//       </Router>



//   )
// }


//  export default App


//app
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Page/home";
import Estimates from "./Page/estimate";
import Admindashboard from "./Page/admindashboard";
import Network from "./Page/network";
import Header from "./initialpage/Sidebar/header";
import Sidebar from "./initialpage/Sidebar/sidebar";
import Allemployees from "./Page/allemployees";
import AllDevices from "./Page/alldevice";
import AllDevicesreport from "./Page/alldevice_report";
import AllUsers from "./Page/allusers";
//import Navbar from "./Page/Navbar";
import Employeeslist from "./Page/employeeslist";
import Deviceslist from "./Page/devicelist";
import Devicesreportlist from "./Page/devicereportlist";
import Userslist from "./Page/userlist";
import Userhome from "./webapp/usrehome";
import QR from "./webapp/QR";
import TakePhoto from "./webapp/TakePhoto";
import RepairDetails from "./webapp/RepairDetails";
import Status from "./webapp/status";
import DataDevice from "./webapp/DataDevice";
//import Tests3 from './webapp/tests3';
import Employee from "./Page/employee";
import Device from "./Page/device";
import Devicereport from "./Page/devicereport";
import User from "./Page/user";
import UploadImage from "./webapp/uploadImage";
import Test from "./Page/test";
import Activity from "./Page/activity";
import Activityreport from "./Page/activityreport";
import SendRepairFinish from "./webapp/SendRepairFinish";
import Admin from "./Page/admin";
import AllAdmins from "./Page/admin";
import Adminslist from "./Page/adminlist";
import category from "./Page/category";
import Allcategory from "./Page/category";
import categorylist from "./Page/categorylist";
import License from "./Page/license";
//import AllDevices from './Page/device';
// import Deviceslist from './Page/devicelist';
//import Admin from
import Loginpage from "./Page/login";
 import Itsupport from './Page/itsupport'
 import Checkin from './Page/Checkin'

const App = () => {
    return (
        <Router>
            <Switch>
                {/* <Route exact path="/Page/admindashboard" render={(props) => <Admindashboard />}></Route> */}
                <Route exact path="/Page/login" render={(props) => <Loginpage />} ></Route>
                <Route path="/Page/admindashboard" render={(props) => <Admindashboard />}></Route>
                <Route path="/Page/network" render={(props) => <Network />}></Route>
                <Route path="/Page/license" render={(props) => <License />}></Route>
                <Route path="/Page/estimate" render={(props) => <Estimates />}></Route>
                <Route path="/Page/home" render={(props) => <Home />}></Route>
                <Route path="/Page/header" render={(props) => <Header />}></Route>
                <Route path="/Page/sidebar" render={(props) => <Sidebar />}></Route>
                <Route path="/Page/allemployees" render={(props) => <Allemployees />}></Route>
                <Route path="/Page/alldevice" render={(props) => <AllDevices />}></Route>
                <Route path="/Page/alldevicereport" render={(props) => <AllDevicesreport />}></Route>
                <Route path="/Page/alluser" render={(props) => <AllUsers />}></Route>
                <Route path="/Page/alladmins" render={(props) => <AllAdmins />}></Route>
               {/* <Route path="/Page/allcategory" render={(props) => <Allcategorys />} ></Route> */}
                <Route path="/Page/itsupport" render={(props) => <Itsupport />} ></Route>
                {/* <Route path="/Page/alldevice" render={(props) => <AllDevices />} ></Route> */}
                {/* <Route path="/Page/navbar" render={(props) => <Navbar />}></Route> */}
                <Route path="/Page/employeeslist" render={(props) => <Employeeslist />}></Route>
                <Route path="/Page/employee" render={(props) => <Employee />}></Route>
                <Route path="/Page/devicelist" render={(props) => <Deviceslist />}></Route>
                <Route path="/Page/device" render={(props) => <Device />}></Route>
                <Route path="/Page/devicereportlist" render={(props) => <Devicesreportlist />}></Route>
                <Route path="/Page/devicereport" render={(props) => <Devicereport />}></Route>
                <Route path="/Page/userlist" render={(props) => <Userslist />}></Route>
                <Route path="/Page/user" render={(props) => <User />}></Route>
                <Route path="/Page/adminslist" render={(props) => <Adminslist />}></Route>
                <Route path="/Page/admin" render={(props) => <Admin />}></Route>
                <Route path="/Page/categorylist" render={(props) => <ategorylist />} ></Route>
                <Route path="/Page/category" render={(props) => <category />}></Route>
                <Route path="/Page/Devicelist" render={(props) => <Deviceslist />}></Route>
                <Route path="/Page/checkin" render={(props) => <Checkin />}></Route>
                {/* <Route path="/Page/device" render={(props) => <device />}></Route> */}
                <Route path="/Page/test" render={(props) => <Test />}></Route>
                <Route path="/Page/activity" render={(props) => <Activity />}></Route>
                <Route path="/Page/activityreport" render={(props) => <Activityreport />}  ></Route>
                <Route path="/webapp/userhome" render={(props) => <Userhome />}></Route>
                <Route path="/webapp/QR" render={(props) => <QR />}></Route>
                <Route path="/webapp/TakePhoto" render={(props) => <TakePhoto />}></Route>
                <Route path="/webapp/RepairDetails" render={(props) => <RepairDetails />} ></Route>
                <Route path="/webapp/Status" render={(props) => <Status />}></Route>
                <Route path="/webapp/DataDevice" render={(props) => <DataDevice />}></Route>
                {/* <Route path="/webapp/tests3" render={(props) => (<Tests3/>)}></Route> */}
                <Route path="/webapp/uploadImage" render={(props) => <UploadImage />}  ></Route>
                <Route path="/webapp/sendRepairFinish" render={(props) => <SendRepairFinish />} ></Route>
                {/* <Redirect to={{ pathname: "/Page/admindashboard" }} /> */}
                <Redirect to={{ pathname: "/Page/login" }} />
                {/* <Redirect to={{pathname: '/webapp/QR'}}/> */}
            </Switch>
        </Router>





    );
};

export default App;





















