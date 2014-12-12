package com.tba.twitterbrandanalysis;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

import lecho.lib.hellocharts.model.Line;
import lecho.lib.hellocharts.model.LineChartData;
import lecho.lib.hellocharts.model.PointValue;
import lecho.lib.hellocharts.model.ValueShape;
import lecho.lib.hellocharts.util.Utils;
import lecho.lib.hellocharts.view.LineChartView;


public class LineChartFragment extends Fragment {

    private LineChartView chart;
    private LineChartData data;

    public LineChartFragment() {
    }

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.linechart_layout, container, false);
        chart = (LineChartView) rootView.findViewById(R.id.linechart_view);
        generateData();
        return rootView;
    }

    private void generateData() {
        int numlines = 1;
        int maxlines = 3;
        int numpoints = 8;
        float[][] randomNumbersTab = new float[numlines][numpoints];
        for (int i = 0; i < numlines; ++i) {
            for (int j = 0; j < numpoints; ++j) {
                randomNumbersTab[i][j] = (float) Math.random() * 100f;
            }
        }
        List<Line> lines = new ArrayList<Line>();
        for (int i = 0; i < numlines; ++i) {
            List<PointValue> values = new ArrayList<PointValue>();
            for (int j = 0; j < numpoints; ++j) {
                values.add(new PointValue(j, randomNumbersTab[i][j]));
            }
            Line line = new Line(values);
            line.setShape(ValueShape.CIRCLE);
            line.setColor(Utils.COLORS[i]);
            line.setCubic(true);
            line.setFilled(true);
            line.setHasLabels(true);
            line.setHasLabelsOnlyForSelected(true);
            line.setHasLines(true);
            line.setHasPoints(true);
            lines.add(line);
        }
        data = new LineChartData(lines);
        data.setLines(lines);
        chart.setLineChartData(data);
    }
}
