import React, { Component } from "react";
import "./Signup.css";
import axios from "axios";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
// import "../../../node_modules/react-dropdown/style.csspdown/style.csspdown/style.css";
import { hostedAddress } from "../../GlobalVar"

let redirectVar = null;

const options = ["Tester", "Manager"];

class Signup extends Component {
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
        this.submitSignup = this.submitSignup.bind(this);
    }

    usernameChangeHandler = e => {
        this.setState({
            username: e.target.value
        });
    };
    roleChangeHandler = value => {
        this.setState({
            role: value
        });
        this.role.value = { value };
    };

    passwordChangeHandler = e => {
        this.setState({
            password: e.target.value
        });
    };

    submitSignup = e => {
        console.log("Iside submit");
        var headers = new Headers();
        e.preventDefault();
        
        const data = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            name: this.name.value,
            phone: this.phone.value,
            zipcode: this.zipcode.value,
            email: this.state.username
        };

        if ((this.state.username === "sarthak.jain@sjsu.edu") || (this.state.username === "amit.garg@sjsu.edu") || (this.state.username === "nachiket.trivedi@sjsu.edu") || (this.state.username === "alaukika.diwanji@sjsu.edu")) {
            data.role = {'value':'Admin','label':'Admin'}
        }

        console.log(data)

        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/signup", data)
            .then(response => {
                console.log("Status Code : ", response);
                if (response.data['cookie'] === "Tester" && response.data !== "exists" && response.data !== "error") {
                    console.log("new tester created-");
                    // console.log(localStorage.getItem('new1'));
                    localStorage.setItem('cookie', response.data['cookie']);
                    localStorage.setItem('email', response.data['email']);
                    localStorage.setItem('username', response.data['username']);
                    localStorage.setItem('role', response.data['role']);
                    localStorage.setItem('name', response.data['name']);
                    localStorage.setItem('bearer-token', response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                } else if (response.data['cookie'] === "Manager" && response.data !== "exists" && response.data !== "error") {
                    console.log("new manager created-");
                    // console.log(localStorage.getItem('cookie'));
                    localStorage.setItem('cookie', response.data['cookie']);
                    localStorage.setItem('email', response.data['email']);
                    localStorage.setItem('username', response.data['username']);
                    localStorage.setItem('role', response.data['role']);
                    localStorage.setItem('name', response.data['name']);
                    localStorage.setItem('bearer-token', response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                }
                else if(response.data['cookie'] === "Admin" && response.data !== "exists" && response.data !== "error")
                {
                    console.log("new admin role created-->");
                    // console.log(localStorage.getItem('cookie'));
                    localStorage.setItem('cookie', response.data['cookie']);
                    localStorage.setItem('email', response.data['email']);
                    localStorage.setItem('username', response.data['username']);
                    localStorage.setItem('role', response.data['role']);
                    localStorage.setItem('name', response.data['name']);
                    localStorage.setItem('bearer-token', response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                }
                else if (response.data === "exists") {
                    alert("There's already an account associated with this email-id :(");
                    this.setState({
                        authFlag: false
                    });
                }
            })
            .catch(response => {
                // alert("Success");
                this.setState({
                    authFlag: false
                });
            }
            )

    };

    render() {
        if (!localStorage.getItem('cookie')) {
            redirectVar = <Redirect to="/signup" />
        }
        else if (localStorage.getItem('cookie') === 'Tester') {
            alert('New Tester Created Successfully!');
            redirectVar = <Redirect to="/login" />
            localStorage.removeItem('cookie');
        }
        else if (localStorage.getItem('cookie') === 'Manager') {
            alert('New Manager Created Successfully!');
            redirectVar = <Redirect to="/login" />
            localStorage.removeItem('cookie');
        }
        else if(localStorage.getItem('cookie') === 'Admin'){
            alert('New Admin Created Successfully!');
            redirectVar = <Redirect to="/login" />
            localStorage.removeItem('cookie');
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.submitSignup}>
                            <div class="main-div">
                                <div class="panel">
                                    <h2>MTaaS Sign Up</h2>
                                </div>
                                <div class="form-group">
                                    <input
                                        ref={ref => (this.name = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        placeholder="Name"
                                        required
                                    />
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
                                    <input
                                        ref={ref => (this.phone = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        class="form-control"
                                        name="phone"
                                        placeholder="Phone"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        ref={ref => (this.zipcode = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        class="form-control"
                                        name="zipcode"
                                        placeholder="Zipcode"
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
                                        onChange={this.submitSignup}
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Sign Up"
                                    />
                                    {/* <button onClick={this.submitLogin} class="btn btn-primary">
                        Sign Up
                      </button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;