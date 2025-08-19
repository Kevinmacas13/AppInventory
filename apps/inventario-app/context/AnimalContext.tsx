
// import { client, InferResponseType } from "@/services/client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type Animal = InferResponseType<typeof client.api.clothes.$get>["data"][0];

// type AnimalContextType = {
//   selectedAnimal: Animal | null;
//   setSelectedAnimal: (animal: Animal | null) => void;
// };

// const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

// const ANIMAL_STORAGE_KEY = "selected_animal";

// export const AnimalProvider = ({ children }: { children: ReactNode }) => {
//   const [selectedAnimal, setSelectedAnimalState] = useState<Animal | null>(
//     null
//   );

//   // Función para actualizar el estado y guardar en AsyncStorage
//   const setSelectedAnimal = async (animal: Animal | null) => {
//     setSelectedAnimalState(animal);
//     if (animal) {
//       await AsyncStorage.setItem(ANIMAL_STORAGE_KEY, JSON.stringify(animal));
//     } else {
//       await AsyncStorage.removeItem(ANIMAL_STORAGE_KEY);
//     }
//   };

//   // Al cargar el componente, intenta leer el valor guardado
//   useEffect(() => {
//     const loadAnimal = async () => {
//       const storedAnimal = await AsyncStorage.getItem(ANIMAL_STORAGE_KEY);
//       if (storedAnimal) {
//         try {
//           setSelectedAnimalState(JSON.parse(storedAnimal));
//         } catch (e) {
//           console.error("Error al parsear animal guardado:", e);
//         }
//       }
//     };
//     loadAnimal();
//   }, []);

//   return (
//     <AnimalContext.Provider value={{ selectedAnimal, setSelectedAnimal }}>
//       {children}
//     </AnimalContext.Provider>
//   );
// };

// // Hook personalizado para consumir el contexto
// export const useSelectedAnimal = () => {
//   const context = useContext(AnimalContext);
//   if (!context) {
//     throw new Error("useSelectedAnimal debe usarse dentro de AnimalProvider");
//   }
//   return context;
// };
