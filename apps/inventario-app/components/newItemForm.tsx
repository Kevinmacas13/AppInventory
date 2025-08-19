import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { client, InferResponseType } from "@/services/client";
import { useState } from "react";
import BarcodeScanner from "./barcodeScanner";
import AISuggestions from "./aiSuggestions";
export type FormValues = InferResponseType<
  typeof client.api.clothes.$get
>["data"][0];

type Props = {
  onFormSubmit: (data: FormValues) => void;
};

export default function SimpleInventoryForm({ onFormSubmit }: Props) {
  const [message, setMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: " ",
      codeqr: " ",
      category: " ",
      size: " ",
      color: "",
      material: " ",
      quantity: 0,
      image:
        "https://www.clikisalud.net/wp-content/uploads/2018/07/el-importante-beneficio-de-usar-ropa-holgada.jpg",
      status: "  ",
      costPrice: 0.0,
      sellingPrice: 0.0,
    },
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {
    try {
      await onFormSubmit(data);
      setMessage("✅ Producto registrado correctamente");
      reset();
    } catch (error) {
      setMessage("❌ Ocurrió un error al registrar el producto");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Código de Barras:</Text>
          <Controller
            control={control}
            name="codeqr"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Código de Barras"
                  value={value}
                  onChangeText={onChange}
                />
                <BarcodeScanner
                  onScanned={(data) => onChange(data)}
                ></BarcodeScanner>
              </>
            )}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Categoría:</Text>
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tamaño:</Text>
          <Controller
            control={control}
            name="size"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
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
        </View>
      </View>

      {/* Fila 3 */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Color:</Text>
          <Controller
            control={control}
            name="color"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                // placeholder="Color"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Material: </Text>
          <Controller
            control={control}
            name="material"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Material"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad:</Text>
          <Controller
            control={control}
            name="quantity"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                value={value.toString()}
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Estado:</Text>
          <Controller
            control={control}
            name="status"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Precio de Costo:</Text>
          <Controller
            control={control}
            name="costPrice"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Precio de Costo"
                value={value.toString()}
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Precio de Venta:</Text>
          <Controller
            control={control}
            name="sellingPrice"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Precio de Venta"
                value={value.toString()}
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Imagen URL:</Text>
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
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <View style={styles.iaSugestions}>
        <AISuggestions></AISuggestions>
      </View>

      {message && (
        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              color: message.startsWith("✅") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 4,
  },
  button: {
    backgroundColor: "#4e4be2",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  iaSugestions: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    padding: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
});
