import  { Outlet } from 'react-router-dom'
import NavBar from '../../components/LayOut/NavBar/NavBar'
import SideBar from '../../components/LayOut/SideBar/SideBar'


export default function MainLayOut() {
  return (
    <><NavBar /><SideBar /><Outlet /></>
    
  )
}
