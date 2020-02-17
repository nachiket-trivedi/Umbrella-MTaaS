import React from 'react'
import Navbar from "../Navbar/Navbar";
import './ProjectTeam.css'
import {Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText} from 'reactstrap'
import CardLink from 'reactstrap/lib/CardLink';

class TeamMembers extends React.Component{

    constructor(props)
    {
        super(props)

    }
    render(){
        return(
            <div className="mainDiv">
                <div>
                    <Card>
                    <CardImg variant="top" src="https://lh3.googleusercontent.com/Mkclx4NJhkdwuD-XsabMGuWE7cYEiiAHj1D_sPlQvpRgtva6UJDvPLpELZWYhSmXpC9YsUq2-fjD0x6G2wCcRbpHB3q9JZhW5oFrXc8cXyqCJy2aX-jdf_4VWnY1xP-vfvHi1HWN5jXSDOe7OiFhz_n6wylwAu_vjRKSrVXBLlWwGwAOjBFiOBt4I8NMzTQJfahhEfJ1eL5aAwFI0uDOmk1LP_s_qPm50ong6SIJePIYMf_NH22xKbioJNV9dLG7nm9vz0xYiFaWkwRVzMugjbxrv9NoFJS2ygqnzphkoh7ZYTKYCr2oGmuI7rp11ZJIhs4S2e7Um7K24AT_sMdLZ_1-T-kJ5rjerUisZHDNvfucocPjQ80uJfsA6oW76TX5uA3ZtH2RELZ1qQcmUn0IA5sfiG27yLpoejCeRz1yyCSG_y597bT9L9ru4i5901Z6ZgKTmPvxjpbX9QfJK4Vggil0RLH0kWZxGIW16WNgkentKX_-DvmrDxfaHz7LLGexlRH7ChycgNd3TlwKnljNJ7wQgwub193YbwmmlrLqvvk3ItgvmIKb2Kgmtsg_lPrqrE1xfRNPYtLywOtNx-KJMS8OF2uEmWgcaYSoxjXHtG-BSGqJpDT2MiZGU5vQJ7bnTn84eLmHyqJ0drnbfaT084Fjq5-BApsqJiARy1PA37HpeJUPHsY6cJeqK18_qEUwnJ1ILnwhsQgeyjqcRoQiOKwg8lsJ0SHiLQkYcbO9qHXucXEG=w1838-h1378-no"></CardImg>
                    <CardBody>
                        <CardTitle><b>Sarthak Jain</b></CardTitle>
                        <CardSubtitle className="mb-2 text-muted">sarthak.jain@sjsu.edu</CardSubtitle>
                        <CardText>
                            I am a First Year Graduate Student pursuing my MS in Software Engineering.
                            <hr/> 
                            <b>Interests:</b> Cloud Technologies, Full Stack Web Development
                        </CardText>
                        <CardLink href="https://github.com/sarthakjain27">Github</CardLink>
                        <CardLink href="https://www.linkedin.com/in/sarthakssj">LinkedIn</CardLink>
                    </CardBody>
                    </Card>
                    <Card>
                    <CardImg variant="top" src="https://avatars3.githubusercontent.com/u/24610685?s=400&v=4"></CardImg>
                    <CardBody>
                        <CardTitle><b>Nachiket Trivedi</b></CardTitle>
                        <CardSubtitle className="mb-2 text-muted">nachiket.trivedi@sjsu.edu</CardSubtitle>
                        <CardText>
                            I am a First Year Graduate Student pursuing my MS in Software Engineering.
                            <hr/> 
                            <b>Interests:</b> Cloud Technologies, Full Stack Web Development
                        </CardText>
                        <CardLink href="https://github.com/nachiket-trivedi">Github</CardLink>
                        <CardLink href="https://www.linkedin.com/in/nachiket-trivedi-68aab4135">LinkedIn</CardLink>
                    </CardBody>
                    </Card>
                    <Card>
                    <CardImg variant="top" src="https://avatars0.githubusercontent.com/u/19791871?s=400&v=4"></CardImg>
                    <CardBody>
                        <CardTitle><b>Amit Garg</b></CardTitle>
                        <CardSubtitle className="mb-2 text-muted">amit.garg@sjsu.edu</CardSubtitle>
                        <CardText>
                            I am a First Year Graduate Student pursuing my MS in Software Engineering.
                            <hr/> 
                            <b>Interests:</b> Cloud Technologies, Machine Learning
                        </CardText>
                        <CardLink href="https://github.com/Amit80007">Github</CardLink>
                        <CardLink href="https://www.linkedin.com/in/amit-garg-b8577812a/">LinkedIn</CardLink>
                    </CardBody>
                    </Card>
                    <Card>
                    <CardImg variant="top" src="https://avatars0.githubusercontent.com/u/55038360?s=400&v=4"></CardImg>
                    <CardBody>
                        <CardTitle><b>Alaukika Diwanji</b></CardTitle>
                        <CardSubtitle className="mb-2 text-muted">alaukika.diwanji@sjsu.edu</CardSubtitle>
                        <CardText>
                            I am a First Year Graduate Student pursuing my MS in Software Engineering.
                            <hr/> 
                            <b>Interests:</b> Cloud Technologies, Full Stack Web Development
                        </CardText>
                        <CardLink href="https://github.com/alaukikad">Github</CardLink>
                        <CardLink href="https://www.linkedin.com/in/alaukika-diwanji/">LinkedIn</CardLink>
                    </CardBody>
                    </Card>
                </div>

            </div>
        )
    }
}

export default TeamMembers