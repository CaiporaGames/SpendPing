// setup-jest.js
import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native/extend-expect";

// Silence noisy native warnings in tests
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
