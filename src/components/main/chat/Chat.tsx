import { useState, useEffect } from "react";

export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messagesList, setMessagesList] = useState<any>([]);

    const sendMessage = async () => {
        if (username && currentMessage) {
            const now = new Date(Date.now());
            const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            const info = {
                message: currentMessage,
                room,
                author: username,
                time
            };

            // Emitir el mensaje al servidor
            await socket.emit('send_message', info);
            // setMessagesList((list) => [...list, info]); // Agrega el mensaje localmente
            setCurrentMessage(''); // Limpia el campo de entrada
        }
    };

    useEffect(() => {
        if (socket) {
          // Eliminar listeners duplicados
          socket.off('receive_message');
      
          // Registrar el listener
          socket.on('receive_message', (data) => {
            setMessagesList((list) => [...list, data]);
          });
      
          return () => {
            socket.off('receive_message'); // Limpiar al desmontar
          };
        }
      }, [socket]);

    return (
        <div>
            <section>
                <ul>
                    {messagesList.map((message: any, i: number) => (
                        <li key={i}>
                            <p>{message.author}: {message.message}</p>
                            <p>{message.time}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <input
                    type="text"
                    placeholder="Escribe un mensaje"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Enviar</button>
            </section>
        </div>
    );
};
