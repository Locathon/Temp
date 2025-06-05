import Guide from '../screens/Info/guide';
import Privacy from '../screens/Info/privacy';
import Settings from '../screens/Info/settings';
import Terms from '../screens/Info/terms';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function InfoNavigator() {
  return (    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="settings" component = {Settings} />
        <Stack.Screen name="terms" component={Terms} />
        <Stack.Screen name="privacy" component={Privacy} />
        <Stack.Screen name="guide" component={Guide} />
    </Stack.Navigator>
    );
}