// Dependecies for routing import

import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Pages for routing import

// Components for routing import
import Navbar from "layouts/Navbar";
import HomePage from "pages/HomePage";
import Error from "components/common/Error";
import Footer from "layouts/Footter";
import LoginPage from "pages/customers/LoginPage";
import RegistrationPage from "pages/customers/RegistrationPage";
import AccountActivation from "components/customers/AccountActivation";
import CustomerAccount from "pages/customers/AccountPage";
import ForgotPasswordPage from "pages/customers/ForgotPasswordPage";
import ResetPasswordActivation from "components/customers/ResetPassowrdActivation";
import ResetPasswordPage from "pages/customers/ResetPasswordPage";
import EditAccountPage from "pages/customers/EditAccountPage";
import ProductsPage from "pages/products/ProductsPage";
import SerchAndCartBar from "layouts/SearchAndCartBar";
import ProductDetailsPage from "pages/products/ProductDetailsPage";
import LoggedInRoute from "./LoginRoute";
import AdminRoute from "./AdminRoute";

import AdminProductPage from "pages/adminDashbord/AdminProductPage";
import AdminCustomerPage from "pages/adminDashbord/AdminCustomerPage";
import AdminOrdersPage from "pages/adminDashbord/AdminOrdersPage";
import AdminProductCreatePage from "pages/adminDashbord/AdminProductCreatePage";
import AdminProductEditePage from "pages/adminDashbord/AdminProductEditPage";

const Index = () => {
    return (
        <div className='main-app'>
            <BrowserRouter>
                <header>
                    <div>
                        <Navbar />
                        <SerchAndCartBar />
                    </div>
                </header>

                <main>
                    <Routes>
                        {/* Common routers */}
                        <Route path='/' element={<HomePage />} />
                        <Route
                            path='/customer/account/create'
                            element={<RegistrationPage />}
                        />
                        <Route
                            path='/customer/account/login'
                            element={<LoginPage />}
                        />
                        <Route
                            path='/api/v1/customer/account/activate/:token'
                            element={<AccountActivation />}
                        />
                        <Route
                            path='/customer/account/forgotpassword'
                            element={<ForgotPasswordPage />}
                        />

                        <Route
                            // make sure to set full route!!!
                            path='/api/v1/customer/account/verify-password/:token'
                            element={<ResetPasswordActivation />}
                        />
                        <Route
                            path='/customer/account/resetpassword'
                            element={<ResetPasswordPage />}
                        />

                        <Route path='/products' element={<ProductsPage />} />

                        <Route
                            path='/products/:slug'
                            element={<ProductDetailsPage />}
                        />
                        <Route
                            path='customer/account'
                            element={<CustomerAccount />}
                        />
                        {/* Logged in customer protected routers */}
                        <Route element={<LoggedInRoute />}>
                            <Route
                                path='/customer/account/edit'
                                element={<EditAccountPage />}
                            />
                            <Route
                                path='customer/account/logout'
                                element={<LoginPage />}
                            />
                        </Route>
                        {/* Admin protected routers */}
                        <Route element={<AdminRoute />}>
                            <Route
                                path='/admin/account/orders'
                                element={<AdminOrdersPage />}
                            />
                            <Route
                                path='/admin/account/customers'
                                element={<AdminCustomerPage />}
                            />
                            <Route
                                path='admin/account/products/:slug/edit'
                                element={<AdminProductEditePage />}
                            />
                            <Route
                                path='/admin/account/products/create-new-product'
                                element={<AdminProductCreatePage />}
                            />
                            <Route
                                path='/admin/account/products'
                                element={<AdminProductPage />}
                            />
                        </Route>

                        <Route path='*' element={<Error />} />
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
            </BrowserRouter>
        </div>
    );
};

export default Index;
