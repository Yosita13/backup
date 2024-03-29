
import "../assets/css/style.css";
import { useState } from "react";
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import WebappHeader from './webappHeader';

const ReadQr = () => {
  let history = useHistory()
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");



  const handleScan = async (scanData) => {
    setLoadingScan(true);


    const location = {
      pathname: '/webapp/userhome',
      state: data
    }
    //console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      const data = scanData.text;

      console.log(`loaded >>>`, scanData);

      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      history.push({ pathname: '/webapp/userhome', state: scanData })
      //await history.push(location)
      // setPrecScan(scanData);
    }

  };
  const handleError = (err) => {
    console.error(err);
  };

  console.log('selected',selected);
  
  return (
    <div >
      <WebappHeader />
      <div className="account-content">
        <div className="container">
          {/* Page Content */}
          <div className="content container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <Helmet>
                  <title>UserHome</title>
                  {/* <meta name="description" content="Login page" /> */}
                </Helmet>
                {/* Page Content */}
                <div className="page-wrapper-webapp">
                  <div className="content container-fluid">
                    <div className="form-header">
                      <h3 >สแกนคิวอาร์โคด</h3><br></br>

                      {/* <h2>
                            Last Scan:
                            {selected}
                          </h2> */}

                      <button type="submit" className="btn btn-primary-green submit-btn"
                        onClick={() => {
                          setStartScan(!startScan);
                        }}
                      >
                        {startScan ? "Stop Scan" : "Start Scan"}
                      </button><br></br>
                      {startScan && (
                        <>
                          <select type="submit" className="btn btn-gray-1000" onChange={(e) => setSelected(e.target.value)}>
                            <option className="btn btn-gray-1000" value={"environment"}>Back Camera</option>
                            <option className="btn btn-gray-1000" value={"user"}>Front Camera</option>
                          </select><br></br>
                          
                          <QrReader
                         
                            facingMode={selected}
                            delay={1000}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: "300px" }}
                    
                          />

                        </>
                      )}
                      {loadingScan && <p>Loading</p>}
                      {data !== "" && <p>{data}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default ReadQr;
