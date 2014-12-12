package com.tba.twitterbrandanalysis;

import android.app.Fragment;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

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

    public BarChartFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.barchart_layout, container, false);
        chart = (ColumnChartView) rootView.findViewById(R.id.barchart_view);
        populateChart();
        return rootView;
    }

    private void populateChart() {
        // populate chart with dummy data
        int numSubcolumns = 3;
        int numColumns = 4;

        List<Column> columns = new ArrayList<Column>();
        List<ColumnValue> values;
        for (int i = 0; i < numColumns; ++i) {
            values = new ArrayList<ColumnValue>();
            final int[] colors = {Color.RED, Color.BLUE, Color.GREEN};
            for (int j = 0; j < numSubcolumns; ++j) {
                values.add(new ColumnValue((float) Math.random() * 20f + 5, colors[j]));
            }
            Column column = new Column(values);
            column.setHasLabels(true);
            columns.add(column);
        }
        data = new ColumnChartData(columns);
        Axis BottomAxis = new Axis();
        List<AxisValue> vals = new ArrayList<AxisValue>();
        vals.add(new AxisValue(0f, "Sweden".toCharArray()));
        vals.add(new AxisValue(1f, "India".toCharArray()));
        vals.add(new AxisValue(2f, "China".toCharArray()));
        vals.add(new AxisValue(3f, "Leif".toCharArray()));
        BottomAxis.setValues(vals);
        BottomAxis.setTextColor(Color.BLACK);
        data.setAxisXBottom(BottomAxis);
        // Set stacked flag.
        data.setStacked(true);
        chart.setColumnChartData(data);
    }
}
