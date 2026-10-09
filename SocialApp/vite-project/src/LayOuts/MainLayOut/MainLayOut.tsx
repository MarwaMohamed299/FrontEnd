import  { Outlet } from 'react-router-dom'
import NavBar from '../../components/LayOut/NavBar/NavBar'
import SideBar from '../../components/LayOut/SideBar/SideBar'
import Feed from '../../pages/Feed/Feed'


export default function MainLayOut() {
  return (
    <><NavBar /><SideBar /><Outlet /></>
    
  )
}
