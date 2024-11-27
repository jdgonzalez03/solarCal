import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BaseScreenComponent from "./BaseScreenComponent";

export default function EnergiaCalculator() {
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [energy, setEnergy] = useState(null);
  const [unit, setUnit] = useState("W");

  const handleCalculate = () => {
    const powerValue =
      unit === "W"
        ? parseFloat(power.replace(",", "."))
        : parseFloat(power.replace(",", ".")) * 1000;

    const result = powerValue * parseFloat(hours.replace(",", "."));
    setEnergy(unit === "W" ? result : result / 1000);
  };

  return (
    <BaseScreenComponent>
      <View
        style={{
          flex: 1,
          alignContent: "flex-start",
          padding: 15,
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.title}>Calculadora de Energía</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingresa la potencia:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={`Potencia en ${unit}`}
            value={power}
            onChangeText={setPower}
          />
          <View style={styles.unitContainer}>
            <Text style={styles.unitLabel}>Unidad:</Text>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === "W" ? styles.unitButtonActive : null,
              ]}
              onPress={() => setUnit("W")}
            >
              <Text style={styles.unitButtonText}>W</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === "kW" ? styles.unitButtonActive : null,
              ]}
              onPress={() => setUnit("kW")}
            >
              <Text style={styles.unitButtonText}>kW</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingresa las horas de uso:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Horas de uso"
            value={hours}
            onChangeText={setHours}
          />
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>Calcular</Text>
        </TouchableOpacity>

        {energy !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>
              La energía es: {energy.toFixed(2)} {unit === "W" ? "Wh" : "kWh"}
            </Text>
          </View>
        )}
      </View>
    </BaseScreenComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4A90E2",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  unitContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  unitLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  unitButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  unitButtonActive: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  unitButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  calculateButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
  },
});
