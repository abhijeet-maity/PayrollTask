import React from "react";
import styles from "./AppLayout.module.scss";
import { Box, Stack, Typography } from "@mui/material";
import { sidenavbar } from "../../utils/sidenavbar";


const AppLayout = () => {
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
            >
              <img src={menu.icon} alt="icon" />
              <Typography variant="p">{menu.title}</Typography>
            </Box>
          );
        })}
      </Stack>
      <Box className={styles.rightSide}>
 
      </Box>
    </div>
  );
};

export default AppLayout;
