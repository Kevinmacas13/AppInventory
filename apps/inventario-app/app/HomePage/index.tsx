import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { client, InferResponseType } from "@/services/client";
import { InventoryTable } from "@/components/inventoryTable";
import Icon from "react-native-vector-icons/Feather"; // Feather = Lucide-style
import LoadingScreen from "@/components/loadingScreen";
import ErrorScreen from "@/components/errorScreen";
export type MyClothe = InferResponseType<
  typeof client.api.clothes.$get
>["data"][0];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRoute();
  const [clothes, setClothes] = useState<MyClothe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        setError(false);
        const response = await client.api.clothes.$get();
        const json = await response.json();
        setClothes(json.data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clothes]);

  const inventory = clothes;
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter((item) => item.quantity < 10).length;
  const categories = new Set(inventory.map((item) => item.category)).size;

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>
              Resúmen de tu inventario de ropa.
            </Text>
          </View>
          <View style={styles.cardGrid}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Total Items</Text>
                <Icon name="package" size={20} color="#666" />
              </View>
              <Text style={styles.cardValue}>{totalItems}</Text>
              <Text style={styles.cardDescription}>
                Total de unidades en stock
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Alerta de bajo de Stock</Text>
                <Icon name="alert-triangle" size={20} color="#e63946" />
              </View>
              <Text style={[styles.cardValue, styles.dangerText]}>
                {lowStockItems}
              </Text>
              <Text style={styles.cardDescription}>
                Elementos que requieren reorganizarse
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Categorías</Text>
                <Icon name="layers" size={20} color="#666" />
              </View>
              <Text style={styles.cardValue}>{categories}</Text>
              <Text style={styles.cardDescription}>
                Distinción por categorías
              </Text>
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Reporte de Inventario</Text>
            <Text style={styles.subtitle}>
              Resumen financiero de su inventario.
            </Text>
          </View>
          <View style={styles.inventoryCard}>
            <Text style={styles.inventoryTitle}>Finanzas</Text>
            <Text style={styles.inventoryDescription}>
              Detalle del precio y costo de cada producto.
            </Text>

            <InventoryTable data={clothes} showFinancials={true} />
          </View>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  dangerText: {
    color: "#dc2626",
  },
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
  // inventoryContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   // paddingLeft: 5,
  //   // paddingRight: 5,
  // },
});
