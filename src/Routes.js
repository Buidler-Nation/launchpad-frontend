import React from "react";
import Layout from "./views/layout";
import NotFound from "./views/404";

const Dashboard = React.lazy(() => import("./views/dashboard"));
const ProjectDetails = React.lazy(() => import("./views/project-details"));
const AllProjects = React.lazy(() => import("./views/all-projects"));

let routes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: (
                    <React.Suspense fallback={<>...</>}>
                        <Dashboard/>
                    </React.Suspense>
                ),
            },
            {
                path: "/project-details/:id",
                element: (
                    <React.Suspense fallback={<>...</>}>
                        <ProjectDetails/>
                    </React.Suspense>
                ),
            },
            {
                path: "/projects",
                element: (
                    <React.Suspense fallback={<>...</>}>
                        <AllProjects/>
                    </React.Suspense>
                ),
            },
            {path: "*", element: <NotFound/>},
        ],
    },
];
export default routes;
