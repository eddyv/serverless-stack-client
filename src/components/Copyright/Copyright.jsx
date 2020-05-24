import Typography from "@material-ui/core/Typography";
import React from "react";
import Box from "@material-ui/core/Box";
export default function Copyright() {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
