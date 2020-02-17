import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class UserDivision extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            data:{}
        }
    }

    componentWillMount(){
        axios.get(GlobalVar.server_base_url+'admin/reports/numberTesterManager').then((response)=>{
            let bc=[]
            response.data['Users'].forEach((each)=>{
                let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
                bc.push(c)
            })

            this.setState({
                data:{
                    labels:response.data['Users'],
                    datasets:[{
                        data:response.data['Counts'],
                        backgroundColor:bc,
                        hoverBackgroundColor:bc
                    }]
                }
            })
        }).catch((err)=>{
            console.log("Error in UserDivision: "+err);
        })
    }

    render(){
        return(
            <div>
                <h2>Users Count based on their role</h2>
                <Doughnut data={this.state.data} 
                        width={100}
                        height={40}
                        options={{ maintainAspectRatio: true }}
                />
            </div>
        )
    }
}

export default UserDivision