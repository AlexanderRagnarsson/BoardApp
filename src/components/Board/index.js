import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

function Board({
  id, name, description = '', thumbnailPhoto, lists, tasks, navigate,
}) {
  return (
    <View>
      <Text>{`${id} ${name} ${description}  ${thumbnailPhoto} ${lists} ${tasks} ${navigate}`}</Text>
    </View>
  );
}

Board.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  thumbnailPhoto: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigate: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Board.defaultProps = {
  description: '',
};

export default Board;
