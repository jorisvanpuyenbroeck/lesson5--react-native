import { Text, Pressable, StyleSheet } from 'react-native';

export default function CourseItem({course, onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.circle}>{course.title.charAt(0).toUpperCase()}</Text>
      <Text style={styles.name}>{course.title}</Text>
      <Text style={styles.rectangular}>{course.credits}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    alignContent: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    backgroundColor: 'darkblue',
    marginLeft: 10,
    marginRight: 20,
  },
  rectangular: {
    flex: 1,
    width: 30,
    height: 30,
    color: 'darkblue',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    backgroundColor: 'lightblue',
    marginLeft: 10,
    marginRight: 20,
    alignSelf: 'center'
  },
  name: {
    fontSize: 15,
    flex: 4,
    height: 50,
    textAlignVertical: 'center',
  },
});