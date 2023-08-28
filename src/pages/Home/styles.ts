import { CSSProperties } from 'react';

interface IHomeStyle {
    container: CSSProperties,
    containerOnFocus: CSSProperties,
    pageContainer: CSSProperties,
}

export const HomeStyle: IHomeStyle = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
    },
    containerOnFocus: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        width: 'auto',
    },
    pageContainer: {
        width: '80vw',
        maxWidth: 350
    }
}
