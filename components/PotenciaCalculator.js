import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export default function PotenciaCalculator() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Potencia", value: "power" },
    { label: "Voltaje", value: "voltage" },
    { label: "Corriente", value: "current" },
  ]);

  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");

  // Función para parsear números reemplazando "," con "."
  const parseNumber = (num) => {
    return parseFloat(num.replace(",", "."));
  };

  const renderOperation = () => {
    switch (value) {
      case "power":
        return (
          <View style={styles.operationContainer}>
            <Text style={styles.label}>Ingresa el voltaje (V):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={op1}
              onChangeText={setOp1}
              placeholder="Voltaje"
            />
            <Text style={styles.label}>Ingresa la corriente (I):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={op2}
              onChangeText={setOp2}
              placeholder="Corriente"
            />
            <Text style={styles.result}>
              La potencia es:{" "}
              {op1 !== "" && op2 !== ""
                ? `${(parseNumber(op1) * parseNumber(op2)).toFixed(2)} Watts`
                : ""}
            </Text>
          </View>
        );
      case "voltage":
        return (
          <View style={styles.operationContainer}>
            <Text style={styles.label}>Ingresa la potencia (P):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={op1}
              onChangeText={setOp1}
              placeholder="Potencia"
            />
            <Text style={styles.label}>Ingresa la corriente (I):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={op2}
              onChangeText={setOp2}
              placeholder="Corriente"
            />
            <Text style={styles.result}>
              El voltaje es:{" "}
              {op2 !== "" && parseNumber(op2) !== 0
                ? `${(parseNumber(op1) / parseNumber(op2)).toFixed(2)} Volts`
                : "N/A"}
            </Text>
          </View>
        );
      case "current":
        return (
          <View style={styles.operationContainer}>
            <Text style={styles.label}>Ingresa la potencia (P):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={op1}
              onChangeText={setOp1}
              placeholder="Potencia"
            />
            <Text style={styles.label}>Ingresa el voltaje (V):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={op2}
              onChangeText={setOp2}
              placeholder="Voltaje"
            />
            <Text style={styles.result}>
              La corriente es:{" "}
              {op2 !== "" && parseNumber(op2) !== 0
                ? `${(parseNumber(op1) / parseNumber(op2)).toFixed(2)} Amperios`
                : "N/A"}
            </Text>
          </View>
        );
      default:
        return (
          <Text style={styles.infoText}>
            Por favor, selecciona una opción para calcular.
          </Text>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Calculadora de Potencia</Text>
      <Text style={styles.subHeader}>
        Selecciona qué deseas calcular (Potencia, Corriente o Voltaje)
      </Text>
      <DropDownPicker
        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Selecciona una opción"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      {renderOperation()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
  operationContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
