// App.tsx
import "react-native-reanimated"; // must be top
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "@/app/navigation/AppNavigator.js";
import { DepsProvider } from "@/config/DepsContext.js";

export default function App() {
  return (
    <DepsProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </DepsProvider>
  );
}
