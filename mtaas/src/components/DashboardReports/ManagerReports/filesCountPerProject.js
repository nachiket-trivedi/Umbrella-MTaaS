import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class FilesPerProject extends React.Component{
    constructor(props)
    {
        super(props)
        this.state= {
            data:{}
        }
    }

    componentWillMount(){
        let data = {email:localStorage.getItem('email')}
        axios.post(GlobalVar.server_base_url+'manager/reports/filesInS3PerProject',data).then((response)=>{
            console.log(response.data)
            this.setState({
                data:{
                    labels:response.data['Projects'],
                    datasets:[{
                        label:'Number of Files Per Project',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data:response.data['NumberOfFiles'],
                    }]
                }
            })
        }).catch((err)=>{
            console.log("Error in FilesPerProject: "+err);
        })
    }
    render(){
        return(
            <div>
                <h2>Number of Files in S3 Per Project</h2>
                <Bar
                data={this.state.data}
                width={80}
                height={100}
                options={{
                    maintainAspectRatio: false,
                    scales:{
                            yAxes:[{
                                ticks:{
                                    beginAtZero:true,
                                    min:0
                                }
                            }]
                            }
                }}
                />
            </div>
        )
    }
}

export default FilesPerProject