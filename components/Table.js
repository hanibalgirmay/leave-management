import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const leaveStatus = [
  { status: "PENDING" },
  { status: "APPROVED" },
  { status: "REJECTED" },
];
export default function DataGridDemo({ columns, data }) {
  const [dialog, setDialog] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState({
    id: null,
    leave_type: "",
    status: "",
    number_of_days: 0,
    leave_start_date: "",
    leave_end_date: "",
    description: "",
    employeeID: null,
  });
  const [selectedStatus, setSelectedStatus] = React.useState();

  const handleClickOpen = (val) => {
    setSelectedData(val);
    setSelectedStatus(val.status);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async () => {
    await axios.put(process.env.API_ADDRESS + "/leaves/status/"+ selectedData.id,{
      status: selectedStatus
    }).then(res => {
      console.log(res.data)
      toast(res.data.message);
      handleClose();
    }).catch(err => console.log(err))
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <ToastContainer />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(evt, selectedRow) => handleClickOpen(evt.row)}
        options={{
          headerStyle: {
            backgroundColor: "#0a5e9c",
            color: "#FFF",
            draggable: true,
          },
          exportButton: true,
          actionsColumnIndex: -1,
        }}
      />
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle>Update Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update Employee Leave request form
          </DialogContentText>
          <TextField
            id="status"
            select
            label="Select"
            value={selectedStatus}
            onChange={handleChange}
            helperText="Selelect leave status"
            variant="standard"
          >
            {leaveStatus.map((option) => (
              <MenuItem key={option.status} value={option.status}>
                {option.status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
