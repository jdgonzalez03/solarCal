import { Text, FlatList, View } from "react-native";
import BaseScreenComponent from "../components/BaseScreenComponent.js";
import HomeContent from "../content/HomeContent.json";
import { stylesHomeContent } from "../styles/StylesHomeContent.js";
import { ScrollView } from "react-native";

export default function Home() {
  console.log(HomeContent);

  return (
    <BaseScreenComponent>
      <ScrollView style={stylesHomeContent.container}>
        {/* Título de la aplicación */}
        <Text style={stylesHomeContent.header}>Bienvenidos a</Text>
        <Text style={stylesHomeContent.header}>SolarCal</Text>

        {/* FlatList con la tabla de contenido */}
        {HomeContent.map((item) => {
          return (
            <View key={item.id} style={stylesHomeContent.itemContainer}>
              <Text style={stylesHomeContent.title}>{item.section}</Text>
              <Text style={stylesHomeContent.description}>
                {item.description}
              </Text>
            </View>
          );
        })}

        {/* Pie de página */}
        <Text style={stylesHomeContent.footerText}>Hecho por:</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Text style={(stylesHomeContent.footerText, { fontWeight: "bold" })}>
            Juan D. Gonzalez
          </Text>
          <Text style={(stylesHomeContent.footerText, { fontWeight: "bold" })}>
            Juan D. Reyes
          </Text>
        </View>
      </ScrollView>
    </BaseScreenComponent>
  );
}
