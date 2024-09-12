import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import { right, left, plus } from "../../utils/Icons";
import styles from './../Gallery.module.css'; // Import the CSS module
import Line from "../horizontalline/line";

export default function Gallery() {
  const [showForm, setShowForm] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3; // Number of images to show at once

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/images/');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleAddImageClick = () => {
    setShowForm(true);
    setShowImages(false);
  };

  const handleGalleryClick = () => {
    setShowImages(true);
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Prepend the new image to the images array
      setImages([response.data.url, ...images]);

      setShowForm(false);
      setShowImages(true);
      setSelectedFile(null);
      setFlashMessage("Image uploaded successfully!");
      setFlashType("success");
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setFlashMessage("Failed to upload image.");
      setFlashType("error");
      setLoading(false);
    }

    setTimeout(() => {
      setFlashMessage("");
      setFlashType("");
    }, 3000);
  };

  const handleRightClick = () => {
    if (currentIndex + visibleCount < images.length) {
      setCurrentIndex(currentIndex + visibleCount);
    } else {
      setCurrentIndex(0); // Wrap around to the beginning
    }
  };

  const handleLeftClick = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    } else {
      setCurrentIndex(Math.max(images.length - visibleCount, 0));
    }
  };

  return (
    <div className={styles.container}>
      {/* Left empty side */}
      <div className={styles.left}></div>

      {/* Right side content */}
      <div className={`${styles.right} flex flex-col right`}>
        <div className="gallery bg-[#363c43] flex h-[43vh] w-[80vh]  relative rounded-2xl overflow-hidden shadow-[0px_0_2px_0px_rgba(255,255,255,0.5),4px_10px_8px_0px_rgba(0,0,0,1)]">
          <Sidebar />
          <div className="container bg-[#363c43]">
            <div className="btns bg-[#363c43] flex justify-between flex-col sm:flex-row">
              <div className="gallery-btn mt-6 bg-[#363c43]">
                <button
                  className="bg-[#131313] text-white rounded-2xl w-24 h-12"
                  onClick={handleGalleryClick}
                >
                  Gallery
                </button>
              </div>
              <div className="add-lr-btn flex mr-1 pt-6 bg-[#363c43]">
                <div className="bg-[#363c43]">
                  <button
                    className="bg-[#40464d] h-10 rounded-2xl mr-12 text-white w-40 text-sm font-bold shadow-[-4px_0_8px_2px_rgba(255,255,255,0.5),4px_10px_8px_0px_rgba(0,0,0,1)]"
                    onClick={handleAddImageClick}
                  >
                    {plus} ADD IMAGE
                  </button>
                </div>
                <div className="mr-6 text-white h-10 bg-[#1f2124] w-10 rounded-full justify-center flex text-base">
                  <button onClick={handleLeftClick} className="left-btn">{left}</button>
                </div>
                <div className="mr-3 text-white h-10 bg-[#1f2124] w-10 rounded-full justify-center flex">
                  <button onClick={handleRightClick} className="right-btn ">{right}</button>
                </div>
              </div>
            </div>

            {flashMessage && (
              <div className={`flash-message bg-[#363c43] ${flashType === "success" ? "text-green-500" : "text-red-500"} mt-2`}>
                {flashMessage}
              </div>
            )}

            <div className="content bg-[#363c43]">
              {showForm && (
                <div className="mt-4 p-4 bg-[#40464d] rounded-2xl mr-5">
                  <form onSubmit={handleSubmit} className="bg-[#40464d]">
                    <div className="mb-4 bg-[#40464d] ">
                      <label className="block  text-white text-sm font-bold mb-2 bg-[#40464d]" htmlFor="image">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="w-full px-3 py-2 border rounded-lg text-white bg-[#40464d] border-[#131313] focus:outline-none"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <button type="submit" className="bg-[#131313] text-white rounded-2xl w-24 h-10">
                      {loading ? <p className="bg-[#131313] rounded-2xl">Uploading...</p> : <p className="bg-[#131313] rounded-2xl">Submit</p>}
                    </button>
                  </form>
                </div>
              )}

              {showImages && (
                <div className="mt-10 grid grid-cols-3 gap-4 mr-3 h-40 w-50 pb-3 bg-[#363c43]">
                  {images.slice(currentIndex, currentIndex + visibleCount).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Gallery item ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Line/>
      </div>
    </div>
  );
}
