import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAPIConText } from "../../../lib/context/APIContextProvider";
import axios from "axios";


import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";
import { set } from "date-fns";

const TestExam = () => {
    const [seconds, setSeconds] = useState(0);

    const [userAnswers, setUserAnswers] = useState({});
    const [questions, setQuestions] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [userQuestions, setUserQuestions] = useState(0);

    const [testId, setTestId] = useState(0);

    const [exams, setTest] = useState([]);
    const { id } = useParams();

    const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);


    const [showPopup, setShowPopup] = useState(false);

    //xử lý chọn câu hỏi lưu vào mảng selectedQuestionIds
    const handleQuestionClick = (id) => {
        if (!selectedQuestionIds.includes(id)) {
            setSelectedQuestionIds([...selectedQuestionIds, id]);
        }
    };

    //lấy dữ liệu câu hỏi bằng api 
    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/api/ExamTest/${id}`);
                console.log(response.data);
                setTest(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (id) {
            fetchExam();
        }
    }, [id]);

    //xử lý trường hợp người dùng thoát khỏi trang web khi đã chọn câu hỏi
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (selectedQuestionIds.length > 0) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [selectedQuestionIds]);

    //set thời gian làm bài 
    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    //xử lý giây thành thời gian hiển thị
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsLeft = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
    };
    if (exams.length === 0) {
        return <div>Loading...</div>;
    }
    let questionNumber = 0;
    let questionNumber1 = 0;

    //scroll đến câu hỏi chỉ định
    const scrollToQuestion = (questionId) => {
        const element = document.getElementById(questionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    //tính số câu làm được và chưa làm được
    const calculateQuestions = () => {
        let questionCount = 0;
        exams.map((exam) => (
            exam.topics.map(topic => {
                if (topic.questions && topic.questions.length > 0) {
                    questionCount += topic.questions.length;
                    console.log(questionCount);
                }
            })
        ));
        setUserQuestions(questionCount);
        setShowPopup(true);
    };

    //tính điểm số câu đúng và sai 
    const allQuestions = exams.reduce((acc, exam) => {
        const questionsFromTopics = exam.topics.reduce((topicAcc, topic) => {
            return topicAcc.concat(topic.questions);
        }, []);
        return acc.concat(questionsFromTopics);
    }, []);
    let correctAnswersCount = Object.values(userAnswers).filter(answer => answer.isCorrect).length;

    //xử lý nộp bài
    const handleSubmit = (event) => {
        event.preventDefault();
        const isConfirmed = confirm('Bạn có chắc chắn muốn nộp bài không?');

        if (isConfirmed) {

            saveTestStructureAndDetail();
            calculateQuestions();
            saveResult();

            setIsSubmitted(true);
            // setQuestions(allQuestions);
            setIsRunning(false);
            setIsButtonDisabled(true);

            console.log(isSubmitted);
            console.log(userAnswers);
            console.log('Hoàn thành');
        } else {
            console.log('Thất bại.');
        }

    };

    //lưu cấu trúc sinh ra bài thi, dùng bài thi + cấu trúc để lưu chi tiết câu hỏi trong bài thi
    const saveTestStructureAndDetail = async () => {
        try {
            const response1 = await axios.post(`http://localhost:8085/api/test/addTest?kindOfStructureId=${id}`);
            console.log('API TestStructureDetail:', response1.data);
            setTestId(response1.data);

            const response2 = await axios.post(`http://localhost:8085/api/testDetail/saveList?kindOfStructureId=${id}&testId=${response1.data}`);
            console.log('API TestDetail:', response2.data);
        } catch (error) {
            console.error('Error TestStructureDetail:', error);
        }
    };


    //lưu kết quả bài thi
    const saveResult = async () => {
        try {
            let questionCount = 0;
            exams.map((exam) => (
                exam.topics.map(topic => {
                    if (topic.questions && topic.questions.length > 0) {
                        questionCount += topic.questions.length;
                        console.log(questionCount);
                    }
                })
            ));
            const token1 = localStorage.getItem('token');
            const duLieu = `${correctAnswersCount}/${questionCount}`;
            const duLieuAPI = {
                totalMark: duLieu,
                structureId: id
            };
            const response1 = await axios.post(`http://localhost:8085/api/saveResult`,
                duLieuAPI,
                {
                    headers: {
                        Authorization: `Bearer ${token1}`,
                        'Content-Type': 'application/json'
                    }
                });
            console.log('API saveResult:', response1.data);

        } catch (error) {
            console.error('Error saveResult:', error);
        }
    };
    //lưu danh sách câu trả lời của user
    const handleAnswerChange = (questionId, answerId, isCorrect) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: { answerId, isCorrect }
        }));
    };
    const getPartDescription = (partId) => {
        switch (partId.toString()) {
            case '1': return "Part 5: You will complete the incomplete sentences by choosing the most appropriate word or phrase from four options.";
            case '2': return "Part 1: You will listen to a short description and choose the photograph that best matches the description from four options.";
            case '3': return "Part 2: You will listen to a question or statement and choose the most appropriate response from three options";
            case '4': return "Part 3: You will listen to conversations between two or more people. Each conversation has three questions, and you choose the correct answer from four options.";
            case '5': return "Part 4: You will listen to monologues or short talks. Each talk has three questions, and you choose the correct answer from four options.";
            case '6': return "Part 6: You will complete short texts by choosing the most appropriate word or phrase for each blank from four options.";
            case '7': return "Part 7: You will read passages, articles, emails, advertisements, etc., and answer questions related to the content of these texts. This part includes single-passage questions and multiple-passage questions.";
            default: return "Unknown Part";
        };
    };
    return (

        <div>
            <HeaderUser />
            <div className="w-1/6 bg-gray-100 p-4 float-right"
                style={{
                    position: 'sticky',
                    bottom: '100px',
                    top: '100px',
                    right: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: '300px',
                    overflowY: 'auto',
                    maxHeight: '500px'
                }}>
                <h1 className="text-2xl font-bold text-black">{formatTime(seconds)}</h1>
                <p className="font=bold text-orange-500 mt-4">Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để đánh dấu review</p>
                <h2 className="font-bold mb-4 mt-4" style={{ width: '100%' }}>Danh sách câu hỏi</h2>
                {exams.map((exam) => (
                    exam.topics.map((topic) =>
                        topic.questions.map((question) => {
                            return (
                                <div
                                    key={question.id}
                                    className={`cursor-pointer p-2 ${selectedQuestionIds.includes(question.id) ? 'bg-blue-500' : 'hover:bg-blue-400'}`}
                                    onClick={() => {
                                        scrollToQuestion(question.id);
                                    }}
                                    style={{ border: "solid 1px", borderRadius: '30%', width: '29px', height: '29px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px' }}
                                >
                                    {++questionNumber1}
                                </div>
                            );
                        })
                    )
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="w-5/6 p-4">
                    {exams.map((exam) => (
                        <div key={exam.id} className="shadow p-4 mb-4 bg-white">
                            <h1 className="text-2xl font-bold">{getPartDescription(exam.part_id)}</h1>
                            {exam.topics?.length > 0 ? (
                                exam.topics.map(topic => (
                                    <div key={topic.id} className="bg-gray-100 p-3 mb-3 flex">
                                        {topic.pathImage && (
                                            <div className="flex-shrink-0 mr-4">
                                                <img src={`/src/filedata/study4_image/part1_listening/${topic.pathImage}.png`} alt={topic.imageName} className="max-w-xl mb-2" />
                                            </div>
                                        )}
                                        <div className="flex-grow">
                                            {/* <p className="text-md mb-2">{topic.content}</p> */}
                                            {topic.pathAudio && (
                                                <audio controls className="mb-2">
                                                    <source src={`/src/filedata/study4_audio/part1_listening/${topic.pathAudio}.mp3`} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                            {topic.questions?.map((question) => (
                                                <div key={question.id} id={question.id} className="pl-4 mb-2">
                                                    {isSubmitted && !userAnswers[question.id] && <p className="text-red-500">Bạn chưa làm câu hỏi này</p>}
                                                    <h3 className="font-semibold">{`${++questionNumber}. ${question.name}`}</h3>

                                                    {question.answers?.map((answer) => (
                                                        <div
                                                            key={answer.id}
                                                            className={`flex items-center mb-2 ${isSubmitted && userAnswers[question.id]?.answerId === answer.id ? (answer.correctAnswer ? 'bg-green-500' : 'bg-red-500') : ''}`}
                                                            onClick={() => {
                                                                if (!isSubmitted) { // Chỉ xử lý click nếu bài chưa được nộp
                                                                    handleQuestionClick(question.id);
                                                                    handleAnswerChange(question.id, answer.id, !!answer.correctAnswer);
                                                                }
                                                            }}>
                                                            <input
                                                                type="radio"
                                                                id={`${answer.id}+${questionNumber}`}
                                                                name={`question-${question.id}`}
                                                                value={answer.content}
                                                                className="mr-2"
                                                                disabled={isButtonDisabled}
                                                            />
                                                            <label htmlFor={`${answer.id}+${questionNumber}`} className="text-md">
                                                                <div className="flex items-center">
                                                                    {answer.content}
                                                                    {isSubmitted && answer.correctAnswer &&
                                                                        <svg className="w-6 h-6 text-green-500 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path d="M5 13l4 4L19 7"></path>
                                                                        </svg>
                                                                    }
                                                                </div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No question available for this structure.</p>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit"
                    disabled={isButtonDisabled}
                    className="p-2 bg-blue-500 text-white rounded cursor-pointer">Chấm điểm
                </button>
            </form>
            <div>
                {isSubmitted && (
                    <button onClick={calculateQuestions}
                        className="mt-[10px] bg-green-500 text-white py-2 px-4 border-none rounded cursor-pointer text-lg">
                        Xem tổng kết
                    </button>
                )}
                {showPopup && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 rounded-lg shadow-lg min-w-[300px] min-h-[200px]">
                            <h2 className="text-lg font-semibold">Tổng kết</h2>
                            <p className="mt-2">Tổng câu hỏi: {userQuestions}</p>
                            <p className="mt-2">Số câu đúng: {correctAnswersCount}</p>
                            <p className="mt-2">Thời gian làm bài: {formatTime(seconds)}</p>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <FooterUser />
        </div>
    );
}
export default TestExam;    