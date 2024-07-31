import { Aside } from "../../aside/Aside"
import { useEffect,useState,useRef } from "react";
import { CustomFetch } from "../../../api/CustomFetch";

export const BoxChat = () => {
    const [messages, setMessages] = useState<{ text: string, time: Date, message_side: string }[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const messagesEndRef = useRef<HTMLUListElement>(null);
    const [sendState, setSendState] = useState(false)

    // useEffect(() => {
    //   (
    //     async () => {
    //       const payload= {
    //       msg: "Saluda al usuario."
    //     }
        
    //     setSendState(true)

    //     const data = await CustomFetch("http://localhost:5000/chat", "POST", payload);
  
    //     showBotMessage(data.answer)
  
    //     setSendState(false)

    //   }
    //   )()

    // }, []);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    };
  
    const getCurrentTimestamp = (): Date => {
      return new Date();
    };
  
    const renderMessageToScreen = (args: { text: string, time: Date, message_side: string }) => {
      setMessages(prevMessages => [...prevMessages, { ...args, time: args.time || getCurrentTimestamp() }]);
    };
  
    const showUserMessage = (message: string, datetime: Date = getCurrentTimestamp()) => {
      renderMessageToScreen({ text: message, time: datetime, message_side: 'right' });
    };
  
    const showBotMessage = (message: string, datetime: Date = getCurrentTimestamp()) => {
      renderMessageToScreen({ text: message, time: datetime, message_side: 'left' });
    };
  
    const handleSendButtonClick = async () => {
      if (inputValue.length < 1) return
      
      showUserMessage(inputValue);
      setInputValue('');

      const payload = {
        msg: inputValue
      }
      
      setSendState(true)

      const data = await CustomFetch("http://localhost:5000/chat", "POST", payload);

      showBotMessage(data.answer)

      setSendState(false)
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendButtonClick();
      }
    };
    return (
            <main className="container-fluid container-chatbot">
                <div className="row w-100">
                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-patient">
                        <Aside/>
                    </section>
                    <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-1">
                        <div className="row justify-content-center">
                            <div className="col">
                            <div className="chat_window">
                                <div className="top_menu">
                                <div className="title">Hermes</div>
                                </div>
                                <ul className="messages" ref={messagesEndRef}>
                                {messages.map((msg, index) => (
                                    <li key={index} className={`message ${msg.message_side} appeared`}>
                                    <div className="avatar"></div>
                                    <div className="text_wrapper">
                                        <div className="text">{msg.text}</div>
                                        <div className="timestamp">{msg.time.toLocaleString('en-IN', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        })}</div>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                                <div className="bottom_wrapper">
                                <input
                                  disabled={sendState}
                                    id="msg_input"
                                    placeholder="Escribe un mensaje..."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <button disabled={sendState} id="send_button" className="btn btn-outline-dark" onClick={handleSendButtonClick}>
                                    Enviar
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                   
                    </section>
                </div>
            </main>
    )
}