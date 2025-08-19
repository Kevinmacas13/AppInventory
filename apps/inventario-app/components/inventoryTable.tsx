import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import type { InventoryItem } from "../lib/types";
import { client } from "@/services/client";
import { MyClothe } from "@/app/HomePage";

import { FormValues } from "./newItemForm";
import EditInventoryPopup from "./editInventoryPopup";

interface InventoryTableProps {
  data: InventoryItem[];
  showFinancials?: boolean;
}

export function InventoryTable({
  data,
  showFinancials = false,
}: InventoryTableProps) {
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClothe, setSelectedClothe] = useState<MyClothe | null>(null);

  const deleteItem = async (id1: string) => {
    try {
      await client.api.clothes[":id"].$delete({ param: { id: id1 } });
      console.log("Eliminado correctamente");
    } catch (error) {
      console.log("Error al eliminar", error);
    }
  };

  const updateClotheQuantity = async (item: MyClothe, newQuantity: number) => {
    try {
      await client.api.clothes[":id"].$put({
        param: { id: item.id },
        json: { ...item, quantity: newQuantity },
      });
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleAction = (action: string, item: InventoryItem) => {
    switch (action) {
      case "add":
        updateClotheQuantity(item, item.quantity + 1);
        break;
      case "subtract":
        updateClotheQuantity(item, item.quantity - 1);
        break;
      case "edit":
        setSelectedClothe(item); // asigna item al modal
        setModalVisible(true); // abre modal
        break;
      case "delete":
        deleteItem(item.id.toString());
        break;
    }
  };

  const handleFormSubmit = (data: FormValues) => {
    console.log("Datos editados:", data);
    setModalVisible(false);
    setSelectedClothe(null);
  };

  const COLUMN_WIDTHS = {
    image: 80,
    text: 120,
    price: 100,
    quantity: 100,
    status: 100,
    actions: 125,
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.image }]}>
        Imagen
      </Text>
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.text }]}>
        Nombre
      </Text>
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.text }]}>
        Categoría
      </Text>
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.text }]}>
        Color
      </Text>
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.text }]}>
        Tamaño
      </Text>
      {showFinancials && (
        <>
          <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.price }]}>
            Costo
          </Text>
          <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.price }]}>
            Precio
          </Text>
        </>
      )}
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.quantity }]}>
        #
      </Text>
      <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.status }]}>
        Estado
      </Text>
      {editMode && (
        <Text style={[styles.headerCell, { width: COLUMN_WIDTHS.actions }]}>
          Acciones
        </Text>
      )}
    </View>
  );

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <View style={styles.row}>
      <Image
        source={{ uri: item.image ?? "https://placehold.co/200x200" }}
        style={[styles.image, { width: COLUMN_WIDTHS.image }]}
      />
      <Text style={[styles.cell, { width: COLUMN_WIDTHS.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.cell, { width: COLUMN_WIDTHS.text }]}>
        {item.category}
      </Text>
      <Text style={[styles.cell, { width: COLUMN_WIDTHS.text }]}>
        {item.color}
      </Text>
      <Text style={[styles.cell, { width: COLUMN_WIDTHS.text }]}>
        {item.size}
      </Text>
      {showFinancials && (
        <>
          <Text style={[styles.cell, { width: COLUMN_WIDTHS.price }]}>
            ${item.costPrice.toFixed(2)}
          </Text>
          <Text style={[styles.cell, { width: COLUMN_WIDTHS.price }]}>
            ${item.sellingPrice.toFixed(2)}
          </Text>
        </>
      )}
      <Text style={[styles.cell, { width: COLUMN_WIDTHS.quantity }]}>
        {item.quantity}
      </Text>
      <Text
        style={[
          styles.badge,
          { width: COLUMN_WIDTHS.status },
          item.quantity < 10 ? styles.lowStock : styles.inStock,
        ]}
      >
        {item.quantity < 10 ? "Low Stock" : "In Stock"}
      </Text>
      {editMode && (
        <View style={[styles.actionBar, { width: COLUMN_WIDTHS.actions }]}>
          <TouchableOpacity onPress={() => handleAction("add", item)}>
            <Text style={styles.actionButton}>➕</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAction("subtract", item)}>
            <Text style={styles.actionButton}>➖</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAction("edit", item)}>
            <Text style={styles.actionButton}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAction("delete", item)}>
            <Text style={styles.actionButton}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tableWrapper}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
              <Text style={styles.checkbox}>{editMode ? "☑" : "☐"}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Acciones</Text>
          </View>

          {data.length === 0 ? (
            <Text style={styles.caption}>No hay items en el inventario.</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={renderHeader}
            />
          )}
        </View>
      </ScrollView>

      {/* Modal de edición */}
      {selectedClothe && (
        <EditInventoryPopup
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          initialData={selectedClothe}
          onFormSubmit={handleFormSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10 },
  tableWrapper: {
    minWidth: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ddd",
  },
  checkbox: { marginRight: 10, fontSize: 18 },
  title: { fontSize: 18, fontWeight: "bold" },
  header: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#eee",
    flexWrap: "nowrap",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  image: { width: 40, height: 40, marginRight: 6, borderRadius: 6 },
  cell: { fontSize: 12, textAlign: "center" },
  badge: { padding: 4, borderRadius: 4, textAlign: "center", fontSize: 12 },
  lowStock: { backgroundColor: "#fdd", color: "#900" },
  inStock: { backgroundColor: "#def", color: "#005" },
  caption: { padding: 20, textAlign: "center", color: "#666" },
  actionBar: { flexDirection: "row", marginLeft: 10, gap: 4 },
  actionButton: { marginHorizontal: 2, fontSize: 16 },
});
