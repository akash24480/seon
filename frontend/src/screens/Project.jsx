import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from "../config/scoket";
import { UserContext } from "../context/user.context";

const Project = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  const [project, setProject] = useState(location.state.project)
  const [message, setMessage] = useState('')
  const { user } = useContext(UserContext)
  const messageBox = React.createRef()


  const [users, setUsers] = useState([])



  const handleUserClick = (id) => {
    setSelectedUsersId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId)
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id)
      } else {
        newSelectedUserId.add(id)
      }

      return newSelectedUserId;
    })
  }



  const addColaborators = () => {
    axios.put("/projects/add-user", {
      projectId: location.state.project._id,
      users: Array.from(selectedUsersId)
    }).then((res) => {
      console.log(res.data)
      setIsModalOpen(false)
    })
      .catch((err) => {
        console.log(err)
      })
  }


  const send = () => {
    sendMessage('project-message', {
      message,
      sender: user
    })

    appendOutgoingMessage(message)
    setMessage("")
  }


  useEffect(() => {


    initializeSocket(project._id)

    receiveMessage('project-message', data => {
      console.log(data)
      appendInconmingMessage(data)
    })

    axios.get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data)
        setProject(res.data.project)
      })
      .catch((err) => {
        console.log(err)
      })



    axios.get('/users/all')
      .then((res) => {
        console.log(res.data)
        setUsers(res.data.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])



  const appendInconmingMessage = (messageObject) => {

    const messageBox = document.querySelector('.message-box')

    const message = document.createElement('div')
    message.classList.add('incoming', 'message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-lg')
    message.innerHTML = `
    <small class="opacity-65 text-xs">${messageObject.sender.email}</small>
    <p class="text-sm">${messageObject.message}</p>
    `

    messageBox.appendChild(message)
    scrollBottom()
  }

  const appendOutgoingMessage = (message) => {
    const messageBox = document.querySelector('.message-box')

    const newMessage = document.createElement('div')
    newMessage.classList.add('ml-auto', 'message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-lg')
    newMessage.innerHTML = `
    <small class="opacity-65 text-xs">${user.email}</small>
    <p class="text-sm">${message}</p>
    `

    messageBox.appendChild(newMessage)
    scrollBottom()
  }


  const scrollBottom = () =>{
    messageBox.current.scrollTop = messageBox.current.scrollHeight
  }




  return (
<main className="h-screen w-screen flex">
  <section className="left flex flex-col h-full min-w-96 bg-slate-300 relative">
    <header className="flex justify-between p-2 px-4 w-full bg-slate-100">
      <button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
        <i className="ri-add-large-fill"></i>
        <p className="text-xs">Add Colaborator</p>
      </button>

      <button
        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
        className="p-2">
        <i className="ri-group-fill"></i>
      </button>
    </header>

    <div className="conversation-area flex-grow flex flex-col h-full scrollbar-hide">
      <div className="convo flex flex-col flex-grow w-full overflow-y-auto overflow-x-hidden h-[85vh] scrollbar-hide">
        <div
          ref={messageBox}
          className="message-box flex-grow flex flex-col gap-2 p-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        </div>
      </div>

      <div className="inputField w-full flex px-4 bg-white">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border-none outline-none w-full"
          type="text"
          placeholder="Send a message"
        />
        <button
          onClick={send}
          className="">
          <i className="ri-send-plane-fill"></i>
        </button>
      </div>
    </div>

    <div className={`flex flex-col gap-2 sidepanel absolute top-0 w-full h-full bg-gray-300 transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <header className="flex justify-between p-2 px-3 bg-gray-50">
        <h1>Collaborators</h1>
        <button
          onClick={() => setIsSidePanelOpen(false)}
        >
          <i className="ri-close-large-fill"></i>
        </button>
      </header>

      <div className="users flex flex-col gap-3 p-2">
        {
          project.users && project.users.map((user) => {
            return (
              <div className="user flex items-center gap-3 bg-slate-100 p-2 rounded-lg cursor-pointer  hover:bg-slate-200 transition-all">
                <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-4 bg-slate-600">
                  <i className="ri-user-fill absolute"></i>
                </div>
                <h2 className="font-semibold">{user.email}</h2>
              </div>
            )
          })
        }
      </div>
    </div>

  </section>

  {/* Modal section */}

  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsModalOpen(false)}
        >
          <i className="ri-close-fill text-xl"></i>
        </button>
        <h2 className="text-xl mb-4">Select a User</h2>
        <div className="flex flex-col gap-3 max-h-96 overflow-auto">
          {users.map((user) => (
            <div
              key={user._id}
              className={`user flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-200 ${Array.from(selectedUsersId).indexOf(user._id) != -1 ? 'bg-slate-200' : ''} transition-all`}
              onClick={() => handleUserClick(user._id)}
            >
              <div className="relative aspect-square rounded-full w-12 h-12 flex items-center justify-center bg-slate-600">
                <i className="ri-user-fill text-white text-xl"></i>
              </div>
              <h2 className="font-semibold">{user.email}</h2>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={addColaborators}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )}
</main>

  );
};

export default Project;
