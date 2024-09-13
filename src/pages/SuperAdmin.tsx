import React from "react"
import { Sidebar } from "../components/admin/Sidebar/Sidebar";
import { Dashboard } from "../components/admin/Content/Dashboard";

export const SuperAdmin: React.FC = (): React.ReactNode => {

    return (
        <>
        <Sidebar />
        <Dashboard />
        </>
    );
}