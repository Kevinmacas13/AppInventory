import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { InventoryTable } from "../../components/inventoryTable";
import InventoryLayout from "@/components/inventoryLayout";
import { client, InferResponseType } from "@/services/client";

export type MyClothe = InferResponseType<
  typeof client.api.clothes.$get
>["data"][0];
export default function ReportsPage() {
  const [clothes, setClothes] = useState<MyClothe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await client.api.clothes.$get();
        const json = await response.json();
        setClothes(json.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clothes]);
  const inventory = clothes;
  const totalCost = inventory.reduce(
    (sum, item) => sum + item.costPrice * item.quantity,
    0
  );
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );
  const potentialProfit = totalValue - totalCost;

  return (
    <InventoryLayout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte del Inventario</Text>
          <Text style={styles.subtitle}>
            Resumen financiero de tu inventario.
          </Text>
        </View>
        <View style={styles.cardGrid}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Costo Total del Inventario</Text>
              <Icon name="shopping-cart" size={20} color="#999" />
            </View>
            <Text style={styles.cardValue}>${totalCost.toFixed(2)}</Text>
            <Text style={styles.cardDescription}>
              Costo total de los ítems en Stock
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Valor total del Inventario</Text>
              <Icon name="dollar-sign" size={20} color="#999" />
            </View>
            <Text style={styles.cardValue}>${totalValue.toFixed(2)}</Text>
            <Text style={styles.cardDescription}>
              Valor total de los ítems en Stock
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Beneficio Potencial</Text>
              <Icon name="bar-chart-2" size={20} color="#999" />
            </View>
            <Text style={styles.cardValue}>${potentialProfit.toFixed(2)}</Text>
            <Text style={styles.cardDescription}>
              Diferencias entre valor y costo
            </Text>
          </View>
        </View>

        <View style={styles.inventoryCard}>
          <Text style={styles.inventoryTitle}>Finanzas del Inventario</Text>
          <Text style={styles.inventoryDescription}>
            Detallar precio y costo de cada producto.
          </Text>
          <InventoryTable data={inventory} showFinancials={true} />
        </View>
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
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
  cardGrid: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#888",
  },
  inventoryCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fefefe",
    marginBottom: 24,
  },
  inventoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inventoryDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
});
