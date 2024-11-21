import { StyleSheet } from "react-native";

export const stylesHomeContent = StyleSheet.create({
  // Estilo para la vista general de la pantalla
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8", // Fondo suave para la pantalla
  },

  // Estilo para cada item en la lista
  itemContainer: {
    backgroundColor: "#fff", // Fondo blanco para cada sección de la lista
    borderRadius: 10, // Bordes redondeados para cada item
    marginBottom: 15, // Separación entre los items
    padding: 15, // Espacio interno para los textos
    shadowColor: "#000", // Sombra para dar un efecto de elevación
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra en dispositivos Android
  },

  // Estilo para el título
  title: {
    fontSize: 20,
    fontWeight: "bold", // Negrita para resaltar el título
    color: "#333", // Color oscuro para el título
    marginBottom: 5, // Espacio debajo del título
  },

  // Estilo para la descripción
  description: {
    fontSize: 16,
    color: "#666", // Color gris para la descripción
    lineHeight: 22, // Espacio entre líneas para mejor lectura
  },

  // Estilo para el encabezado de la página
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2", // Color azul para el encabezado
    textAlign: "center", // Alineación centrada
    marginBottom: 20, // Espacio debajo del encabezado
  },

  // Estilo para el texto de firma
  footerText: {
    fontSize: 14,
    color: "#888", // Color gris claro
    textAlign: "center", // Alineación centrada
    marginTop: 20, // Espacio en la parte inferior
  },
});
