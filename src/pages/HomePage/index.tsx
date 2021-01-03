import React, { ChangeEvent } from "react";
import "./index.css";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  debounce,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import HomeIcon from "@material-ui/icons/Home";
import UserIcon from "@material-ui/icons/SupervisedUserCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { HOME, REJECTED, SHORTLISTED } from "../../constants/routes";

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
  drawerOpen: boolean;
};

const styles = (theme: Theme) =>
  createStyles({
    studentLists: {
      width: "100%",
      "& > *": {
        marginTop: theme.spacing(1),
      },
    },
    drawerList: {
      width: 270,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  });

type DrawerMenus = {
  name: string;
  icon: React.ReactChild;
};

const drawerMenus: DrawerMenus[] = [
  {
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    name: "Shortlisted",
    icon: <UserIcon />,
  },
  {
    name: "Rejected",
    icon: <RemoveCircleIcon />,
  },
];
class HomePage extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {
    searchText: "",
    drawerOpen: false,
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

  toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
  };

  toggleDrawerByMenu = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

  handleMenu = (name: string) => (event: any) => {
    if (name === "Home") {
      this.props.history.replace(HOME);
    } else if (name === "Shortlisted") {
      this.props.history.push(SHORTLISTED);
    } else if (name === "Rejected") {
      this.props.history.push(REJECTED);
    }
  };

  handleCardClick = (studentId: string) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    // event.stopPropagation();
    this.props.history.push(`/student/${studentId}`);
  };

  render() {
    console.log(this.props);
    const { classes, students } = this.props;
    const { searchText, drawerOpen } = this.state;
    return (
      <div>
        <MyAppBar
          onSearch={this.onSearch}
          drawerOpen={drawerOpen}
          toggleDrawer={(e) => {
            this.toggleDrawerByMenu();
          }}
        />
        <SwipeableDrawer
          anchor="left"
          style={{ position: "static" }}
          open={drawerOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            className={classes.drawerList}
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.drawerHeader} />
            <List>
              {drawerMenus.map((menu, index) => (
                <ListItem button key={menu.name}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText
                    primary={menu.name}
                    onClick={this.handleMenu(menu.name)}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        </SwipeableDrawer>
        <div className={classes.drawerHeader} />
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
                  onClick={(id: string) => () => {}}
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
