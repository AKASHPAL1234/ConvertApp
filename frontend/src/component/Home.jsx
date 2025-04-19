import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from 'axios';

function Home() {
  const [selectFile, setSelectFile] = useState(null);
  const [convert,setConvert]=useState("");
  const [downloadError, setDownloadError] = useState("");


  const handlefilechange = (e) => {
    console.log(e.target.files[0]);
    setSelectFile(e.target.files[0]);
  };

   const handelSubmit=async(event)=>{
    event.preventDefault();

      
      if(!selectFile){
        setConvert("select a file");
        return;
      }
      const formData=new FormData()
      formData.append("file",selectFile)
      try{
        const response= await axios.post("https://convertapp.onrender.com",formData,{
          responseType:"blob",
        })
        const url=window.URL.createObjectURL(new Blob([response.data]))
        console.log(url)
        const link=document.createElement("a")
        link.href=url;
        link.setAttribute("download",selectFile.name.replace(/\.[^/.]+$/, "") + ".pdf")
        console.log(link);
        document.body.appendChild(link);
        console.log(link);
        link.click();
        link.parentNode.removeChild(link);
        setSelectFile(null);
        setDownloadError("");
        setConvert("File Converted Successfully");
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status == 400) {
          setDownloadError("Error occurred: ", error.response.data.message);
        } else {
          setConvert("");
        }
      }
    };
   


  return (
    <>
      <div className="max-w-screen-2xl mx-auto cotainer py-3 px-6 md:px-40 ">
        <div className="flex h-screen items-center justify-center">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-4 border-indigo-400 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4">
              Convert Word to PDF Online
            </h1>
            <p className="text-sm text-center mb-5">
              Eaisaly convert a word file to pdf format online. without install
              any software
            </p>

            <div className="flex flex-col items-center py-4">
              <input
                type="file"
                accept=".doc,.docx"
                onChange={handlefilechange}
                className="hidden "
                id="fileinput"
              />
              <label
                htmlFor="fileinput"
                className="w-full flex items-center justify-center px-4 py-6 bg-gray-300 text-gray-700 rounded-lg shadow-lg cursor-pointer  border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
              >
                <FaFileWord className="text-3xl mr-3" />
                <span className="text-2xl mr-2 text-black hover:text-white ">
                  {selectFile ? selectFile.name : "CHOOSE FILE"}
                </span>
              </label>
              <button
              onClick={handelSubmit}
                disabled={!selectFile}
                className="text-white bg-blue-500 disabled:bg-gray-400 disabled:pointer-events-none hover:bg-blue-700 duration-300 font-bold px-4 py-2 mt-4 rounded-lg"
              >
                Convert file
              </button>
              {convert&&(<div className="text-green-500">{convert}</div>)}

              {downloadError&&(<div className="text-red-500">{downloadError}</div>)}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
