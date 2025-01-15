import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from 'lodash.debounce';
import { format, parseISO } from 'date-fns';



const editadmin = () => {
    const [profile, setProfile] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [resultList, setResultList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/user/profile/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(response.data);
            setName(response.data.name);
            setAddress(response.data.address);
            setPhoneNumber(response.data.phoneNumber);
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/api/filterUserResult`, {
                params: {
                    keyword: debouncedKeyword,
                    pageNumber: currentPage - 1,
                    pageSize: 10
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResultList(response.data.contents);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:8085/api/user/updateNguoiDung', {
                name,
                address,
                phoneNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Profile updated successfully:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('New password and confirmation password do not match!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8085/api/user/change-password', {
                email: profile.email,
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Password changed successfully!');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please check your input.');
        }
    };

    const formatDate = (dateStr) => {
        const date = parseISO(dateStr);
        return format(date, 'dd/MM/yyyy HH:mm:ss');
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchData();
    }, [token, debouncedKeyword, currentPage]);

    return (
        <div>
            <HeaderUser />
            <h1 className="text-5xl font-bold text-center mt-16 mb-10">MY PROFILE</h1>

            <div className="w-1/2 mx-auto">
                <table className="table-auto w-full mt-4 border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Field</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Email</td>
                            <td className="border border-gray-300 px-4 py-2">{profile.email}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Name</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Address</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Phone Number</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Password</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                                    />
                                    <button
                                        onClick={handleChangePassword}
                                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center py-4">
                                <button
                                    onClick={handleSave}
                                    className="mx-auto px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <FooterUser />
        </div>
    );
};

export default editadmin;
