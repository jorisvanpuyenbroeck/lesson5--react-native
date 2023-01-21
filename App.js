import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { createTheme, ThemeProvider } from "@rneui/themed";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import WelcomeScreen from "./components/authentication/welcome_screen";
import HomeScreen from "./components/authentication/home_screen";
import SignInScreen from "./components/authentication/signin_screen";
import SignUpScreen from "./components/authentication/signup_screen";

import TodoScreen from "./components/todo_screen";

import StudentsListScreen from "./components/students/list_screen";
import StudentsDetailsScreen from "./components/students/details_screen";
import CoursesListScreen from "./components/courses/list_screen";
import CoursesDetailsScreen from "./components/courses/details_screen";
import EnrollmentsListScreen from "./components/enrollments/list_screen";
import EnrollmentsDetailsScreen from "./components/enrollments/details_screen";


import "./config/firebase";
import { useAuthentication } from "./hooks/use_authentication";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);

import configData from "./config/graphql.json";
import { Text } from "react-native-elements";


const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    "x-hasura-admin-secret": configData.qlkey,
  },
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsStack = createNativeStackNavigator();
const CoursesStack = createNativeStackNavigator();
const EnrollmentsStack = createNativeStackNavigator();



const theme = createTheme({
  lightColors: {
    primary: "darkblue",
  },
  darkColors: {
    primary: "#000",
  },
});

function EnrollmentScreen() {
  return (
    <EnrollmentsStack.Navigator>
      <EnrollmentsStack.Screen
        name="EnrollmentsList"
        component={EnrollmentsListScreen}
        options={{ title: "Enrollments" }}
      />
      <EnrollmentsStack.Screen
        name="EnrollmentsDetails"
        component={EnrollmentsDetailsScreen}
        options={{ title: "Enrollment Details" }}
      />
    </EnrollmentsStack.Navigator>
  );
}


function StudentScreen() {
  return (
    <StudentsStack.Navigator>
      <StudentsStack.Screen
        name="StudentsList"
        component={StudentsListScreen}
        options={{ title: "Students" }}
      />
      <StudentsStack.Screen
        name="StudentsDetails"
        component={StudentsDetailsScreen}
        options={{ title: "Student Details" }}
      />
    </StudentsStack.Navigator>
  );
}

function CourseScreen() {
  return (
    <CoursesStack.Navigator>
      <CoursesStack.Screen
        name="CoursesList"
        component={CoursesListScreen}
        options={{ title: "Courses" }}
      />
      <CoursesStack.Screen
        name="CoursesDetails"
        component={CoursesDetailsScreen}
        options={{ title: "Course Details" }}
      />
    </CoursesStack.Navigator>
  );
}

export default function App() {
  const { user } = useAuthentication();

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {user ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  switch (route.name) {
                    case "Welcome":
                      iconName = focused ? "home-sharp" : "home-outline";
                      break;
                    case "Students":
                      iconName = focused
                        ? "person-circle"
                        : "person-circle-outline";
                      break;
                    case "Courses":
                      iconName = focused ? "book" : "book-outline";
                      break;
                    case "Enrollments":
                      iconName = focused ? "md-push" : "md-push-outline";
                      break;
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "darkblue",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen name="Welcome" component={WelcomeScreen} />
              <Tab.Screen name="Students" component={StudentScreen} options={{headerShown: false}} />
              <Tab.Screen name="Courses" component={CourseScreen} options={{headerShown: false}} />
              <Tab.Screen name="Enrollments" component={EnrollmentScreen} options={{headerShown: false}} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Sign In" component={SignInScreen} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApolloProvider>
    </ThemeProvider>
  );
}
