import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../stylings/holdingsTable.css";
function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const holdingsTable = (props) => {
  const { masterOBJ, perm_data } = props;
  return (
    <div className="dv1">
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>instrument</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">
                Average Price&nbsp;($)
              </StyledTableCell>
              <StyledTableCell align="right">LTP&nbsp;($)</StyledTableCell>
              <StyledTableCell align="right">
                Current value&nbsp;($)
              </StyledTableCell>
              <StyledTableCell align="right">P&L&nbsp;($)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(masterOBJ).map(([key, value]) => {
              if (perm_data[key]["QTY"] > 0) {
                return (
                  <StyledTableRow
                    key={perm_data[key]["symbol"]}
                  >
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {key}{" "}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      {roundToX(perm_data[key]["QTY"], 2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      {roundToX(perm_data[key]["avg_price"], 2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {roundToX(value.LTP, 2)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {roundToX(value.LTP * perm_data[key]["QTY"], 2)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={
                        roundToX(
                          (value.LTP - perm_data[key]["avg_price"]) *
                            perm_data[key]["QTY"],
                          2
                        ) > 0
                          ? "greenText"
                          : "redText"
                      }
                    >
                      <div
                        className={
                          roundToX(
                            (value.LTP - perm_data[key]["avg_price"]) *
                              perm_data[key]["QTY"],
                            2
                          ) > 0
                            ? "greenText"
                            : "redText"
                        }
                      >
                        {roundToX(
                          (value.LTP - perm_data[key]["avg_price"]) *
                            perm_data[key]["QTY"],
                          2
                        )}
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default holdingsTable;
