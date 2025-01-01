import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <main className="h-screen w-screen flex ">
      <section className="left flex flex-col h-full min-w-80 bg-slate-300">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
          <button className="p-2">
            <i class="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">
            <div className="message-box flex-grow flex flex-col gap-2 p-1">
                <div className="incoming message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-lg">
                    <small className="opacity-65 text-xs">example@gmail.com</small>
                    <p className="text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla laudantium aut pariatur commodi optio numquam similique animi minima unde ratione.</p>
                    </div>

                    <div className="ml-auto message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-lg">
                    <small className="opacity-65 text-xs">example@gmail.com</small>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, placeat aspernatur est provident quisquam rerum vero a officia consectetur cupiditate aliquam quidem fugiat eaque commodi eius dicta. Unde, explicabo reprehenderit!</p>
                    </div>
            </div>

          <div className="inputField w-full flex px-4 bg-white">
            <input
              className="p-2 border-none outline-none w-full"
              type="text"
              placeholder="Send a message"
            />
            <button className="">
              <i class="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
