import React from 'react';
import BugsPerProject from './bugsPerProject'
import TestersPerManagerProject from './testersPerProject'
import FilesPerProject from './filesCountPerProject'
import ProjectSizeCost from './filesSizeCostPerProject'
import Navbar from "../../Navbar/Navbar";

class ConsolidatedManagerReports extends React.Component{

    render()
    {
        return(
            <div className="mainDiv"> 
                <div className="navDiv">
                    <Navbar />
                </div>
                <div className="listDiv">
                    <hr />
                        <ProjectSizeCost />
                    <hr />
                        <BugsPerProject />
                    <hr />
                        <TestersPerManagerProject />
                    <hr />
                        <FilesPerProject />
                </div>
            </div>
        )
    }
}

export default ConsolidatedManagerReports