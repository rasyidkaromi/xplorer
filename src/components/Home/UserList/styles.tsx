import { CSSProperties } from 'react';

interface IUserListStyle {
    headUserList: CSSProperties
    containerUserList: CSSProperties
    container: CSSProperties
}

export const UserListStyle: IUserListStyle = {
    headUserList: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerUserList: {
        // backgroundColor: localUserListHover == user.node_id ? '#f7edff' : "#f1f3f5db",
        // boxShadow: user.showAccordion ? 'rgb(244, 170, 185) 0px 1px 18px 10px' : '1px 2px 9px #F4AAB9',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 3,
        border: '1px solid #cbd1da',
        marginBottom: 20,
        alignItems: 'center',
        height: 80,
    },
    container: {
        backgroundColor: "#f1f3f5db",
        boxShadow: '1px 2px 9px #F4AAB9',
        // msFlexDirection: 'column',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        borderRadius: 3,
        border: '1px solid #cbd1da',
        marginBottom: 20,
    },
}