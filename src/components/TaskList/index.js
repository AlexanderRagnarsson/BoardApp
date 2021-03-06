import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, FlatList, TouchableHighlight,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Task from '../Task';
import styles from './styles';
import AddButton from '../Addbutton';
import TaskModal from '../TaskModal';
import ListEditModal from '../ListEditModal';
import DeleteModal from '../DeleteModal';

function TaskList({
  id,
}) {
  const {
    lists, tasks, isTaskModalOpen, isListEditModalOpen, deleteListModalOpen,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  // The current board
  const {
    name, color, boardId,
  } = lists.filter((list) => list.id === id)[0];

  // Open the list edit modal
  const setIsListEditModalOpen = (value) => {
    dispatch({ type: 'UPDATE_LIST_EDIT_MODAL', payload: value });
  };

  const setIsTaskModalOpen = (value) => {
    dispatch({ type: 'UPDATE_TASK_MODAL', payload: value });
  };

  const setDeleteListModalOpen = (value) => {
    dispatch({ type: 'UPDATE_DELETE_LIST_MODAL', payload: value });
  };

  // Adding the new task to the tasks
  const submitTask = (task) => {
    const nextId = tasks.reduce((prev, curr) => (curr.id >= prev ? (curr.id + 1) : prev), 0);
    // const taskListId = id;
    // tasksData.push({ id: nextId, ...task, listId: taskListId });
    // setTasksData(tasksData);
    dispatch({ type: 'ADD_TASK', payload: { id: nextId, ...task, listId: id } });
  };

  const listEditSubmit = async (newList) => {
    // setLists([...lists.filter((listIt) => (listIt.id !== newList.id)), newList]);
    // setList(newList);
    dispatch({ type: 'EDIT_LIST', payload: newList });
  };

  const deleteList = (listId) => {
    dispatch({ type: 'DELETE_LIST', payload: listId });
    // setBoards(boards.filter((item) => (item.id !== boardId)));
  };

  const tasklist = tasks.filter((item) => item.listId === id);

  function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  return (
    <View style={styles.TaskText}>
      <ListEditModal
        isOpen={isListEditModalOpen === id}
        closeModal={() => setIsListEditModalOpen(-1)}
        submit={listEditSubmit}
        title="Edit the task"
        list={{
          id, name, color, boardId,
        }}
      />
      <View style={{
        ...styles.TitleView, borderColor: color,
      }}
      >
        <Text style={styles.TitleText}>{`${name}`}</Text>
        <View style={styles.TitleTextButtons}>
          <TouchableHighlight
            onPress={() => { setIsListEditModalOpen(id); }}
          >
            <AntDesign name="edit" size={25} color="black" />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { setDeleteListModalOpen(id); }}
          >
            <AntDesign name="delete" size={25} color="black" />
          </TouchableHighlight>
          <AddButton
            onAdd={() => setIsTaskModalOpen(id)}
            addString=""
          />
        </View>
      </View>
      <TaskModal
        id={id}
        isOpen={isTaskModalOpen === id}
        closeModal={() => { setIsTaskModalOpen(-1); }}
        submit={submitTask}
      />
      <FlatList
        numColumns={1}
        data={tasklist}
        renderItem={({ item }) => (
          <Task style={styles.Task} {...{ id: item.id }} />
        )}
        keyExtractor={(board) => board.id}
      />
      <DeleteModal
        isOpen={deleteListModalOpen === id}
        closeModal={() => { setDeleteListModalOpen(-1); }}
        onConfirm={() => deleteList(id)}
        itemName={` ${name}`}
      />
    </View>
  );
}

TaskList.propTypes = {
  id: PropTypes.number.isRequired,
};

export default TaskList;
