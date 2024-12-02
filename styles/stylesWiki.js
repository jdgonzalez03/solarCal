import { StyleSheet } from "react-native";

export const stylesWiki = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
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

  typesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },

  listItem: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    marginBottom: 3,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
