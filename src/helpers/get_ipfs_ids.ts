import axios from "axios";
import {IProjectInfo, IProjectSocials} from "../store/slices/project_slice";

export const loadIpfsIdPerProject = async (ipfsId: string)=> {
    const url = "https://ipfs.infura.io/ipfs/" + ipfsId;
    const { data } = await axios.get(url);

    const cache: { [key: string]: string } = {
        "bannerImageId": data["bannerImageId"],
        "logoImageId": data["logoImageId"],
        "projectDetailsId": data["projectDetailsId"],
    };
    return cache;
};

export const loadProjectInfo = async (ipfsId: string)=> {
    const url = "https://ipfs.infura.io/ipfs/" + ipfsId;
    const { data } = await axios.get(url);

    if (data === null) {
        return;
    }

    const socials: IProjectSocials = {
        website: data["Website"],
        telegram: data["Telegram"],
        twitter: data["Twitter"],
        discord: data["Discord"],
        github: data["Github"]
    }

    const projectInfo: IProjectInfo = {
        name: data["Project Name"],
        description: data["Description"],
        socials: socials
    }

    return projectInfo;
};

