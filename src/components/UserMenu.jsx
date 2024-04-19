// React
import { useContext, useState } from 'react';
// Backend
import { signOutEndpoint } from '../services/apiService';
// Context
import { AuthContext } from '../contexts/authContext';
// react-router-dom
import { useNavigate } from 'react-router-dom';
// Material-ui
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, onSignOut } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
    navigate('/login');
  }
  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar className="items-center" sx={{ width: 34, height: 34 }}>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="flex flex-col justify-center items-center px-3">
          <Avatar sx={{ width: 25, height: 25, marginTop: '10px', marginBottom: '5px' }}>
            <Icon>person</Icon>
          </Avatar>
          {/* Vem via context */}
          {/* <div>{user.username}</div> */}
          <small>{user.username}</small>
        </div>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
