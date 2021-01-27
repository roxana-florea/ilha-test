import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import EventIcon from '@material-ui/icons/Event';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import logo from '../images/logo_White_NT.png';
import Analytics from '../analytics/Analytics.js';
import Plans from '../plans/Plans.js';
// import UserProfile from '../Dashboard/UserProfile/UserProfile';
// import photo from '../Images/userIconMale.jpg';
import './Dashboard.css';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'rgb(39, 25, 90)',
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
    marginRight: 36,
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
    backgroundColor:'rgb(233, 42, 138)',
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
    backgroundColor:'rgb(233, 42, 138)',
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
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(3),
    // justifyContent: 'center',
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    
  },

  button: {
      backgroundColor: 'rgb(233, 42, 138)',
      marginLeft: '90%',
      position: 'absolute',
      
  }
}));

function HomeIcon(props) {
    return (
      <MenuIcon/>
    );
  }

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <HomeIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          <div className='logo-container'>
          <img src={logo} alt='ilha logo'/>
           <p>ILHA</p>
          </div>
          </Typography>
          <Button variant="contained" className ={classes.button}>
          <VideoCallIcon/>
          </Button>
          
        </Toolbar>
       
      </AppBar>
      <Drawer
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        {/* { open ? <UserProfile/> : <img src={photo} id='logo-image'/> } */}
        
        <Divider/>
        <List>
            <ListItem button>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary={'My Profile'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={'Messages'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon><EventIcon /></ListItemIcon>
              <ListItemText primary={'Agenda'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
              <ListItemText primary={'Files'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItem>
          
        </List>
        <Divider />
       
      </Drawer>
      <main className={classes.content}>
        
        <Analytics/>
        <Plans/>
        
        

      </main>
    </div>
  );
}
