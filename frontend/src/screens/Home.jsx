import React,{useContext, useState} from 'react'
import { UserContext } from '../context/user.context'
import 'remixicon/fonts/remixicon.css'
import axios from '../config/axios'


const Home = () => {
  const {user} = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState(null)



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

  return (
    <main className='p-4'>
      <div className='projects'>
        <button 
        onClick={() => setIsModalOpen(true)}
        className="project p-4 border border-slate-300 rounded-md">
        New project<i className="ri-link ms-2"></i>
        </button>
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