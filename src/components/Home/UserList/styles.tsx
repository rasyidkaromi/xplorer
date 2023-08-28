import { CSSProperties } from 'react';

interface IUserListStyle {
    headUserList: CSSProperties
    containerUserList: CSSProperties
    imageUserList: CSSProperties
    separatorUserList: CSSProperties
    textContainerUserList: CSSProperties
    p_username: CSSProperties
    p_userlogin: CSSProperties
    div_repo_icon: CSSProperties
    iconrepo: CSSProperties
    p_repo: CSSProperties
    icongists: CSSProperties
    p_gists: CSSProperties
    followContainerUserList: CSSProperties
    p_follow: CSSProperties
    arrowRepoContainer: CSSProperties
    iconArrow: CSSProperties
    userContentLoaderContainer: CSSProperties
    divContentLoader: CSSProperties
    
    containerUserRepo: CSSProperties
    divUserRepo: CSSProperties
    p_reponame: CSSProperties
    p_star: CSSProperties
    iconfork: CSSProperties
    p_forkcount: CSSProperties
    iconstar: CSSProperties
    p_description: CSSProperties
    repoContentLoaderContainer: CSSProperties
}

export const UserListStyle: IUserListStyle = {
    headUserList: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerUserList: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 3,
        border: '1px solid #cbd1da',
        marginBottom: 20,
        alignItems: 'center',
        height: 80,
    },
    imageUserList: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        boxShadow: '1px 2px 9px #F4AAB9',
    },
    separatorUserList: {
        width: '5%'
    },
    textContainerUserList: {
        display: 'flex',
        flexDirection: 'column',
        width: '75%',
        marginLeft: '2%',
        padding: 5,
    },
    p_username: {
        color: '#0e0d0d',
        fontSize: 15,
        fontWeight: 500,
        paddingLeft: 5,
        margin: 1,
    },
    p_userlogin: {
        color: '#272626',
        fontWeight: 500,
        fontSize: 13,
        paddingLeft: 5,
        paddingBottom: 10,
        margin: 1,
    },
    div_repo_icon: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconrepo: {
        width: '10%',
        color: '#272626',
        fontSize: 16,
    },
    p_repo: {
        color: '#272626',
        fontSize: 12,
        margin: 1,
    },
    icongists: {
        width: '10%',
        color: '#272626',
        fontSize: 16,
    },
    p_gists: {
        color: '#272626',
        fontSize: 12,
        margin: 1,
    },
    followContainerUserList: {
        display: 'flex',
        flexDirection: 'row',
    },
    p_follow: {
        color: '#272626',
        fontSize: 10,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 2,
        margin: 1,
    },
    arrowRepoContainer: {
        marginLeft: 'auto',
    },
    iconArrow: {
        marginTop: 1,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 2,
        width: '100%',
        color: '#272626',
        fontSize: 15,
    },
    userContentLoaderContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    divContentLoader: {
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
    },

    containerUserRepo: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgb(121 79 147) 0px 1px 13px 0px',
        padding: 5,
        borderRadius: 5,
        border: '1px solid #0e3063',
        marginBottom: 10,
        marginLeft: '5%',
        height: 'auto',
    },
    divUserRepo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
    },
    p_reponame: {
        color: '#e5dbdb',
        fontSize: 13,
        fontWeight: 600,
        margin: 1,
    },
    p_star: {
        color: '#e5dbdb',
        fontSize: 13,
        fontWeight: 400,
        marginLeft: 'auto',
    },
    iconfork: {
        width: '10%',
        color: 'white',
        fontSize: 12,
    },
    p_forkcount: {
        color: '#e5dbdb',
        fontSize: 13,
        fontWeight: 400,
    },
    iconstar: {
        width: '10%',
        color: 'white',
        fontSize: 13,
    },
    p_description: {
        color: '#e5dbdb',
        paddingTop: 2,
        fontSize: 10,
        fontWeight: 300,
        margin: 3,
    },
    repoContentLoaderContainer: {
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
    }
}