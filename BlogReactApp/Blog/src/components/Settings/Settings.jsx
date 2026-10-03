import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Settings() {
  return (
    <div>
      <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="list-unstyled">
                    <li>
                        <Link to="web">Web Settings</Link>
                    </li>
                    <li>
                        <Link to="mobile">Mobile Settings</Link>
                    </li>
                </div>
            </div>    

            <div className="col-md-6">
                <Outlet/>
            </div>
        </div>
      </div>
    </div>
  )
}
