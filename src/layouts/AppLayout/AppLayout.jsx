import React, { useEffect, useState } from "react";
import styles from "./AppLayout.module.scss";
import { Box, Button, Stack, Typography } from "@mui/material";
import { sidenavbar } from "../../utils/sidenavbar";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12
      const timeStr = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

      // Format date
      const dateOptions = { month: "long", day: "numeric", year: "numeric" };
      const dateStr = now.toLocaleDateString("en-US", dateOptions);

      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateDateTime(); // Initial call
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.AppLayout}>
      <Stack className={styles.sideNav}>
        {sidenavbar.map((menu, index) => {
          return (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={1.5}
              className={styles.navCard}
              onClick={() => navigate(menu.route)}
            >
              <img src={menu.icon} alt="icon" />
              <Typography variant="p">{menu.title}</Typography>
            </Box>
          );
        })}
      </Stack>
      <Box className={styles.rightSide}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className={styles.Navbar}
        >
          <Typography variant="p">Navbar</Typography>
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Box display={"flex"} gap={1.5}>
              <span>{currentTime}</span>
              {" | "}
              <span>{currentDate}</span>
            </Box>
            <Button variant="contained">Punch In</Button>
            <Button variant="contained" color="error">Logout</Button>
          </Box>
        </Box>
        <Outlet />
      </Box>
    </div>
  );
};

export default AppLayout;
