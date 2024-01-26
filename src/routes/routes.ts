import config from '../config';

import ProductPage from './../pages/Product';
import UserPage from '../pages/User';
import LoginPage from '../pages/Login';

const publicRoutes = [
    { path: config.routes.productManager, component: ProductPage },
    { path: config.routes.usertManager, component: UserPage },
    { path: config.routes.loginManager, component: LoginPage },
];


export { publicRoutes };