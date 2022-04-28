import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/index';
import TermsPage from './pages/terms';
import AboutPage from './pages/about';
import RestaurantPage from './pages/restaurant';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProfilePage from './pages/profile'
import BlogFeedPage from './pages/blog_feed';
import NotificationsPage from './pages/notifications';
import AddDataPage from './pages/add_data';
import CreateRestaurantPage from './pages/create_restaurant';
import EditRestaurantPage from './pages/edit_restaurant';
import BlogPage from './pages/blog';

import BadRequestPage from './pages/error/bad_request';
import ForbiddenPage from './pages/error/forbidden';
import UnauthorizedPage from './pages/error/unauthorized';
import NotFoundPage from './pages/error/not_found';
import InternalServerPage from './pages/error/internal_server';

import './App.css';

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/error">
					<Route path="400" element={<BadRequestPage/>}/>
					<Route path="401" element={<UnauthorizedPage/>}/>
					<Route path="403" element={<ForbiddenPage/>}/>
					<Route path="404" element={<NotFoundPage/>}/>
					<Route path="500" element={<InternalServerPage/>}/>
				</Route>
				<Route path="/">
					<Route index element={<IndexPage />} />
					<Route path="terms" element={<TermsPage />} />
					<Route path="about" element={<AboutPage />} />
				</Route>
				<Route path="/restaurants">
					<Route path="create" element={<CreateRestaurantPage/>} />
					<Route path=":restaurantID" element={<RestaurantPage/>} />
					<Route path=":restaurantID/edit" element={<EditRestaurantPage/>} />
					<Route path=":restaurantID/add" element={<AddDataPage/>} />
					<Route path=":restaurantID/blogs/:blogID" element={<BlogPage/>} />
				</Route>
				<Route path="/accounts">
					<Route index element={<ProfilePage/>} />
					<Route path="login" element={<LoginPage/>} />
					<Route path="feed" element={<BlogFeedPage/>} />
					<Route path="notifications" element={<NotificationsPage/>} />
					<Route path="register" element={<RegisterPage/>} />
				</Route>
				<Route path="*">
					<Route path="*" element={<NotFoundPage/>} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
