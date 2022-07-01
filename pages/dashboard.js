import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
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
  const [open, setOpen] = React.useState(false);
  const [leaves, setLeaves] = React.useState(intialLeave);
  const [endDate, setEndDate] = useState('');
  const [allLeaves, setAllLeavesData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setLeaves({ ...leaves, [name]: value });
  };

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
    await axios.get(process.env.API_ADDRESS + "/leaves")
      .then((res) => {
        console.log(res.data)
        setAllLeavesData(res.data);
      }).catch(err => console.log(err))
  }

  const handleSubmit = async () => { 
    let _endData = {
      leave_type: leaves.leave_type,
      number_of_days: parseInt(leaves.number_of_days),
      leave_start_date: leaves.leave_start_date,
      leave_end_date: endDate,
      description: leaves.description,
    }
    await axios.post(process.env.API_ADDRESS + "/leaves",{
      ..._endData
    }).then(res => {
      console.log(res.data);
      toast("Leave Date Added!!!");
    }).catch(err => {
      console.log(err);
    })
    setOpen(false)
    console.log(_endData)
  };

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
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Request Leave
              </Button>
              <Table data={allLeaves} columns={leaveColumns} onClick={getAllLeaves} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Leave Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="leave_type"
            id="leave_type"
            label="Leave type"
            onChange={handleOnChange}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            disabled
            margin="dense"
            name="remining_leave"
            id="remaning_leave"
            label="Remaing Leave Day"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="no_days"
            name="number_of_days"
            label="Number of Days"
            onChange={handleOnChange}
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="leave_start_date"
            name="leave_start_date"
            label="Leave Start Date"
            onChange={handleOnChange}
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            disabled
            margin="dense"
            id="leave_end_date"
            name="leave_end_date"
            value={endDate}
            label="Leave End Date"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            onChange={handleOnChange}
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default dashboard;
