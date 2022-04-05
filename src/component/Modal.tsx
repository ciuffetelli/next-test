import styles from './Modal.module.css'

export type FrameProps = {
    title: string,
    display: boolean,
    setDisplay: Function,
    action?: Function,
    children?: JSX.Element
}

export default (props: FrameProps) => {

    if(props.display) {
        return (
            <div className={styles.modal}>
                <div className={styles.modalInner}>
                    <div className={styles.modalHeader}>
                        <h2>{props.title}</h2>
                        <span className={styles.btnClone} onClick={() => props.setDisplay(false)}>X</span>
                    </div>
                    <div className={styles.modalContent}>
                        {props.children}
                    </div>
                    {(props.action)? (

                        <div className={styles.modalFooter}>
                            <button className={styles.btnDone} onClick={() => {if(typeof props.action == 'function')props.action()}}>Done</button>
                        </div>

                    ) : ''}
                </div>
                <div onClick={() => props.setDisplay(false)} className={styles.backgroundBlur}></div>
            </div>
        )
    } else {
        return (<></>)
    }
}