import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

import { useState, useEffect } from 'react';

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';

import { useQuery, useMutation } from "@apollo/client";
import { GET_STUDENTS, GET_STUDENT, INSERT_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "../../gql/students/queries";

export default function StudentsDetailsScreen() {
  const [student, setStudent] = useState({ id: 0, firstname: '', lastname: '' });

  function handleInsert() {
  }

  function handleUpdate() {
  }

  function handleDelete() {
  }

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  function handleChangeFirstname(value) {
    setStudent({ ...student, firstname: value });
  }

  function handleChangeLastname(value) {
    setStudent({ ...student, lastname: value });
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First name"
        onChangeText={handleChangeFirstname}
        style={styles.input}
        value={student.firstname}
      />
      <TextInput
      placeholder="Last name"
        onChangeText={handleChangeLastname}
        style={styles.input}
        value={student.lastname}
      />
      {id !== 0 &&
        <>
          <Button title="Update" buttonStyle={styles.button} onPress={handleUpdate} />
          <Button title="Delete" type="outline" buttonStyle={styles.button} onPress={handleDelete} />
        </>
      }
      {id === 0 &&
        <Button title="Add" buttonStyle={styles.button} onPress={handleInsert} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  button: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
});