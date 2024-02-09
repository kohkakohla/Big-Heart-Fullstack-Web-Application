import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid, ThemeProvider, createTheme } from "@mui/material";
import "./css/Profile.css";
import NavBar from "../components/Home/NavBar";

const fetchData = (id: string) => {
  return fetch(
    `http://localhost:3000/volunteer/searchById/65b730a40f9ea119f5d7b1e6`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const Profile = () => {
  const id = "5b730a40f9ea119f5d7b1e66";

  // State to hold the fetched data
  const [profileData, setProfileData] = useState({
    profileImage: "https://i.imgur.com/YYZS3C6.png",
    username: "Your Username",
    achievement: ["Achievement 1", "Achievement 2", "Achievement 3"],
    aboutMe:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis felis nec nisi gravida aliquet eu ut mauris. Integer efficitur justo nec augue feugiat, vitae auctor neque tempor. Proin aliquet nisl a ex volutpat, ac cursus eros feugiat. Sed feugiat urna eget dictum congue.",
    expPercentage: 75,
    avatar: "https://i.imgur.com/YYZS3C6.png",
  });

  useEffect(() => {
    fetchData(id)
      .then((volunteer) => {
        setProfileData(volunteer);
      })
      .catch((error) => {
        console.error("error");
      });
  }, [id]); // Dependency array ensures useEffect runs when 'id' changes

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Roboto"].join(),
    },
  });
  // console.log("gay");
  // console.log(profileData);
  console.log(!profileData.achievement);
  if (!profileData.profileImage) {
    profileData.profileImage = "https://i.imgur.com/YYZS3C6.png";
  }
  if (!profileData.avatar) {
    profileData.avatar = "src/assets/redman.png";
  }
  if (profileData.achievement.length == 0) {
    profileData.achievement = ["zaza", "badoink", "ahhh"];
  }

  if (!profileData.aboutMe) {
    profileData.aboutMe = "Hi I love volunteering! and horses :)";
  }
  if (!profileData.expPercentage) {
    profileData.expPercentage = 75;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar />
      <Container className="profile-wrapper">
        <div className="background-image"></div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Container className="profile-info">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    src={profileData.profileImage}
                    alt=""
                    className="profile-image"
                  />
                  <Typography variant="h6" component="h2" className="username">
                    {profileData.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Container className="achievements">
                    {profileData.achievement.map((achievement, index) => (
                      <Typography key={index} variant="body1" component="p">
                        {achievement}
                      </Typography>
                    ))}
                  </Container>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1" className="about-me-header">
              About Me
            </Typography>
            <Container className="about-me">
              <Typography variant="body1" component="p">
                {profileData.aboutMe}
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Typography>XP Level: {profileData.expPercentage}%</Typography>
            <div className="exp-bar">
              <div
                className="exp-progress"
                style={{ width: `${profileData.expPercentage}%` }}
              ></div>
            </div>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <img
                  src={profileData.avatar}
                  alt="Custom Avatar"
                  className="custom-avatar"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
