import HomeContainer from '../bundles/Home/HomeContainer';
import LoginContainer from '../bundles/Login/LoginContainer';
import MyProfileContainer from '../bundles/MyProfile/MyProfileContainer';
import MyFilesContainer from '../bundles/MyFiles/MyFilesContainer';
import OptimizeImagesContainer from '../bundles/OptimizeImages/OptimizeImagesContainer';




const routes = [
    {
        title: 'Home',
        path: '/home',
        icon: 'home',
        location: 'unauthorized',
        containerName: 'home',
        component: HomeContainer,
    },
    {
        title: 'My Profile',
        path: '/my-profile',
        icon: 'account_circle',
        location: 'authorized',
        containerName: 'myProfile',
        component: MyProfileContainer,
    },
    {
        title: 'My Files',
        path: '/my-files',
        icon: 'image',
        location: 'authorized',
        containerName: 'myFiles',
        component: MyFilesContainer,
    },
    {
        title: 'Optimize Media',
        path: '/optimize-media',
        icon: 'broken_image',
        location: 'authorized',
        containerName: 'optimizeMedia',
        component: OptimizeImagesContainer,
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: 'time_to_leave',
        location: 'authorized',
        containerName: 'logOut',
        component: HomeContainer,
    },
    {
        title: 'Login/Register',
        path: '/login',
        icon: 'time_to_leave',
        location: 'unauthorized',
        containerName: 'logIn',
        component: LoginContainer,
    }
]

export default routes;