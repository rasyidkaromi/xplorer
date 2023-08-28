import { useCallback, useEffect, useState, useRef, CSSProperties, useMemo, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiGitRepositoryFill, RiFileCodeLine, RiSendPlane2Fill, RiStarFill, RiShareFill } from "react-icons/ri";
import { FaCodeFork } from "react-icons/fa6";
import ContentLoader from 'react-content-loader'

import { useAnimate, stagger, motion, useCycle } from "framer-motion";

import { useUser } from '../../../hooks/userContext';
import { UserListStyle } from './styles'
import { ISingleRepo } from '../../../interface'

const RepoListLoader = () => (
    <ContentLoader
        height={180}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="10 10 440 60">
        <rect x="0" y="17" rx="5" ry="5" width="250" height="15" />
        <rect x="300" y="17" rx="5" ry="5" width="140" height="15" />
        <rect x="0" y="50" rx="3" ry="3" width="400" height="10" />
    </ContentLoader>
)

const UserListLoader = () => (
    <ContentLoader
        height={140}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 380 70">
        <rect x="0" y="0" rx="100" ry="100" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
)

export function UserList() {
    let navigate = useNavigate();
    const { listUser, setListUser, getDetailRepo, getDetailRepoMultiple, onLoadingListUser, onLoadingDetailRepo } = useUser();
    const [localUserListHover, setLocalUserListHover] = useState<string>('')
    const [localUserRepoHover, setLocalUserRepoHover] = useState<string>('')

    // useEffect(() => {
    //     console.log('listUser', listUser)
    // },[listUser])

    const detaiListUserRepo = (isAccordion: boolean, repoData: ISingleRepo[], totalRepo: number): any => {
        if (isAccordion && repoData.length > 0) {
            return repoData.map(repo => {
                return (
                    <motion.div
                        key={repo.id}
                        onClick={() => window.open(repo.html_url, "_blank", "noreferrer")}
                        onMouseOver={() => setLocalUserRepoHover(repo.node_id)}
                        onMouseLeave={() => setLocalUserRepoHover('')}
                        style={{
                            backgroundColor: localUserRepoHover == repo.node_id ? '#3a1a4f' : "#190824",
                            ...UserListStyle.containerUserRepo
                        }}>

                        <div style={UserListStyle.divUserRepo}>
                            <p style={UserListStyle.p_reponame}> {repo.name} </p>
                            <p style={UserListStyle.p_star}> {repo.stargazers_count} </p>
                            <FaCodeFork style={UserListStyle.iconfork} />
                            <p style={UserListStyle.p_forkcount}>  {repo.forks_count}  </p>
                            <RiStarFill style={UserListStyle.iconstar} />
                        </div>

                        <p style={UserListStyle.p_description}> {repo.description} </p>
                    </motion.div>
                )
            })
        }
        if (isAccordion) {
            const emptyArray = Array.apply(null, Array(totalRepo))
            return emptyArray.map((repo, i) => {
                return (
                    <motion.div
                        key={i}
                        animate={{
                            x: [-30, 0],
                            transition: {
                                x: {
                                    duration: 0.2,
                                    ease: 'easeOut'
                                },
                            }
                        }}
                        style={UserListStyle.repoContentLoaderContainer}>
                        <RepoListLoader />
                    </motion.div>
                )
            })
        }
    }

    const getViewUserList = useMemo(() => {
        if (listUser.length > 0) {
            return listUser.map((user, i) => {
                return (
                    <div
                        key={user.id}
                        onMouseOver={() => setLocalUserListHover(user.node_id)}
                        onMouseLeave={() => setLocalUserListHover('')}
                        style={UserListStyle.headUserList}>
                        <div
                            key={user.node_id}
                            onClick={() => {
                                if (user.public_repos > 0 && user.public_repos <= 100) {
                                    let newListUser = listUser.map((lUser, i) => {
                                        lUser.dataRepo = []
                                        lUser.showAccordion = false
                                        if (lUser.id === user.id) lUser.showAccordion = true
                                        return lUser
                                    })
                                    setListUser(newListUser)
                                    getDetailRepo(user.login)
                                }
                                if (user.public_repos > 100) {
                                    let newListUser = listUser.map((lUser, i) => {
                                        lUser.dataRepo = []
                                        lUser.showAccordion = false
                                        if (lUser.id === user.id) lUser.showAccordion = true
                                        return lUser
                                    })
                                    setListUser(newListUser)
                                    getDetailRepoMultiple(user.login, user.public_repos)
                                }
                            }}
                            style={{
                                backgroundColor: localUserListHover == user.node_id ? '#f7edff' : "#f1f3f5db",
                                boxShadow: user.showAccordion ? 'rgb(244, 170, 185) 0px 1px 18px 10px' : '1px 2px 9px #F4AAB9',
                                ...UserListStyle.containerUserList
                            }}>
                            <img
                                style={UserListStyle.imageUserList}
                                src={user.avatar_url}>
                            </img>

                            <div style={UserListStyle.separatorUserList}></div>

                            <div style={UserListStyle.textContainerUserList}>
                                <p style={UserListStyle.p_username}> {user.name}</p>
                                <p style={UserListStyle.p_userlogin}> {user.login} </p>

                                <div style={UserListStyle.div_repo_icon}>
                                    <RiGitRepositoryFill style={UserListStyle.iconrepo} />
                                    <p style={UserListStyle.p_repo}>  {user.public_repos} </p>
                                    <RiFileCodeLine style={UserListStyle.icongists} />
                                    <p style={UserListStyle.p_gists}> {user.public_gists}</p>
                                </div>

                                <div style={UserListStyle.followContainerUserList}>
                                    <p style={UserListStyle.p_follow}> {user.followers} followers - {user.following} following</p>
                                    <motion.div
                                        style={UserListStyle.arrowRepoContainer}
                                        animate={{
                                            rotate: user.showAccordion ? 90 : 0
                                        }}>
                                        <RiSendPlane2Fill style={UserListStyle.iconArrow} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        {detaiListUserRepo(user.showAccordion, user.dataRepo, user.public_repos)}
                    </div>
                )
            })
        }


        if (onLoadingListUser && listUser.length === 0) {
            const emptyArray = Array.apply(null, Array(5))
            return emptyArray.map((eArr, i) => {
                return (
                    <motion.div
                        key={i}
                        style={UserListStyle.userContentLoaderContainer}>
                        <div
                            key={i}
                            style={UserListStyle.divContentLoader}>
                            <UserListLoader />
                        </div>
                    </motion.div>
                )
            })
        }
    }, [listUser, localUserListHover, localUserRepoHover, onLoadingListUser])

    return getViewUserList
}

