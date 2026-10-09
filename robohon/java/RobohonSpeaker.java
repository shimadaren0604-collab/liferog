package com.example.robohonlifelog;

import android.content.Context;
import android.util.Log;

import java.util.List;

import jp.co.sharp.android.voiceui.VoiceUIManager;
import jp.co.sharp.android.voiceui.VoiceUIVariable;

// ↓ この3つは RoBoHoN SDK のサンプルプロジェクトに入っている util クラス。
//   サンプルの util パッケージをこのプロジェクトにコピーし、パッケージ名を合わせること。
import com.example.robohonlifelog.util.VoiceUIListenerImpl;
import com.example.robohonlifelog.util.VoiceUIManagerUtil;
import com.example.robohonlifelog.util.VoiceUIVariableUtil;
import com.example.robohonlifelog.util.VoiceUIVariableUtil.VoiceUIVariableListHelper;

/**
 * ロボホン SDK を触るのはこのクラスだけ。
 * 任意テキストを memory_p に入れてから accost を投げ、HVML 側で読み上げる。
 */
public class RobohonSpeaker implements VoiceUIListenerImpl.ScenarioCallback {

    private static final String TAG = "RobohonSpeaker";

    /** HVML の値と一致させること（lifelog.hvml 参照） */
    static final String PACKAGE      = "com.example.robohonlifelog";
    static final String SCENE_COMMON = PACKAGE + ".scene_common";
    static final String ACC_SPEAK    = PACKAGE + ".speak.t1";
    static final String MEM_P_TEXT   = "memory_p:" + PACKAGE + ".speak_text";
    static final String KEY_FUNCTION = "function";
    static final String FUNC_READ    = "read_today";

    public interface Callback {
        void onReadRequested();
    }

    private final Context mContext;
    private final Callback mCallback;
    private VoiceUIManager mVoiceUIManager;
    private VoiceUIListenerImpl mListener;

    public RobohonSpeaker(Context context, Callback callback) {
        mContext = context;
        mCallback = callback;
    }

    /** onResume で呼ぶ */
    public void start() {
        if (mVoiceUIManager == null) {
            mVoiceUIManager = VoiceUIManager.getService(mContext);
        }
        if (mListener == null) {
            mListener = new VoiceUIListenerImpl(this);
        }
        VoiceUIManagerUtil.registerVoiceUIListener(mVoiceUIManager, mListener);
        VoiceUIManagerUtil.enableScene(mVoiceUIManager, SCENE_COMMON);
    }

    /** onPause で呼ぶ */
    public void stop() {
        if (mVoiceUIManager == null) return;
        VoiceUIManagerUtil.disableScene(mVoiceUIManager, SCENE_COMMON);
        VoiceUIManagerUtil.unregisterVoiceUIListener(mVoiceUIManager, mListener);
    }

    /** 任意のテキストをしゃべらせる */
    public void speak(String text) {
        if (mVoiceUIManager == null || text == null || text.isEmpty()) return;
        VoiceUIManagerUtil.setMemory(mVoiceUIManager, MEM_P_TEXT, text);
        VoiceUIVariableListHelper helper = new VoiceUIVariableListHelper().addAccost(ACC_SPEAK);
        VoiceUIManagerUtil.updateAppInfo(mVoiceUIManager, helper.getVariableList(), true);
    }

    // ---- VoiceUIListenerImpl.ScenarioCallback ----

    @Override
    public void onScenarioEvent(int event, List<VoiceUIVariable> variables) {
        // HVML の <control function="read_today"> が来たら JS に読み上げを依頼
        String function = VoiceUIVariableUtil.getVariableData(variables, KEY_FUNCTION);
        Log.d(TAG, "onScenarioEvent function=" + function);
        if (FUNC_READ.equals(function)) {
            mCallback.onReadRequested();
        }
    }
}
