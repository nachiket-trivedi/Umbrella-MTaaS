import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class TesterPerProject extends React.Component{
    constructor(props)
    {
        super(props)
        this.state= {
            data:{}
        }
        
    }

    componentWillMount(){
        axios.get(GlobalVar.server_base_url+'admin/reports/testersPerProject').then((response)=>{
            this.setState({
                data:{
                    labels:response.data['Projects'],
                    datasets:[{
                        label:'Number of Testers Per Project',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data:response.data['NumberWorkingTester']
                    }]
                }
            })
        }).catch((err)=>{
            console.log("Error in TesterPerProject: "+err);
        })
    }
    render(){
        return(
            <div>
                <h2>Number of Working Testers Per Project</h2>
                <Bar
                data={this.state.data}
                width={80}
                height={100}
                options={{
                    maintainAspectRatio: false
                }}
                />
            </div>
        )
    }
}

export default TesterPerProject