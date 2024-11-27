import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BaseScreenComponent from "./BaseScreenComponent";

export default function InversorCalculator() {
  const [cargasTotales, setCargasTotales] = useState(""); // Potencia total de las cargas en Watts
  const [factorSeguridad, setFactorSeguridad] = useState("1.25"); // Factor de seguridad
  const [voltajeSistema, setVoltajeSistema] = useState(""); // Voltaje del sistema DC
  const [resultados, setResultados] = useState(null); // Resultado de cálculos

  const calcularInversor = () => {
    const cargas = parseFloat(cargasTotales.replace(",", "."));
    const factor = parseFloat(factorSeguridad.replace(",", ".")) || 1;
    const voltaje = parseFloat(voltajeSistema.replace(",", "."));

    if (isNaN(cargas) || isNaN(voltaje)) {
      alert("Por favor ingresa valores válidos para las cargas y el voltaje.");
      return;
    }

    const potenciaInversor = cargas * factor;
    const corrienteEntrada = potenciaInversor / voltaje;

    setResultados({
      potenciaInversor: potenciaInversor.toFixed(2) + " W",
      corrienteEntrada: corrienteEntrada.toFixed(2) + " A",
    });
  };

  return (
    <BaseScreenComponent>
      <Text style={styles.title}>Calculadora de Inversores</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Ingrese la potencia total de las cargas (W):
        </Text>
        <TextInput
          style={styles.input}
          value={cargasTotales}
          onChangeText={setCargasTotales}
          placeholder="Ejemplo: 950"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Ingrese el factor de seguridad (ej. 1.25):
        </Text>
        <TextInput
          style={styles.input}
          value={factorSeguridad}
          onChangeText={setFactorSeguridad}
          placeholder="Ejemplo: 1.25"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ingrese el voltaje del sistema DC (V):</Text>
        <TextInput
          style={styles.input}
          value={voltajeSistema}
          onChangeText={setVoltajeSistema}
          placeholder="Ejemplo: 48"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularInversor}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultados && (
        <View style={styles.resultsContainer}>
          <Text style={styles.result}>
            Potencia recomendada del inversor: {resultados.potenciaInversor}
          </Text>
          <Text style={styles.result}>
            Corriente de entrada del inversor: {resultados.corrienteEntrada}
          </Text>
        </View>
      )}
    </BaseScreenComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
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
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
  },
  result: {
    fontSize: 16,
    marginBottom: 10,
  },
});
