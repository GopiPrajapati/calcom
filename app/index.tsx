import { Link, useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const navigation = useRouter();
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation?.navigate("/task/TaskListScreen");
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/task"} style={{ flex: 1 }}>
        Gopi{" "}
      </Link>
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
