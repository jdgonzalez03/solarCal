import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BaseScreenComponent from "./BaseScreenComponent";
import { useState } from "react";
import {
  corrienteCortoCircuitoControlador,
  maximaCorrienteCarga,
} from "../utils/dimensionamientoControlador";

export default function ControladorCalculator() {
  const [corrienteCortoCircuito, setCorrienteCortoCircuito] = useState("");
  const [cantidadModulos, setCantidadModulos] = useState("");
  const [cargaTotal, setCargaTotal] = useState("");
  const [voltajeSistema, setVoltajeSistema] = useState("");
  const [resultados, setResultados] = useState(null);

  const calcularResultados = () => {
    const corriente = parseFloat(corrienteCortoCircuito.replace(",", ".")) || 0;
    const numModulos = parseFloat(cantidadModulos.replace(",", ".")) || 0;
    const cargTotal = parseFloat(cargaTotal.replace(",", ".")) || 0;
    const voltage = parseFloat(voltajeSistema.replace(",", ".")) || 0;

    if (corriente > 0 && numModulos > 0 && cargTotal > 0 && voltage > 0) {
      setResultados({
        corrienteCorto: corrienteCortoCircuitoControlador(
          corriente,
          numModulos,
        ),
        maxCorrienteDC: maximaCorrienteCarga(cargTotal, voltage).toFixed(2),
      });
    } else {
      setResultados({
        corrienteCorto: "Error: Verifique los valores ingresados",
        maxCorrienteDC: "Error: Verifique los valores ingresados",
      });
    }
  };

  return (
    <BaseScreenComponent>
      <Text style={styles.title}>Dimensionamiento de Controlador</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Corriente de corto circuito del módulo (A):
        </Text>
        <TextInput
          value={corrienteCortoCircuito}
          onChangeText={setCorrienteCortoCircuito}
          placeholder="Ejemplo: 10.5"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cantidad de módulos:</Text>
        <TextInput
          value={cantidadModulos}
          onChangeText={setCantidadModulos}
          placeholder="Ejemplo: 4"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Carga total del sistema (W):</Text>
        <TextInput
          value={cargaTotal}
          onChangeText={setCargaTotal}
          placeholder="Ejemplo: 500"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Voltaje del sistema DC (V):</Text>
        <TextInput
          value={voltajeSistema}
          onChangeText={setVoltajeSistema}
          placeholder="Ejemplo: 12"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularResultados}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        {resultados && (
          <View>
            <Text style={styles.resultText}>
              Corriente de corto circuito del controlador:{" "}
              {resultados.corrienteCorto} A
            </Text>
            <Text style={styles.resultText}>
              Corriente máxima del controlador (DC): {resultados.maxCorrienteDC}{" "}
              A
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
    textAlign: "center",
    marginVertical: 10,
    color: "#4A90E2",
  },
  inputContainer: {
    marginVertical: 10,
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
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
