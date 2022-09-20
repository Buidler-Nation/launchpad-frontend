import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {IReduxState} from "../store/slices/state.interface";
import {IProjectDetailsSlice} from "../store/slices/project_slice";

export enum ProjectStatus {
    ENDED, ONGOING, UPCOMING
}

export interface IProjectList {
    [key: string]: any;
}

export function useProject() {
    const [ongoing, setOngoing] = useState<IProjectList>({});
    const [upcoming, setUpcoming] = useState<IProjectList>({});
    const [ended, setEnded] = useState<IProjectList>({});

    const projectDetails = useSelector<IReduxState, IProjectDetailsSlice>((state) => {
        return state.projects;
    });

    useEffect(() => {
        //Seperation Logic
        let ongoing = <IProjectList>{};
        let upcoming = <IProjectList>{};
        let ended = <IProjectList>{};

        Object.values(projectDetails).map(project => {
            if(project.loading){
                return;
            }

            if (project.projectTime[0] - Math.round((new Date()).getTime() / 1000) < 0 &&
                project.projectTime[1] - Math.round((new Date()).getTime() / 1000) > 0 && project.enabled) {
                ongoing[project.address] = project;
            } else if (project.projectTime[0] - Math.round((new Date()).getTime() / 1000) > 0 && project.enabled) {
                upcoming[project.address] = project;
            } else if (project.projectTime[1] - Math.round((new Date()).getTime() / 1000) < 0 && project.enabled) {
                ended[project.address] = project;
            } else {
                console.log("error");
            }
        });

        //Sorting logic

        setOngoing(ongoing);
        setUpcoming(upcoming);
        setEnded(ended);
    }, [projectDetails]);

    return {ongoing, upcoming, ended};
}

export default useProject;
