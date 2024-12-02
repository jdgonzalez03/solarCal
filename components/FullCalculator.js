import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import BaseScreenComponent from "./BaseScreenComponent";
import {
  getMaxPower,
  getMaxEnergyDaily,
  getMaxCurrent,
  getRealEnergyMax,
  getPanelesParalelo,
  getPanelesSerie,
  getMaxCurrentControlador,
  getMaxPowerInversor,
  getBateriasParalelo,
  getBateriasSerie,
} from "../utils/fullCalculator.js";

export default function FullCalculator() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState({});
  const [voltajeBateria, setVoltajeBateria] = useState("");
  const [numeroDiasAutonomia, setNumeroDiasAutonomia] = useState("");
  const [capacidadBateria, setCapacidadBateria] = useState("");
  const [capacidadDescarga, setCapacidadDescarga] = useState("");
  const [voltajeNominalPanel, setVoltajeNominalPanel] = useState("");
  const [corrientCortoPanel, setCorrientCortoPanel] = useState("");
  const [corrienteNominalPanel, setCorrienteNominalPanel] = useState("");
  const [HSP, setHSP] = useState("");
  const [tensionSistema, setTensionSistema] = useState("");
  const [eficienciaInversor, setEficienciaInversor] = useState("");
  const [factorSeguridad, setFactorSeguridad] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [form, setForm] = useState({
    nombre_equipo: "",
    potencia: "",
    cantidad: "",
    horas_uso: "",
    dias_uso: "",
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const agregarEquipo = () => {
    const { nombre_equipo, potencia, cantidad, horas_uso } = form;

    // Validación básica
    if (
      !nombre_equipo ||
      !potencia ||
      !cantidad ||
      !horas_uso ||
      isNaN(potencia.replace(",", ".")) ||
      isNaN(cantidad) ||
      isNaN(horas_uso.replace(",", "."))
    ) {
      alert("Por favor, completa todos los campos con datos válidos.");
      return;
    }

    const potenciaNumerica = parseFloat(potencia.replace(",", "."));
    const horasUsoNumerico = parseFloat(horas_uso.replace(",", "."));
    const cantidadNumerica = parseInt(cantidad, 10);

    const potencia_total = potenciaNumerica * cantidadNumerica;
    const energia = potencia_total * horasUsoNumerico;

    // Crear un nuevo equipo y añadirlo al vector
    const nuevoEquipo = {
      nombre_equipo,
      potencia: potenciaNumerica,
      cantidad: cantidadNumerica,
      horas_uso: horasUsoNumerico,
      potencia_total,
      energia,
    };

    setEquipos([...equipos, nuevoEquipo]);

    // Limpiar el formulario
    setForm({
      nombre_equipo: "",
      potencia: "",
      cantidad: "",
      horas_uso: "",
    });
  };

  const clear = () => {
    setEquipos([]);
  };

  const getParams = () => {
    if (equipos.length === 0) {
      alert("Por favor, ingresa al menos un equipo antes de calcular.");
      return;
    }

    const maxPower = getMaxPower(equipos).toFixed(2);
    const maxEnergy = getMaxEnergyDaily(equipos).toFixed(2);
    const realEnergy = getRealEnergyMax(
      maxEnergy,
      parseFloat(eficienciaInversor.replace(",", ".")),
    ).toFixed(2);
    const maxCurrent = getMaxCurrent(
      realEnergy,
      parseFloat(tensionSistema.replace(",", ".")),
      parseFloat(factorSeguridad.replace(",", ".")),
    ).toFixed(2);

    const numPanelParalelo = getPanelesParalelo(
      maxCurrent,
      parseFloat(HSP.replace(",", ".")),
      parseFloat(corrienteNominalPanel.replace(",", ".")),
    ).toFixed(2);

    const numPanelSerie = getPanelesSerie(
      parseFloat(tensionSistema.replace(",", ".")),
      parseFloat(voltajeNominalPanel.replace(",", ".")),
    ).toFixed(2);

    const numBateriasParalelo = getBateriasParalelo(
      maxCurrent,
      parseFloat(numeroDiasAutonomia.replace(",", ".")),
      parseFloat(capacidadDescarga.replace(",", ".")),
      parseFloat(capacidadBateria.replace(",", ".")),
    ).toFixed(2);

    const numBateriasSerie = getBateriasSerie(
      parseFloat(tensionSistema.replace(",", ".")),
      parseFloat(voltajeBateria.replace(",", ".")),
    ).toFixed(2);

    const maxCurrentControlador = getMaxCurrentControlador(
      Math.ceil(numPanelParalelo),
      parseFloat(corrientCortoPanel.replace(",", ".")),
      parseFloat(factorSeguridad.replace(",", ".")),
    ).toFixed(2);

    const maxPowerInversor = getMaxPowerInversor(
      maxPower,
      parseFloat(factorSeguridad.replace(",", ".")),
      parseFloat(eficienciaInversor.replace(",", ".")),
    ).toFixed(2);

    console.log("Potencia máxima requerida:", maxPower);
    console.log("Energia máxima requerida:", maxEnergy);
    console.log("Eficiencia inversor", eficienciaInversor);
    console.log("Energia real diaria", realEnergy);
    console.log("Corriente real diaria", maxCurrent);
    console.log("Numero de paneles paralelo", numPanelParalelo);
    console.log(
      "Numero de paneles paralelo aproximado",
      Math.ceil(numPanelParalelo),
    );
    console.log("Numero de paneles serie", numPanelSerie);
    console.log("Numero de paneles serie aproximado", Math.ceil(numPanelSerie));
    console.log(
      `Paneles totales: ${Math.ceil(numPanelParalelo * numPanelSerie)}`,
    );
    console.log("Numero de baterias paralelo", numBateriasParalelo);
    console.log(
      "Numero de baterias paralelo aproximado",
      Math.ceil(numBateriasParalelo),
    );
    console.log("Numero de baterias serie", numBateriasSerie);
    console.log(
      "Numero de baterias serie aproximado",
      Math.ceil(numBateriasSerie),
    );
    console.log(
      `Baterias totales: ${Math.ceil(numBateriasParalelo * numBateriasSerie)}`,
    );
    console.log(
      "Maxima corriente que tolera el controlador: ",
      maxCurrentControlador,
    );
    console.log("Maxima potencia del inversor: ", maxPowerInversor);

    setResults({
      potencia_max: maxPower,
      energia_max: maxEnergy,
      eficiencia_inversor: eficienciaInversor,
      energia_real_diaria: realEnergy,
      corriente_real_diaria: maxCurrent,
      num_panel_paralelo: numPanelParalelo,
      num_panel_paralelo_aprox: Math.ceil(numPanelParalelo),
      num_panel_serie: numPanelSerie,
      num_panel_serie_aprox: Math.ceil(numPanelSerie),
      total_paneles: Math.ceil(numPanelParalelo * numPanelSerie),
      num_baterias_paralelo: numBateriasParalelo,
      num_baterias_paralelo_aprox: Math.ceil(numBateriasParalelo),
      num_baterias_serie: numBateriasSerie,
      num_baterias_serie_aprox: Math.ceil(numBateriasSerie),
      total_baterias: Math.ceil(numBateriasParalelo * numBateriasSerie),
      max_corriente_controlador: maxCurrentControlador,
      max_potencia_inversor: maxPowerInversor,
    });

    setOpen(true);
  };

  return (
    <BaseScreenComponent>
      <Text style={styles.title}>
        Calculadora diseño de sistemas fotovoltaicos
      </Text>
      <Text>Lista de equipos</Text>
      <ScrollView>
        <View>
          <View style={styles.inputGroup}>
            <Text>Ingrese el nombre del equipo: </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del equipo"
              value={form.nombre_equipo}
              onChangeText={(value) =>
                handleInputChange("nombre_equipo", value)
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Ingrese la potencia que consume el equipo (W): </Text>
            <TextInput
              style={styles.input}
              placeholder="Potencia"
              keyboardType="numeric"
              value={form.potencia}
              onChangeText={(value) => handleInputChange("potencia", value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Ingrese la cantidad de equipos: </Text>
            <TextInput
              style={styles.input}
              placeholder="# Equipos"
              keyboardType="numeric"
              value={form.cantidad}
              onChangeText={(value) => handleInputChange("cantidad", value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Ingrese la cantidad de días a las semana que se usa: </Text>
            <TextInput
              style={styles.input}
              placeholder="# Dias de uso"
              keyboardType="numeric"
              value={form.dias_uso}
              onChangeText={(value) => handleInputChange("dias_uso", value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Ingrese las horas de uso diario: </Text>
            <TextInput
              style={styles.input}
              placeholder="# Horas"
              keyboardType="numeric"
              value={form.horas_uso}
              onChangeText={(value) => handleInputChange("horas_uso", value)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={agregarEquipo}>
          <Text style={styles.buttonText}>¿Ingresar otro equipo?</Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Parametros Inversor, baterias...
          </Text>
          <View style={styles.inputGroup}>
            <Text>Ingrese la eficiencia del inversor: </Text>
            <TextInput
              style={styles.input}
              placeholder="Eficiencia del inversro (0 - 1)"
              keyboardType="numeric"
              value={eficienciaInversor}
              onChangeText={setEficienciaInversor}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese el factor de seguridad: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 1.2"
              keyboardType="numeric"
              value={factorSeguridad}
              onChangeText={setFactorSeguridad}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese la tension del sistema: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 12 V"
              keyboardType="numeric"
              value={tensionSistema}
              onChangeText={setTensionSistema}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese las horas solares pico: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 5.27"
              keyboardType="numeric"
              value={HSP}
              onChangeText={setHSP}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese la corriente nominal del panel: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 8.51 V"
              keyboardType="numeric"
              value={corrienteNominalPanel}
              onChangeText={setCorrienteNominalPanel}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese la corriente corto circuito del panel: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 9.51 V"
              keyboardType="numeric"
              value={corrientCortoPanel}
              onChangeText={setCorrientCortoPanel}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese el voltaje nominal del panel: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 12 V"
              keyboardType="numeric"
              value={voltajeNominalPanel}
              onChangeText={setVoltajeNominalPanel}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese la profundidad de descarga de baterias: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 0.35 "
              keyboardType="numeric"
              value={capacidadDescarga}
              onChangeText={setCapacidadDescarga}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese la capacidad de bateria: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 100 Ah "
              keyboardType="numeric"
              value={capacidadBateria}
              onChangeText={setCapacidadBateria}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese el voltaje de bateria: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 12 V "
              keyboardType="numeric"
              value={voltajeBateria}
              onChangeText={setVoltajeBateria}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Ingrese los días de autonomia: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 2 dias "
              keyboardType="numeric"
              value={numeroDiasAutonomia}
              onChangeText={setNumeroDiasAutonomia}
            />
          </View>
        </View>
        <View>
          {equipos.map((equipo, index) => (
            <View key={index} style={styles.equipo}>
              <Text>Nombre: {equipo.nombre_equipo}</Text>
              <Text>Potencia: {equipo.potencia} W</Text>
              <Text>Cantidad: {equipo.cantidad}</Text>
              <Text>Horas de uso: {equipo.horas_uso}</Text>
              <Text>Días de uso: {equipo.dias_uso}</Text>
              <Text>Potencia Total: {equipo.potencia_total} W</Text>
              <Text>Energía: {equipo.energia} Wh</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={getParams}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={clear}>
          <Text style={styles.buttonText}>Limpiar datos</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Resultados Calculados</Text>
            <ScrollView>
              {Object.entries(results).map(([key, value]) => (
                <View key={key} style={styles.resultItem}>
                  <Text style={styles.resultKey}>
                    {key.replace(/_/g, " ")}:
                  </Text>
                  <Text style={styles.resultValue}>{value}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setOpen(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BaseScreenComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  equipo: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resultKey: {
    fontWeight: "bold",
    color: "#333",
  },
  resultValue: {
    color: "#555",
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
