import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      route.navigate("/task");
    }, 700);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    ></View>
  );
}
