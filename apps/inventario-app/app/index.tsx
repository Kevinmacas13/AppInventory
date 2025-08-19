import { ScrollView, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import ReportsPage from "./ReportsPage";
import InventoryLayout from "../components/inventoryLayout";
import HomePage from "./HomePage";

const Stack = createNativeStackNavigator();
export default function Index() {
  const router = useRouter();
  return (
    <InventoryLayout>
      <HomePage children={undefined}></HomePage>
    </InventoryLayout>
  );
}



