import React from "react";
import "./index.css";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { StudentState } from "../HomePage/slice";
import StudentCard from "../../components/StudentCard";
import { HOME } from "../../constants/routes";
import MyAppBar from "../../components/MyAppBar";

const mapStateToProps = (state: RootState) => ({
  students: state.homePage.students,
  homePage: state,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {};
type State = {};

const styles = (theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  });

class RejectedPage extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {};

  render() {
    const { students, classes } = this.props;
    return (
      <div>
        <MyAppBar
          onlyView={true}
          back={() => {
            this.props.history.replace(HOME);
          }}
          onSearch={(e) => {}}
          drawerOpen={false}
          toggleDrawer={(e) => {}}
        />
        <div className={classes.drawerHeader} />
        {students &&
          students
            .filter((data) => data.state === StudentState.REJECTED)
            .map((student, index) => (
              <StudentCard
                onlyView={true}
                onClick={(id: string) => () => {}}
                key={`st-${index}`}
                student={student}
                onReject={(id: string) => {}}
                onSelect={(id: string) => {}}
                onRemove={(id: string) => {}}
              />
            ))}
      </div>
    );
  }
}

export default connector(withRouter(withStyles(styles)(RejectedPage)));
