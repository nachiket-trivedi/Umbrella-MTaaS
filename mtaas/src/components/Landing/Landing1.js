import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Jumbotron,
  Button,
  Container
} from 'reactstrap';
import "./Landing.css"
import React, { useState } from 'react';
import {Redirect} from 'react-router';
import FooterPage from './Footer'

const items = [
  {
    src: 'https://westfaironline.com/wp-content/uploads/2019/08/Cloud.jpg',
  },
  {
    src: 'https://www.thebalancesmb.com/thmb/DqH3_F-SiYg7q-4MOgRol79IF1Q=/3862x2172/smart/filters:no_upscale()/cloud-computing-502462262-5ac1130e119fa800371ba0a8.jpg',
  },
  {
    src: 'https://epicconnections.com/wp-content/uploads/2017/06/Cloud-Technology.jpg',
  }
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className='carouselItem'
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel 
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}
let redirectVar=null;
class home1 extends React.Component{
    clickHandler=()=>{
      if(!localStorage.getItem('cookie'))
        redirectVar=<Redirect to="/login"/>
      else if(localStorage.getItem('cookie')=='Tester')
        redirectVar=<Redirect to="/testerHome"/>
      else if(localStorage.getItem('cookie')=='Manager')
        redirectVar=<Redirect to="/home"/>
      this.setState({})
    }
    render()
    {
        return(
          <div className="outerDiv">
            {redirectVar}
              <div className="jumbotronDiv">
              <Jumbotron fluid>
              <Container fluid>
              <span style={{}}>
                  <img style={{float:"right",display:"flex-wrap",borderRadius:"20px", width:"100px", height:"100px",margin:"1%"}} src="https://scontent-sjc3-1.xx.fbcdn.net/v/t31.0-8/17917783_1310030209088523_3126499997116989467_o.jpg?_nc_cat=111&_nc_ohc=9RSrpQd2GdEAQlMljuakUed-nejuPPeww3NZVWrMQyGJv7L5oFEMtpE4A&_nc_ht=scontent-sjc3-1.xx&oh=e1e9c24caefd1c11f83adc726f10bab4&oe=5E696F36" />
                  <img style={{float:"right",display:"flex-wrap",borderRadius:"20px",width:"100px", height:"100px",margin:"1%"}} src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/55759854_2148516268570122_7748334646542204928_n.jpg?_nc_cat=101&_nc_ohc=-rHuNJeH-xkAQn9idRPoql_3jzR_P45Pp9KUW-2nSkvIy7hsfB0-Vue-Q&_nc_ht=scontent-sjc3-1.xx&oh=1152ced03e6d8e8b1e2083463e8514fa&oe=5E7601DD" />
                  <img style={{float:"right",display:"flex-wrap",borderRadius:"20px",width:"100px", height:"100px",margin:"1%"}} src="https://scontent-sjc3-1.xx.fbcdn.net/v/t31.0-8/17192586_10202716630274329_3085713666028801983_o.jpg?_nc_cat=105&_nc_ohc=SwaX4by6DywAQny2rm11YvLHJ3xU_dQzVqm2j4RN0uMgonzwzoYG-1U3w&_nc_ht=scontent-sjc3-1.xx&oh=6a650d1bdbba7ada161fadb26fde4c0e&oe=5E74DE5C" />
                  <img style={{float:"right",display:"flex-wrap",borderRadius:"20px",width:"100px", height:"100px",margin:"1%"}} src="https://qph.fs.quoracdn.net/main-raw-54699012-holyhrgwrekrifroyavyxtncdsaatbsu.jpeg" />
                  </span>
                <h1 className="display-3">Umbrella MTaaS</h1>
                <p className="lead">We believe in quality service</p>
                <p></p>
              <p className="lead">
                <Button color="danger" onClick={this.clickHandler}>Start! </Button>
              </p>
              </Container>
              </Jumbotron>
               </div>
              <div className="carouselDiv">
                  <Example/>
              </div>
              <div>
              <FooterPage/>
              </div>
            </div>
        )
    }
}
export default home1;

