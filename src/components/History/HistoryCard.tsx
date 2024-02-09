import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./css/HistoryCard.css";

const defaultTheme = createTheme();
export default function HistoryCard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main className="main-wrapper">
        <Container sx={{ paddingTop: "4rem`", backgroundColor: "#FBE3E0" }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent className="card-title">
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h5" component="h2">
                        Volunteering History
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Jerrick's stuff
                      </Typography>
                    </Grid>
                    <Grid item className="date-dropdown">
                      <Select defaultValue="JAN" className="select-date-box">
                        <MenuItem value="JAN">JAN</MenuItem>
                        <MenuItem value="FEB">FEB</MenuItem>
                        <MenuItem value="MARCH">MARCH</MenuItem>
                        <MenuItem value="APRIL">APRIL</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardContent sx={{ p: 2 }} className="card-title">
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Jan 2024
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total EXP
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4" color="success">
                        15470
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardContent>
                  <div className="table-responsive">
                    <table className="table table-hover earning-box">
                      <thead>
                        <tr>
                          <th colSpan={2}>Event</th>
                          <th>Status</th>
                          <th>EXP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ width: "50px" }}>
                            <span className="round">
                              <img
                                src="https://i.imgur.com/uIgDDDd.jpg"
                                alt="user"
                                width="50"
                              />
                            </span>
                          </td>
                          <td>
                            <Typography variant="h6" gutterBottom>
                              Dilwali Diwali
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              AD-HOC
                            </Typography>
                          </td>
                          <td>
                            <span className="label label-success">
                              Completed
                            </span>
                          </td>
                          <td>340</td>
                        </tr>
                        <tr className="active">
                          <td>
                            <span className="round">
                              <img
                                src="https://i.imgur.com/tT8rjKC.jpg"
                                alt="user"
                                width="50"
                              />
                            </span>
                          </td>
                          <td>
                            <Typography variant="h6" gutterBottom>
                              Chinese New Year
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              REGULAR
                            </Typography>
                          </td>
                          <td>
                            <span className="label label-info">
                              In Progress
                            </span>
                          </td>
                          <td>520</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="round round-success">
                              <img
                                src="https://i.imgur.com/cAdLHeY.jpg"
                                alt="user"
                                width="50"
                              />
                            </span>
                          </td>
                          <td>
                            <Typography variant="h6" gutterBottom>
                              Deepavali
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              AD-HOC
                            </Typography>
                          </td>
                          <td>
                            <span className="label label-primary">
                              Completed
                            </span>
                          </td>
                          <td>600</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center py-1">
                    <span className="fs-5">
                      View more{" "}
                      <i className="fa fa-chevron-down text-secondary"></i>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
