import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import BaseScreenComponent from "../components/BaseScreenComponent.js";
import WikiContent from "../content/WikiContent.json";

export default function Wiki() {
  const [selectedTema, setSelectedTema] = useState(null);

  const renderWikiItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedTema(item)}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {item.titulo}
      </Text>
    </TouchableOpacity>
  );

  const DetailModal = () => (
    <Modal
      visible={selectedTema !== null}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedTema(null)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <ScrollView>
            {/* Titulo */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {selectedTema?.titulo}
            </Text>
            {/* Concepto */}
            <Text style={{ marginBottom: 10 }}>{selectedTema?.concepto}</Text>
            {/* Renderiza tipos si hay */}
            {selectedTema?.tipos && (
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Tipos:
                </Text>
                {selectedTema.tipos.map((tipo, index) => (
                  <Text key={index} style={{ marginLeft: 10 }}>
                    • {tipo}
                  </Text>
                ))}
              </View>
            )}
            {/* Aplicaciones */}
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Aplicaciones:
            </Text>
            {selectedTema?.aplicaciones.map((aplicacion, index) => (
              <Text key={index} style={{ marginLeft: 10 }}>
                • {aplicacion}
              </Text>
            ))}
            {/* Cerrar modal */}
            <TouchableOpacity
              onPress={() => setSelectedTema(null)}
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <BaseScreenComponent>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          En esta sección encontrarás algunos conceptos básicos que pueden ser
          útiles.
        </Text>
      </View>
      <FlatList
        data={WikiContent.temas}
        keyExtractor={(item) => item.titulo}
        renderItem={renderWikiItem}
      />
      <DetailModal />
    </BaseScreenComponent>
  );
}
