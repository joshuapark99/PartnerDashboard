import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import { UserContext } from "../utils/userContext";
import { getHoursById, updateHoursById } from "../services/partnerService";

const WorkHours = () => {
  const { userId } = useContext(UserContext);
  const [workHours, setWorkHours] = useState(null);
  const [editedWorkHours, setEditedWorkHours] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Helper: convert array of periods to a string
  const periodsToString = (periods) => {
    if (!Array.isArray(periods)) return "";
    return periods
      .map((period) => `${period.start_time} - ${period.end_time}`)
      .join(", ");
  };

  // Helper: convert a string to an array of periods
  // Expected format: "HH:mm:ss - HH:mm:ss, HH:mm:ss - HH:mm:ss"
  const stringToPeriods = (str) => {
    if (!str) return [];
    return str.split(",").map((segment) => {
      const parts = segment.split("-");
      if (parts.length !== 2) return null;
      const start_time = parts[0].trim();
      const end_time = parts[1].trim();
      return { start_time, end_time };
    }).filter(period => period !== null);
  };

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const response = await getHoursById(userId);
        setWorkHours(response);
        // Initialize editedWorkHours as an object with string values for each day
        const initialEdited = {};
        Object.keys(response).forEach((day) => {
          initialEdited[day] = periodsToString(response[day]);
        });
        setEditedWorkHours(initialEdited);
      } catch (error) {
        console.error("Error fetching hours:", error);
      }
    };

    fetchHours();
  }, [userId]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Parse the edited work hours back to an object
      const parsedWorkHours = {};
      Object.keys(editedWorkHours).forEach((day) => {
        parsedWorkHours[day] = stringToPeriods(editedWorkHours[day]);
      });
      updateHoursById(userId, parsedWorkHours)
        .then(() => {
          setWorkHours(parsedWorkHours);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating hours:", error);
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e, dayKey) => {
    const { value } = e.target;
    setEditedWorkHours((prev) => ({
      ...prev,
      [dayKey]: value,
    }));
  };

  if (!workHours || !editedWorkHours) {
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
        <Typography variant="h6">Work Hours</Typography>
        <Button variant="contained" color="primary" onClick={handleEditToggle}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Work Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(workHours).map((dayKey) => (
              <TableRow key={dayKey}>
                <TableCell>{daysOfWeek[dayKey]}</TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editedWorkHours[dayKey]}
                      onChange={(e) => handleInputChange(e, dayKey)}
                      helperText="Enter periods as HH:mm:ss - HH:mm:ss, separated by commas"
                    />
                  ) : (
                    workHours[dayKey].map((period, index) => (
                      <div key={index}>
                        {period.start_time} - {period.end_time}
                      </div>
                    ))
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WorkHours;
