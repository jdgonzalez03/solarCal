import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BaseScreenComponent from "./BaseScreenComponent";

export default function BateriaCalculator() {
  const [cargaAC, setCargaAC] = useState("");
  const [cargaDC, setCargaDC] = useState("");
  const [eficienciaInversor, setEficienciaInversor] = useState("");
  const [voltajeSistemaDC, setVoltajeSistemaDC] = useState("");
  const [diasAutonomia, setDiasAutonomia] = useState("");
  const [limiteDescarga, setLimiteDescarga] = useState("");
  const [capacidadBateria, setCapacidadBateria] = useState("");
  const [voltajeBateria, setVoltajeBateria] = useState("");
  const [resultados, setResultados] = useState(null);
  const parseNumber = (value) => parseFloat(value.replace(",", ".") || "0");

  const calcularBancoBaterias = () => {
    const cargaACNum = parseNumber(cargaAC);
    const cargaDCNum = parseNumber(cargaDC);
    const eficienciaNum = parseNumber(eficienciaInversor) / 100 || 1;
    const voltajeSistemaDCNum = parseNumber(voltajeSistemaDC) || 12;
    const diasAutonomiaNum = parseNumber(diasAutonomia) || 1;
    const limiteDescargaNum = parseNumber(limiteDescarga) / 100 || 1;
    const capacidadBateriaNum = parseNumber(capacidadBateria) || 1;
    const voltajeBateriaNum = parseNumber(voltajeBateria) || 12;

    // Cálculo de Amperio-Hora promedio por día

    const amperHoraPromedioDia =
      cargaACNum / eficienciaNum + cargaDCNum / voltajeSistemaDCNum;

    // Cálculo de número de baterías en paralelo
    const aux2 = (amperHoraPromedioDia * diasAutonomiaNum) / limiteDescargaNum;
    const bateriasParalelo = aux2 / capacidadBateriaNum;

    // Cálculo de número de baterías en serie
    const bateriasSerie = voltajeSistemaDCNum / voltajeBateriaNum;

    // Cálculo del número total de baterías
    const bateriasTotales =
      Math.ceil(bateriasParalelo) * Math.ceil(bateriasSerie);

    // Actualizar resultados
    setResultados({
      amperHoraPromedioDia: amperHoraPromedioDia.toFixed(2),
      bateriasParalelo: Math.ceil(bateriasParalelo),
      bateriasSerie: Math.ceil(bateriasSerie),
      bateriasTotales,
    });
  };

  return (
    <BaseScreenComponent>
      <Text style={styles.title}>Dimensionamiento de Baterías</Text>
      <TextInput
        style={styles.input}
        placeholder="Carga promedio AC por día (Ah)"
        keyboardType="numeric"
        value={cargaAC}
        onChangeText={setCargaAC}
      />
      <Text>{`Carga promedio AC: ${cargaAC} Ah`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Carga promedio DC por día (Ah)"
        keyboardType="numeric"
        value={cargaDC}
        onChangeText={setCargaDC}
      />
      <Text>{`Carga promedio DC: ${cargaDC} Ah`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Eficiencia del inversor (0 a 100)"
        keyboardType="numeric"
        value={eficienciaInversor}
        onChangeText={setEficienciaInversor}
      />
      <Text>{`Eficiencia del inversor: ${eficienciaInversor}`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Voltaje del sistema DC (volts)"
        keyboardType="numeric"
        value={voltajeSistemaDC}
        onChangeText={setVoltajeSistemaDC}
      />
      <Text>{`Voltaje sistema DC: ${voltajeSistemaDC} V`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Días de autonomía"
        keyboardType="numeric"
        value={diasAutonomia}
        onChangeText={setDiasAutonomia}
      />
      <Text>{`Días de autonomía: ${diasAutonomia}`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Límite de descarga profunda (0 a 100)"
        keyboardType="numeric"
        value={limiteDescarga}
        onChangeText={setLimiteDescarga}
      />
      <Text>{`Límite de descarga: ${limiteDescarga}`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Capacidad de batería (Ah)"
        keyboardType="numeric"
        value={capacidadBateria}
        onChangeText={setCapacidadBateria}
      />
      <Text>{`Capacidad de batería: ${capacidadBateria} Ah`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Voltaje de batería (volts)"
        keyboardType="numeric"
        value={voltajeBateria}
        onChangeText={setVoltajeBateria}
      />
      <Text>{`Voltaje de batería: ${voltajeBateria} V`}</Text>

      <TouchableOpacity style={styles.button} onPress={calcularBancoBaterias}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultados && (
        <View style={styles.results}>
          <Text>
            Amperio-Hora promedio/día: {resultados.amperHoraPromedioDia} Ah
          </Text>
          <Text>
            Número de baterías en paralelo: {resultados.bateriasParalelo}
          </Text>
          <Text>Número de baterías en serie: {resultados.bateriasSerie}</Text>
          <Text>Número total de baterías: {resultados.bateriasTotales}</Text>
        </View>
      )}
    </BaseScreenComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A90E2",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  results: {
    marginTop: 20,
  },
});
