import { Box, Button, Flex, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FirstPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  const getAllProducts = async () => {
    await axios
      .get(`http://localhost:8085/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const test = [
    { id: 1, name: "test 1", description: "Description of test 1", number: 100 },
    { id: 2, name: "test 2", description: "Description of test 2", number: 200 },
    { id: 3, name: "test 3", description: "Description of test 3", number: 300 },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 py-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            Home
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/products" className="text-gray-300 hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Flex
        justify="center"
        align="center"
        direction="column"
        p={24}
      >
        <Flex
          as={Link}
          href="/"
          justify="center"
          align="center"
          mb={8}
          fontWeight="bold"
          fontSize="24px"
        >
          Trang chủ
        </Flex>
        <VStack spacing={8}>
          {test.map((product, index) => (
            <Flex
              key={index}
              justify="center"
              align="center"
              direction="column"
              p={6}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="lg"
              transition="box-shadow 0.2s"
              _hover={{ boxShadow: "xl" }}
            >
              <Heading size="md" mb={4}>{product.name}</Heading>
              <Text color="gray.500" mb={4}>{product.description}</Text>
              <Flex justify="space-between" align="center" w="full">
                <Text fontWeight="bold">
                  {product.number} người đã làm
                </Text>
                <Button
                  colorScheme="teal"
                  onClick={() => navigate("/product-detail", { state: { product } })}
                >
                  làm ngay
                </Button>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </div>
  );
};

export default FirstPage;
