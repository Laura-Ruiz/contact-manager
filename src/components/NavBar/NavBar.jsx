import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <Fragment>
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
        <div className='container'>
          <Link to={'/'} className='navbar-brand'>
            <i className='fa fa-mobile text-warning'/>Contact <span className='text-warning'>Manager</span></Link>
        </div>
      </nav>
    </Fragment>
  )
}

export default NavBar