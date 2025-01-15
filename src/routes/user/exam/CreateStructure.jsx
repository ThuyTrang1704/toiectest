import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";

const CreateStructure = () => {
    let token = localStorage.getItem("token");
    let navigate = useNavigate();

    // Helper function to return the part name
    const getDataByData = (part_id) => {
        switch (part_id) {
            case '2': return "Part 1: Listening";
            case '3': return "Part 2: Listening";
            case '4': return "Part 3: Listening";
            case '5': return "Part 4: Listening";
            case '1': return "Part 5: Reading";
            case '6': return "Part 6: Reading";
            case '7': return "Part 7: Reading";
            default: return "Unknown Part";
        }
    };

    // Helper function to return the total number of questions
    const getTotalQuestion = (numberTopic, partId) => {
        switch (partId) {
            case '2': return numberTopic * 1;
            case '3': return numberTopic * 1;
            case '4': return numberTopic * 3;
            case '5': return numberTopic * 3;
            case '1': return numberTopic * 1;
            case '6': return numberTopic * 4;
            case '7': return `${numberTopic * 2} - ${numberTopic * 5}`;
            default: return "Unknown Part";
        }
    };

    // Helper function to return the minimum required number of questions for each part
    const getMinimumRequiredQuestions = (partId) => {
        switch (partId) {
            case '2': return 1;  // Part 1: Listening
            case '3': return 1;  // Part 2: Listening
            case '4': return 3;  // Part 3: Listening
            case '5': return 3;  // Part 4: Listening
            case '1': return 1;  // Part 5: Reading
            case '6': return 4;  // Part 6: Reading
            case '7': return 2;  // Part 7: Reading (minimum of 2, based on range)
            default: return 0;
        }
    };

    const [formData, setFormData] = useState({
        number_of_topic: '',
        level_of_topic: '',
        part_id: '',
    });

    const [formEntries, setFormEntries] = useState([]);
    const [editFormData, setEditFormData] = useState(null);
    const [number, setNumber] = useState([]);

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
const handleSubmitForm = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');

    if (!allFieldsFilled) {
        alert('Vui lòng điền đủ thông tin cấu trúc!!!');
        return;
    }

    const isPartIdExist = formEntries.some(entry => entry.part_id === formData.part_id);

    if (isPartIdExist) {
        alert('Part đã tồn tại, vui lòng chọn Part khác.');
        return;
    }

    // Check if the number of questions is sufficient for each part
    const minQuestionsRequired = getMinimumRequiredQuestions(formData.part_id);
    if (formData.number_of_topic < minQuestionsRequired) {
        alert(`Số câu hỏi cho ${getDataByData(formData.part_id)} không đạt tiêu chuẩn đề thi toeic. Cần tối thiểu ${minQuestionsRequired} câu hỏi. Vui lòng chọn lại số câu hỏi tối thiểu đề làm bài.`);
        return;
    }

    setFormEntries([...formEntries, formData]);
    setFormData({ number_of_topic: '', level_of_topic: '', part_id: '' });
};

    // Handle Delete
    const handleDelete = (indexToDelete) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa topic này không?");
        if (isConfirmed) {
            const newFormEntries = formEntries.filter((_, index) => index !== indexToDelete);
            setFormEntries(newFormEntries);
        }
    };

    // Handle Edit Click
    const handleEditClick = (index) => {
        const formEntry = formEntries[index];
        setNumber(index);
        setEditFormData(formEntry);
    };

    // Handle input change in Edit Form
    const handleInputEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Handle Edit Form submission
    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        // Check for duplicate part_id when editing
        const isDuplicate = formEntries.some((entry, idx) =>
            idx !== number && entry.part_id === editFormData.part_id
        );

        if (isDuplicate) {
            alert(`${getDataByData(editFormData.part_id)} đã tồn tại.`);
            return;
        }

        setFormEntries(currentEntries =>
            currentEntries.map((entry, idx) =>
                idx === number ? { ...entry, ...editFormData } : entry
            )
        );

        setEditFormData(null);
    };

    // Close the Edit form
    const handleEditClose = () => {
        setEditFormData(null);
    };

    // Submit all form entries
    const submitFormEntries = async () => {
        if (!formEntries || formEntries.length === 0) {
            alert("Bạn chưa thêm cấu trúc nào.");
            return;
        }

        const isConfirmed = window.confirm("Bạn chắc chắn muốn làm cấu trúc này chứ?");
        if (isConfirmed) {
            const url = 'http://localhost:8085/api/saveStructure';
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formEntries),
                });

                if (!response.ok) {
                    throw new Error('Có lỗi đã xảy ra');
                }

                const responseData = await response.json();
                console.log('Success:', responseData);
                setFormEntries([]);
                navigate(`/testExam/${responseData}`);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Prevent leaving the page with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = e => {
            if (formEntries.length > 0) {
                e.preventDefault();
                e.returnValue = "Bạn có chắc chắn muốn rời đi? Thông tin bạn đã nhập có thể không được lưu.";
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [formEntries]);

    return (
        <div>
            <HeaderUser />
            <nav className="min-h-[500px]">
                <div className="w-2/3 mx-auto ">
                    <h1 className="mt-5 mb-5 font-bold text-center text-3xl">Structure Form</h1>
                    <div className="flex justify-center items-center ">
                        <form onSubmit={handleSubmitForm} className="w-1/2 border border-black-500 rounded p-4 space-y-4">
                            <select
                                name="part_id"
                                value={formData.part_id}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            >
                                <option value="">Part</option>
                                <option value="2">Part 1: Listening</option>
                                <option value="3">Part 2: Listening</option>
                                <option value="4">Part 3: Listening</option>
                                <option value="5">Part 4: Listening</option>
                                <option value="1">Part 5: Reading</option>
                                <option value="6">Part 6: Reading</option>
                                <option value="7">Part 7: Reading</option>
                            </select>
                            <select
                                name="level_of_topic"
                                value={formData.level_of_topic}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            >
                                <option value="">Level</option>
                                <option value="easy">EASY</option>
                                <option value="average">AVERAGE</option>
                                <option value="hard">HARD</option>
                            </select>
                            <input
                                name="number_of_topic"
                                type="number"
                                value={formData.number_of_topic}
                                required
                                onChange={handleInputChange}
                                placeholder="Amount of question"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <div className="flex justify-center">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Add Structure
                                </button>
                            </div>
                        </form>
                    </div>
                    <table className="min-w-full leading-normal mt-10">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Number of Topic
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Level
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Part
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {formEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{entry.number_of_topic}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{entry.level_of_topic}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{getDataByData(entry.part_id)}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => handleEditClick(index)} className="text-blue-500">Edit</button>
                                        <button onClick={() => handleDelete(index)} className="text-red-500 ml-3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-5">
                        <button onClick={submitFormEntries} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </div>
            </nav>
            <FooterUser />
        </div>
    );
};

export default CreateStructure;
