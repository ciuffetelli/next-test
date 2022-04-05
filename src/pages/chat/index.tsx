import React, { useEffect, useState, useRef} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { io } from "socket.io-client"

import Frame from '../../component/Frame'
import Modal from '../../component/Modal'
import styles from './chat.module.css'

type PropsType = {
    userName: string
    BASE_URL: string
}

type User = {
    userName: string
}

type EmiterType = {
    userName: string,
    event: string,
    content: string
}

export async function getServerSideProps() {
    
    return {
        props: {
            BASE_URL: process.env.BASE_URL,
            userName: "User_" + String(new Date().getTime()).substr(-3)
        }
    }
}

function Chat(props: PropsType) {

    const inputRef = useRef(null)

    const [connected, setConnected] = useState<boolean>(false)

    const [user, setUser] = useState<string>(props.userName)
    const [tempUser, setTempUser] = useState<string>(props.userName)
    const [modalGetUserName, setModalGetUserName] = useState<boolean>(false)

    const [userList, setUserList] = useState<User[]>([])

    const [chat, setChat] = useState<EmiterType[]>([])
    const [message, setMessage] = useState<string>("")

    const connect = () => {

        setUser(tempUser.replaceAll(' ', '_'))

        const socket = io(props.BASE_URL, {
            path: "/api/socketio"
        })

        socket.on("connect", () => {
            setConnected(true)
        })

        socket.on("disconnect", () => {
            setConnected(false)
        })

        socket.on("message", (message: EmiterType) => {
            
            chat.push(message)

            setChat([...chat])
        })

        socket.on(user, (message: EmiterType) => {

            const privateMessage = message
            privateMessage.content = `[PRIVATE] ${message.content}`

            chat.push(privateMessage)

            setChat([...chat])
        })
        
        setModalGetUserName(false)
    }

    const emit = (event: string, content: string): Promise<any> => {

        const objData: EmiterType = {
            userName: user,
            event: event,
            content: content
        }
    
        return fetch("/api/chat", {
            method: 'POST',
            headers: {
                "Content-TYpe": "application/json"
            },
            body: JSON.stringify(objData)
        })
    }
    
    useEffect((): any => {
        setModalGetUserName(true)
    }, [])

    useEffect(() => {
        sendMessage((connected)? 'Entered' : 'Leave')
    }, [connected])

    const sendPrivateMessage = (msg: string) => {

        const arrContent = msg.replace('@', '').split(' ')

        emit(arrContent[0], arrContent[1])

        setMessage('')
    }

    const sendMessage = (msg?: string) => {

        const msgToSend = (msg) ? msg : message

        if(!connected) return

        if(msgToSend[0] == '@') return sendPrivateMessage(msgToSend)

        if(msgToSend) {

            emit('message', msgToSend)

            setMessage("")
        }
    }

    return (
        <Frame title="Chat" pageTitle="Chat" back={true}>
            <div className={styles.chatBox}>
                <div className={styles.chatMsg}>
                    {chat?.map( (message, index) => {
                        return (
                            <p key={`msg_${index}`}><strong>{(message.userName === user) ? 'Me' : (
                                <u>
                                    <a href='#' onClick={() => {setMessage(`@${message.userName} `)}}>
                                        {message.userName.replaceAll('_', ' ')}
                                    </a>
                                </u>
                            )}</strong>: {message.content}</p>
                        )
                    })}
                </div>

                <div className={styles.inputBox}>
                    <input
                            ref={inputRef} 
                            className={styles.input} 
                            value={message} 
                            onChange={event => { setMessage(event.target.value); }} 
                            onKeyPress={event => { if(event.key === "Enter") sendMessage() }}
                            disabled={!connected}
                            autoFocus
                    />
                    <input className={styles.send} type="submit" value="Send" disabled={!connected} onClick={() => sendMessage()} />
                </div>
                <Modal title='Your Name' display={modalGetUserName} setDisplay={setModalGetUserName} action={connect}>
                    <>
                    <input
                        className={styles.input}
                        value={tempUser} 
                        onChange={event => { setTempUser(event.target.value); }} 
                        onKeyPress={event => { if(event.key === "Enter") connect() }}

                     />
                     <small className='error'></small>
                    </>
                </Modal>
            </div>
        </Frame>
    )
}

export default Chat
