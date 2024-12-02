import { StyleSheet } from "react-native";

export const stylesCalculator = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
  },

  headerContainer: {
    marginBottom: 15,
    alignItems: "center",
  },

  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
  },

  subHeaderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },

  dropdownContainer: {
    marginVertical: 20,
    zIndex: 1000,
  },

  resultContainer: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  resultText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },

  scrollView: {
    flexGrow: 1,
    marginTop: 10,
    padding: 5,
  },
});
