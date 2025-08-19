import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { mockInventory } from "../../lib/data"; // Ajusta ruta según tu proyecto
import InventoryLayout from "@/components/inventoryLayout";

// import InventoryClientPage from "../../components/InventoryClientPage"; // Ajusta ruta también

export default function InventoryPage() {
  const inventory = mockInventory;
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter((item) => item.quantity < 10).length;
  const categories = new Set(inventory.map((item) => item.category)).size;

  return (
    <InventoryLayout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Inventory Dashboard</Text>
          <Text style={styles.subtitle}>
            An overview of your clothing inventory.
          </Text>
        </View>

        <View style={styles.cardGrid}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Total Items</Text>
              <Icon name="package" size={20} color="#666" />
            </View>
            <Text style={styles.cardValue}>{totalItems}</Text>
            <Text style={styles.cardDescription}>Total units in stock</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Low Stock Alerts</Text>
              <Icon name="alert-triangle" size={20} color="#e63946" />
            </View>
            <Text style={[styles.cardValue, styles.dangerText]}>
              {lowStockItems}
            </Text>
            <Text style={styles.cardDescription}>Items needing reorder</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Categories</Text>
              <Icon name="layers" size={20} color="#666" />
            </View>
            <Text style={styles.cardValue}>{categories}</Text>
            <Text style={styles.cardDescription}>Distinct item categories</Text>
          </View>
        </View>

        {/* <InventoryClientPage data={inventory} /> */}
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
  cardGrid: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    backgroundColor: "#fafafa",
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dangerText: {
    color: "#e63946",
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
  },
});
