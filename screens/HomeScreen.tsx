import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
//import pins from "../assets/data/pins";

import MasonryList from "../components/MasonryList";

export default function HomeScreen() {
  const nhost = useNhostClient();
  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    const response = await nhost.graphql.request(`
    query MyQuery {
      Pins {
        created_at
        id
        image
        title
        user_id
      }
    }
    `);
    if (response.error) {
      Alert.alert("error fetching pins");
    } else {
      setPins(response.data.Pins);
    }
  };

  //fetchPins every time it changes
  useEffect(() => {
    fetchPins();
  }, []);

  return <MasonryList pins={pins} />;
}
