import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Icon name="alert-circle" size={48} color="#e63946" />
      <Text style={styles.title}>¡Ups! Algo salió mal.</Text>
      <Text style={styles.subtitle}>No se pudo cargar el inventario.</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200ea",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
