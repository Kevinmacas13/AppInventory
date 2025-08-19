import { client } from "@/services/client";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function AISuggestions() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // texto del label
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  ); // tipo de mensaje

  const handlePress = async (desc: string) => {
    const instructions = "Genera una prenda de vestir: " + desc;
    setLoading(true);
    setMessage(""); // limpia mensaje previo
    try {
      const response = await client.api.ia.generate.$post({
        json: { instructions },
      });

      if (response.ok) {
        setMessage("Ropa registrada con éxito correctamente");
        setMessageType("success");
        setDescription("");
      } else {
        setMessage("Ocurrió un error al enviar los datos");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Ocurrió un error inesperado");
      setMessageType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = description.trim().length === 0 || loading;

  return (
    <View style={styles.card}>
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.title}>AI Sugerencias</Text>
        <Text style={styles.subtitle}>Generar una prenda de vestir.</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Escribe la prenda (ej. camiseta roja)"
        placeholderTextColor="#94a3b8"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={isDisabled ? styles.disabledButton : styles.button}
        onPress={() => handlePress(description)}
        disabled={isDisabled}
      >
        <Text style={{ fontSize: 24 }}>✨</Text>
        <Text style={isDisabled ? styles.disabledText : styles.buttonText}>
          Generar con AI
        </Text>
      </TouchableOpacity>

      {message ? (
        <Text
          style={[
            styles.messageLabel,
            messageType === "success" ? styles.successText : styles.errorText,
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 2,
  },
  disabledButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  disabledText: {
    color: "#9ca3af",
    fontSize: 14,
    marginLeft: 6,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4f14ab",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
  },
  messageLabel: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
  },
  successText: {
    color: "#4ade80", // verde
  },
  errorText: {
    color: "#f87171", // rojo
  },
});
