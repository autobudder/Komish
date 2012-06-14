package com.phonegap.birthdaybuddy;

import android.os.Bundle;
import com.phonegap.birthdaybuddy.R;
import org.apache.cordova.*;

public class App extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}