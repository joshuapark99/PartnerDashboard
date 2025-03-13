import React, { useState, useEffect, useContext } from "react";
import {
	Container,
	Box,
	CircularProgress,
	Typography,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import { UserContext } from "../utils/userContext";
import {
	getAppointmentsById,
	getTestsByPartnerId,
} from "../services/partnerService";

const Appointments = () => {
	const { userId } = useContext(UserContext);
	const [appointments, setAppointments] = useState(null);
	const [tests, setTests] = useState(null);

	// Fetch both appointments and tests
	useEffect(() => {
		const fetchData = async () => {
			try {
				const appointmentsResponse = await getAppointmentsById(userId);
				const testsResponse = await getTestsByPartnerId(userId);
				setAppointments(appointmentsResponse);
				setTests(testsResponse);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [userId]);

	// While data is loading, display a loading spinner
	if (!appointments || !tests) {
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

	// Build a mapping from test IDs to test names
	const testMapping = {};
	tests.forEach((test) => {
		testMapping[test.id] = test.name;
	});

	return (
		<Paper sx={{ padding: 3, marginTop: 3 }}>
			<Box
				sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
			>
				<Typography variant="h6">Appointments</Typography>
			</Box>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Customer Name</TableCell>
							<TableCell>Test Name</TableCell>
							<TableCell>Appointment Time</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{appointments.map((appt) => (
							<TableRow key={appt.id}>
								<TableCell>{appt.customer_name}</TableCell>
								<TableCell>
									{testMapping[appt.test_id] || appt.test_id}
								</TableCell>
								<TableCell>
									{new Date(
										appt.appointment_time
									).toLocaleString()}
								</TableCell>
								<TableCell>{appt.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default Appointments;
