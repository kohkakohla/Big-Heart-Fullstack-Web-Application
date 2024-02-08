import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, { CheckboxClassKey } from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/Home/NavBar";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Hack4Gooners
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function SignUp() {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [gender, setGender] = React.useState("");
  const [studying, setStudy ing] = React.useState({
    studying: false,
  });
  const [canDrive, setDriving] = React.useState({
    canDrive: false,
  });

  const handleGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleStudyCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudying({
      ...studying,
      [event.target.name]: event.target.checked,
    });
  };
  const handleDriving = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriving({
      ...canDrive,
      [event.target.name]: event.target.checked,
    });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      birthday: value,
      gender: gender,
      occupation: data.get("occupation"),
      studying: studying.studying,
      studyField: data.get("studyingField"),
      educationBackground: data.get("EducationBackground"),
      canDrive: canDrive.canDrive,
      ownVehicle: data.get("ownVehicle") == "on" ? true : false,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar></NavBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="WhatsApp Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  ></DatePicker>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      value={gender}
                      label="gender"
                      onChange={handleGender}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="occupation"
                  label="Occupation"
                  type="occupation"
                  id="occupation"
                  autoComplete="occupation"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Currently Studying?"
                  name="studying"
                  onChange={handleStudyCheckbox}
                />
              </Grid>
              {studying.studying && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="studyingField"
                    label="Where are you studying?"
                    name="studyingField"
                    autoComplete="off"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Can you drive?"
                  name="canDrive"
                  onChange={handleDriving}
                />
              </Grid>
              {canDrive.canDrive && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Do you own a vehicle?"
                    name="ownVehicle"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="EducationBackground"
                  label="Educational background"
                  type="EducationBackground"
                  id="EducationBackground"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
