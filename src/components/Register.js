import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Layer_1 from "../images/Layer_1.png";
import video_player from "../images/video-player.svg";
import padlock from "../images/padlock.svg";
import user from "../images/user.svg";
import company from "../images/company.svg";
import phone from "../images/phone.svg";
import email from "../images/email.svg";
import info from "../images/info.svg";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Register({ BaseURL }) {
  const [Username, setUsername] = useState("");
  const [Company, setCompany] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [InvalidUsername, setInvalidUsername] = useState(false);
  // const [InvalidMobile, setInvalidMobile] = useState(false)
  const [InvalidEmail, setInvalidEmail] = useState(false);
  const [InvalidPassword, setInvalidPassword] = useState(false);
  const [NotMatched, setNotMatched] = useState(false);
  const [Allvalid, setAllvalid] = useState(true);

  const history = useHistory();

  const register_data = {
    username: `${Username}`,
    email: `${Email}`,
    password: `${Password}`,
    confirm_password: `${ConfirmPassword}`,
    phone: `+${Mobile}`,
  };

  useEffect(() => {
    if (/[^a-z\d]/i.test(Username)) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  }, [Username]);

  // useEffect(() => {
  //     if ((!(RegExp(/^\d{10}$/).test(Mobile)) && !(Mobile === ''))) {
  //         setInvalidMobile(true)
  //     }
  //     else {
  //         setInvalidMobile(false)
  //     }

  // }, [Mobile])

  useEffect(() => {
    if (
      !RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(Email) &&
      !(Email === "")
    ) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  }, [Email]);

  useEffect(() => {
    if (Password.length < 8 && !(Password === "")) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  }, [Password]);

  useEffect(() => {
    if (!(Password === ConfirmPassword) && !(ConfirmPassword === "")) {
      setNotMatched(true);
    } else {
      setNotMatched(false);
    }
  }, [ConfirmPassword, Password]);

  useEffect(() => {
    if (InvalidUsername || InvalidEmail || NotMatched) {
      setAllvalid(false);
    } else {
      setAllvalid(true);
    }
  }, [InvalidEmail, InvalidUsername, NotMatched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Allvalid) {
      console.log(register_data);
      axios
        .post(`${BaseURL}/api/v1/user/register/`, register_data)
        .then((response) => {
          console.log(response);
          alert("User Successfully Registered!");
          localStorage.setItem("userAuth", `${response.data.status}`);
          localStorage.setItem(
            "userAccessToken",
            `${response.data.AccessToken}`
          );
          localStorage.setItem(
            "userRefreshToken",
            `${response.data.RefreshToken}`
          );
          history.push("/");
          window.location.reload();
        })
        .catch((err) => alert(err.response.data.non_field_errors));
    } else {
      console.log("someth wro");
    }
  };

  const backHome = () => {
    history.push("/");
  };

  return (
    <div className="register">
      <div className="left">
        <img
          alt=""
          onClick={backHome}
          src={Layer_1}
          className="login_logo"
        ></img>
        <div className="upper_circle"></div>
        <h2>
          <p>Welcome to</p>
          <p>Book My Show</p>
        </h2>
        <div className="lower_circle"></div>
      </div>
      <div id="register_right">
        <div id="register_heading">
          <h4>Register</h4>
          <img alt="" src={video_player}></img>
        </div>
        <div className="login_container">
          <form className="register_form" onSubmit={handleSubmit}>
            <label>Username</label>
            <span className={`error_msg ${InvalidUsername && `display_error`}`}>
              Username can be alphanumeric only
            </span>
            <input
              className={`inputs ${InvalidUsername && `error`}`}
              type="text"
              placeholder="Username"
              name="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <img alt="" src={user} className="input_icons"></img>
            <img
              alt=""
              src={info}
              className={`error_icon ${InvalidUsername && `display_error`}`}
            ></img>
            <label>Company</label>
            <input
              className="inputs"
              type="text"
              placeholder="Company"
              name="Company"
              value={Company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <img alt="" src={company} className="input_icons"></img>
            <label>Mobile</label>
            <span className={`error_msg`}>Enter 10 digit number</span>
            {/* <input className={`inputs ${InvalidMobile && `error`}`} type="tel" placeholder="Mobile" name="Mobile" value={Mobile} onChange={(e) => setMobile(e.target.value)} required /> */}
            <PhoneInput
              containerClass="inputs"
              containerStyle={{ position: "relative" }}
              inputStyle={{
                backgroundColor: "inherit",
                border: "none",
                position: "relative",
                left: "-45px",
              }}
              buttonStyle={{
                border: "none",
                backgroundColor: "#FFFFFF",
                zIndex: "99",
                left: "20px",
                width: "50px",
              }}
              placeholder="Mobile"
              value={Mobile}
              onChange={setMobile}
            />
            <img alt="" src={phone} className="input_icons"></img>
            <img alt="" src={info} className={`error_icon`}></img>
            <label>Email</label>
            <span className={`error_msg ${InvalidEmail && `display_error`}`}>
              Enter a valid Email
            </span>
            <input
              className={`inputs ${InvalidEmail && `error`}`}
              type="text"
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <img alt="" src={email} className="input_icons"></img>
            <img
              alt=""
              src={info}
              className={`error_icon ${InvalidEmail && `display_error`}`}
            ></img>
            <label>Password</label>
            <span className={`error_msg ${InvalidPassword && `display_error`}`}>
              Password must be atleast 8 digits
            </span>
            <input
              className={`inputs ${InvalidPassword && `error`}`}
              type="password"
              placeholder="Password"
              name="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img alt="" src={padlock} className="input_icons pass"></img>
            <img
              alt=""
              src={info}
              className={`error_icon ${InvalidPassword && `display_error`}`}
            ></img>
            <label>Confirm Password</label>
            <span className={`error_msg ${NotMatched && `display_error`}`}>
              Password not matched
            </span>
            <input
              className={`inputs ${NotMatched && `error`}`}
              type="password"
              placeholder="Confirm Password"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <img alt="" src={padlock} className="input_icons pass"></img>
            <img
              alt=""
              src={info}
              className={`error_icon ${NotMatched && `display_error`}`}
            ></img>
            <button id="register_submit_btn" type="submit">
              REGISTER
            </button>
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
