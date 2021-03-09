import React, {useState} from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useHistory, withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// import {useStyles} from '../../navProperties/navProperties';
import * as NAVIMPORTS from '../../materialImportHelper/materialImports';
import WorkerApplication from './WorkerApplication'

import {auth} from '../../utils/firestore';


import clsx from 'clsx';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  accountToolbar:{
    marginLeft:"auto",
    marginRight: theme.spacing(2)
  }
}));

function WorkerSideNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();  
  const isMenuOpen = Boolean(anchorEl);

  const requestsMenuList =[
    {
        text: "Requests",
        icon: <NAVIMPORTS.LibraryBooksIcon/>,
        onClick:()=>history.push(ROUTES.CALENDAR)
    },
    {
        text: "Create New",
        icon: <NAVIMPORTS.PlaylistAddIcon/>  ,
        onClick:()=>history.push(ROUTES.CREATE_USER)

    },
    {
        text: "Notifications",
        icon: <NAVIMPORTS.NotificationsActiveIcon/>  ,
        onClick:()=>history.push(ROUTES.WORKER_CONTAINER)

    }

  ];

  const timeTrackingMenuList =[
    {
        text: "Time Tracking",
        icon: <NAVIMPORTS.HistoryIcon/>,
        onClick:()=>history.push(ROUTES.CALENDAR)
    },
    {
        text: "Time line",
        icon: <NAVIMPORTS.TimelineIcon/>  ,
        onClick:()=>history.push(ROUTES.CREATE_USER)

    },
    {
        text: "Upcoming",
        icon: <NAVIMPORTS.UpdateIcon/>  ,
        onClick:()=>history.push(ROUTES.WORKER_CONTAINER)

    }

  ];

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};

const handleUserMenu=(event)=>{
  setAnchorEl(event.currentTarget);

}

const handleAccountMenuClose = () => {
  setAnchorEl(null);
};
 const handleAccount=()=>{
   history.push(ROUTES.PROFILE_PAGE)
   
 }
 async function handleLogOut() {

  try {
      await auth.signOut();
      history.push(ROUTES.SIGN_IN);
  } catch { console.log('Failed to logout'); }
}


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <NAVIMPORTS.CssBaseline />
      <NAVIMPORTS.AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <NAVIMPORTS.Toolbar>
          <NAVIMPORTS.IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <NAVIMPORTS.MenuIcon />
          </NAVIMPORTS.IconButton>
          <NAVIMPORTS.Typography variant="h6" noWrap>
            Mini variant drawer
          </NAVIMPORTS.Typography>
          <NAVIMPORTS.IconButton
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 onClick={handleUserMenu}
                 color="inherit"
                className={clsx(classes.accountToolbar)}>
                <NAVIMPORTS.AccountCircleIcon />
              </NAVIMPORTS.IconButton> 
              <NAVIMPORTS.Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleAccountMenuClose}
              >
                <NAVIMPORTS.MenuItem onClick={handleAccount}>My Account</NAVIMPORTS.MenuItem>
                <NAVIMPORTS.MenuItem onClick={handleLogOut}>Log Out</NAVIMPORTS.MenuItem>
              </NAVIMPORTS.Menu>
         </NAVIMPORTS.Toolbar>
      </NAVIMPORTS.AppBar>
      <NAVIMPORTS.Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <NAVIMPORTS.IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <NAVIMPORTS.ChevronRightIcon /> : <NAVIMPORTS.ChevronLeftIcon />}
          </NAVIMPORTS.IconButton>
        </div>
        <NAVIMPORTS.Divider />
        <NAVIMPORTS.List>
                <NAVIMPORTS.ListItem button key='Calendar' onClick={()=>history.push(ROUTES.CALENDAR)}>
                    { <NAVIMPORTS.EventNoteIcon/> && <NAVIMPORTS.ListItemIcon> <NAVIMPORTS.EventNoteIcon/></NAVIMPORTS.ListItemIcon>}
                    <NAVIMPORTS.ListItemText primary='Calendar'/>
                </NAVIMPORTS.ListItem>
           
        </NAVIMPORTS.List>
      <NAVIMPORTS.Divider />
      <NAVIMPORTS.List>
            {timeTrackingMenuList.map((item, index)=>{
                const {text, icon, onClick}=item;
                return(
                <NAVIMPORTS.ListItem button key={text} onClick={onClick}>
                    {icon && <NAVIMPORTS.ListItemIcon>{icon}</NAVIMPORTS.ListItemIcon>}
                    <NAVIMPORTS.ListItemText primary={text}/>
                </NAVIMPORTS.ListItem>);
            })}
        </NAVIMPORTS.List>
      <NAVIMPORTS.Divider />
      <NAVIMPORTS.List>
            {requestsMenuList.map((item, index)=>{
                const {text, icon, onClick}=item;
                return(
                <NAVIMPORTS.ListItem button key={text} onClick={onClick}>
                    {icon && <NAVIMPORTS.ListItemIcon>{icon}</NAVIMPORTS.ListItemIcon>}
                    <NAVIMPORTS.ListItemText primary={text}/>
                </NAVIMPORTS.ListItem>);
            })}
        </NAVIMPORTS.List>
      </NAVIMPORTS.Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      <WorkerApplication/>
      </main>
    </div>
  );
}


export default withRouter(WorkerSideNav);
