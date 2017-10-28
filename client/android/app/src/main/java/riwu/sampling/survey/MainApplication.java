package riwu.sampling.survey;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;

public class MainApplication extends MultiDexApplication {

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add cool native modules
            new RNDeviceInfo()
            ,new VectorIconsPackage()
        // Needed for `react-native link`
        // new MainReactPackage()
    );
  }
}
