import React, { useState } from 'react';
import {
  TextInput, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';
import { Slider } from 'react-native-slider';
import Modal from '../Modal';
import styles from './styles';

function ListEditModal({
  list,
  isOpen,
  closeModal,
  submit,
}) {
  const [inputs, setInputs] = useState(list);

  const inputHandler = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const clearInputs = () => {
    inputs.name = list.name;
    inputs.color = list.color;
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => { closeModal(); clearInputs(); }}
      title="Create a list"
    >
      <TextInput
        styles={styles.textInput}
        placeholder="Enter the name of the List"
        value={inputs.name}
        onChangeText={(text) => inputHandler('name', text)}
      />
      <TriangleColorPicker
        onColorChange={(color) => { inputHandler('color', fromHsv(color)); }}
        style={{ flex: 1, width: '100%' }}
        hideControls
        sliderComponent={Slider}
      />
      <Button
        title="Submit"
        onPress={() => { submit(inputs); closeModal(); }}
      />
    </Modal>
  );
}

ListEditModal.propTypes = {
  // list
  list: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  // Is the modal open or not
  isOpen: PropTypes.bool.isRequired,
  // Function to close the modal
  closeModal: PropTypes.func.isRequired,
  // Function to submit the new Board
  submit: PropTypes.func.isRequired,
};

export default ListEditModal;
