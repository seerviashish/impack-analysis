import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  createStyles,
  IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Student, StudentState } from "../../pages/HomePage/slice";
import { green, red } from "@material-ui/core/colors";

type StudentCardProps = {
  onlyView?: boolean;
  student: Student;
  onReject: (studentId: string) => void;
  onSelect: (studentId: string) => void;
  onRemove: (studentId: string) => void;
  onClick: (studentId: string) => (e: any) => void;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      padding: theme.spacing(2),
    },
    avatar: {
      backgroundColor: red[500],
      width: 80,
      height: 80,
    },
    rejected: {
      color: red[800],
    },
    selected: {
      color: green[800],
    },
  });

const StudentCard: React.FC<StudentCardProps & WithStyles<typeof styles>> = ({
  classes,
  onReject,
  onSelect,
  onRemove,
  onClick,
  student,
  onlyView,
}) => {
  const getLabel = () => {
    if (student.state === StudentState.SHORTLISTED) {
      return (
        <Typography className={classes.selected}>{"Shortlisted"}</Typography>
      );
    } else if (student.state === StudentState.REJECTED) {
      return <Typography className={classes.rejected}>{"Rejected"}</Typography>;
    } else {
      return null;
    }
  };

  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={onClick(student.id)}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="student profile photo"
            className={classes.avatar}
            src={student.Image}
            alt={student.name}
          />
        }
        action={
          !onlyView && (
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                onRemove(student.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          )
        }
        title={student.name}
        subheader={getLabel()}
      />
      <CardActions>
        {((student.state && student.state !== StudentState.SHORTLISTED) ||
          !student.state) &&
          !onlyView && (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(student.id);
              }}
            >
              ShortList
            </Button>
          )}
        {((student.state && student.state !== StudentState.REJECTED) ||
          !student.state) &&
          !onlyView && (
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onReject(student.id);
              }}
            >
              Reject
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(StudentCard);
