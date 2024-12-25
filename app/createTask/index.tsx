import MText from "@/src/components/Text/MText";
import { useTaskContext } from "@/src/context/AppContext";
import { CreateTaskScreenProps } from "@/src/interfaces/CreateTaskScreenProps";
import colors from "@/src/utitlity/colors";
import { Video } from "expo-av";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import React, { FC, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CreateTask: FC<CreateTaskScreenProps> = ({ route, navigation }) => {
  const { setTasks } = useTaskContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSave = () => {
    const newTask = {
      id: Date.now().toString(),
      name,
      description,
      date: new Date().toISOString().split("T")[0],
      videos,
      images,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // onTaskSave(newTask);
    navigation.goBack();
  };

  const getAllTheURI = (data: any) => {
    let uris: any = [];
    data.forEach((item) => {
      console.log("item", item);
      if (item?.uri) {
        uris.push(item?.uri);
      }
    });

    return uris;
  };

  // const getPhotos = async () => {

  // await CameraRoll.getPhotos({
  //   first: 20,
  //   assetType: "Photos",
  // })
  //   .then(async (r) => {
  //     console.log("r.eges", JSON.stringify(r.edges, null, 4));
  //     const res = getAllTheURI(r.edges);
  //     setImages(res);
  //   })
  //   .catch((err) => {
  //     // console.log('err', err);
  //   });
  // };
  const getPhotos = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 20, // Fetch up to 20 images
    });
    const res = getAllTheURI(assets);
    setImages(res);
  };

  const getVideos = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: "video",
      first: 20, // Fetch up to 20 images
    });
    const videoUris = assets.map((asset) => asset.uri);
    // const res = getAllTheURI(assets);
    // setVideos(res);
    setVideos(videoUris);
  };

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Task Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addImageCon} onPress={getPhotos}>
          <MText kind="h3" color={colors.white}>
            Add Image
          </MText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addImageCon} onPress={getVideos}>
          <MText kind="h3" color={colors.white}>
            Add Videos
          </MText>
        </TouchableOpacity>
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item, index) => String(index)}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          renderItem={(item) => {
            console.log("item", item.item);
            // console.log("item.item?.uri", item.item?.uri);
            return (
              <View
                style={{
                  marginHorizontal: wp(2),
                  marginVertical: hp(1),
                }}
              >
                <Image
                  source={{ uri: `${item?.item}` }}
                  height={hp(15)}
                  width={wp(43)}
                />
              </View>
            );
          }}
        />
        <FlatList
          data={videos}
          keyExtractor={(item, index) => String(index)}
          // renderItem={(item) => {
          //   console.log("item", item.item);
          //   return (
          //     <View
          //       style={{
          //         marginHorizontal: wp(2),
          //         marginVertical: hp(1),
          //       }}
          //     >
          //       <Video
          //         // ref={video}
          //         style={styles.video}
          //         source={{
          //           uri: item.item,
          //           // uri: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          //         }}
          //         useNativeControls
          //         resizeMode={ResizeMode.CONTAIN}
          //         isLooping
          //       />
          //     </View>
          //   );
          // }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Video
                source={{ uri: item }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            </View>
          )}
          contentContainerStyle={{
            alignItems: "center",
          }}
        />

        <Button title="Save Task" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};
export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  dateButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  selectedDate: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  dateText: {
    color: "#fff",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  taskItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 5,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  addImageCon: {
    backgroundColor: colors.blue,
    paddingVertical: hp(1),
    borderRadius: hp(1),
    alignItems: "center",
    marginVertical: hp(1),
  },
  video: { height: hp(40), width: wp(80) },
});
