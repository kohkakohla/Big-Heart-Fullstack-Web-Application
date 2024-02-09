import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id: number,
  date: string,
  activity: string,
  company: string,
  completed: string,
  amount: number
) {
  return { id, date, activity, company, completed, amount };
}

const rows = [
  createData(0, "16 Mar, 2019", "Shaun Connery", "NUS", "Yes", 200),
  createData(0, "16 Mar, 2019", "Jie Wen", "NTU", "Yes", 200),
  createData(0, "16 Mar, 2019", "Jerrick Johnson", "SUTD", "No", 200),
  createData(0, "16 Mar, 2019", "Mata Wata", "SMU", "Yes", 200),
  createData(0, "16 Mar, 2019", "Shaun Connery", "NUS", "Yes", 200),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell align="right">Volunteers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.activity}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.completed}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more activities
      </Link>
    </React.Fragment>
  );
}
