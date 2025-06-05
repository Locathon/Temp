import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseScreen from '../screens/Courses/CourseScreen';

const Stack = createNativeStackNavigator();

const CourseNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CourseScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourseScreen" component={CourseScreen} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;