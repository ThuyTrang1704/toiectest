import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@chakra-ui/react";
import { useStateContext } from "../../../lib/context/StateContextProvider";
import axios from "axios";

import debounce from 'lodash.debounce';


const CreateTopic = () => {
  let navigate = useNavigate();
  const [topicList, setTopicList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState('');
  const token = localStorage.getItem("token");

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);


  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const updateKeyword = debounce((value) => {
    setDebouncedKeyword(value);
  }, 2000);

  useEffect(() => {
    return () => {
      updateKeyword.cancel();
    };
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setKeyword(value);
    updateKeyword(value);
  };
  const handleDeleteTopic = async (id) => {
    try {
      const isConfirmed = window.confirm("Bạn có chắc muốn xóa topic này không?");
      if (!isConfirmed) {
        return;
      }

      const response = await axios.delete(`http://localhost:8085/api/topic/deleteTopic`, {
        params: {
          topicId: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Topic deleted successfully:', response.data);
      fetchData();
    } catch (error) {
      if (error.response.status === 409) {
        // Server responded with a status other than 2xx
        alert('topic đã có câu hỏi không thể xóa');
      }
      else if (error.response.status === 403) {
        alert('Bạn không có quyền xóa topic này');
      }
      else if (error.response.status === 404) {
        alert('topic không tồn tại');
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/topic/filterTopic`, {
        params: {
          pageNumber,
          pageSize,
          keyword
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      console.log(1);

      const data = response.data;
      setTopicList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);
      setTopicList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, pageSize, keyword]);

  const getPartById = (partId) => {
    switch (partId.toString()) {
      case '1': return "Part_5: Reading";
      case '2': return "Part_1: Listening";
      case '3': return "Part_2: Listening";
      case '4': return "Part_3: Listening";
      case '5': return "Part_4: Listening";
      case '6': return "Part_6: Reading";
      case '7': return "Part_7: Reading";
      default: return "New Part";
    };
  };

  const getLevelById = (skillId) => {
    switch (skillId.toString()) {
      case '1': return "easy";
      case '2': return "average";
      case '3': return "hard";
      default: return "New Level";
    };
  };
  const handleDetailClick = (topic) => {
    console.log('topic:', topic);
    setSelectedTopic(topic);
    setShowPopup(true);
  };
  return (
    <div className="w-full h-full p-12">
      <h1 className="font-semibold my-12 text-center text-3xl">Topics Manage</h1>
      <button
        onClick={() => navigate('/topic/addtopic')}

        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center float-left">
        <PlusIcon className="h-5 w-5 mr-2" />
        Add
      </button>
      <div className="mt-4 mb-2">
        <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Audio</th>
            <th className="border px-4 py-2">Part</th>
            <th className="border px-4 py-2">Level</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {topicList.map((topic) => (
            <tr key={topic.id}>
              <td className="border px-4 py-2">{topic.id}</td>
              <td className="border px-4 py-2">{topic.imageName}</td>
              {/* <td>
                <img src={`/src/filedata/study4_image/part1_listening/${topic.pathImage}.png`} alt={topic.imageName} className="max-w-[10px]" />
              </td> */}
              <td className="border px-4 py-2">{topic.audioName}</td>
              {/* <td>
              {topic.pathAudio && (
                                            <audio controls className="mb-2">
                                                <source src={`/src/filedata/study4_audio/part1_listening/${topic.pathAudio}.mp3`} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        )}
              </td> */}
              <td className="border px-4 py-2">{getPartById(topic.partId)}</td>
              <td className="border px-4 py-2">{getLevelById(topic.levelId)}</td>

              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => handleDetailClick(topic)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</button>
                <button
                  onClick={() => handleDeleteTopic(topic.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && selectedTopic && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 rounded-lg shadow-lg min-w-[300px] min-h-[200px]">
            <h1 className="text-5xl mb-5 text-center text-lg font-semibold">Topic details</h1>
            <div className="mb-4">
              {selectedTopic.pathImage && (
                <div className="border px-4 py-2 ">
                  <strong>Image:</strong>
                  <img 
                    className="mt-2 max-h-[400px] max-w-[400px]"
                    src={`/src/filedata/study4_image/part1_listening/${selectedTopic.pathImage}.png`} alt={selectedTopic.imageName} />
                </div>
              )}
              {selectedTopic.pathAudio && (
                <div className="border px-4 py-2">
                  <strong>Audio:</strong>
                  <audio controls className="mt-2">
                  <source src={`/src/filedata/study4_audio/part1_listening/${selectedTopic.pathAudio}.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              <div className="border px-4 py-2">
                <strong>Part:</strong> {getPartById(selectedTopic.partId)}
              </div>
              <div className="border px-4 py-2">
                <strong>Level:</strong> {getLevelById(selectedTopic.levelId)}
              </div>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      <div>
        <div>
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 0))}
            disabled={pageNumber === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <span className="mx-4 text-lg font-bold">
            {pageNumber + 1} / {totalPage}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, totalPage - 1))}
            disabled={pageNumber === totalPage - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;