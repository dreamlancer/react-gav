
import { Dropdown } from "react-bootstrap"
import { FiSettings, FiSend } from "react-icons/fi"
import StarRatings from 'react-star-ratings'
import React, { useEffect, useState, useRef } from 'react'
import { getSession, session } from 'next-auth/client'
import Talk from "talkjs"
import PrimaryModal from "./PrimaryModal"
import { useRouter } from 'next/router'
import { Approved } from "../../api/owner/approve"


const ChatBox = ({ car }) => {
    console.log('car', car);
    const router = useRouter()
    const [show, setShow] = useState(false)

    const [talkSession, setTalkSession] = useState({})
    const chatContainerRef = useRef(null)

    const diaria = car && car.valor_diaria
    const carroId = car && car.carro_status_id

    useEffect(async () => {
        const session =  await getSession()

        // console.log("id = ", car)
        // console.log(session)
        // var other = new Talk.User({
        //     id: car ? car.proprietario_id: '',
        //     name: "Proprietário De Carro",
        //     welcomeMessage: "Hey, how can I help?"
        // })

        const s = await makeTalkSession()
        setTalkSession(s)

        // const conversation = s.getOrCreateConversation(Talk.oneOnOneId(s.me, other))
        // conversation.setParticipant(s.me)
        // conversation.setParticipant(other)

        const chatbox = s.createInbox()
        //debugger
        chatbox.mount(chatContainerRef.current)

    }, [])

    const makeTalkSession = async () => {
        await Talk.ready
        const session =  await getSession()
        console.log("session - ",session)
        const me = new Talk.User({
            id: session.userId,
            name: session.name,
            photo: session.photo,
            role: "owner"
        })
        return new Talk.Session({
            appId: "tEwRPl0c",
            me
        })
    }

    const ApprovedThis = async () => {
        const approved = await Approved(diaria, carroId)
        console.log('approved', approved);
        if (approved) {
            router.push('/meus-veiculos')
        }
    }

    return (
        <div>


            <div className="my-panel-area__header">
                <div className="d-flex">
                    <p>Antonio</p>
                    <StarRatings
                        starDimension="15px"
                        rating={4}
                        starSpacing="5px"
                        starRatedColor="white"
                        starHoverColor="white"
                        starEmptyColor="white"
                        changeRating={(rating) => setRating(rating)}
                        numberOfStars={5}
                        name='rating'
                    />
                </div>

                <div className="d-block ml-auto my-panel-area__icon custom-dropdown">

                    <Dropdown drop="down">
                        <Dropdown.Toggle id="dropdown-basic">
                            <FiSettings />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Bloquear</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Denunciar</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Var anúncio</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div className="my-3 d-flex justify-content-between">
                <button onClick={() => setShow(true)} className="my-panel-area__btn mr-3">
                        <p>Aprovar</p>
                    </button>
                {/* <button className="my-panel-area__btn my-panel-area__btn--red">
                    <p>Liberar documentos</p>
                </button> */}
            </div>
            <div className="my-panel-area__chat">
                {/* <p className="text-center my-panel-area__chat-title">Data da conversa</p>

                <div className="my-panel-area__chat-left">
                    <p className="my-panel-area__chat-left-item">Faz um valor menor?</p>
                    <p >13:00</p>
                    <p className="my-panel-area__chat-left-item">Gostaria de retirar amanhã!</p>
                    <p>13:01</p>
                    <p className="my-panel-area__chat-left-item">Dinheiro na mão</p>
                    <p>13:02</p>
                </div>
                <div className="my-panel-area__chat-right">
                    <p className="my-panel-area__chat-right-item">Não, o valor é esse.</p>
                    <p >13:00</p>
                    <p className="my-panel-area__chat-right-item">Podemos fechar amanha?</p>
                    <p>13:01</p>
                </div>
                <div className="my-panel-area__chat-send">
                    <input className="my-panel-area__chat-send-p" type="text" className="form-control" placeholder="Digite uma mensagem..." aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                    <FiSend className="my-panel-area__chat-send-icon" />
                </div> */}
                <style jsx>{`
                .chat-container {
                    height: 500px;
                   
                }
            `}</style>
                <div className="chat-container" ref={chatContainerRef}>loading chat...</div>


            </div>
            <PrimaryModal
                twoBtn
                aprovar
                show={show}
                onclick={() => ApprovedThis()}
                onClose={() => setShow(false)}
                title="Tem certeza de que deseja aprovar isso. Essa ação não pode ser desfeita!"
            />
        </div>
    )
}

export default ChatBox
