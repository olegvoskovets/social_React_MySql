import React from 'react'
import fruit_lemon from './img/fruit_lemon.png'
import  './fruit.scss'

const Fruit = () => {
 // console.log('FFFFFFruit')
  return (
    <div>
      <img alt='dd' className='fruit' src={fruit_lemon}/>
    </div>
  )
}

export default Fruit