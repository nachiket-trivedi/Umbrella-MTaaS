import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from "../Navbar/Navbar";
import './TestersLocation.css'

const GlobalVar = require("../../GlobalVar");

class GoogleMapTry extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            stores: [],
            base:GlobalVar.server_base_url,
            projects:[],
            projectname:'',
            selected_username:'',
            selected_zipcode:'',
            selected_name:'',
            show:false
            }
        this.handleShow=this.handleShow.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.displayMarkers=this.displayMarkers.bind(this)
        this.onChangeProjectName=this.onChangeProjectName.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    componentDidMount()
    {
        this.setState({
            username:localStorage.getItem('email')
        })
        let data={username:localStorage.getItem('email')}
        axios.post(this.state.base+'users/oneUser',data).then((response)=>{
            if(response.data.project_involved.length > 0)
            {
                this.setState({
                    projects:response.data.project_involved,
                    projectname:response.data.project_involved[0]
                })
            }
        }).catch((err)=>{
            console.log("Unable to get list of projects: "+err);
        })
    }

    handleShow(store)
    {
        this.setState({
            show:true,
            selected_username:store.username,
            selected_zipcode:store.zipcode,
            selected_name:store.name
        })
    }

    handleClose()
    {
        this.setState({
            show:false
        })
    }

    onChangeProjectName(e)
    {
        this.setState({
            projectname:e.target.value
        });
    }

    displayMarkers()
    {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
             lat: store.latitude,
             lng: store.longitude
           }}
           onClick={()=>this.handleShow(store)} />
        })
    }

    returnsAPIPromise(each) {
        return new Promise((resolve,reject)=>{
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+each.zipcode+'&sensor=false&key=AIzaSyCGwpKyO_Tm0YCZ5R-Z2eAp9590QB5SOFA')
            .then((response)=>{
                let temp={}
                temp['username']=each.username
                temp['zipcode']=each.zipcode
                temp['name']=each.name
                temp['latitude']=response.data['results'][0]['geometry']['location']['lat']
                temp['longitude']=response.data['results'][0]['geometry']['location']['lng']
                resolve(temp)
            })
        })
    }

    onSubmit(e)
    {
        e.preventDefault();
        let data={projectname:this.state.projectname}
        axios.post(this.state.base+'users/getZipCodes/',data).then((res)=>{
            console.log(res.data)
            let userRequests=[]
            res.data.forEach((each_data)=>{
                userRequests.push(this.returnsAPIPromise(each_data))
            })
            Promise.all(userRequests).then((allData)=>{
                console.log(allData)
                this.setState({
                    stores:allData
                })
            })
        }).catch((err)=>{
            alert("Error in fetching locations " + err);
        })
    }
    
    render(){
        const mapStyles = {
            width: '90%',
            height: '90%',
          };
        return (
            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar />
                </div>
                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Tester Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Name: {this.state.selected_name}
                            <br/>
                            Username: {this.state.selected_username}
                            <br/>
                            ZipCode: {this.state.selected_zipcode}
                        </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                    </Modal>
                </div>
                <div className="projDiv">
                    <h3>Select a Project</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.projectname}
                            onChange={this.onChangeProjectName}>
                            {   //opening of curly braces so as to enter js code and distinguish from JSX html code
                                this.state.projects.map((project)=>{
                                    //<option>value_to_be_displayed</option>
                                    return <option key={project} value={project}>{project}</option>
                                })
                                //closing of curly braces meaning our js code has finished
                            }   
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Get Location</button>
                    </form>
                </div>
                <div className="mapDiv">
                    <Map
                        google={this.props.google}
                        zoom={10}
                        style={mapStyles}
                        initialCenter={{ lat: 37.336240, lng: -121.887060}}>
                        {this.displayMarkers()}
                    </Map>
                </div>
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyCGwpKyO_Tm0YCZ5R-Z2eAp9590QB5SOFA'
})(GoogleMapTry)
