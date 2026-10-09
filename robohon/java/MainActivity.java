package com.example.robohonlifelog;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * ライフログ(HTML/JS)を WebView で表示し、JS からロボホンにしゃべらせる。
 * JS 側からは window.RobohonBridge.speak("テキスト") で呼べる。
 */
public class MainActivity extends Activity implements RobohonSpeaker.Callback {

    private WebView mWebView;
    private RobohonSpeaker mSpeaker;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mWebView = new WebView(this);
        setContentView(mWebView);

        WebSettings s = mWebView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true); // localStorage を使うので必須
        mWebView.setWebViewClient(new WebViewClient());
        mWebView.addJavascriptInterface(new JsBridge(), "RobohonBridge");
        mWebView.loadUrl("file:///android_asset/index.html");

        mSpeaker = new RobohonSpeaker(getApplicationContext(), this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        mSpeaker.start();
    }

    @Override
    protected void onPause() {
        mSpeaker.stop();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        mWebView.destroy();
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()) mWebView.goBack();
        else super.onBackPressed();
    }

    /** HVML から「今日の記録を教えて」と言われたとき（RobohonSpeaker 経由） */
    @Override
    public void onReadRequested() {
        runOnUiThread(() -> mWebView.evaluateJavascript("window.robohon && robohon.readSelectedDay()", null));
    }

    /** JS から呼ばれるメソッド群（JS のスレッドで呼ばれるので UI スレッドへ渡す） */
    private class JsBridge {
        @JavascriptInterface
        public void speak(final String text) {
            runOnUiThread(() -> mSpeaker.speak(text));
        }
    }
}
