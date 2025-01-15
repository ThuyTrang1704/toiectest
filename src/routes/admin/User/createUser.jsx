import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const CreateUser = () => {
  const [topicList, setTopicList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem("token");

  const [showForm, setShowForm] = useState(false); // To toggle form visibility
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    roleId: "",
  });

  const [showDetail, setShowDetail] = useState(false); // To show user details form
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
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
      const response = await axios.get("http://localhost:8085/api/user/filterUser", {
        params: {
          pageNumber,
          pageSize: 5,
          keyword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTopicList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTopicList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, keyword]);

  const handleDelete = async (userId) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    
    if (isConfirmed) {
      try {
        // Update the API endpoint URL to match the format
        await axios.delete(`http://localhost:8085/api/user/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("User deleted successfully!");
        fetchData(); // Refresh the user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed Delete failed because user data exists.");
      }
    } else {
      alert("User deletion cancelled.");
    }
  };
  
  

  const handleDetail = (user) => {
    setUserData(user);
    setShowDetail(true); // Show the detail form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:8085/api/user/add", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User added successfully!");
      setShowForm(false); // Close the form after submission
      setUserData({
        name: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        roleId: "",
      });
      fetchData(); // Refresh the user list after adding
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  // To reset the form when opening it again
  const openAddUserForm = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      roleId: "",
    });
    setShowForm(true);
  };

  return (
    <div className="w-full h-full p-12">
      <h1 className="font-semibold my-12 text-center text-3xl">Users Management</h1>

      {/* Button to trigger modal */}
      <div className="flex justify-start mb-4">
        <button
          onClick={openAddUserForm} // Open form and reset data
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add User
        </button>
        <button
          onClick={openAddUserForm} // Open form and reset data
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add user file excel
        </button> 
      </div>

      {/* Modal for Add User Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add User</h2>
            <form>
              {/* Form fields for user data */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter user's name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter user's email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter user's address"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role ID</label>
                <input
                  type="number"
                  name="roleId"
                  value={userData.roleId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter role ID"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for User Details */}
      {showDetail && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Details</h2>
            <form>
              {/* Form fields for displaying user details */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowDetail(false)} // Close detail form
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search input */}
      <div className="mt-4 mb-2">
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>

      {/* User Table */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">PhoneNumber</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {topicList.map((topic, index) => (
            <tr key={topic.id}>
              <td className="border px-4 py-2">{index + 1 + pageNumber * 5}</td>
              <td className="border px-4 py-2">{topic.name}</td>
              <td className="border px-4 py-2">{topic.email}</td>
              <td className="border px-4 py-2">{topic.address}</td>
              <td className="border px-4 py-2">{topic.phoneNumber}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => handleDetail(topic)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Detail
                </button>
                <button
                  onClick={() => handleDelete(topic.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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

export default CreateUser;
