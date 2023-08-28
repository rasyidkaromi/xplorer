import { useCallback, useEffect, useState, useRef, CSSProperties } from 'react';
import { motion, useCycle } from 'framer-motion'
import GithubLogoImg from '../../../assets/github-icon.png';
import { HeaderStyle } from './styles';
import { useUser } from '../../../hooks/userContext';

const motionVariant = {
    motionOne: {
        // x: [-20, 20],
        // y: [0, -30],
        x: 0,
        y: 0,
        height: 'auto',
        // opacity: '1',
        transition: {
            x: {
                duration: 0.5
            },
            y: {
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    },
    motionTwo: {
        // y: [0, -40],
        x: '-10vh',
        padding: 5,
        // opacity: '0.9',
        transition: {
            y: {
                duration: 0.25,
                ease: 'easeOut'
            }

        }
    }
}


export function Header() {
    const { getListUser, onFocusInput, setOnFocusInput } = useUser();
    const [animation, cycleAnimation] = useCycle('motionOne', 'motionTwo')

    const [imageOpacity, setImageOpacity] = useState<boolean>(false)
    const handleMouseEnter = () => setImageOpacity(true)
    const handleMouseLeave = () => setImageOpacity(false)

    useEffect(() => {
        // console.log('onFocusInput', onFocusInput)
        if (onFocusInput) {
            cycleAnimation(1)
        } else {
            cycleAnimation(2)
        }
    }, [onFocusInput])

    return (
        <div style={HeaderStyle.container}>
            <motion.div
                variants={motionVariant}
                animate={animation}
                style={HeaderStyle.motionImg}>
                <img
                    style={onFocusInput ? HeaderStyle.imgOnFocus : HeaderStyle.img}
                    // style={HeaderStyle.img}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    src={GithubLogoImg}/>
            </motion.div>
            {!onFocusInput ? <h1>Xplorer</h1> : []}
        </div>
    );
}