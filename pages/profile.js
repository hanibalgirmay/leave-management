import { Box } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import {Container, Paper, Typography, TextField} from '@mui/material';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Profile Page
          </Typography>
          <div style={{display:'flex',flexDirection:'column', gap:'2rem'}}>
            <TextField fullWidth disabled defaultValue="Hanibal G" id="outlined-basic" label="Full Name" variant="standard" />
            <TextField fullWidth disabled defaultValue="Male" id="outlined-basic" label="Gender" variant="standard" />
            <TextField fullWidth disabled defaultValue="2022/21/11" id="outlined-basic" label="Employment Date" variant="standard" />
            <TextField fullWidth disabled defaultValue="Employee" id="outlined-basic" label="Role" variant="standard" />
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
