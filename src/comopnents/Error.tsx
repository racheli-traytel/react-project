import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorMessageProps {
  message: string; // הודעת השגיאה
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null; 

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        width: "auto",
        maxWidth: "500px", // או כל רוחב שתרצה
        padding: "10px",
        backgroundColor: "transparent",
      }}
    >
      <Alert severity="error" variant="outlined" sx={{ width: "100%", backgroundColor: "pink", color: "black" }}>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;