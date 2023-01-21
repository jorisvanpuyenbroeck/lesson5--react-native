import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import Fetching from "../layout/message_fetching";
import Error from "../layout/message_error";
import { useQuery, useMutation } from "@apollo/client";
import {
  DELETE_ENROLLMENT,
  GET_ENROLLMENT,
  GET_ENROLLMENTS,
  INSERT_ENROLLMENT,
  UPDATE_ENROLLMENT,
} from "../../gql/enrollments/queries";

export default function EnrollmentsDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_ENROLLMENT, {
    variables: { id },
    skip: id === 0,
  });
  const [enrollment, setEnrollment] = useState({
    id: 0,
    student_id: "",
    course_id: "",
    grade: "",
  });
  const [updateEnrollment] = useMutation(UPDATE_ENROLLMENT, {
    refetchQueries: [{ query: GET_ENROLLMENTS }],
  });
  const [insertEnrollment] = useMutation(INSERT_ENROLLMENT, {
    refetchQueries: [{ query: GET_ENROLLMENTS }],
  });
  const [deleteEnrollment] = useMutation(DELETE_ENROLLMENT, {
    refetchQueries: [{ query: GET_ENROLLMENTS }],
  });

  // Dropdown picker
  const [openCourse, setOpenCourse] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openGrade, setOpenGrade] = useState(false);

 console.log(enrollment.course_id);

  const [courseId, setCourseId] = useState();
  const [studentId, setStudentId] = useState();
  const [grade, setGrade] = useState();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([
    { label: "A", value: "A" },
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B", value: "B" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "C", value: "C" },
    { label: "C+", value: "C+" },
    { label: "C-", value: "C-" },
    { label: "D", value: "D" },
    { label: "D+", value: "D+" },
    { label: "D-", value: "D-" },
  ]);

  useEffect(() => {
    if (data) {
      setEnrollment(data.enrollment);
      setCourses(data.courses);
      setStudents(data.students);
    }
  }, [data]);

  // useEffect(() => {
  //   if (enrollment) {
  //     setEnrollment({
  //       ...enrollment,
  //       student_id: studentId,
  //       course_id: courseId,
  //       grade: grade
  //     });
  //   }
  // }, [enrollment]);

  function handleInsert() {
    insertEnrollment({
      variables: {
        student_id: enrollment.student_id,
        course_id: enrollment.course_id,
      },
    });
    navigation.goBack();
  }

  function handleUpdate() {
    updateEnrollment({
      variables: {
        id: enrollment.id,
        student_id: enrollment.student_id,
        course_id: enrollment.course_id,
      },
    });
    navigation.goBack();
  }

  function handleDelete() {
    deleteEnrollment({
      variables: {
        id: enrollment.id,
      },
    });
    navigation.goBack();
  }

  if (loading) return <Fetching />;
  if (error) return <Error error={error} />;

  function handleChangeId(value) {
    setEnrollment({ ...enrollment, id: value });
  }
  // function handleChangeCourse(value) {
  //   setEnrollment({ ...enrollment, course_id: value });
  // }
  // function handleChangeStudent(value) {
  //   setEnrollment({ ...enrollment, student_id: value });
  // }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Id"
        onChangeText={handleChangeId}
        style={styles.input}
        value={enrollment.id.toString()}
      />
      <DropDownPicker
        open={openCourse}
        value={enrollment.course_id}
        items={courses}
        setOpen={setOpenCourse}
        setValue={setCourseId}
        setItems={setCourses}
        style={styles.picker}
      />
      <DropDownPicker
        open={openStudent}
        value={enrollment.student_id}
        items={students}
        setOpen={setOpenStudent}
        setValue={setStudentId}
        setItems={setStudents}
        style={styles.picker}
      />
      <DropDownPicker
        open={openGrade}
        value={enrollment.grade}
        items={grades}
        setOpen={setOpenGrade}
        setValue={setGrade}
        setItems={setGrades}
        style={styles.picker}
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
  picker: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
});
