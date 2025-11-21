'use client';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

 
  const tabSliders = [
    { src: "https://res.cloudinary.com/dyv58oaan/video/upload/v1748001876/istockphoto-857947444-640_adpp_is_vkku4u.mp4" },
    { src: "https://res.cloudinary.com/dyv58oaan/video/upload/v1748001941/istockphoto-1404666834-640_adpp_is_ha2ckm.mp4" }
 
  ];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      {tabSliders.map((tab, i) => (
        <Carousel.Item key={i}>
          <video
            src={tab.src}
            controls={false}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
