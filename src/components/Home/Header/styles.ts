import { CSSProperties } from 'react';

interface iHeaderStyle {
    container: CSSProperties,
    motionImg: CSSProperties,
    img: CSSProperties,
    h1style: CSSProperties,
    imgHover: CSSProperties,
    imgOnFocus: CSSProperties
}

export const HeaderStyle: iHeaderStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    motionImg: {
        width: '35%',
        height: 'auto',
    },
    img: {
        width: '100%',
        height: 'auto',
    },
    imgHover: {
        width: '20%',
    },
    imgOnFocus: {
        width: '40%',
        height: 'auto',
    },
    h1style: {
        color: '#C9D1D9',
        fontSize: 24,
        fontWeight: 500,
        marginTop: 16,
        marginBottom: 0
    }
}

