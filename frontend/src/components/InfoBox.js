import React, { useState } from "react";
import {
	Box,
	Typography,
	Paper,
	TextField,
	Button,
	Grid2,
	Container,
	CircularProgress,
} from "@mui/material";
import { useEffect, useContext } from "react";
import { UserContext } from "../utils/userContext";
import { getPartnerById, updatePartnerById } from "../services/partnerService";

const InfoBox = () => {
	const [isEditing, setIsEditing] = useState(false); // Manage edit state locally
	const [editedPartner, setEditedPartner] = useState(); // Local state for the partner

	const { userId } = useContext(UserContext);

	useEffect(() => {
		const fetchPartner = async () => {
			try {
				const response = await getPartnerById(userId);
				setEditedPartner(response);
			} catch (error) {
				console.error("Error fetching partner:", error);
			}
		};

		fetchPartner();
	}, [userId]);

	// Handle editing toggle
	const handleEditToggle = () => {
		if (isEditing) {
			updatePartnerById(userId, editedPartner);
		}
		setIsEditing((prev) => !prev);
	};

	// Handle input changes for name and address
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedPartner((prevPartner) => ({
			...prevPartner,
			[name]: value,
		}));
	};

	if (!editedPartner) {
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
			{isEditing ? (
				<Grid2 container spacing={2}>
					<Grid2>
						<TextField
							label="Partner Name"
							fullWidth
							value={editedPartner.name}
							onChange={handleInputChange}
							name="name"
							sx={{ marginBottom: 2 }}
						/>
					</Grid2>
					<Grid2>
						<TextField
							label="Address"
							fullWidth
							value={editedPartner.address}
							onChange={handleInputChange}
							name="address"
						/>
					</Grid2>
				</Grid2>
			) : (
				<>
					<Typography variant="h4" gutterBottom>
						Partner Name: {editedPartner.name}
					</Typography>
					<Typography variant="body1">
						Address: {editedPartner.address}
					</Typography>
				</>
			)}

			<Button
				variant="contained"
				color="primary"
				onClick={handleEditToggle}
				sx={{ marginTop: 2 }}
			>
				{isEditing ? "Save" : "Edit"}
			</Button>
		</Paper>
	);
};

export default InfoBox;
