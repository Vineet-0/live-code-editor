import React, { useEffect, useRef, useState } from "react";
import Client from "../Component/Client";
import Editor from "../Component/Editor";
import { useLocation, useNavigate } from "react-router-dom";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import { toast } from "react-hot-toast";
const EditorPage = () => {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const location = useLocation();
  const roomId=location.state.roomId;
  const [clients, setclients] = useState([
    { socketId: 1, username: "Rakesh k" },
    { socketId: 2, username: "Aanshu" },
  ]);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        handleErrors(err);
      });
      socketRef.current.on("connect_failed", (err) => {
        handleErrors(err);
      });
      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed , try again  late.");
        return navigate("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: location.state.roomId,
        Username: location.state.UserName,
      });
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, Username, socketid }) => {
          if (Username != location.state.UserName) {
            toast.success(`${Username} joined`);
          }
          setclients(clients);
        }
      );
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setclients((prev) => {
          return prev.filter((client) => {
            return client.socketId !== socketId;
          });
        });
      });
    };

    if (!location.state) {
      console.log(location);
      return navigate("/");
    }
    init();
    
  }, []);
  function copyBtn()
  {
    toast.success('Room Id has been copied to you clipboard');
    return navigator.clipboard.writeText(roomId);
  }

  return (
    <div className="minWrap">
      <div className="aside">
        <div className="asideInner">
          <div className=" border-b-2 border-[#424242]">
          <img
              className=""
              src="/Code_Sync_Logo.png"
              alt="Code-sync-logo"
          />
          </div>
          <h3 className="text-black mb-4 text-center font-bold bg-green-400 mt-[16px] p-[10px] rounded-lg">Connected</h3>

          <div className="grid grid-cols-3 gap-4">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="font-bold bg-blue-600 mt-[16px] p-[10px] rounded-lg" onClick={copyBtn}>Copy Room ID</button>
        <a href="/" className="text-center font-bold bg-red-700 mt-[16px] p-[10px] rounded-lg">Leave</a>
      </div>
      <div className="editorwrap">
        <Editor socketRef={socketRef} roomId={roomId}/>
      </div>
    </div>
  );
};
export default EditorPage;
