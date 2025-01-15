import React, { useState, useEffect } from "react";
import { Button, Input, FormControl, FormLabel, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Stack, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";

const CreateStructure = () => {
  const [structureData, setStructureData] = useState({
    name: '',
    number_of_topic: '',
    level_of_topic: '',
    partId: '',
    kinfOfStructureId: ''
  });

  const [structureList, setStructureList] = useState([]);
  const [filteredStructureList, setFilteredStructureList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [keyword, setKeyword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const token = localStorage.getItem("token");

  // Fetch structure data
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/structures?page=${pageNumber}&size=5`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStructureList(response.data.content || []);
      setTotalPage(response.data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStructureData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle search input change
  const handleSearch = (e) => {
    const { value } = e.target;
    setKeyword(value);

    // Filter structure list based on search keyword
    if (value.trim() === '') {
      setFilteredStructureList(structureList);
    } else {
      setFilteredStructureList(structureList.filter(structure =>
        structure.name.toLowerCase().includes(value.toLowerCase())
      ));
    }
  };

  // Add new structure
  const handleAddStructure = async () => {
    try {
      const { name, number_of_topic, level_of_topic, partId, kinfOfStructureId } = structureData;
      const newStructure = {
        name,
        number_of_topic: parseInt(number_of_topic),
        level_of_topic,
        part: { id: parseInt(partId) },
        kinfOfStructure: { id: parseInt(kinfOfStructureId) }
      };

      const response = await axios.post('http://localhost:8085/api/saveStructure', newStructure, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        alert("Structure added successfully!");
        fetchData();
        setStructureData({
          name: '',
          number_of_topic: '',
          level_of_topic: '',
          partId: '',
          kinfOfStructureId: ''
        });
        onClose();
      }
    } catch (error) {
      console.error('Error adding structure:', error);
      alert("Error adding structure");
    }
  };

  // Handle view details
  const handleViewDetails = (structure) => {
    setSelectedStructure(structure);
    onDetailOpen();
  };

  // Handle test based on structure ID
  const handleTestStructure = async (structure) => {
    try {
        // Fetch test data using structure.id
        const response = await axios.get(`http://localhost:8085/api/ExamTest/${structure.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            const testData = response.data;
            alert(`Test started for structure: ${structure.name}`);
            // You can now use testData.structure and testData.questions to render the test interface
        }
    } catch (error) {
        console.error("Error starting the test:", error);
        alert("Error starting the test.");
    }
};

  useEffect(() => {
    fetchData();
  }, [token, pageNumber]);

  // Update filtered structure list when structure list changes
  useEffect(() => {
    setFilteredStructureList(structureList);
  }, [structureList]);

  return (
    <div>
      <Text className="font-semibold my-12 text-center text-3xl">Structure Manage</Text>
      
      <Button onClick={onOpen} colorScheme="green" leftIcon={<PlusIcon className="h-5 w-5" />} mb={6}>
        Add Structure
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Structure</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={structureData.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Number of Topics</FormLabel>
                <Input
                  type="number"
                  name="number_of_topic"
                  value={structureData.number_of_topic}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Level of Topic</FormLabel>
                <Select
                  name="level_of_topic"
                  value={structureData.level_of_topic}
                  onChange={handleInputChange}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Part</FormLabel>
                <Select
                  name="partId"
                  value={structureData.partId}
                  onChange={handleInputChange}
                >
                  <option value="1">Part 1: Listening</option>
                  <option value="2">Part 2: Listening</option>
                  <option value="3">Part 3: Listening</option>
                  <option value="4">Part 4: Listening</option>
                  <option value="5">Part 5: Reading</option>
                  <option value="6">Part 6: Reading</option>
                  <option value="7">Part 7: Reading</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Kind of Structure</FormLabel>
                <Select
                  name="kinfOfStructureId"
                  value={structureData.kinfOfStructureId}
                  onChange={handleInputChange}
                >
                  <option value="1">Structure 1</option>
                  <option value="2">Structure 2</option>
                  <option value="3">Structure 3</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddStructure}>
              Add Structure
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <div className="mt-4 mb-2">
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search by structure name..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>

      <Box overflowX="auto" mt={6}>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-center w-1/12">STT</th>
              <th className="border px-4 py-2 text-center w-1/12">Number of Topics</th>
              <th className="border px-4 py-2 text-center w-1/6">Level of Topic</th>
              <th className="border px-4 py-2 text-center w-1/6">Name</th>
              <th className="border px-4 py-2 text-center w-1/6">Part</th>
              <th className="border px-4 py-2 text-center w-1/6">Kind of Structure</th>
              <th className="border px-4 py-2 text-center w-1/9">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStructureList && filteredStructureList.length > 0 ? (
              filteredStructureList.map((structure, index) => (
                <tr key={structure.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-4 py-2 text-center">{index + 1 + pageNumber * 5}</td>
                  <td className="border px-4 py-2 text-center">{structure.number_of_topic}</td>
                  <td className="border px-4 py-2 text-center">{structure.level_of_topic}</td>
                  <td className="border px-4 py-2 text-center">{structure.name || "Unnamed"}</td>
                  <td className="border px-4 py-2 text-center">{structure.part?.id}</td>
                  <td className="border px-4 py-2 text-center">{structure.kinfOfStructure?.name || "No Structure"}</td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <Button colorScheme="blue" onClick={() => handleViewDetails(structure)}>
                      Detail
                    </Button>
                    <Button colorScheme="yellow" onClick={() => handleTestStructure(structure)}>
                      Test Structure
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No structures available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

      {/* Pagination */}
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

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Structure Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedStructure && (
              <div className="space-y-4">
                <Box>
                  <Text fontWeight="bold">Name:</Text>
                  <Text>{selectedStructure.name}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Number of Topics:</Text>
                  <Text>{selectedStructure.number_of_topic}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Level of Topic:</Text>
                  <Text>{selectedStructure.level_of_topic}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Part:</Text>
                  <Text>{selectedStructure.part?.id}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Kind of Structure:</Text>
                  <Text>{selectedStructure.kinfOfStructure?.name || 'No Structure'}</Text>
                </Box>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onDetailClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateStructure;
