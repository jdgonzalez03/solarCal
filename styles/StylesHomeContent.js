import { StyleSheet } from "react-native";

export const stylesHomeContent = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },

  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },

  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 20,
  },

  footerText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
