import React, { Component } from "react";
import { CardTitle, Form, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import Bg_Login from "../assets/img/bg_login.png";
import Banner_login from "../assets/img/banner_login.png";

import { loginUser } from "../redux/auth";
import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      statusLogin: "default",
    };
  }

  componentDidMount() {
    const { user } = this.props;
    /*  login auto
    const hashParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const encodedParams = hashParams.get("encodedParams");

    if (encodedParams) {
      const decodedParams = encodedParams && JSON.parse(atob(encodedParams));
      let password = "123456";
      this.props.loginUser(decodedParams.key1, password);
    } */
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;

    if (prevProps.status !== status) {
      if (this.props.user) {
        if (this.props.user.authorization === "admin") {
          this.props.history.push("/import-members");
        } else {
          this.props.history.push("/videolist");
        }
      }
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) &&
        status === "fail"
      ) {
        this.setState({
          statusLogin: "fail",
        });
      }
    }
  }

  onUserLogin(e) {
    e.preventDefault();
    if (!!this.props.user == false && this.props.status === "fail") {
      this.setState({
        statusLogin: "fail",
      });
    }
    if (this.state.email !== "") {
      this.props.loginUser(this.state.email, this.state.password);
      if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        this.setState({
          statusLogin: "fail",
        });
      }
    } else if (this.state.email === "") {
      this.setState({
        statusLogin: "fail",
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const { statusLogin } = this.state;
    return (
      <div
        className="all-row-login"
        style={{
          backgroundImage: `url(${Bg_Login})`,
        }}
      >
        <div className="row container">
          <div
            className="auth-card shadow col-lg-10 offset-lg-1 col-md-12 col-12"
            style={{ borderRadius: "16px" }}
          >
            <div className="position-relative image-side-login col-lg-6 col-12">
              <p className="welcome-program mt-3">ยินดีต้อนรับเข้าสู่โปรแกรม</p>
              <img className="mb-4 col-12" src={Banner_login} alt="" />
            </div>

            <div className="form-side-login col-lg-6 col-12 w-100 d-flex flex-column align-items-center justify-content-center">
              <CardTitle className="h3 mb-4 mt-5">{"เข้าสู่ระบบ"}</CardTitle>
              <Form onSubmit={(e) => this.onUserLogin(e)} className="w-100">
                <Label className="form-group2 has-float-label mb-4">
                  {"อีเมลเข้าใช้งาน"}
                  <span style={{ color: "red" }}>*</span>
                  <Input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Label>
                {statusLogin === "fail" &&
                  !(this.props.status === "success") && (
                    <small id="emailHelp" className="form-text text-muted mb-3">
                      <h6 style={{ color: "red" }}>อีเมลไม่ถูกต้อง</h6>
                    </small>
                  )}

                <div className="d-flex justify-content-between align-items-center mb-3 btn-login">
                  <Button
                    style={{
                      backgroundColor: "#F45197",
                      borderColor: "#F45197",
                      borderRadius: "20px",
                    }}
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                    block
                  >
                    <span className="h6 text-one">{"LOGIN"}</span>
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    className="btn-link"
                    color="empty"
                    href="https://content.bebefitroutine.com/onlinecourse/"
                    target="_blank"
                    block
                  >
                    <span
                      className="text-one underline-on-hover"
                      style={{ cursor: "pointer", color: "#F45197" }}
                    >
                      {"ซื้อคอร์สออนไลน์"}
                    </span>
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, status } = authUser;
  return { user, status };
};

const mapActionsToProps = { loginUser };

export default connect(mapStateToProps, mapActionsToProps)(Login);
