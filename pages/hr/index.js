import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Table from "../../components/Table";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  Box,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

let intialLeave = {
  leave_type: "",
  remining_leave: "",
  number_of_days: 0,
  leave_start_date: "",
  leave_end_date: "",
  description: ""
};

const leaveColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'leave_type',
    headerName: 'Leave Type',
    width: 150,
    editable: true,
  },
  {
    field: 'number_of_days',
    headerName: 'Number of Days',
    width: 150,
    editable: true,
  },
  {
    field: 'leave_start_date',
    headerName: 'Leave Start Date',
    type: 'text',
    width: 110,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: "",
    headerName:"Actions",
    sortable: false,
    width: 160,
  }
];

const dashboard = () => {
  const [leaves, setLeaves] = React.useState(intialLeave);
  const [endDate, setEndDate] = useState('');
  const [allLeaves, setAllLeavesData] = useState([]);

  const calculateRemainingDays = () => {
    let _date = new Date(leaves.leave_start_date);
    console.log("date+",leaves.leave_start_date);
    console.log("date ",_date.toLocaleDateString());
    if(leaves.number_of_days){
      leaves.leave_end_date = _date.getDay() + leaves.number_of_days;
      let y = addDaysToDate(_date.toLocaleDateString(), leaves.number_of_days);
      console.log("------------")
      console.log(y.toLocaleDateString())
      setEndDate(y.toLocaleDateString());
      console.log("------------")
      console.log("date___",leaves.number_of_days);
    } else{
      alert('Enter number of days!')
    }
  }

  const addDaysToDate = (date, days) => {
    var dt = new Date(date);
    console.log('_', dt.toLocaleDateString())
    dt.setDate(dt.getDate() + parseInt(days));
    console.log('_', dt.toLocaleDateString())
    return dt;
  }

  useEffect(() => {
    getAllLeaves();
  }, [])
  
  useEffect(() => {
    calculateRemainingDays()
  }, [leaves.leave_start_date])
  
  const getAllLeaves = async() => {
    let _t = JSON.parse(localStorage.getItem("leave-mng"))
    await axios.get(process.env.API_ADDRESS + "/leaves",{
      headers:{
        authorization: _t.accessToken
      }
    })
      .then((res) => {
        console.log(res.data)
        setAllLeavesData(res.data);
      }).catch(err => console.log(err))
  }


  return (
    <Box sx={12}>
      <NavBar />
      <ToastContainer />
      <Box
        component="main"
        style={{
          width: "100%",
          marginTop: "2rem",
          background: "#eee",
          height: "100vh",
        }}
        container
        spacing={2}
      >
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
          <Grid
            style={{
              paddingTop: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            container
            spacing={3}
          >
            <Grid item xs={10} md={10} lg={9}>
              <Table data={allLeaves} columns={leaveColumns} onClick={getAllLeaves} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default dashboard;
