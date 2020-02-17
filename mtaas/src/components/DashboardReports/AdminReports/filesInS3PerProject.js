import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class FilesS3PerProject extends React.Component{
    constructor(props)
    {
        super(props)
        this.state= {
            data:{}
        }
    }

    componentWillMount(){
        axios.get(GlobalVar.server_base_url+'admin/reports/filesInS3PerProject').then((response)=>{
            this.setState({
                data:{
                    labels:response.data['Projects'],
                    datasets:[{
                        label:'Number of Files in S3 Per Project',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data:response.data['NumberOfFiles']
                    }]
                }
            })
        }).catch((err)=>{
            console.log("Error in FilesS3PerProject: "+err);
        })
    }
    render(){
        return(
            <div>
                <h2>Number of Files Present in S3 Per Project</h2>
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

export default FilesS3PerProject