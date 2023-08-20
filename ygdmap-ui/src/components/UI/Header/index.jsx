import { Typography } from "@mui/material";

function Header({ text }) {
  return (
    <>
      <Typography
        variant="h8"
        component="div"
        sx={{
          flexGrow: 1,
          padding: 1,
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </>
  );
}

export default Header;
