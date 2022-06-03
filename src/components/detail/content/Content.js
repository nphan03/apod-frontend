import React, { useContext } from 'react'
import { ImageContext } from '../../App'

const Content = () => {
  const { currentImg } = useContext(ImageContext)
  
  return <div className="content">
    <h2>{currentImg.title}</h2>
    {(currentImg.media_type === "video") ? <iframe width="420" height="315" src={currentImg.url} title='myFrame'></iframe>   
        : <img src={currentImg.url} alt={currentImg.title}/>
    }
    <p><b>Copyright:</b> {currentImg.copyright}</p>
    <p>{currentImg.explanation}</p>
  </div>
}

export default Content