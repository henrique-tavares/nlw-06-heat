import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const sytles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 36
  },

  message: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    lineHeight: 22,
    marginBottom: 12
  },

  footer: {
    flexDirection: 'row',
    alignItems: "center",
    width: '100%'
  },

  userName: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginLeft: 16
  }
});