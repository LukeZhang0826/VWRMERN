import React, { useState } from 'react'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import AdminContent from '../../components/adminContent/AdminContent'
import './adminClients.scss'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const AdminClients = () => {
  const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65)); // create an array of the alphabet
  const [selected, setSelected] = useState(null); // create a state for the selected button
  const buttons = alphabet.map(letter => (
    <button
      className="admin-clients-alphabet-button"
      key={letter}
      style={{ backgroundColor: selected === letter ? '#3B6E99' : '#ABC3CD' }} // set the background color based on the selected state
      onClick={() => setSelected(letter)} // update the selected state when the button is clicked
    >
      {letter}
    </button>
  ));
  buttons.push(<button className="admin-clients-alphabet-button" key="other" style={{ gridColumn: 'span 4', backgroundColor: selected === 'other' ? '#3B6E99' : '#ABC3CD' }} onClick={() => setSelected('other')}>Other</button>); // add the Other button with 4 columns

  return (
    <>
      <AdminSidebar title="CLIENTS">
        <div className="admin-clients-sidebar-container-content">
          <div className="admin-clients-alphabet-container">
            {buttons}
          </div>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="RMT Massage" />
            <FormControlLabel control={<Checkbox />} label="Acupuncture" />
            <FormControlLabel control={<Checkbox />} label="Chiropractic" />
            <FormControlLabel control={<Checkbox />} label="Physiotherapy" />
            <FormControlLabel control={<Checkbox />} label="Facial" />
          </FormGroup>
        </div>
      </AdminSidebar>
      <AdminContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AdminContent>
    </>
  )
}

export default AdminClients