import { iHeaderStyle } from '../../../interface'

export const HeaderStyle: iHeaderStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        // backgroundColor: 'red'
    },
    motionImg: {
        width: '35%',
        height: 'auto',
        // flexDirection: 'row',
        // textAlign: 'end',
        // display: 'flex',
        // backgroundColor: 'green'
    },
    img: {
        width: '100%',
        height: 'auto',
        // justifyContent: 'flex-start',
        // backgroundColor: 'blue'

    },
    imgHover: {
        width: '20%',
        // height: 'auto',
        // opacity: '1',
        // transition: 'opacity 0.2s'
    },
    imgOnFocus: {
        width: '40%',
        height: 'auto',

        // height: '10%',
        // opacity: '0.7',
        // transition: 'opacity 0.2s'
    },
    h1style: {
        color: '#C9D1D9',
        fontSize: 24,
        fontWeight: 500,
        marginTop: 16,
        marginBottom: 0
    }
}

