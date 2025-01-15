import React, { useState, useEffect } from "react";
import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const Dashboard = () => {
    const [countResult, setCountResult] = useState(null);
    const [countUser, setCountUser] = useState(null);
    const [countStructure, setCountStructure] = useState(null);
    const [countTopic, setCountTopic] = useState(null);
    const [countLevel, setCountLevel] = useState(null);
    const [countSkill, setCountSkill] = useState(null);
    const [countPart, setCountPart] = useState(null);
    const [countQuestion, setCountQuestion] = useState(null);

    const token = localStorage.getItem("token");
    let navigate = useNavigate();

    const useIncrementingCount = (targetCount) => {
        const [displayedCount, setDisplayedCount] = useState(0);
    
        useEffect(() => {
            let currentCount = 0;
            const increment = Math.ceil(targetCount / 100); // Adjust the increment value as needed
            const interval = setInterval(() => {
                currentCount += increment;
                if (currentCount >= targetCount) {
                    currentCount = targetCount;
                    clearInterval(interval);
                }
                setDisplayedCount(currentCount);
            }, 20); // Adjust the interval time as needed
    
            return () => clearInterval(interval);
        }, [targetCount]);
    
        return displayedCount;
    };
    const displayedCountUser = useIncrementingCount(countUser);
    const displayedCountResult = useIncrementingCount(countResult);
    const displayedCountStructure = useIncrementingCount(countStructure);
    const displayedCountTopic = useIncrementingCount(countTopic);
    const displayedCountLevel = useIncrementingCount(countLevel);
    const displayedCountSkill = useIncrementingCount(countSkill);
    const displayedCountPart = useIncrementingCount(countPart);
    const displayedCountQuestion = useIncrementingCount(countQuestion);

    const fetchCountResult = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/countResult", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountResult(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountTopic = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/topic/filterTopic", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountTopic(response.data.totalItems);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountUser = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/user/countUsers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountStructure = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/countStructure", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountStructure(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountLevel = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/filterLevel", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountLevel(response.data.totalItems);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountSkill = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/filterSkill", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountSkill(response.data.totalItems);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountPart = async () => {
        try {
            const response = await axios.get("http://localhost:8085/api/filterPart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCountPart(response.data.totalItems);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    const fetchCountQuestion = async () => {
        try {
            // Gọi API filterQuestion để lấy thông tin câu hỏi
            const response = await axios.get("http://localhost:8085/api/questions/filterQuestion", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            // Lấy totalItems (tổng số câu hỏi) từ phản hồi của API
            setCountQuestion(response.data.totalItems);  // Chắc chắn rằng response.data có thuộc tính totalItems
            console.log(response.data);  // In ra dữ liệu để kiểm tra
    
        } catch (error) {
            console.error("Error fetching count result:", error);
        }
    };
    
    
    useEffect(() => {
        fetchCountTopic();
        fetchCountStructure();
        fetchCountUser();
        fetchCountResult();
        fetchCountLevel();
        fetchCountSkill();
        fetchCountPart();
        fetchCountQuestion();
    }, [token]);

    return (
        <div className="p-4">
            <h1 className="text-center text-2xl font-bold mb-8 mt-5">THỐNG KÊ</h1>
            {countResult !== null ? (
                <div className="flex justify-between w-full px-4 space-x-10">
                    
                    <div 
                        onClick={() => navigate("/user")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageUser.png" alt="User Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-4xl text-lg font-bold">{displayedCountUser}</span>
                            <p className="text-lg">USER</p>
                        </div>
                    </div>
                    <div
                    onClick={() => navigate("/result")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageResult.jpg" alt="Result Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{displayedCountResult}</span>
                            <p className="text-lg">RESULT</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => navigate("/structure")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageBook.png" alt="Structure Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{displayedCountStructure}</span>
                            <p className="text-lg">STRUCTURE</p>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/topic")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageBuilding.png" alt="Result Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{displayedCountTopic}</span>
                            <p className="text-lg">TOPIC</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
            {countResult !== null ? (
                <div className="mt-20  flex justify-between w-full px-4 space-x-10">
                    
                    <div 
                        onClick={() => navigate("/level")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageLevel.png" alt="User Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-4xl text-lg font-bold">{displayedCountLevel}</span>
                            <p className="text-lg">LEVEL</p>
                        </div>
                    </div>
                    <div
                        onClick={() => navigate("/skill")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageSkill.png" alt="Result Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{displayedCountSkill}</span>
                            <p className="text-lg">SKILL</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => navigate("/part")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imagePart.png" alt="Structure Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{displayedCountPart}</span>
                            <p className="text-lg">PART</p>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/question")}
                        className="flex items-center p-4 border rounded-lg bg-gray-100 w-1/4 cursor-pointer hover:bg-gray-200">
                        <img src="../../src/filedata/study4_image/imageQuestion.png" alt="Result Icon"
                            className="text-2xl text-blue-500 mr-4 h-20 w-20" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{displayedCountQuestion}</span>
                            <p className="text-lg">QUESTION</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
        </div>
    );
};

export default Dashboard;