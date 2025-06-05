import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseCreateScreen from '../screens/Courses/CourseCreateScreen';
import CourseListScreen from '../screens/Courses/CourseListScreen';
import CourseScreen from '../screens/Courses/CourseScreen';
import PlaceSearchScreen from '../screens/Courses/PlaceSearchScreen';

const Stack = createNativeStackNavigator();

const CourseNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CourseScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourseScreen" component={CourseScreen} />
      <Stack.Screen name="CourseCreateScreen" component={CourseCreateScreen} />
      <Stack.Screen name="CourseListScreen" component={CourseListScreen} />
      <Stack.Screen name="PlaceSearchScreen" component={PlaceSearchScreen} />
      
    </Stack.Navigator>
  );
};

export default CourseNavigator;