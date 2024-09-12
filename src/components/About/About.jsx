import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import styles from './../Gallery.module.css';
import Line from "../horizontalline/line";


export default function About() {
  const [activeButton, setActiveButton] = useState(0);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  const renderContent = () => {
    switch (activeButton) {
      case 0:
        return (
          <p className="text-[#a3adb2] bg-[#363c43]">
            Hi, I'm Aman! I'm a Full Stack Engineer with expertise in frontend and backend development.
            I enjoy working on web applications and solving challenging problems.
          </p>
        );
      case 1:
        return (
          <p className="text-[#a3adb2] bg-[#363c43]">
            I have experience working with FastAPI, React, Node.js, and SQL databases.
            I've built multiple projects including a task management app, finance management system, and more.
          </p>
        );
      case 2:
        return (
          <p className="text-[#a3adb2] bg-[#363c43]">
            I highly recommend learning technologies like React for frontend development and
            FastAPI for backend development if you're looking to build fast, scalable web applications.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Left empty side */}
      <div className={styles.left}></div>

      {/* Right side content */}
      <div className={`${styles.right} flex flex-col`}>
        <div className={`about bg-[#363c43] flex h-[40vh] w-[80vh] relative rounded-2xl overflow-hidden shadow-[0px_0_2px_0px_rgba(255,255,255,0.5),4px_10px_8px_0px_rgba(0,0,0,1)]`}>
          <Sidebar />
          <div className="container bg-[#363c43] flex-grow p-4 space-y-4 rounded-xl">
            {/* Add responsive flex direction for buttons */}
            <div className="heading flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 bg-[#131313] h-auto sm:h-12 justify-center sm:justify-evenly rounded-2xl p-1">
              <button
                className={`text-xl ${activeButton === 0
                    ? "bg-[#28292f] text-white rounded-2xl w-full sm:w-1/4 py-2"
                    : "text-[#a3adb2]"
                  }`}
                onClick={() => handleClick(0)}
              >
                About me
              </button>
              <button
                className={`text-xl ${activeButton === 1
                    ? "bg-[#28292f] text-white rounded-2xl w-full sm:w-1/4 py-2"
                    : "text-[#a3adb2]"
                  }`}
                onClick={() => handleClick(1)}
              >
                Experiences
              </button>
              <button
                className={`text-xl ${activeButton === 2
                    ? "bg-[#28292f] text-white rounded-2xl w-full sm:w-1/3 py-2"
                    : "text-[#a3adb2]"
                  }`}
                onClick={() => handleClick(2)}
              >
                Recommended
              </button>
            </div>

            {/* Responsive content alignment */}
            <div className="content pt-6 flex flex-col sm:flex-row bg-[#363c43]">{renderContent()}</div>
          </div>
        </div>
        <Line/>
      </div>
      </div>

      );
}
