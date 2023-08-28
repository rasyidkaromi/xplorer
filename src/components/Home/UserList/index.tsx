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
        viewBox="0 0 380 70"
    >
        <rect x="0" y="0" rx="100" ry="100" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
)

export function UserList() {
    let navigate = useNavigate();
    const { listUser, setListUser, getDetailRepo, onLoadingListUser, onLoadingDetailRepo } = useUser();
    const [localUserListHover, setLocalUserListHover] = useState<string>('')
    const [localUserRepoHover, setLocalUserRepoHover] = useState<string>('')

    const singleUserRepo = (userName: string) => {
        getDetailRepo(userName)
    }

    const detaiListUserRepo = (isAccordion: boolean, repoData: ISingleRepo[], totalRepo: number): any => {
        if (isAccordion && repoData.length > 0) {
            return repoData.map(repo => {
                return (
                    <motion.div
                        key={repo.id}
                        onMouseOver={() => {
                            setLocalUserRepoHover(repo.node_id)
                        }}
                        onMouseLeave={() => setLocalUserRepoHover('')}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: localUserRepoHover == repo.node_id ? '#3a1a4f' : "#190824",
                            boxShadow: 'rgb(121 79 147) 0px 1px 13px 0px',
                            padding: 5,
                            borderRadius: 5,
                            border: '1px solid #0e3063',
                            marginBottom: 10,
                            marginLeft: '5%',
                            height: 'auto',
                        }}>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 25,
                            }}>
                            <p style={{
                                color: '#e5dbdb',
                                fontSize: 13,
                                fontWeight: 600,
                                margin: 1,
                            }}>
                                {repo.name}
                            </p>


                            <p style={{
                                color: '#e5dbdb',
                                fontSize: 13,
                                fontWeight: 400,
                                marginLeft: 'auto',
                            }}>
                                {repo.stargazers_count}
                            </p>
                            <FaCodeFork
                                style={{
                                    width: '10%',
                                    color: 'white',
                                    fontSize: 12,
                                }} />
                            <p style={{
                                color: '#e5dbdb',
                                fontSize: 13,
                                fontWeight: 400,
                            }}>
                                {repo.forks_count}
                            </p>
                            <RiStarFill
                                style={{
                                    width: '10%',
                                    color: 'white',
                                    fontSize: 13,
                                }} />
                        </div>

                        <div>
                            <p style={{
                                color: '#e5dbdb',
                                paddingTop: 2,
                                fontSize: 10,
                                fontWeight: 300,
                                margin: 3,
                            }}>
                                {repo.description}
                            </p>
                        </div>
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
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: "#190824",
                            boxShadow: 'rgb(121 79 147) 0px 1px 13px 0px',
                            padding: 5,
                            borderRadius: 5,
                            border: '1px solid #0e3063',
                            marginBottom: 10,
                            marginLeft: '5%',
                            height: 40,
                        }}>
                        <RepoListLoader />
                    </motion.div>
                )
            })
        }
    }

    const getViewUserList = useMemo(() => {
        console.log('listUser', listUser)
        console.log('onLoadingListUser', onLoadingListUser)

        if (listUser.length > 0) {
            return listUser.map((user, i) => {
                return (
                    <div
                        key={user.id}
                        onMouseOver={() => setLocalUserListHover(user.node_id)}
                        onMouseLeave={() => setLocalUserListHover('')}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <div
                            key={user.node_id}
                            onClick={() => {
                                let newListUser = listUser.map((lUser, i) => {
                                    lUser.dataRepo = []
                                    lUser.showAccordion = false
                                    if (lUser.id === user.id) lUser.showAccordion = true
                                    return lUser
                                })
                                setListUser(newListUser)
                                singleUserRepo(user.login)
                            }}
                            style={{
                                backgroundColor: localUserListHover == user.node_id ? '#f7edff' : "#f1f3f5db",
                                boxShadow: user.showAccordion ? 'rgb(244, 170, 185) 0px 1px 18px 10px' : '1px 2px 9px #F4AAB9',
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 10,
                                borderRadius: 3,
                                border: '1px solid #cbd1da',
                                marginBottom: 20,
                                alignItems: 'center',
                                height: 80,
                            }}>
                            <img
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 40,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    boxShadow: '1px 2px 9px #F4AAB9',
                                }}
                                src={user.avatar_url}>
                            </img>

                            <div style={{
                                width: '5%'
                            }}></div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '75%',
                                marginLeft: '2%',
                                padding: 5,
                            }}>
                                <p style={{
                                    color: '#0e0d0d',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    paddingLeft: 5,
                                    margin: 1,
                                }}> {user.name}</p>

                                <p style={{
                                    color: '#272626',
                                    fontWeight: 500,
                                    fontSize: 13,
                                    paddingLeft: 5,
                                    paddingBottom: 10,
                                    margin: 1,
                                }}> {user.login} </p>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <RiGitRepositoryFill
                                        style={{
                                            width: '10%',
                                            color: '#272626',
                                            fontSize: 16,
                                        }} />
                                    <p style={{
                                        color: '#272626',
                                        fontSize: 12,
                                        margin: 1,
                                    }}>
                                        {user.public_repos}
                                    </p>
                                    <RiFileCodeLine
                                        style={{
                                            width: '10%',
                                            color: '#272626',
                                            fontSize: 16,
                                        }} />
                                    <p style={{
                                        color: '#272626',
                                        fontSize: 12,
                                        margin: 1,
                                    }}>
                                        {user.public_gists}
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                    <p style={{
                                        color: '#272626',
                                        fontSize: 10,
                                        paddingLeft: 5,
                                        paddingTop: 5,
                                        paddingBottom: 2,
                                        margin: 1,
                                    }}> {user.followers} followers - {user.following} following</p>
                                    <motion.div
                                        style={{
                                            marginLeft: 'auto',
                                        }}
                                        animate={{
                                            rotate: user.showAccordion ? 90 : 0
                                        }}>
                                        <RiSendPlane2Fill
                                            style={{
                                                marginTop: 1,
                                                paddingLeft: 5,
                                                paddingTop: 5,
                                                paddingBottom: 2,
                                                width: '100%',
                                                color: '#272626',
                                                fontSize: 15,
                                            }} />
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
                console.log('go go go')
                return (
                    <motion.div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <div
                            key={i}
                            style={{
                                backgroundColor: "#f1f3f5db",
                                boxShadow: '1px 2px 9px #F4AAB9',
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 10,
                                borderRadius: 3,
                                border: '1px solid #cbd1da',
                                marginBottom: 20,
                                alignItems: 'center',
                                height: 80,
                            }}>
                            <UserListLoader />
                        </div>
                    </motion.div>
                )
            })
        }
    }, [listUser, localUserListHover, localUserRepoHover, onLoadingListUser])

    return (
        <>
            {getViewUserList}
        </>
    );
}

