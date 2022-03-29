import React, { useEffect, useState, useRef} from 'react'
import { io } from "socket.io-client"

import styles from './chat.module.css'

type MessageType = {
    userName: string,
    message: string
}

type PropsType = {
    BASE_URL: string
}

const user = "User_" + String(new Date().getTime()).substr(-3);

export async function getServerSideProps() {
    return {
        props: {
            BASE_URL: process.env.BASE_URL,
        }
    }
}

function Chat(props: PropsType) {

    const inputRef = useRef(null)

    const [connected, setConnected] = useState<boolean>(false)

    const [chat, setChat] = useState<MessageType[]>([])
    const [message, setMessage] = useState<string>("")

    useEffect((): any => {

        const socket = io(props.BASE_URL, {
            path: "/api/socketio"
        })

        socket.on("connect", () => {
            setConnected(true)
        })

        socket.on("disconnect", () => {
            setConnected(false)
        })

        socket.on("message", (message: MessageType) => {
            
            chat.push(message)

            setChat([...chat])
        })

        if(socket) return () => socket.disconnect()

    }, [])

    const sendMessage = async () => {

        if(!connected) return

        if(message) {
            const msg: MessageType = {
                userName: user,
                message: message
            }

            const response = await fetch("/api/chat", {
                method: 'POST',
                headers: {
                    "Content-TYpe": "application/json"
                },
                body: JSON.stringify(msg)
            })

            if(response.ok) setMessage("")
        }
    }

    return (
        <div className={styles.chat}>
              <h1>Chat</h1>
          <div className={styles.chatBox}>
              <div className={styles.chatMsg}>
                  {chat?.map( (message, index) => {
                      return (
                          <p key={`msg_${index}`}><strong>{(message.userName === user) ? 'Me' : message.userName}</strong>: {message.message}</p>
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
                        autoFocus
                  />
                  <input className={styles.send} type="submit" value="Send" disabled={!connected} onClick={() => sendMessage()} />
              </div>
          </div>
      </div>
    )
}

export default Chat