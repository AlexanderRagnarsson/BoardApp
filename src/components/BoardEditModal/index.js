import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import styles from './styles';
import PhotoSelection from '../PhotoSelection';

function BoardEditModal({
  board,
  isOpen,
  closeModal,
  submit,
}) {
  let setBoard = board;

  if (setBoard.id !== undefined) {
    const { boards } = useSelector((state) => state);
    [setBoard] = boards.filter((listIt) => listIt.id === setBoard.id);
    if (setBoard.description === undefined) {
      setBoard.description = '';
    }
  }

  const [inputs, setInputs] = useState(setBoard);
  const inputHandler = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const clearInputs = () => {
    inputs.name = setBoard.name;
    inputs.description = setBoard.description;
    inputs.thumbnailPhoto = setBoard.thumbnailPhoto;
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => { closeModal(); clearInputs(); }}
      title="Edit the board"
    >
      <TextInput
        styles={styles.textInput}
        placeholder="Enter the name of the board"
        value={inputs.name}
        onChangeText={(text) => inputHandler('name', text)}
      />
      <TextInput
        styles={styles.textInput}
        placeholder="Enter the description of the board"
        value={inputs.description}
        onChangeText={(text) => inputHandler('description', text)}
      />
      <PhotoSelection
        value={inputs.thumbnailPhoto}
        onChange={(value) => { inputHandler('thumbnailPhoto', value); }}
      />
      <Button
        title="Submit"
        onPress={() => {
          submit(inputs);
          closeModal();
        }}
      />
    </Modal>
  );
}

BoardEditModal.propTypes = {
  // The board the we are currently editing
  board: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnailPhoto: PropTypes.string,
  }).isRequired,
  // Is the modal open or not
  isOpen: PropTypes.bool.isRequired,
  // Function to close the modal
  closeModal: PropTypes.func.isRequired,
  // Function to submit the new Board
  submit: PropTypes.func.isRequired,
};

export default BoardEditModal;
