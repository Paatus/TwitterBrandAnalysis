package com.tba.twitterbrandanalysis;

import android.app.Fragment;
import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import lecho.lib.hellocharts.model.Axis;
import lecho.lib.hellocharts.model.AxisValue;
import lecho.lib.hellocharts.model.Column;
import lecho.lib.hellocharts.model.ColumnChartData;
import lecho.lib.hellocharts.model.ColumnValue;
import lecho.lib.hellocharts.view.ColumnChartView;

public class BarChartFragment extends Fragment {

    private ColumnChartView chart;
    private ColumnChartData data;
    private String cookie_string;
    protected ProgressDialog dialog;
    private Context context;

    public BarChartFragment() {}

    public void setFragment(String cookie_string) {
        this.cookie_string = cookie_string;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.barchart_layout, container, false);
        Bundle b = this.getActivity().getIntent().getExtras();
        chart = (ColumnChartView) rootView.findViewById(R.id.barchart_view);
        dialog = new ProgressDialog(rootView.getContext(), ProgressDialog.STYLE_SPINNER);
        dialog.setMessage("Please wait while data is fetched");
        dialog.show();
        new getData().execute();
        return rootView;
    }

    public void addData(String[] titles, int[][] input) {
        int cols = input.length;
        int subcols = input[0].length;
        List<Column> columns = new ArrayList<Column>();
        for(int i = 0; i < cols;i++) {
            List<ColumnValue> vals= new ArrayList<ColumnValue>();
            // negative
            vals.add(0, new ColumnValue((float)input[i][0], Color.parseColor("#FF5555")));
            // neutral
            vals.add(1, new ColumnValue((float)input[i][1], Color.parseColor("#FFFF55")));
            // positive
            vals.add(2, new ColumnValue((float)input[i][2], Color.parseColor("#88FF88")));
            Column column = new Column(vals);
            column.setHasLabels(true);
            columns.add(column);
        }
        ColumnChartData data = new ColumnChartData(columns);
        Axis BottomAxis = new Axis();
        List<AxisValue> vals = new ArrayList<AxisValue>();
        for(int i = 0; i < input.length;i++) {
            vals.add(i, new AxisValue((float)i, titles[i].toCharArray()));
        }
        BottomAxis.setValues(vals);
        BottomAxis.setTextColor(Color.BLACK);
        data.setAxisXBottom(BottomAxis);
        // Set stacked flag.
        data.setStacked(true);
        chart.setColumnChartData(data);
    }

    private class getData extends AsyncTask<String, Void, int[][]> {
        private String[] keywords;

        @Override
        protected int[][] doInBackground(String... params) {
            keywords = getKeyWords();
            int[][] ret = new int[keywords.length][3];
            for(int i = 0; i < keywords.length;i++) {
                ret[i] = getKeywordData(keywords[i]);
            }
            return ret;
        }

        private int[] getKeywordData(String keyword) {
            int[] opinions = new int[3];
            JSONObject obj = new JSONObject();
            obj = getData("/api/amount/"+keyword);
            try {
                opinions[0] = obj.getInt("negative");
                opinions[1] = obj.getInt("neutral");
                opinions[2] = obj.getInt("positive");
            } catch (Exception e) {}
            return opinions;
        }

        private JSONObject getData(String url) {
            JSONObject obj = null;
            try {
                HttpClient client = new DefaultHttpClient();
                HttpGet post = new HttpGet("http://dev.kento.se:8080" + url);
                post.addHeader("Cookie", cookie_string);
                HttpResponse response = client.execute(post);
                if(response.getStatusLine().getStatusCode() == 200) {
                    StringBuilder sb = new StringBuilder();
                    String line = "";
                    InputStream is = response.getEntity().getContent();
                    BufferedReader rd = new BufferedReader(new InputStreamReader(is));
                    while((line = rd.readLine()) != null) {
                        sb.append(line);
                    }
                    String keywordstring = sb.toString();
                    obj = new JSONObject(keywordstring);
                }
            } catch(Exception e) {}
            return obj;
        }

        private String[] getKeyWords() {
            String[] keywords = new String[0];
            try {
                JSONObject obj = getData("/api/keywords/get");
                JSONArray arr = obj.getJSONArray("keywords");
                keywords = new String[arr.length()];
                for(int i = 0; i < arr.length();i++) {
                    keywords[i] = arr.getString(i);
                }
            } catch (Exception e) {}
            return keywords;
        }

        protected void onProgressUpdate(Integer... progress) {
        }

        protected void onPostExecute(int[][] result) {
            addData(keywords, result);
            dialog.hide();
        }
    }
}
