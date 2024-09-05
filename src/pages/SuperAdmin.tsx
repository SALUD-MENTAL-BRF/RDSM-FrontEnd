import React from "react"
import { Sidebar } from "../components/admin/Sidebar/Sidebar";
import { Dashboard } from "../components/admin/Content/Dashboard";
// import '../assets/style/admin/Content/Dashboard.css';
import '../assets/style/admin/index.css';
import '../assets/style/admin/Sidebar.css'
export const SuperAdmin: React.FC = (): React.ReactNode => {

    return (
        <>
        <Sidebar />
        <Dashboard />
        </>
    );
}