import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import PotenciaCalculator from "../components/PotenciaCalculator";
import EnergiaCalculator from "../components/EnergiaCalculator";
import BateriaCalculator from "../components/BateriaCalculator";
import ControladorCalculator from "../components/ControladorCalculator";
import InversorCalculator from "../components/InversorCalculator";
import FullCalculator from "../components/FullCalculator";

import { stylesCalculator } from "../styles/stylesCalculator";

export default function Calculator() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Potencia, corriente, voltaje", value: "potencia" },
    { label: "Energia", value: "energia" },
    { label: "Dimensionamiento de banco de baterias", value: "bateria" },
    { label: "Dimensionamiento de controlador", value: "controlador" },
    { label: "Dimensionamiento de inversores", value: "inversor" },
    { label: "Ejercicio completo", value: "completo" },
  ]);

  const renderComponent = () => {
    switch (value) {
      case "potencia":
        return <PotenciaCalculator />;
      case "energia":
        return <EnergiaCalculator />;
      case "bateria":
        return <BateriaCalculator />;
      case "controlador":
        return <ControladorCalculator />;
      case "inversor":
        return <InversorCalculator />;
      case "completo":
        return <FullCalculator />;
      default:
        return (
          <Text style={stylesCalculator.resultText}>
            Por favor elija una de las opciones
          </Text>
        );
    }
  };

  return (
    <View style={stylesCalculator.container}>
      <View style={stylesCalculator.headerContainer}>
        <Text style={stylesCalculator.subHeaderText}>
          Elige el tipo de ejercicio que deseas solventar
        </Text>
      </View>

      <View style={stylesCalculator.dropdownContainer}>
        <DropDownPicker
          open={open}
          items={items}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      <ScrollView contentContainerStyle={stylesCalculator.scrollView}>
        <View style={stylesCalculator.resultContainer}>
          {renderComponent()}
        </View>
      </ScrollView>
    </View>
  );
}
