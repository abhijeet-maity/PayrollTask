const PublicRoute = ({component: Component}) => {
    return (
        <div>{Component}</div>
    )
}

export default PublicRoute;


// import React from "react";
// import { Outlet } from "react-router-dom";

// const PublicRoute = ({ component }) => {
//   return React.cloneElement(component, {}, <Outlet />);
// };

// export default PublicRoute;
