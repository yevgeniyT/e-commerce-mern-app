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

const Index = () => {
    return (
        <div className='main-app'>
            <BrowserRouter>
                <header>
                    <Navbar />
                </header>
                <main>
                    <Routes>
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
                            path='customer/account'
                            element={<CustomerAccount />}
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
                        <Route
                            path='/customer/account/edit'
                            element={<EditAccountPage />}
                        />
                        <Route path='/products' element={<ProductsPage />} />

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
