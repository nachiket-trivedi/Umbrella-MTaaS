import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class ProjectSizeCost extends React.Component{

    constructor(props)
    {
        super(props)
        this.state= {
            data:{}
        }
    }

    componentWillMount(){
        let data = {email:localStorage.getItem('email')}
        axios.post(GlobalVar.server_base_url+'manager/reports/filesSizeInS3PerProject',data).then((response)=>{
            console.log(response.data)
            let bc=[]
            response.data['Projects'].forEach((each)=>{
                let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
                bc.push(c)
            })
            var projectSizeCost = response.data['ProjectSize'].map((element)=>{
                let val = ((0.030 * element)/(1024*1024))
                return (+val.toFixed(5))
            })

            var numberObjectCost = response.data['ProjectFilesCount'].map((element)=>{
                let val = ((0.20 * element)/100)
                return (+val.toFixed(5))
            })

            //var sum = [...projectSizeCost].map((e,i)=> (Math.round((e+numberObjectCost[i])*100))/100);
            var sum = [...projectSizeCost].map((e,i)=> +((e+numberObjectCost[i]).toFixed(5)));
            console.log(sum)
            this.setState({
                data:{
                    labels:response.data['Projects'],
                    datasets:[{
                            data:sum,
                            backgroundColor:bc,
                            hoverBackgroundColor:bc
                    }]
                }
            })
        }).catch((err)=>{
            console.log("Error in ProjectSizeCost: "+err);
        })
    }

    render(){
        return(
            <div>
                <h2>Project Cost Per Project</h2>
                <Doughnut data={this.state.data} 
                        width={100}
                        height={40}
                        options={{ maintainAspectRatio: true }}
                />
            </div>
        )
    }
}

export default ProjectSizeCost