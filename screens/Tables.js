// MathFormulas.js
import React from "react";
import { ScrollView, Text, View, StyleSheet, Platform } from "react-native";

import { formulas } from "../content/contentTables";

import MathExpression from "../components/MathExpression";
import MathView from "react-native-math-view";

export default function Tables() {
  return (
    <ScrollView style={styles.container}>
      {formulas.map((item) => (
        <View key={item.id} style={styles.formulaContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.mathContainer}>
            {Platform.OS === "ios" ? (
              <MathView math={item.formula_ios} />
            ) : (
              <MathExpression formula={item.formula} />
            )}
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formulaContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mathContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
});
