import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import InventoryLayout from "@/components/inventoryLayout";
import SimpleInventoryForm, { FormValues } from "@/components/newItemForm";
import { client } from "@/services/client";

export default function AddItemPage() {
  const handleSubmit = async (data: FormValues) => {
    try {
      const payload = data;
      const response = await client.api.clothes.$post({
        json: payload,
      });
      console.log("Se enviarion los datos");
      if (response.ok) {
        console.log("Éxito", "Ropa registrada con éxito correctamente");
      } else {
        console.log("Error al envio");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error inesperado");
    }
  };

  return (
    <InventoryLayout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Añadir un Nuevo Producto al Inventario
          </Text>
          <Text style={styles.subtitle}>
            Rellena el formulario para agregar un producto a tu iventario.
          </Text>
        </View>
        <SimpleInventoryForm onFormSubmit={handleSubmit}></SimpleInventoryForm>
      </ScrollView>
    </InventoryLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
