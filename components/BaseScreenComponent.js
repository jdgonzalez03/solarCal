import { View } from "react-native";
import { baseStylesScreen } from "../styles/BaseScreenStyles";

export default function BaseScreenComponent({ children }) {
  return <View style={baseStylesScreen.container}>{children}</View>;
}
