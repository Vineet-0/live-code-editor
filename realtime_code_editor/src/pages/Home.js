import React, { useState } from "react";
import toast from "react-hot-toast";
import {v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate=useNavigate()
    const [roomId,setroomId]=useState('');
    const [UserName,SetUserName]=useState('');
    const createNewRoom=(e)=>{
        e.preventDefault();   
        const id=uuidv4();
        setroomId(id);
        toast.success('Created a new room');
    }
    const joinRoom=()=>
    {
        if(!roomId||!UserName)
        {
            console("Don't have info ");
            return ;
        }
        navigate(`/editor/${roomId}`,{
            state:{
                UserName,roomId
            }
        })

    }
   const handleInputEnter=(e)=>{
    if(e.code ==='Enter')
    {
        joinRoom();
    }

   }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="h-fit FormWrapper bg-[#282a35] p-[40px] rounded-[10px] w-[440px]">
                <img className="mx-auto h-[100px] mb-2" src="/Code_Sync_Logo.png" alt="Code-sync-logo" />
                <h4 className=" text-green-400 font-bold mb-2">Paste Invitation ID</h4>
                <div className="flex flex-col">
                    <input
                        type='text'
                        value={roomId}
                        onKeyUp={handleInputEnter}
                        onChange={(e)=>setroomId(e.target.value)}
                        className="px-5 py-3 mb-4 rounded-lg text-black"
                        placeholder="Room ID">
                    </input>
                    <input
                        type='text'
                        value={UserName}
                        onKeyUp={handleInputEnter}
                        onChange={(e)=>SetUserName(e.target.value)}
                        className="px-5 py-3 mb-4 rounded-lg text-black"
                        placeholder="User Name">
                    </input>
                    <button className="px-5 py-3 mb-4 rounded-lg font-bold hover:text-white bg-green-400 hover:bg-blue-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-violet-300 " onClick={joinRoom}>Join</button>
                    <span className="text-white mx-auto">
                        If you don't have invite then create &nbsp;
                        <a onClick={createNewRoom} href="/" className="no-underline hover:underline font-bold text-green-400 hover:text-blue-600 active:text-red-700 focus:outline-none focus:ring focus:ring-violet-300">create room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Home;