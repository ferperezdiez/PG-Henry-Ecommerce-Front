import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'
import {DBcartToLocalStorage, saveUser} from '../../Redux/Actions'
import { useDispatch, useSelector } from "react-redux";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import './profilePic.css'


export default function LogoutButton (){
    const { logout, isAuthenticated } = useAuth0()
    const history = useHistory()
    const dispatch = useDispatch()
    const orderId = useSelector(state => state.orderId)
    const user=useSelector(state=>state.user)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const cookies = new Cookies()
    // const userPrueba = cookies.get('user')
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    

    const clearsession = () => {
        dispatch(saveUser({}))
        cookies.remove('id')
        cookies.remove('admin')
        if(isAuthenticated) logout()
        dispatch(DBcartToLocalStorage(orderId))
        history.push('/')
    } 
   
    return (
        <div>
            {/* {
                isAuthenticated && (
                    <button onClick={() => logout()}>
                        Logout Auth
                    </button>
                )
            } */}
            
            {  
                isAuthenticated  && (
                    <div>
                        <img  className='profile-picture' src={user.picture} onClick={handleClick} aria-controls="simple-menu" alt='perfil_img' />                       
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <NavLink  className='Nav-menu' to='/user_settings'><MenuItem onClick={handleClose}>Cuenta</MenuItem></NavLink>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={()=>clearsession()}>Cerrar sesión</MenuItem>
                    </Menu>
                    </div>
                )
            } 
        </div>       
    )
}