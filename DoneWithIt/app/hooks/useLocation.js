import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation() {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      // let location = await Location.getCurrentPositionAsync({}); // ds can take several seconds to complete so using the last known location is preferred for performance reason
      let location = await Location.getLastKnownPositionAsync({}); // ds is however not as accurate as the getCurrentPositionAsync() but for now it does the job
      let lat = location.coords.latitude;
      let long = location.coords.longitude;
      setLocation({ lat, long });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
}
