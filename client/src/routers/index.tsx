// Dependecies for routing import

import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Pages for routing import

// Components for routing import
import Navbar from "layouts/Navbar";
import HomePage from "pages/HomePage";
import Error from "components/common/Error";
import Footer from "layouts/Footter";
import StickyFooter from "components/common/StickyFotter";
import LoginPage from "pages/customers/LoginPage";
import RegistrationPage from "pages/customers/RegistrationPage";

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
