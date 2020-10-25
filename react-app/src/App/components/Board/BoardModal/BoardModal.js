import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { getFeathersInstance } from "./../../../feather-client";

function BoardModal(props) {
  let { isBoardModalOpen, dispatch } = props;
  const [title, setTitle] = useState("");

  const toggleBoardModal = () => {
    dispatch({ type: "board-modal" });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let { client } = await getFeathersInstance();
    if (title.length > 0) {
      const board = await client.service("boards").create({ title });
      dispatch({ type: "push-board", board });
    }
  };

  return (
    <Modal isOpen={isBoardModalOpen} toggle={toggleBoardModal}>
      <ModalHeader>Create New Board</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleCreate}>
          <FormGroup>
            <Label for="board-title">Title</Label>
            <Input
              type="text"
              name="title"
              id="board-title"
              placeholder="Enter board title!"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleCreate}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggleBoardModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStatetoProps = (state) => {
  return {
    isBoardModalOpen: state.dashboard.boardModal,
  };
};

export default connect(mapStatetoProps)(BoardModal);
