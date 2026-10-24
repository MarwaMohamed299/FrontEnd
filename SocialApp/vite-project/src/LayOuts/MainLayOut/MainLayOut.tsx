import  { Outlet } from 'react-router-dom'
import NavBar from '../../components/LayOut/NavBar/NavBar'


export default function MainLayOut() {
  return (
    <><NavBar /><Outlet /></>
    
  )
}
