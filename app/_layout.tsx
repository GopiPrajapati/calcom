import { TaskProvider } from "@/src/context/AppContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="task" />
        <Stack.Screen name="createTask" />
        <Stack.Screen name="taskDetails" />
      </Stack>
    </TaskProvider>
  );
};

export default RootLayout;
