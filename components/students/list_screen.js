import { FlatList, View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';

import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "../../gql/students/queries";

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';
import Separator from '../layout/seperator';

import StudentItem from './student_item';

export default function StudentsListScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_STUDENTS);

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  console.log(data.students);


  function handleDetails(student) {

    navigation.navigate("StudentsDetails", {id: student.id});

  }

  function handleInsert() {

    navigation.navigate("StudentsDetails", {id: 0});

  }


  return (
    <View style={styles.container}>
      <FlatList
        data={data.students}
        renderItem={({ item }) => <StudentItem student={item} onPress={() => handleDetails(item)} />}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={Separator}
      />
      <FAB
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        color="darkblue"
        onPress={handleInsert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});