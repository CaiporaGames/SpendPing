// src/app/navigation/AppNavigator.tsx (optional tab shell)
import { createNativeStackNavigator as createStack } from "@react-navigation/native-stack";
import { HomePage } from "@/features/expenses/pages/HomePage.js";
import { InsightsPage } from "@/features/expenses/pages/InsightsPage.js";

const Stack = createStack();

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="Insights" component={InsightsPage} />
  </Stack.Navigator>
);
