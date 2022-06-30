// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { QRCodeSVG } from "qrcode.react";
import { Spinner } from "react-activity";
import { IoIosCloseCircle } from "react-icons/io";
import "react-activity/dist/library.css";

function App() {
  const socket = io("http://localhost:8000");
  const [data, setData] = useState();
  const [back, setBack] = useState();
  const [passport, setPassport] = useState();
  const [fupload, setFUpload] = useState(false);
  const [bupload, setBUpload] = useState(false);
  const [pupload, setPUpload] = useState(false);
  const qrFront = useRef();
  const qrBack = useRef();
  const qrPassport = useRef();

  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
    console.log(qrFront);
  });

  useEffect(() => {
    socket.on("Front-upload", (data) => {
      setFUpload(true);
    });
    socket.on("Back-upload", (data) => {
      setBUpload(true);
    });
    socket.on("Passport-upload", (data) => {
      setPUpload(true);
    });
    socket.on("Front", (data) => {
      setData(data);
    });
    socket.on(`${"Back"}`, (data) => {
      setBack(data);
    });
    socket.on(`${"Passport"}`, (data) => {
      setPassport(data);
    });
  }, [socket]);

  return (
    <div>
      <div className="main-inner-container">Applicants</div>
      <div className="main-inner-second">
        <form className="form-main">
          <div className="text-row">
            <div className="text-coloumn">
              <label className="label-text">Applicant Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-text"
                value="Jalal Ahmed"
              />
            </div>
            <div className="text-coloumn">
              <label className="label-text">Next of Kin</label>
              <input
                type="text"
                id="kin"
                name="kin"
                className="input-text"
                value="Fatima Ahmed"
              />
            </div>
          </div>
          <div className="text-row">
            <div className="text-coloumn">
              <label className="label-text">Bank Name</label>
              <input
                type="text"
                id="bank"
                name="bank"
                className="input-text"
                value="Standard Chartered Bank"
              />
            </div>
            <div className="text-coloumn">
              <label className="label-text">Account Tilte</label>
              <input
                type="text"
                id="account"
                name="account"
                className="input-text"
                value="Jalal Ahmed"
              />
            </div>
            <div className="text-coloumn">
              <label className="label-text">IBAN</label>
              <input
                type="text"
                id="iban"
                name="iban"
                className="input-text"
                value="62358239920103875"
              />
            </div>
          </div>
          <div className="text-coloumn">
            <label className="label-text">Upload Document</label>
            <div className="text-row">
              <div className="qrField">
                <div className="text-font">Upload CNIC Front</div>
                {data && fupload ? (
                  <div className="img-container">
                    <img
                      src={`data:image/png;base64, ${data.base64}`}
                      alt=""
                      className="img-style"
                    />
                    <IoIosCloseCircle
                      onClick={() => {
                        setData(null);
                        setFUpload(false);
                      }}
                      className="icon-Styling"
                      color="black"
                      size={20}
                    />
                  </div>
                ) : !data && !fupload ? (
                  <QRCodeSVG ref={qrFront} value="Front" size="100px" />
                ) : (
                  <div className="spinner-container">
                    <Spinner color="#1390D7" />
                  </div>
                )}
              </div>
              <div className="qrField">
                <div className="text-font">Upload CNIC Back</div>
                {back && bupload ? (
                  <div className="img-container">
                    <img
                      src={`data:image/png;base64, ${back.base64}`}
                      alt=""
                      className="img-style"
                    />
                    <IoIosCloseCircle
                      onClick={() => {
                        setBack(null);
                        setBUpload(false);
                      }}
                      className="icon-Styling"
                      color="black"
                      size={20}
                    />
                  </div>
                ) : !back && !bupload ? (
                  <QRCodeSVG ref={qrBack} value="Back" size="100px" />
                ) : (
                  <div className="spinner-container">
                    <Spinner color="#1390D7" />
                  </div>
                )}
              </div>
              <div className="qrField">
                <div className="text-font">
                  Upload Passport<br></br> Size Photo
                </div>
                {passport && pupload ? (
                  <div className="img-container">
                    <img
                      src={`data:image/png;base64, ${passport.base64}`}
                      alt=""
                      className="img-style"
                    />
                    <IoIosCloseCircle
                      onClick={() => {
                        setPassport(null);
                        setPUpload(false);
                      }}
                      className="icon-Styling"
                      color="black"
                      size={20}
                    />
                  </div>
                ) : !passport && !pupload ? (
                  <QRCodeSVG ref={qrPassport} value="Passport" size="100px" />
                ) : (
                  <div className="spinner-container">
                    <Spinner color="#1390D7" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
