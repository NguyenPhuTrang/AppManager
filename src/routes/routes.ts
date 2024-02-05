import config from '../config';
import ProductPage from './../pages/Product';
import UserPage from '../pages/User';
import LoginPage from '../pages/Login';
import NotFoundPage from '../features/errors/pages/NotFoundPage';
import useAuthMiddleware from './authMiddleware';

const publicRoutes = [
    { path: config.routes.productManager, component: ProductPage },
    { path: config.routes.usertManager, component: UserPage },
    { path: config.routes.loginManager, component: LoginPage },
    { path: config.routes.notFoundPage, component: NotFoundPage },
];

export { publicRoutes };
