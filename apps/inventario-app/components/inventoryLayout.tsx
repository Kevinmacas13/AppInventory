import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { usePathname, router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
const { width: screenWidth } = Dimensions.get("window");

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const pathname = usePathname();
  const navigateAndClose = (path: any) => {
    setSidebarVisible(false);
    router.push(path);
  };

  const handleOutsidePress = () => {
    if (sidebarVisible) setSidebarVisible(false);
  };
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  const isActive = (path: string) => pathname === path;

  return (
    <ScrollView horizontal={false}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
          <Icon name={sidebarVisible ? "chevron-left" : "menu"} size={24} />
        </TouchableOpacity>
        {sidebarVisible && (
          <View
            // style={styles.sidebar}
            style={[
              styles.sidebar,
              screenWidth < 600 && styles.sidebarFullScreen, // móvil: ocupa todo
            ]}
          >
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/")}
            >
              <Icon name="shopping-bag" size={24} color="#6B46C1" />
              <Text style={styles.brand}> CLOTHES </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, isActive("/") && styles.activeItem]}
              onPress={() => router.push("/")}
            >
              <Icon
                name="layout"
                size={20}
                color={isActive("/") ? "#6B46C1" : "#333"}
              />
              <Text
                style={[styles.menuText, isActive("/") && styles.activeText]}
              >
                Dashboard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                isActive("/AddItemPage") && styles.activeItem,
              ]}
              onPress={() => {
                router.push("/AddItemPage");
                setSidebarVisible(false);
              }}
            >
              <Icon
                name="plus-circle"
                size={20}
                color={isActive("/AddItemPage") ? "#6B46C1" : "#333"}
              />
              <Text
                style={[
                  styles.menuText,
                  isActive("/AddItemPage") && styles.activeText,
                ]}
              >
                Añadir nuevo ítem
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                isActive("/ReportsPage") && styles.activeItem,
              ]}
              onPress={() => {
                router.push("/ReportsPage");
              }}
            >
              <Icon
                name="bar-chart-2"
                size={20}
                color={isActive("/ReportsPage") ? "#6B46C1" : "#333"}
              />
              <Text
                style={[
                  styles.menuText,
                  isActive("/ReportsPage") && styles.activeText,
                ]}
              >
                Reportes
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.mainContent}>
            <View style={styles.body}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 60,
    flexDirection: "row",
    // backgroundColor: "#e7d8d8",
  },
  toggleButton: {
    position: "absolute",
    top: 35,
    left: 35,
    zIndex: 10,
    backgroundColor: "#eaeaea",
    padding: 8,
    borderRadius: 20,
  },


  sidebar: {
    width: 250,
    backgroundColor: "#fff",
    padding: 15,
    zIndex: 15,
  },
  sidebarFullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  iconButton: {
    top: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "center",
    marginBottom: 40,
  },
  brand: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
  },
  activeItem: {
    backgroundColor: "#e0d7ff",
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  activeText: {
    color: "#6B46C1",
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    marginTop: 16,
  },
});
