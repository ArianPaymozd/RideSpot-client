import React, { useState } from "react";

const ImageSlider = ({ images }) => { // takes in images as props
    const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  
    const slideRight = () => {
      setIndex((index + 1) % images.length); // increases index by 1
    };
  
    const slideLeft = () => {
      const nextIndex = index - 1;
      if (nextIndex < 0) {
        setIndex(images.length - 1); // returns last index of images array if index is less than 0
      } else {
        setIndex(nextIndex);
      }
    };

    const title = () => {
      if (index === 0) {
        return (
          <header className="register-title" >
              <h1>What we do</h1>
          </header>
        )
      }
      if (index === 1) {
        return (
          <header className="register-title" >
              <h1>Share your favorite spots</h1>
          </header>
        )
      }
      if (index === 2) {
        return (
          <header className="register-title" >
              <h1>Discover new spots</h1>
          </header>
        )
      }
    }

    const caption = () => {
      if (index === 0) {
        return (
          <p className="caption" >RideSpot is a community of riders who post their favorite spots to try and hurt themselves. Because the fall isn't fun if no one's there to see it right?</p>
        )
      }
      if (index === 1) {
        return (
          <p className="caption" >Have somewhere you love to skate, bike, scooter, or rollerblade? Well dont keep it to yourself! Post it here and share it with the people. But make sure you add the security level and difficulty so we dont get arrested,  or you know... break everything.</p>
        )
      }
      if (index === 2) {
        return (
          <p className="caption" >We all know the best rail in the world is the one at your high school, but there still might be a better one out there right? With ride spot you can find that new rail and much more. Sort through our communities list of spots by sport, difficulty, and security level to discover your new favorite place to hurt yourself.</p>
        )
      }
    }
    
    return (
      images.length > 0 && (
        <div className="slider">
          {title()}
          <button className="left-button" onClick={slideLeft}>{"<"}</button>
          <img className="interface-img" src={images[index]} alt={index} />
          <button className="right-button" onClick={slideRight}>{">"}</button>
          {caption()}
        </div>
      )
    );
};
  
 export default ImageSlider;