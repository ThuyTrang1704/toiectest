import React, { useState, useEffect } from "react";
import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import debounce from 'lodash.debounce';
import { set } from "date-fns";

import '../skill/skill.css';

const CreateSkill = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [skillList, setSkillList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState('');
  const token = localStorage.getItem("token");
  const [showPopup, setShowPopup] = useState(false);

  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const [name, setName] = useState('');
  const [error, setError] = useState('');

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
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setName('');
        setError('');
      }, 3000); // 3000ms = 3 seconds

      // Cleanup the timer if the component unmounts or showSuccess changes
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  const handleDeleteSkill = async (id) => {
    try {
      const isConfirmed = window.confirm("Bạn có chắc muốn xóa skill này không?");
      if (!isConfirmed) {
        return;
      }

      const response = await axios.delete(`http://localhost:8085/api/deleteSkill`, {
        params: {
          skillId: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Skill deleted successfully:', response.data);
      fetchData();
    } catch (error) {
      if (error.response.status === 409) {
        // Server responded with a status other than 2xx
        alert('kỹ năng đã có topic không thể xóa');
      }
      else if (error.response.status === 403) {
        alert('Bạn không có quyền xóa kỹ năng này');
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/filterSkill`, {
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
      console.log("Hoan thanh");

      const data = response.data;
      setSkillList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);
      setSkillList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, pageSize, keyword]);

  const createSkill = async () => {
    if (!name) {
      setError('Please enter a skill name.');
      return;
    }
    const isConfirmed = window.confirm("Bạn có chắc muốn thêm skill này không??");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8085/api/createSkill`, {
        name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowPopup(false);
      setShowSuccess(true);
      // window.location.reload();
      console.log(response.data);
      console.log(1);
      fetchData();
    } catch (error) {
      if (error.response.status === 409) {
        console.error('Error response:', error.response);
        setError(`Kỹ năng bạn nhập đã tồn tại.`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response received from the server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        setError('An error occurred while creating the skill. Please try again.');
      }
    }
  };
  const editSkill = async (idlevel, namelevel) => {
    const isConfirmed = window.confirm("Xác nhận sửa!!");

    if (!isConfirmed) {
      return; // Nếu người dùng chọn "Cancel", dừng lại
    }

    try {
      const response = await axios.put(`http://localhost:8085/api/updateSkill`, {
        id: idlevel,
        name: namelevel,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditPopupOpen(false);
      console.log(response.data);
      console.log('hoan thanh edit');
      fetchData();
    } catch (error) {
      if (error.response.status === 409) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response);
        setError(`skill bạn nhập đã tồn tại.`);
        // setName('');
      } else if (error.request.status === 403) {
        // Request was made but no response was received
        console.error('Error request:', error.request);
        setError('Bạn không có quyền sửa skill này.');
      } else {
        // Something else happened while setting up the request
        console.error('Error message:', error.message);
        setError('An error occurred while creating the level. Please try again.');
      }
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditButtonClick = (skill) => {
    setCurrentSkill(skill);
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setCurrentSkill(null);
  };
  const handleEditNameChange = (e) => {
    setCurrentSkill({ ...currentSkill, name: e.target.value });
  };
  return (
    <div className="w-full h-full p-12">
      {showSuccess &&
        <div class="p-8 space-y-4">
          <div class="flex w-96 shadow-lg rounded-lg">
            <div class="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-white fill-current" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
            </div>
            <div class="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
              <div>Thêm thành công</div>
              <button
                onClick={() => setShowSuccess(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      }
      <h1 className="font-semibold my-12 text-center text-3xl">Skills Manage</h1>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center float-left">
        <PlusIcon className="h-5 w-5 mr-2" />
        Add
      </button>

      {showPopup && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="fadein-animation fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 rounded-lg shadow-lg min-w-[300px] min-h-[200px]">
            <h2 className="text-lg font-semibold">Add Skill</h2>
            <div>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                placeholder="input your new skill name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <button
              onClick={() => createSkill()}
              className="mr-4 mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowPopup(false);
                setName('');
                setError('');
              }}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      {isEditPopupOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="fadein-animation fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 rounded-lg shadow-lg min-w-[300px] min-h-[200px]">
            <h2 className="text-lg font-semibold">Edit Level</h2>
            <div>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                placeholder="input your level name"
                value={currentSkill.name}
                onChange={handleEditNameChange}
              />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <button
              onClick={() => editSkill(currentSkill.id, currentSkill.name)}
              className="mr-4 mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditPopupOpen(false);
                // setName('');
                setError('');
              }}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
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
            <th className="border px-4 py-2">Skill</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {skillList.map((skill) => (
            <tr key={skill.id}>
              <td className="border px-4 py-2">{skill.id}</td>
              <td className="border px-4 py-2">{skill.name}</td>
              <td className="border px-4 py-2 flex justify-center">
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</button> */}
                <button
                  onClick={() => handleEditButtonClick({ id: skill.id, name: skill.name })}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit
                </button>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default CreateSkill;