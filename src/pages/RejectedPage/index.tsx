import React from "react";
import "./index.css";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Props = {};
type State = {};

const styles = (theme: Theme) => createStyles({});

class RejectedPage extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <div>RejectedPage</div>;
  }
}

export default withRouter(withStyles(styles)(RejectedPage));
