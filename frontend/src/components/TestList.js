import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { UserContext } from "../utils/userContext";
import { getTestsByPartnerId, updateTestsByPartnerId } from "../services/partnerService";

const TestList = () => {
  const { userId } = useContext(UserContext);

  const [tests, setTests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTest, setNewTest] = useState({ name: "", price: "" });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await getTestsByPartnerId(userId);
        setTests(response);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [userId]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes to the backend
      updateTestsByPartnerId(userId, tests);
    }
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e, testId) => {
    const { name, value } = e.target;
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === testId ? { ...test, [name]: value } : test
      )
    );
  };

  const handleClearTest = (testId) => {
    setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
  };

  const handleNewTestChange = (e) => {
    const { name, value } = e.target;
    setNewTest((prevTest) => ({
      ...prevTest,
      [name]: value,
    }));
  };

  // Add new test only when the "Add" button is pressed
  const handleAddTest = () => {
    if (newTest.name && newTest.price) {
      setTests((prevTests) => [
        ...prevTests,
        { partner_id: userId, name: newTest.name, price: newTest.price },
      ]);
      setNewTest({ name: "", price: "" });
    }
  };

  if (!tests) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading Data...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Paper sx={{ padding: 3, marginTop: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Offered Tests</Typography>
        <Button variant="contained" color="primary" onClick={handleEditToggle}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) =>
              isEditing ? (
                <TableRow key={test.id}>
                  <TableCell>
                    <TextField
                      label="Test Name"
                      fullWidth
                      value={test.name}
                      onChange={(e) => handleInputChange(e, test.id)}
                      name="name"
                      sx={{ marginBottom: 2 }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Price"
                      fullWidth
                      value={test.price}
                      onChange={(e) => handleInputChange(e, test.id)}
                      name="price"
                      sx={{ marginBottom: 2 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleClearTest(test.id)}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.price}</TableCell>
                </TableRow>
              )
            )}

            {isEditing && (
              <TableRow>
                <TableCell>
                  <TextField
                    label="Test Name"
                    fullWidth
                    value={newTest.name}
                    onChange={handleNewTestChange}
                    name="name"
                    sx={{ marginBottom: 2 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Price"
                    fullWidth
                    value={newTest.price}
                    onChange={handleNewTestChange}
                    name="price"
                    sx={{ marginBottom: 2 }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={handleAddTest}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TestList;
