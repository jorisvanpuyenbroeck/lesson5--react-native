import { Text, Pressable, StyleSheet } from "react-native";

export default function EnrollmentItem({ enrollment, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.id}>{enrollment.id}</Text>
      <Text style={styles.firstname}>{enrollment.student.firstname}</Text>
      <Text style={styles.lastname}>{enrollment.student.lastname}</Text>
      <Text style={styles.course}>{enrollment.course.title}</Text>
      <Text style={styles.grade}>{enrollment.grade}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    alignContent: "center",
  },
  id: {
    flex: 1,
    fontSize: 15,
    height: 50,
    padding: 10,
    textAlignVertical: "center",
    justifyContent: "flex-start",
  },
  firstname: {
    flex: 3,
    fontSize: 15,
    height: 50,
    padding: 10,
    textAlignVertical: "center",
    justifyContent: "flex-start",
  },
  lastname: {
    flex: 4,
    fontSize: 15,
    height: 50,
    padding: 10,
    textAlignVertical: "center",
    justifyContent: "flex-start",
  },
  course: {
    flex: 4,
    fontSize: 15,
    height: 50,
    padding: 10,
    textAlignVertical: "center",
    justifyContent: "flex-start",
  },
  grade: {
    flex: 1,
    fontSize: 15,
    height: 50,
    padding: 10,
    textAlignVertical: "center",
    justifyContent: "flex-start",
  },
});
