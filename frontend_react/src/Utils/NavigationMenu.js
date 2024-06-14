import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const navigationMenu = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: '/home',
  },
  {
    title: 'Meal',
    icon: <RamenDiningIcon />,
    path: '/meal',
  },
  {
    title: 'Workout Plans',
    icon: <FitnessCenterIcon />,
    path: '/workout',
  },
  {
    title: 'Shared Posts',
    icon: <PostAddIcon />,
    path: '/myposts',
  },
  {
    title: 'Notifications',
    icon: <NotificationsIcon />,
    path: '/kas',
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
    path: '/messages',
  },
  // {
  //     title:"Lists" ,
  //     icon:<ListAltIcon/>,
  //     path:"/lists"
  // },
  // {
  //     title:"Communities" ,
  //     icon:<GroupIcon/>,
  //     path:"/communities"
  // },
  // {
  //     title: "Verified",
  //     icon:<VerifiedIcon/>,
  //     path:"/verified"
  // },
  {
    title: 'Profile',
    icon: <AccountCircleIcon />,
    path: '/profile',
  },
  // {
  //     title:"More" ,
  //     icon:<PendingIcon/>,
  //     path:"/more"
  // },
];
