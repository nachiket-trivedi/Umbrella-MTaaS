import React from 'react';
import ProjectDivision from './projectDivision'
import UserDivision from './usersDivision'
import TesterPerProject from './testersPerProject'
import FilesS3PerProject from './filesInS3PerProject'
import Navbar from "../../Navbar/Navbar";

class ConsolidatedAdminReports extends React.Component{

    render()
    {
        return(
            <div className="mainDiv"> 
                <div className="navDiv">
                    <Navbar />
                </div>
                <div className="listDiv">
                    <hr />
                        <ProjectDivision />
                    <hr />
                    <hr />
                        <UserDivision />
                    <hr />
                        <TesterPerProject />
                    <hr />
                        <FilesS3PerProject />
                </div>
            </div>
        )
    }
}

export default ConsolidatedAdminReports