import { BarCodeScanningResult, Camera } from "expo-camera";
import { ReactElement, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RootTabScreenProps } from "@app/navigation/types";
import withSafeAreaView from "@app/components/WithSafeAreaView";

/**
 *
 */
function BorrowBookScreen({}: RootTabScreenProps<"BorrowBook">): ReactElement {
  const style = styles();
  const [type, setType] = useState(Camera.Constants.Type);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  /*
  if (!permission) ... 

  if (!permission.granted) ... 
  */

  /**
   *
   * @param {BarCodeScanningResult} scanningResult - result of the scanning
   * @returns {Promise<BarCodeScanningResult>} - promise of the scanning result
   * @description - handles the scanning of the barcode
   */
  function handleBarCodeScan(
    scanningResult: BarCodeScanningResult
  ): Promise<BarCodeScanningResult> {
    return Promise.resolve(scanningResult);
  }

  return (
    <View testID="borrow-outer-container" style={[style.outerContainer]}>
      <Camera
        testID="camera"
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(scanningResult): Promise<BarCodeScanningResult> =>
          handleBarCodeScan(scanningResult)
        }
        style={style.camera}
        type={type}
      />
    </View>
  );
}

const styles = (): ReturnType<typeof StyleSheet.create> =>
  StyleSheet.create({
    infoContainer: {},
    outerContainer: {
      flex: 1,
      backgroundColor: "red",
    },
    camera: {
      flex: 1,
      display: "none",
    },
  });

export default withSafeAreaView(BorrowBookScreen);
