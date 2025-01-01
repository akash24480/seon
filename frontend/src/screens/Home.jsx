import React,{useContext, useState,useEffect} from 'react'
import { UserContext } from '../context/user.context'
import 'remixicon/fonts/remixicon.css'
import axios from '../config/axios'
import {useNavigate} from 'react-router-dom'


const Home = () => {
  const {user} = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState(null)
  const [projects, setprojects] = useState([])


  const navigate = useNavigate()



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

const createProject = (e) =>{
e.preventDefault();
console.log({projectName})

axios.post('/projects/create', {
  name : projectName,
}).then((res) => {
  setIsModalOpen(false)
  console.log(res)

}).catch((err) => {
  console.log(err)
})


}

useEffect(()=>{
  axios.get('/projects/all')
  .then((res)=>{
    console.log(res.data)
    setprojects(res.data.projects)
  })
  .catch((err) => {
    console.log(err)
  })
},[])

  return (
    <main className='p-4'>
      <div className='projects flex flex-wrap gap-5'>
        <button 
        onClick={() => setIsModalOpen(true)}
        className="project p-4 border border-slate-300 rounded-md">
        New project<i className="ri-link ms-2"></i>
        </button>


        {
          projects.map((project)=>(
            <div onClick={()=>{navigate(`/project/`,{
              state : {project}
            })}} key={project._id} className="project flex flex-col items-center gap-2 p-4 border border-slate-300 rounded-md cursor-pointer min-w-44 hover:bg-slate-200">
              <h2 className='font-semibold'>{project.name}</h2>
              <div className='flex gap-2'>
              <p><i className="ri-user-line"></i>Collaborators :</p>
                {project.users.length}
              </div>
            </div>
          ))
        }
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Enter Project Name</h2>
            <form onSubmit={createProject}>
              <input 
                type="text" 
                className="border border-gray-300 p-2 rounded-md w-full mb-4"  
                onChange={(e) => setProjectName(e.target.value)} 
                placeholder="Project Name"
              />
              <div className="flex justify-center">
                <button 
                  type="button" 
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home