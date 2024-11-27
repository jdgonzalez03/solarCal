import { StyleSheet } from "react-native";

export const stylesCalculator = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa", // Fondo claro
  },

  // Contenedor del encabezado
  headerContainer: {
    marginBottom: 15,
    alignItems: "center",
  },

  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A90E2", // Azul para destacar el encabezado
    textAlign: "center",
  },

  subHeaderText: {
    fontSize: 16,
    color: "#666", // Gris suave
    textAlign: "center",
    marginTop: 5,
  },

  // Contenedor para el DropdownPicker
  dropdownContainer: {
    marginVertical: 20,
    zIndex: 1000, // Para evitar problemas de superposición
  },

  // Contenedor de los resultados o componentes renderizados
  resultContainer: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fff", // Fondo blanco para contraste
    borderRadius: 8,
    shadowColor: "#000", // Sombras para un efecto de elevación
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },

  // Estilo para el texto dentro de la sección de resultados
  resultText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },

  // Estilo del ScrollView
  scrollView: {
    flexGrow: 1,
    marginTop: 10,
    padding: 5,
  },
});
