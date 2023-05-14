import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import LoginPage from "pages/customers/LoginPage";

import { useAppSelector } from "redux/hooks";

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(
        useAppSelector((state) => state.customerR.isAdmin)
    );
    // Outlet: This is a component from react-router-dom v6. It's a placeholder component that renders the child route component. When this LoggedInRoute component is rendered by a parent Route component, the Outlet component will render the child Route component that matches the current location.
    return isAdmin ? <Outlet /> : <LoginPage />;
};

export default AdminRoute;
