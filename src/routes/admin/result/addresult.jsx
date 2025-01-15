import React, { useState, useEffect } from "react";
import { Button, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input } from "@chakra-ui/react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";

const addresult = () => {
  const [resultList, setResultList] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const token = localStorage.getItem("token");

  // Fetch result data (structureList -> resultList)
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/results?page=${pageNumber}&size=5&search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResultList(response.data.content || []);
      setTotalPage(response.data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch user results for a specific resultId
  const fetchUserResults = async (resultId) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/results/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserResults(response.data.content || []);
    } catch (error) {
      console.error('Error fetching user results:', error);
    }
  };

  // Handle view details
  const handleViewDetails = (result) => {
    setSelectedResult(result);
    fetchUserResults(result.id); // Fetch user results for the selected result
    onDetailOpen();
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, searchTerm]); // Dependency array includes searchTerm

  return (
    <div>
      <Text className="font-semibold my-12 text-center text-3xl">Result Manage</Text>

      {/* Search Bar */}
      <Box mb={6} textAlign="center">
        <Input
          placeholder="Search by Result"
          value={searchTerm}
          onChange={handleSearchChange}
          size="md"
          maxWidth="4000px"
          margin="auto"
        />
      </Box>

      {/* Result List Table */}
      <Box overflowX="auto" mt={6}>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-center w-1/12">STT</th>
              <th className="border px-4 py-2 text-center w-1/12">User Email</th>
              <th className="border px-4 py-2 text-center w-1/12">Total Mark</th>
              <th className="border px-4 py-2 text-center w-1/12">Status</th>
              <th className="border px-4 py-2 text-center w-1/12">Created At</th>
              <th className="border px-4 py-2 text-center w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {resultList && resultList.length > 0 ? (
              resultList.map((result, index) => (
                <tr key={result.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-4 py-2 text-center">{index + 1 + pageNumber * 5}</td>
                  <td className="border px-4 py-2 text-center">{result.userEmail}</td>
                  <td className="border px-4 py-2 text-center">{result.totalMark}</td>
                  <td className="border px-4 py-2 text-center">{result.status}</td>
                  <td className="border px-4 py-2 text-center">{new Date(result.createAt).toLocaleString()}</td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <Button colorScheme="green" onClick={() => handleViewDetails(result)}>
                      Detail
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No results available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
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

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Result Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedResult ? (
              <div>
                <p><strong>User Email:</strong> {selectedResult.userEmail}</p>
                <p><strong>Total Mark:</strong> {selectedResult.totalMark}</p>
                <p><strong>Status:</strong> {selectedResult.status}</p>
                <p><strong>Created At:</strong> {new Date(selectedResult.createAt).toLocaleString()}</p>
                <p><strong>User Results:</strong></p>
                <ul>
                  {userResults && userResults.length > 0 ? (
                    userResults.map((result, index) => (
                      <li key={index}>
                        <p><strong>Email:</strong> {result.userEmail}</p>
                        <p><strong>Total Mark:</strong> {result.totalMark}</p>
                        <p><strong>Status:</strong> {result.status}</p>
                        <p><strong>Created At:</strong> {new Date(result.createAt).toLocaleString()}</p>
                      </li>
                    ))
                  ) : (
                    <p>No results available</p>
                  )}
                </ul>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onDetailClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default addresult;
