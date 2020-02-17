import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import axios from 'axios'

const GlobalVar = require("../../../GlobalVar");

class ProjectDivision extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        axios.get(GlobalVar.server_base_url + 'admin/reports/projectDivisionBasedCount').then((response) => {
            let bc = []
            response.data['Division'].forEach((each) => {
                let c = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
                bc.push(c)
            })
            this.setState({
                data: {
                    labels: response.data['Division'],
                    datasets: [{
                        data: response.data['counts'],
                        backgroundColor: bc,
                        hoverBackgroundColor: bc
                    }]
                }
            })
        }).catch((err) => {
            console.log("Error in projectDivision: " + err);
        })
    }

    render() {
        return (
            <div>
                <h2>Project Counts Based on Custom Division Rule</h2>
                <Doughnut data={this.state.data}
                    width={100}
                    height={40}
                    options={{ maintainAspectRatio: true }} />
            </div>
        )
    }
}

export default ProjectDivision