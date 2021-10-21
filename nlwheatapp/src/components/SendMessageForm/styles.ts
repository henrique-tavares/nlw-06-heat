import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 184,
    justifyContent: 'space-between',
    backgroundColor: COLORS.BLACK_TERTIARY,
    paddingHorizontal: 20,
    paddingBottom: getBottomSpace() + 20,
    paddingTop: 20
  },

  input: {
    width: '100%',
    height: 88,
    textAlignVertical: 'top',
    color: COLORS.WHITE
  }
});