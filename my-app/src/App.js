import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Page/home';
import Estimates from './Page/estimate';
import Admindashboard from './Page/admindashboard';
import Header from './initialpage/Sidebar/header';
import Sidebar from './initialpage/Sidebar/sidebar';
import Allemployees from './Page/allemployees';
import Navbar from './Page/Navbar';
import Employeeslist from './Page/employeeslist';
import Userhome from './webapp/usrehome';
import QR from './webapp/QR';
import TakePhoto from './webapp/TakePhoto';
import RepairDetails from './webapp/RepairDetails';
import Status from './webapp/status';
import DataDevice from './webapp/DataDevice';
import Employee from './Page/employee';
import UploadImage from './webapp/uploadImage';
import Test from './Page/test'
import Activity from './Page/activity';
import SendRepairFinish from './webapp/SendRepairFinish';
import WebappHeader from './webapp/webappHeader';


const App = () => {

  return (
      <Router>
          <Switch>
              {/* <Route exact path="/Page/admindashboard" render={(props) => (<Admindashboard/>)}></Route>
              <Route path="/Page/estimate" render={(props) => (<Estimates/>)}></Route>
              <Route path="/Page/home" render={(props) => (<Home/>)}></Route>
              <Route path="/Page/header" render={(props) => (<Header/>)}></Route>
              <Route path="/Page/sidebar" render={(props) => (<Sidebar/>)}></Route>
              <Route path="/Page/allemployees" render={(props) => (<Allemployees/>)}></Route>
              <Route path="/Page/navbar" render={(props) => (<Navbar/>)}></Route>
              <Route path="/Page/employeeslist" render={(props) => (<Employeeslist/>)}></Route>
              <Route path="/Page/employee" render={(props) => (<Employee/>)}></Route>
              <Route path="/Page/test" render={(props) => (<Test/>)}></Route>
              <Route path="/Page/activity" render={(props) => (<Activity/>)}></Route>
              <Route path="/webapp/userhome" render={(props) => (<Userhome/>)}></Route>
              <Redirect to={{pathname: '/Page/admindashboard'}}/> */}

              <Route exact path="/webapp/QR" render={(props) => (<QR/>)}></Route>
              <Route path="/webapp/QR" render={(props) => (<QR/>)}></Route>
              <Route path="/webapp/TakePhoto" render={(props) => (<TakePhoto/>)}></Route>
              <Route path="/webapp/RepairDetails" render={(props) => (<RepairDetails/>)}></Route>
              <Route path="/webapp/Status" render={(props) => (<Status/>)}></Route>
              <Route path="/webapp/DataDevice" render={(props) => (<DataDevice/>)}></Route>
              <Route path="/webapp/uploadImage" render={(props) => (<UploadImage/>)}></Route>
              <Route path="/webapp/WebappHeader" render={(props) => (<WebappHeader/>)}></Route>
              <Route path= "/webapp/sendRepairFinish" render={(props) => (<SendRepairFinish/>)}></Route>
              <Redirect to={{pathname: '/webapp/QR'}}/>
          </Switch>
      </Router>

      

  )
}




 
 export default App
 

