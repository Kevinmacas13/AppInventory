import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { Camera, CameraView, type BarcodeScanningResult } from "expo-camera";

type BarcodeScannerProps = {
  onScanned?: (data: string) => void;
};

export default function BarcodeScanner({ onScanned }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [bounds, setBounds] = useState<BarcodeScanningResult["bounds"] | null>(
    null
  );
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (scannedData) {
      console.log("Estado scannedData actualizado:", scannedData);
    }
  }, [scannedData]);

  const handleBarCodeScanned = ({ data, bounds }: BarcodeScanningResult) => {
    console.log("¡Código detectado!", data, bounds);
    alert(`Código detectado: ${data}`);
    setScanned(true);
    setScannedData(data);
    setBounds(bounds || null);

    if (onScanned) {
      onScanned(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permiso denegado para usar la cámara</Text>;
  }

  const { width } = Dimensions.get("window");
  const cameraHeight = 200;
  return (
    <View style={styles.container}>
      <View style={[styles.cameraContainer, { height: cameraHeight }]}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "code128", "code39", "upc_e", "qr"],
          }}
        />
        {bounds && (
          <View
            style={[
              styles.box,
              {
                left: bounds.origin.x,
                top: bounds.origin.y,
                width: bounds.size.width,
                height: bounds.size.height,
              },
            ]}
          />
        )}
      </View>

      {scannedData && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Código leído: {scannedData}</Text>
          <Button
            title="Escanear de nuevo"
            onPress={() => {
              setScanned(false);
              setBounds(null);
              setScannedData(null);
            }}
          />
        </View>
      )}

      {!scanned && (
        <Text style={{ marginBottom: 10 }}>Detectando código...</Text>
      )}
      {scanned && scannedData && (
        <Text style={{ marginBottom: 10, color: "green" }}>
          Código detectado: {scannedData}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cameraContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  box: {
    position: "absolute",
    borderColor: "lime",
    borderWidth: 3,
    zIndex: 20,
  },
  resultBox: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e0ffe0",
    borderRadius: 8,
    alignItems: "center",
  },
  resultText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
