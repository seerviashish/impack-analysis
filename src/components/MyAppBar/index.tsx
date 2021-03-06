import {
  AppBar,
  createStyles,
  fade,
  IconButton,
  InputBase,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import BackIcon from "@material-ui/icons/ArrowBack";
import React, { ChangeEvent } from "react";

type MyAppBarProps = {
  onlyView?: boolean;
  back?: () => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleDrawer: (e: React.MouseEvent<HTMLElement>) => void;
  drawerOpen: boolean;
};

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        width: "70ch",
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: "40ch",
      },
    },
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  });

const MyAppBar: React.FC<MyAppBarProps & WithStyles<typeof styles>> = ({
  classes,
  onSearch,
  toggleDrawer,
  onlyView,
  back,
}) => {
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          {onlyView ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="back button"
              onClick={(e) => {
                if (back) {
                  back();
                }
              }}
            >
              <BackIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            Impact-Analysis
          </Typography>
          {!onlyView && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={onSearch}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(MyAppBar);
