import config from '../config';
import ProductPage from './../pages/Product';
import UserPage from '../pages/User';
import LoginPage from '../pages/Login';
import SettingPage from '../pages/Setting';
import NotFoundPage from '../features/errors/pages/NotFoundPage';
import CategoryPage from '../pages/Category';

const publicRoutes = [
    { path: config.routes.productManager, component: ProductPage },
    { path: config.routes.usertManager, component: UserPage },
    { path: config.routes.loginManager, component: LoginPage },
    { path: config.routes.settingManager, component: SettingPage },
    { path: config.routes.notFoundPage, component: NotFoundPage },
    { path: '/category-management', component: CategoryPage },
];

export { publicRoutes };
