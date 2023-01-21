import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import { useState, useEffect } from "react";

import Fetching from "../layout/message_fetching";
import Error from "../layout/message_error";

import { useQuery, useMutation } from "@apollo/client";
import { DELETE_COURSE, GET_COURSE, GET_COURSES, INSERT_COURSE, UPDATE_COURSE } from "../../gql/courses/queries";


export default function CoursesDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: { id },
    skip: id === 0,
  });
  const [course, setCourse] = useState({
    id: 0,
    title: "",
    credits: "",
  });
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });
  const [insertCourse] = useMutation(INSERT_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });

  useEffect(() => {
    if (data) {
      setCourse(data.course);
    }
  }, [data]);

  function handleInsert() {
    insertCourse({
      variables: {
        title: course.title,
        credits: course.credits,
      },
    });
    navigation.goBack();
  }

  function handleUpdate() {
    updateCourse({
      variables: {
        id: course.id,
        title: course.title,
        credits: course.credits,
      },
    });
    navigation.goBack();
  }

  function handleDelete() {
    deleteCourse({
      variables: {
        id: course.id,
      },
    });
    navigation.goBack();
  }

  if (loading) return <Fetching />;
  if (error) return <Error error={error} />;

  function handleChangeTitle(value) {
    setCourse({ ...course, title: value });
  }

  function handleChangeCredits(value) {
    setCourse({ ...course, credits: value });
  }

  console.log(course.title)
  console.log(course.credits)

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        onChangeText={handleChangeTitle}
        style={styles.input}
        value={course.title}
      />
      <TextInput
        placeholder="Credits"
        onChangeText={handleChangeCredits}
        style={styles.input}
        value={course.credits.toString()}
      />
      {id !== 0 && (
        <>
          <Button
            title="Update"
            buttonStyle={styles.button}
            onPress={handleUpdate}
          />
          <Button
            title="Delete"
            type="outline"
            buttonStyle={styles.button}
            onPress={handleDelete}
          />
        </>
      )}
      {id === 0 && (
        <Button
          title="Add"
          buttonStyle={styles.button}
          onPress={handleInsert}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
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
