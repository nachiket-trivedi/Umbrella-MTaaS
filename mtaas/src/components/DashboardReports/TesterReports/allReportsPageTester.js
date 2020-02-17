import React from 'react';
import BugsPerProject from './bugsPerProject'
import FilesPerProject from './filesUploadedS3PerProject'
import Navbar from "../../Navbar/Navbar";

class ConsolidatedTesterReports extends React.Component{

    render()
    {
        return(
            <div className="mainDiv"> 
                <div className="navDiv">
                    <Navbar />
                </div>
                <div className="listDiv">
                    <hr />
                        <BugsPerProject />
                    <hr />
                        <FilesPerProject />
                </div>
            </div>
        )
    }
}

export default ConsolidatedTesterReports