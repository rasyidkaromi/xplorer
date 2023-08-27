import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { api, apiSearch, detailUser } from '../services/api';
import { LimitUser } from '../constant'
import { IGithubUser } from '../interface'

interface UserProviderProps {
    children: ReactNode
}

export interface UserData {
    id: number,
    name: string,
    login: string,
    avatar_url: string,
    public_repos: number,
    followers: number,
    following: number,
    bio: string,
}

interface ReposData {
    id: number,
    name: string,
    description: string,
    stargazers_count: number,
    forks_count: number,
    html_url: string
}

export interface FollowData {
    id: number,
    login: string,
    avatar_url: string
}

interface UserContext {
    listUser: IGithubUser[],
    clearListUser:  () => void;
    getListUser: (username: string) => Promise<IGithubUser[]>,
    onFocusInput: boolean,
    setOnFocusInput: Dispatch<SetStateAction<boolean>>,


    // user: UserData,
    // searchUser: (username: string | undefined) => Promise<number | void>,
    // logOut: () => void,
    // userRepos: () => void,
    // repos: ReposData[],
    // userFollowers: () => void,
    // followers: FollowData[],
    // userFollowing: () => void,
    // following: FollowData[],
    // acessUserFollow: (username: string, lastPageName: string) => void,
    // auxUser: string | undefined,
    // lastPage: string | undefined,
    // handleNewUser: () => void
}

const UserContext = createContext<UserContext>({} as UserContext);

export function UserProvider({ children }: UserProviderProps): JSX.Element {
    // const [user, setUser] = useState<UserData>({} as UserData);
    // const [repos, setRepos] = useState<ReposData[]>([{}] as ReposData[]);
    // const [followers, setFollowers] = useState<FollowData[]>([{}] as FollowData[]);
    // const [following, setFollowing] = useState<FollowData[]>([{}] as FollowData[]);
    // const [auxUser, setAuxUser] = useState<string | undefined>();
    // const [lastPage, setLastPage] = useState<string | undefined>();

    let navigate = useNavigate();

    const [listUser, setListUser] = useState<IGithubUser[]>([])

    const [onFocusInput, setOnFocusInput] = useState<boolean>(false)
 
    // async function searchUser(username: string | undefined): Promise<number | void> {
    //     try {
    //         return await api.get(`users/${username}`)
    //             .then(response => {
    //                 setUser(response.data);
    //                 return response.data.id;
    //             });
    //     } catch {
    //         toast.error('Username was not found!', { theme: "colored" });
    //         return 0;
    //     }
    // }

    async function getListUser(username: string): Promise<IGithubUser[]> {
        try {
            if (username) {
                let resData = await apiSearch(LimitUser, username).get('')
                if (resData.data.total_count > 0) {
                    let listUData = await Promise.all(resData.data.items.map(async(userdata: IGithubUser) => {
                        let detailUserData = await detailUser(userdata.login).get('')
                        userdata = detailUserData.data
                        return userdata
                    }))
                    setListUser(listUData)
                    return listUData
                } else {
                    return []
                }
            } else {
                return []
            }

        } catch (err) {
            console.log('err', err)
            return []
        }
    }

    function clearListUser() {
        setListUser([])
    }


    // function logOut() {
    //     setUser({} as UserData);
    // }

    // async function userRepos() {
    //     try {
    //         await api.get(`users/${user.login}/repos`)
    //             .then(response => setRepos(response.data))
    //             .then(() => {
    //                 navigate('./repos')
    //             });
    //     } catch {
    //         toast.error('Something went wrong :(', { theme: "colored" });
    //     }
    // }

    // async function userFollowers() {
    //     try {
    //         await api.get(`users/${user.login}/followers`)
    //             .then(response => setFollowers(response.data))
    //             .then(() => {
    //                 navigate('./followers')
    //             })
    //     } catch {
    //         toast.error('Something went wrong :(', { theme: "colored" });
    //     }
    // }

    // async function userFollowing() {
    //     try {
    //         await api.get(`users/${user.login}/following`)
    //             .then(response => setFollowing(response.data))
    //             .then(() => {
    //                 navigate('./following')
    //             })
    //     } catch {
    //         toast.error('Something went wrong :(', { theme: "colored" });
    //     }
    // }

    // async function acessUserFollow(username: string, lastPageName: string) {
    //     setAuxUser(username);
    //     setLastPage(lastPageName);
    //     navigate('./auxuser')

    // }

    // async function handleNewUser() {
    //     try {
    //         await api.get(`users/${auxUser}`)
    //             .then(response => setUser(response.data))
    //             .then(() => {
    //                 navigate('./user')

    //             });
    //     } catch {
    //         toast.error('Something went wrong!', { theme: "colored" });
    //     }
    // }

    return (
        <UserContext.Provider
            value={{
                    getListUser,
                    listUser,
                    clearListUser,
                    onFocusInput,
                    setOnFocusInput,

                    
                    // user,
                    // searchUser,
                    // logOut,
                    // userRepos,
                    // repos,
                    // userFollowers,
                    // followers,
                    // userFollowing,
                    // following,
                    // acessUserFollow,
                    // auxUser,
                    // lastPage,
                    // handleNewUser
                }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContext {
    const context = useContext(UserContext);
    return context;
}