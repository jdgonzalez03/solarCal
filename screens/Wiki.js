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
import { stylesWiki } from "../styles/stylesWiki.js";

export default function Wiki() {
  const [selectedTema, setSelectedTema] = useState(null);

  const renderWikiItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedTema(item)}
      style={stylesWiki.itemContainer}
    >
      <Text style={stylesWiki.title}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  const DetailModal = () => (
    <Modal
      visible={selectedTema !== null}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedTema(null)}
    >
      <View style={stylesWiki.modalContainer}>
        <View style={stylesWiki.modalContent}>
          <ScrollView>
            <Text style={stylesWiki.title}>{selectedTema?.titulo}</Text>
            <Text style={stylesWiki.description}>{selectedTema?.concepto}</Text>

            {selectedTema?.tipos && (
              <View>
                <Text style={stylesWiki.typesTitle}>Tipos:</Text>
                {selectedTema.tipos.map((tipo, index) => (
                  <Text key={index} style={stylesWiki.listItem}>
                    • {tipo}
                  </Text>
                ))}
              </View>
            )}

            <Text style={stylesWiki.typesTitle}>Aplicaciones:</Text>
            {selectedTema?.aplicaciones.map((aplicacion, index) => (
              <Text key={index} style={stylesWiki.listItem}>
                • {aplicacion}
              </Text>
            ))}

            <TouchableOpacity
              onPress={() => setSelectedTema(null)}
              style={stylesWiki.closeButton}
            >
              <Text style={stylesWiki.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <BaseScreenComponent>
      <View style={stylesWiki.container}>
        <Text style={stylesWiki.header}>Conceptos Básicos</Text>
        <Text style={stylesWiki.description}>
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
