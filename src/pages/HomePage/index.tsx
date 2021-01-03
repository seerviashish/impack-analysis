import React, { ChangeEvent } from "react";
import "./index.css";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  debounce,
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MyAppBar from "../../components/MyAppBar";
import {
  addStudent,
  clearStudent,
  rejectStudent,
  removeStudent,
  setStudent,
  shortListStudent,
  Student,
} from "./slice";
import { RootState } from "../../redux/rootReducer";
import { AppDispatch } from "../../redux/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import StudentCard from "../../components/StudentCard";

const mapStateToProps = (state: RootState) => ({
  students: state.homePage.students,
  homePage: state,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      setStudents: (students: Student[]) => setStudent(students),
      clearStudents: () => clearStudent(),
      addStudent: (student: Student) => addStudent(student),
      removeStudent: (studentId: string) => removeStudent(studentId),
      rejectStudent: (studentId: string) => rejectStudent(studentId),
      shortListStudent: (studentId: string) => shortListStudent(studentId),
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {};

type State = {
  searchText: string;
};

const styles = (theme: Theme) =>
  createStyles({
    studentLists: {
      width: "100%",
      "& > *": {
        marginTop: theme.spacing(1),
      },
    },
  });

class HomePage extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {
    searchText: "",
  };

  onSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const searchText: string = e.target.value.trim().toLowerCase();
    this.setState({ searchText });
  }, 200);

  componentDidMount() {
    // Tried fetch data but getting  cors issue and tried to using header but not worked.
    // fetch(
    //   "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json",
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((data) => data.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }

  render() {
    const { classes, students } = this.props;
    console.log(this.props);
    const { searchText } = this.state;
    return (
      <div>
        <MyAppBar onSearch={this.onSearch} />
        <div className={classes.studentLists}>
          {students &&
            students
              .filter((data) => {
                if (searchText) {
                  return data.name.toLowerCase().includes(searchText);
                }
                return true;
              })
              .map((student, index) => (
                <StudentCard
                  key={`st-${index}`}
                  student={student}
                  onReject={(id: string) => {
                    this.props.rejectStudent(id);
                  }}
                  onSelect={(id: string) => {
                    this.props.shortListStudent(id);
                  }}
                  onRemove={(id: string) => {
                    this.props.removeStudent(id);
                  }}
                />
              ))}
        </div>
      </div>
    );
  }
}

export default connector(withRouter(withStyles(styles)(HomePage)));
