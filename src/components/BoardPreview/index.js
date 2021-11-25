import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Animated, TouchableHighlight,
} from 'react-native';
import styles from './styles';

function BoardPreview({
  id, name, description = '', thumbnailPhoto, lists, tasks, navigate,
}) {
  const boardlists = lists.filter((item) => item.boardId === id);
  const taskslists = tasks.filter((item) => item.listId === boardlists.id);
  // console.log(boardlists);
  return (
    <View>
      <Text>{`${id} ${name} ${description} `}</Text>
      <TouchableHighlight
        onPress={() => navigate('Board', {
          ...{
            id, name, description, thumbnailPhoto, lists: boardlists, tasks: taskslists, navigate,
          },
        })}
      >
        <Animated.Image
          style={styles.Image}
          source={{ uri: thumbnailPhoto }}
        />
      </TouchableHighlight>
    </View>
  );
}

BoardPreview.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  thumbnailPhoto: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigate: PropTypes.objectOf(PropTypes.array).isRequired,
};

BoardPreview.defaultProps = {
  description: '',
};

export default BoardPreview;