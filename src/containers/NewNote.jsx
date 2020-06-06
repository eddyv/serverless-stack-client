import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import config from "../config";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function NewNote() {
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    content: "",
  });
  const classes = useStyles();

  function validateForm() {
    return fields.content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createNote({ note: fields.content, attachment: attachment });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Note
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            id="content"
            name="content"
            label="Content"
            multiline
            rows={4}
            variant="outlined"
            onChange={handleFieldChange}
            helperText={"Add your new note here"}
          />
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            id="file"
            name="file"
            variant="outlined"
            onChange={handleFileChange}
            helperText={"Upload File"}
            type="file"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.buttonSuccess}
            disabled={!validateForm() || isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress color="secondary" />
              </>
            ) : (
              <Typography>Create</Typography>
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
}
