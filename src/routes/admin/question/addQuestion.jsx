import { ca } from 'date-fns/locale';
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import debounce from 'lodash.debounce';

const QuestionForm = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [keyword, setKeyword] = useState('');

    let navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [topics, setTopics] = useState([]);


    // State cho form data
    const [formData, setFormData] = useState({
        name: '',
        topicId: '',
        answers: [
            { content: '', correctAnswer: false }
        ]
    });

    // Hàm xử lý thay đổi cho các trường nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Hàm xử lý thay đổi cho câu trả lời
    const handleAnswerChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const newAnswers = formData.answers.map((answer, i) => {
            if (i === index) {
                return {
                    ...answer,
                    [name]: type === 'checkbox' ? checked : value,
                };
            }
            return answer;
        });

        setFormData({
            ...formData,
            answers: newAnswers,
        });
    };

    // Hàm thêm câu trả lời mới
    const addAnswer = () => {
        setFormData({
            ...formData,
            answers: [
                ...formData.answers,
                { content: '', correctAnswer: false }
            ],
        });
    };

    // Hàm xóa câu trả lời
    const removeAnswer = (index) => {
        if (formData.answers.length > 1) {
            const newAnswers = formData.answers.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                answers: newAnswers,
            });
        } else {
            // Có thể hiển thị thông báo hoặc xử lý khác nếu cần
            console.log("Phải có ít nhất một câu trả lời.");
            alert("Phải có ít nhất một câu trả lời.");
        }
    };

    useEffect(() => {
        const fetchTopics = async () => {
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
                const data = response.data.contents;
                // Kiểm tra nếu data là một mảng trước khi gọi setTopics
                if (Array.isArray(data)) {
                    setTopics(data);
                } else {
                    console.error('API không trả về một mảng:', data);
                }
                console.log(data);
                console.log('lấy danh sách topic thành công');

                //   setTopicList(data.contents);
                //   setPageNumber(data.pageNumber);
                //   setTotalPage(data.totalPages);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTopics();
    }, []);
    // Hàm submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); // Thay bằng API gọi để lưu dữ liệu
        try {
            const response = await axios.post('http://localhost:8085/api/questions/createQuestion', {
                name: formData.name,
                topicId: formData.topicId,
                answers: formData.answers
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Question created successfully:', response.data);
            alert('Tạo câu hỏi thành công');
            navigate('/question');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Server responded with a status other than 2xx
                alert('Câu hỏi đã tồn tại');
            } else if (error.response && error.response.status === 403) {
                alert('Bạn không có quyền tạo câu hỏi');
            } else if (error.response && error.response.status === 404) {
                alert('Topic không tồn tại');
            }
            else {
                console.error('An error occurred:', error);
                alert('Đã xảy ra lỗi, vui lòng thử lại sau');
            }
        }
    };

    return (
        <div className="bg-gray-100 p-12 rounded-md shadow-lg">
            <h1 className="mt-10 text-3xl font-bold mb-4 mx-auto text-center">Add question</h1>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nội dung câu hỏi:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Chọn chủ đề:</label>
                    <select
                        name="topicId"
                        value={formData.topicId}
                        onChange={handleChange}
                        required
                        // size={10}
                        className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 max-h-[50px] overflow-y-auto"
                    >
                        <option value="">Chọn một chủ đề</option>
                        {topics.map((topic) => (
                            <option
                                key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                {formData.answers.map((answer, index) => (
                    <div key={index} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Câu trả lời {index + 1}:</label>
                        <input
                            type="text"
                            name="content"
                            value={answer.content}
                            onChange={(e) => handleAnswerChange(index, e)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <label className="inline-flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="correctAnswer"
                                checked={answer.correctAnswer}
                                onChange={(e) => handleAnswerChange(index, e)}
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-sm text-gray-700">Đúng</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => removeAnswer(index)}
                            className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Xóa
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addAnswer}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Thêm câu trả lời
                </button>

                <button
                    type="submit"
                    className="ml-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Lưu
                </button>
            </form>
            
        </div>
        
    );
};

export default QuestionForm;
