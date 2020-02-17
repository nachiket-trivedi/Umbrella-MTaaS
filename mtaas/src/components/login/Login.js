import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import { hostedAddress } from "../../GlobalVar"
import { Redirect, Route } from "react-router";
import Dropdown from "react-dropdown";
import "../../../node_modules/react-dropdown/style.css";

const options = ["Manager", "Tester"];
let redirectVar = null;

class Login extends Component {
    constructor(props) {

        super(props);
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            role: ""
        };

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    usernameChangeHandler = e => {
        this.setState({
            username: e.target.value
        });
    }

    passwordChangeHandler = e => {
        this.setState({
            password: e.target.value
        });
    }
    roleChangeHandler = value => {
        this.setState({
            role: value
        });
        this.role.value = { value };
    };

    openDiscussionForum = e => {
        this.setState({
            password: e.target.value
        });
    }

    submitLogin = e => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        };
        if (this.state.role === null || this.state.role === "") { data.role = { 'value': 'Admin', 'label': 'Admin' } }
        // if ((this.state.username === "sarthak.jain@sjsu.edu") || (this.state.username === "amit.garg@sjsu.edu") || (this.state.username === "nachiket.trivedi@sjsu.edu") || (this.state.username === "alaukika.diwanji@sjsu.edu")) {
        //     data.role = { 'value': 'Admin', 'label': 'Admin' }
        // }
        axios.defaults.withCredentials = true;
        axios.post(hostedAddress + ":3001/login", data)
            .then(response => {
                console.log('Response data after login post-->' + response.data)
                if (response.data['cookie'] === "Tester" && response.data != "error") {
                    console.log("welcome tester-", response.data);
                    localStorage.setItem('cookie', "Tester");
                    localStorage.setItem('email', response.data['email']);
                    localStorage.setItem('name', response.data['name']);
                    // localStorage.setItem('tester_address', response.data['tester_address']);
                    // localStorage.setItem('bearer-token', response.headers.authorization);
                    localStorage.setItem('userid', response.data['email']);
                    localStorage.setItem('username', response.data['email']);
                    localStorage.setItem('user_valid', true);
                    localStorage.setItem('role', this.state.role.value);
                } else if (response.data['cookie'] === "Manager" && response.data !== "error") {
                    console.log("welcome manager-");
                    localStorage.setItem('cookie', "Manager");
                    localStorage.setItem('email', response.data['email']);
                    localStorage.setItem('name', response.data['name']);
                    // localStorage.setItem('manager_address', response.data['manager_address']);
                    // localStorage.setItem('bearer-token', response.headers.authorization)
                    localStorage.setItem('userid', response.data['email']);
                    localStorage.setItem('username', response.data['email']);
                    localStorage.setItem('user_valid', true);
                    localStorage.setItem('role', this.state.role.value);
                }
                else if (response.data['cookie'] === "Admin" && response.data !== "error") {
                    console.log('Welcome Admin-')
                    localStorage.setItem('cookie', "Admin");
                    localStorage.setItem('email', response.data['email']);
                    localStorage.setItem('name', response.data['name']);
                    // localStorage.setItem('manager_address', response.data['manager_address']);
                    // localStorage.setItem('bearer-token', response.headers.authorization)
                    localStorage.setItem('userid', response.data['email']);
                    localStorage.setItem('username', response.data['email']);
                    localStorage.setItem('user_valid', true);
                    localStorage.setItem('role', 'Admin');
                }
                else if (response.data === "error") {
                    alert("Invalid credentials");
                }
                window.location.reload()
            })
            .catch(err => {
                alert("Invalid-in catch");

            })
    }
    render() {
        if (localStorage.getItem('cookie') === 'Tester') {
            redirectVar = <Redirect to="/testerhome" />
        } else if (localStorage.getItem('cookie') === 'Manager') {
            console.log("Here Manager")
            redirectVar = <Redirect to="/home" />
        } else if (localStorage.getItem('cookie') === 'Admin') {
            redirectVar = <Redirect to="/admin/reports" />
        }
        else if (!localStorage.getItem('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        // else if (localStorage.getItem('cookie') == 'manager') {
        //     // redirectVar = <Redirect to= "/home_cust"/>
        // }
        // else if (localStorage.getItem('cookie') == 'tester') {
        //     // redirectVar = <Redirect to= "/home_rest"/>
        // }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.submitLogin}>
                            <div class="main-div">
                                <div class="panel">
                                    <h2 >MTaaS Login</h2>
                                    <p>Please enter your email-id and password</p>
                                </div>
                                <div class="form-group">
                                    <input
                                        onChange={this.usernameChangeHandler}
                                        type="email"
                                        class="form-control"
                                        name="username"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        onChange={this.passwordChangeHandler}
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <Dropdown
                                        ref={ref => (this.role = ref)}
                                        options={options}
                                        onChange={this.roleChangeHandler}
                                        value={this.state.role}
                                        placeholder="I'm a.."
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        ref={ref => (this.submit = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Login"
                                    />
                                    {/* <button onClick={this.submitLogin} class="btn btn-primary">
                      Login
                    </button> */}
                                </div>
                                <br></br>
                                <br></br>
                                <div>New to MTaaS ? <a href="/signup">Sign up!</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;