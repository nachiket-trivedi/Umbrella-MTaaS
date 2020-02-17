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
  class home extends React.Component{
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
                <span style={{margin:"0 5% 0 5%",float:"right"}}>
                    <img style={{borderRadius:"20px"}} src={require('./umbrella.png')} />
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
  export default home;

