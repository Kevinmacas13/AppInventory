import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { MyClothe } from "@/app/HomePage";
import { FormValues } from "./newItemForm";
import { Picker } from "@react-native-picker/picker";
import { client } from "@/services/client";

type Props = {
  visible: boolean;
  onClose: () => void;
  initialData: MyClothe | null;
  onFormSubmit: (data: FormValues) => void;
};

export default function EditInventoryPopup({
  visible,
  onClose,
  initialData,
  onFormSubmit,
}: Props) {
  const { control, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!initialData) return;

    try {
      const clotheData = {
        id: initialData.id,
        name: data.name,
        codeqr: data.codeqr,
        category: data.category,
        size: data.size,
        color: data.color,
        material: data.material,
        quantity: data.quantity,
        image: data.image,
        status: data.status,
        costPrice: data.costPrice,
        sellingPrice: data.sellingPrice,
      };

      const response = await client.api.clothes[":id"].$put({
        param: { id: initialData.id },
        json: clotheData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Clothe actualizado:", result);
        Alert.alert("Éxito", "Producto actualizado correctamente");

        onClose();
      } else {
        console.error("❌ Error al actualizar:", response.status);
        Alert.alert("Error", "No se pudo actualizar el producto");
      }
    } catch (error) {
      console.error("🚨 Error en la petición PUT:", error);
      Alert.alert("Error", "Error inesperado al actualizar");
    }
  };

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        status: initialData.status ?? "",
        codeqr: initialData.codeqr ?? "",
        color: initialData.color ?? "",
        category: initialData.category ?? "",
        size: initialData.size ?? "",
        quantity: initialData.quantity ?? 0,
        material: initialData.material ?? "",
        costPrice: initialData.costPrice ?? 0,
        sellingPrice: initialData.sellingPrice ?? 0,
        image: initialData.image ?? "",
      });
    }
  }, [initialData, reset]);

  if (!initialData) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Editar Producto</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={value ?? ""}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={value ?? ""}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Color"
                value={value ?? ""}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="material"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Material"
                value={value ?? ""}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="quantity"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                value={
                  value !== undefined && value !== null ? value.toString() : ""
                }
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="costPrice"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Precio de Costo"
                value={
                  value !== undefined && value !== null ? value.toString() : ""
                }
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="sellingPrice"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Precio de Venta"
                value={
                  value !== undefined && value !== null ? value.toString() : ""
                }
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="size"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value ?? ""}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar" value="" />
                <Picker.Item label="XS" value="XS" />
                <Picker.Item label="S" value="S" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="L" value="L" />
                <Picker.Item label="XL" value="XL" />
              </Picker>
            )}
          />

          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value ?? ""}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Seleccionar" value="" />
                <Picker.Item label="Camisetas" value="Camisetas" />
                <Picker.Item label="Jeans" value="Jeans" />
                <Picker.Item label="Vestidos" value="Vestidos" />
                <Picker.Item label="Sweaters" value="Sweaters" />
                <Picker.Item label="Chaquetas" value="Chaquetas" />
              </Picker>
            )}
          />

          <Controller
            control={control}
            name="image"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="URL de la imagen"
                value={value ?? ""}
                onChangeText={onChange}
              />
            )}
          />

          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.textStyle}>Guardar Cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.textStyle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
  buttonSubmit: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#B00020",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  picker: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 4,
  },
});
