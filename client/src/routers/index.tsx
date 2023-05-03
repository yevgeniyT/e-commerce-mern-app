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

                        <Route path='*' element={<Error />} />
                    </Routes>
                </main>
                <footer>
                    <StickyFooter />
                </footer>
            </BrowserRouter>
        </div>
    );
};

export default Index;
