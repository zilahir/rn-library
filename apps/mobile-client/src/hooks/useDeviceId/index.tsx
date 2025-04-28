import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getUniqueId } from "react-native-device-info";

/**
 * @returns {Promise<string>} the device id
 * @description this function returns the device id
 */
async function getDeviceId(): Promise<string> {
  const deviceId = await getUniqueId();
  return deviceId;
}

/**
 * @returns {UseQueryResult<string, any>} the device id
 * @description this hook returns the device id
 */
function useDeviceId(): UseQueryResult<string, any> {
  const query = useQuery({
    queryKey: ["deviceId"],
    queryFn: async () => getDeviceId(),
    initialData: "",
  });

  return query;
}

export default useDeviceId;
