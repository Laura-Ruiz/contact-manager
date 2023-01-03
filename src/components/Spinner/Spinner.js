import React, { Fragment } from 'react'
import icon from "../../assets/img/loading-gif.gif"
export default function Spinner() {
  return (
    <Fragment>
        <img src={icon} alt="spinner" className='d-block m-auto' style={{width: "50px"}}/>
    </Fragment>
  )
}
