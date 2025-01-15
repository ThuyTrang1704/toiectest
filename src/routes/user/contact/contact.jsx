import React, { useState } from "react";
import axios from "axios";
import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";

const Contact = () => {
    const [to, setTo] = useState("");
    const [subject] = useState("Test send mail FE");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleSendMail = async () => {
        if (!to || !text) {
            setMessage("Please fill all required fields.");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to send this message?");
        if (!isConfirmed) return;

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                `http://localhost:8085/mail/send`,
                {
                    to,
                    subject,
                    text,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setMessage("Message sent successfully!");
            console.log("Response:", response.data);
        } catch (error) {
            setMessage("Failed to send message. Please try again later.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <HeaderUser />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
                <p className="text-center text-gray-600 mb-8">
                    Have a question? Fill out the form and we'll get back to you soon.
                </p>

                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Your email"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Message</label>
                        <textarea
                            placeholder="Your message"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        ></textarea>
                    </div>

                    {message && <p className="text-center text-red-500 mb-4">{message}</p>}

                    <button
                        onClick={handleSendMail}
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-700 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </div>
            <FooterUser />
        </div>
    );
};

export default Contact;
