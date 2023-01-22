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
    variables: { id }
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

  function openCoursePicker(isOpen) {
    setOpenCourse(isOpen);
    setOpenStudent(false);
    setOpenGrade(false);
  }

  function openStudentPicker(isOpen) {
    setOpenCourse(false);
    setOpenStudent(isOpen);
    setOpenGrade(false);
  }

  function openGradePicker(isOpen) {
    setOpenCourse(false);
    setOpenStudent(false);
    setOpenGrade(isOpen);
  }

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

  const [enrollment, setEnrollment] = useState({
    id: 0,
    student_id: "",
    course_id: "",
    grade: "",
  });

  useEffect(() => {
    if (data) {
      setEnrollment(data.enrollment);
      setCourses(data.courses);
      setStudents(data.students);
      if (data.enrollment !== null) {
        setCourseId(data.enrollment.course_id);
        setStudentId(data.enrollment.student_id);
        setGrade(data.enrollment.grade);
      }
    }
  }, [data]);

  function handleInsert() {
    insertEnrollment({
      variables: {
        student_id: studentId,
        course_id: courseId,
        grade: grade
      },
    });
    navigation.goBack();
  }

  function handleUpdate() {
    updateEnrollment({
      variables: {
        id: enrollment.id,
        student_id: studentId,
        course_id: courseId,
        grade: grade,
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


  return (
    <View style={styles.container}>
      <DropDownPicker
        zIndex={3000}
        open={openCourse}
        value={courseId}
        items={courses}
        setOpen={openCoursePicker}
        setValue={setCourseId}
        setItems={setCourses}
        style={styles.picker}
      />
      <DropDownPicker
        zIndex={2000}
        open={openStudent}
        value={studentId}
        items={students}
        setOpen={openStudentPicker}
        setValue={setStudentId}
        setItems={setStudents}
        style={styles.picker}
      />
      <DropDownPicker
        zIndex={1000}
        open={openGrade}
        value={grade}
        items={grades}
        setOpen={openGradePicker}
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
