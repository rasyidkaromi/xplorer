import { CSSProperties } from 'react';

interface IUserListStyle {
    container: CSSProperties,
}

export const UserListStyle: IUserListStyle = {
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