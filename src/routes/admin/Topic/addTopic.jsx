import React, { useState, useEffect } from "react";
import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";

const AddTopic = () => {
  const [levelList, setLevelList] = useState([]);
  const [partList, setPartList] = useState([]);


  let navigate = useNavigate();

  const [pngFile, setPngFile] = useState('');
  const [mp3File, setMp3File] = useState('');
  const [part, setPart] = useState('');
  const [level, setLevel] = useState('');
  const [name, setName] = useState('');


  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(50);
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/filterLevel`, {
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
      setLevelList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);

      setLevelList([]);
    }
  };
  const fetchDataPart = async () => {
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
  useEffect(() => {
    fetchData();
    fetchDataPart();
  }, [token, pageNumber, pageSize, keyword]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    let pngCount = 0;
    let mp3Count = 0;

    selectedFiles.forEach(file => {
      if (file.type === 'image/png') {
        pngCount++;
      } else if (file.type === 'audio/mpeg') {
        mp3Count++;
      }
    });

    if (pngCount > 1 || mp3Count > 1) {
      // setError('Chỉ được phép chọn một hình ảnh và một âm thanh.');
      window.alert('Hệ thống chỉ hỗ trợ 1 hình ảnh và 1 âm thanh.');
      // fetchData();
      return;
    }
    else{
      selectedFiles.forEach(file => {
        if (file.type === 'image/png' && !pngFile) {
          const fileName = file.name.replace('.png', '');
          setPngFile(fileName);
        } else if (file.type === 'audio/mpeg' && !mp3File) {
          const fileName = file.name.replace('.mp3', '');
          setMp3File(fileName);
        }
      });
    }
    // setError('');
  };

  const handleSubmit = async (e) => {
    // window.alert('Lỗi server');
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8085/api/topic/createTopic`, {
        name: name,
        imageName: pngFile,
        audioName: mp3File,
        partId: part,
        levelId: level
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      window.alert('Topic created successfully!');
      navigate('/topic');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="w-full h-full bg-gray-100 p-12 rounded-md shadow-lg">
      <h1 className="font-semibold my-12 text-center text-3xl">Add Topic</h1>

      <form className="mt-8 space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Chọn part:</label>
            <select
              name="topicId"
              value={part}
              onChange={(e) => setPart(e.target.value)}
              required
              className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 max-h-[50px] overflow-y-auto"
            >
              <option value="">Chọn một part</option>
              {partList.map((part) => (
                <option
                  key={part.id} value={part.id}>
                  {part.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="part" className="mt-4 block text-sm font-medium text-gray-700">Chọn part</label>
            <select
              id="skill"
              name="skill"
              required
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={part}
              onChange={(e) => setPart(e.target.value)}
            >
              <option value="">Select Part</option>
              <option value="2">Part 1: Listening</option>
              <option value="3">Part 2: Listening</option>
              <option value="4">Part 3: Listening</option>
              <option value="5">Part 4: Listening</option>
              <option value="1">Part 5: Listening</option>
              <option value="6">Part 6: Listening</option>
              <option value="7">Part 7: Listening</option>

            </select>
          </div> */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Chọn Level:</label>
            <select
              name="topicId"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 max-h-[50px] overflow-y-auto"
            >
              <option value="">Chọn một level</option>
              {levelList.map((part) => (
                <option
                  key={part.id} value={part.id}>
                  {part.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="skill" className="mt-4 block text-sm font-medium text-gray-700">Chọn độ khó</label>
            <select
              id="level"
              name="level"
              required
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="1">easy</option>
              <option value="2">hard</option>
              <option value="3">average</option>
            </select>
          </div> */}
          <div>
            <label htmlFor="name" className="mt-4 block text-sm font-medium text-gray-700">Tên topic</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="file" className="sr-only">Upload File</label>
            <input
              id="file"
              name="file"
              type="file"
              multiple
              required
              onChange={handleFileChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTopic;