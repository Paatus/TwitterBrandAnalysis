package com.tba.twitterbrandanalysis;

import android.content.Intent;
import android.os.Bundle;
import android.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieSyncManager;
import android.webkit.WebView;

import java.net.CookieManager;
import java.util.HashMap;
import java.util.Map;

public class MainFragment extends Fragment {

    private String cookie_string = "";

    public MainFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent i = this.getActivity().getIntent();
        Bundle extras = i.getExtras();
        cookie_string = extras.getString("cookie_string");
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.main_fragment, container, false);
        WebView wv = (WebView) rootView.findViewById(R.id.map_webview);
        //wv.loadUrl(getString(R.string.map_url));
        wv.getSettings().setJavaScriptEnabled(true);
        wv.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        Map<String, String> extraHeaders = new HashMap<String, String>();
        extraHeaders.put("Cookie", cookie_string);
        wv.loadUrl(getString(R.string.map_url),extraHeaders);
        return rootView;
    }

}
