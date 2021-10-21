import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoutText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: COLORS.WHITE,
    marginRight: 20
  }
});