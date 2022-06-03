import React, { useState } from "react";
import axios from "axios";
import Header from "./header/Header";
import ImageList from "./imageList/ImageList";
import SearchForms from "./searchForm/SearchForms.js";
import Details from "./detail/Details.js";
import Footer from "./footer/Footer.js";
const URL = process.env.REACT_APP_URL

export const ImageContext = React.createContext();

const App = () => {
  const [images, setImages] = useState([])
  const [currentImg, setCurrentImg] = useState(() => {
    axios
    .get(`${URL}/images`)
    .then(serverResponseObject => {
      const newImages = [ ...images, serverResponseObject.data]
      setCurrentImg(serverResponseObject.data)
      setImages(newImages)
    })
    .catch(err => {
        console.log(err)
    })
  })
  
  const chooseImage = img => {
    setCurrentImg(img)
  }

  if(images && currentImg) {
    const ImageContextValue = {
      images,
      setImages,
      currentImg,
      setCurrentImg
    }

    return <ImageContext.Provider value={ImageContextValue}>
      <Header />
      <div className="img_nav clearfix">
        <SearchForms />
        <ImageList images={images} chooseImg={chooseImage}/>
      </div> 
      <Details />
      <Footer />
    </ImageContext.Provider>
  }
  return <div>Loading</div>
}

export default App;