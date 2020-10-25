import React from "react";
import { connect } from "react-redux";
import { Collapse, Button } from "reactstrap";
import "./index.css";
import Board from "./../../components/Board/board";
import BoardTile from "./../../components/Board/BoardTile/BoardTile";
import BoardModal from "./../../components/Board/BoardModal/BoardModal";
import { client } from "./../../feather-client";

function Dashboard(props) {
  let { user, boards, mediaData, isbottomPanelOpen, dispatch } = props;

  const toggle = () => dispatch({ type: "bottom-panel" });

  const onBoardUpdate = (item, board) => {
    dispatch({ type: "handle-drop", item, board });
  };

  const logoutUser = () => {
    client.logout();
    dispatch({ type: "logout-user" });
    dispatch({ type: "clear-storage" });
  };

  return (
    <div>
      <div className="ui">
        <nav className="navbar app">
          <Button
            color="primary"
            onClick={toggle}
            aria-controls="media-footer"
            aria-expanded={isbottomPanelOpen}
          >
            {isbottomPanelOpen ? "Hide Media" : " Show Media"}
          </Button>
          <span>Welcome: {user.email}</span>

          <Button color="primary" onClick={logoutUser}>
            Logout
          </Button>
        </nav>

        <nav className="navbar board">
          <span>Boards</span>
          <Button
            color="primary btn-plus"
            onClick={() => dispatch({ type: "board-modal" })}
          >
            New board
          </Button>
        </nav>

        <BoardModal />

        <div className="lists">
          {boards.map((board) => {
            return (
              <Board key={board._id} {...board} onUpdate={onBoardUpdate} />
            );
          })}
        </div>
      </div>

      <Collapse isOpen={isbottomPanelOpen}>
        <div className="footer" id="media-footer">
          <div className="flex-container flex-wrap">
            {mediaData.map((m) => (
              <BoardTile key={m._id} {...m} />
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    boards: state.dashboard.boards,
    mediaData: state.dashboard.mediaData,
    isbottomPanelOpen: state.dashboard.bottomPanel,
    isBoardModelOpen: state.dashboard.boardModel,
    user: state.auth.user,
  };
};

export default connect(mapStatetoProps)(Dashboard);
