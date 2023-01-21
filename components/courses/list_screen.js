import { FlatList, View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';

import { useQuery } from "@apollo/client";

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';
import Separator from '../layout/seperator';

import CourseItem from './course_item';
import { GET_COURSES } from '../../gql/courses/queries';

export default function CoursesListScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_COURSES);

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  console.log(data.courses);


  function handleDetails(course) {

    navigation.navigate("CoursesDetails", {id: course.id});

  }

  function handleInsert() {

    navigation.navigate("CoursesDetails", {id: 0});

  }


  return (
    <View style={styles.container}>
      <FlatList
        data={data.courses}
        renderItem={({ item }) => <CourseItem course={item} onPress={() => handleDetails(item)} />}
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