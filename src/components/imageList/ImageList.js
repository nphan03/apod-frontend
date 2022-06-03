import React from 'react'

const ImageList = (props) => {
  const {
    images, 
    chooseImg
  } = props

  return (
    <div className="imageList_container">
      {images.map((img,index)=>
        <div key={index} className='image_container' onClick={()=>chooseImg(img)}>
          <img src={img.url} alt='of the Date' className='imageList_image'/>
          <small className='imageList_date'>{img.date}</small>
        </div>
      )}
    </div>
  )
}

export default ImageList