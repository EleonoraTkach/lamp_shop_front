import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({children,}: any) {
    const token = useSelector((state: any) => state.auth.token);
    const isAuth = !!token;

    if (!isAuth) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}