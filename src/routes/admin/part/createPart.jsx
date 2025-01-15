import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import debounce from 'lodash.debounce';
import { set } from "date-fns";

const CreatePart = () => {
  let navigate = useNavigate();

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    name: '',
    description: '',
    skillDTO: {
      id: '',
      name: ''
    }
  });

  const [skillList, setSkillList] = useState([]);
  const [partList, setPartList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState('');
  const token = localStorage.getItem("token");

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

  const handleDeletePart = async (id) => {
    try {
      const isConfirmed = window.confirm("Bạn có chắc muốn xóa part này không?");
      if (!isConfirmed) {
        return;
      }

      const response = await axios.delete(`http://localhost:8085/api/deletePart`, {
        params: {
          partId: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Part deleted successfully:', response.data);
      fetchData();
    } catch (error) {
      if (error.response.status === 409) {
        // Server responded with a status other than 2xx
        alert('part đã có câu hỏi không thể xóa');
      }
      else if (error.response.status === 403) {
        alert('Bạn không có quyền xóa part này');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/filterPart`, {
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
      setPartList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);
      setPartList([]);
    }
  };
  const fetchDataSkill = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/filterSkill`, {
        params: {
          pageNumber: 0,
          pageSize: 100,
          keyword: ''
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      console.log("Hoan thanh lay skill");

      const data = response.data;
      setSkillList(data.contents);
      // setPageNumber(data.pageNumber);
      // setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);
      setSkillList([]);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataSkill();
  }, [token, pageNumber, pageSize, keyword]);

  const handleEditClick = (part) => {
    setEditData(part);
    setShowEditPopup(true);
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditData({
  //     ...editData,
  //     [name]: value
  //   });
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:8085/api/updatePart',
        {
          id: editData.id,
          name: editData.name,
          description: editData.description,
          skillId: editData.skillDTO.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to update part');
      }

      const data = response.data;
      console.log('Part updated successfully:', data);
      window.alert('Thay đổi part thành công');
      // Cập nhật danh sách part sau khi chỉnh sửa thành công
      fetchData();

      // Đóng popup chỉnh sửa
      setShowEditPopup(false);
    } catch (error) {
      if (error.response.status === 409) {
        // Server responded with a status other than 2xx
        alert('part đã tồn tại');
      }
      else if (error.response.status === 403) {
        alert('Bạn không có quyền xóa part này');
      }
      else if (error.response.status === 404) {
        alert('câu hỏi không tồn tại');
      }
    }
  };

  return (
    <div className="w-full h-full p-12">
      <h1 className="font-semibold my-12 text-center text-3xl">Part Manage</h1>
      <button
        onClick={() => navigate('/part/addpart')}

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
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Skill</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {partList.map((part) => (
            <tr key={part.id}>
              <td className="border px-4 py-2">{part.id}</td>
              <td className="border px-4 py-2">{part.name}</td>
              <td className="border px-4 py-2">{part.description}</td>
              <td className="border px-4 py-2">{part.skillDTO.name}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  // onClick={handleEditClick(part)}
                  onClick={() => handleEditClick(part)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit
                </button>

                <button
                  onClick={() => handleDeletePart(part.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-center text-lg font-semibold mb-4">Edit Part</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Skill
              </label>
              <select
                name="skillDTO.id"
                value={editData.skillDTO.id}
                onChange={handleInputChange}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {skillList.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditPopup(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save
              </button>
            </div>
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

export default CreatePart;