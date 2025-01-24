import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box">reviews (122) </div>
        </div>
        <div className="descriptionbox-description">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam iusto minus delectus quo officiis illo, porro aspernatur perferendis. Aut, id.
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nam velit explicabo quasi pariatur reprehenderit expedita excepturi. Nam, quidem deleniti!

            </p>
        </div>
    </div>
  )
}

export default DescriptionBox