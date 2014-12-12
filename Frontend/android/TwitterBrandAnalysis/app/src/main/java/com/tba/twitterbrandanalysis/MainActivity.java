package com.tba.twitterbrandanalysis;

import android.app.Activity;
import android.app.ActionBar;
import android.app.FragmentTransaction;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.app.ActionBarDrawerToggle;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class MainActivity extends Activity {

    private String[] items;
    private DrawerLayout drawerLayout = null;
    private ListView drawerList = null;
    private ActionBarDrawerToggle drawerToggle = null;
    private int lastPressed = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);
        if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new MainFragment())
                    .commit();
        }
        init();
    }

    private void init() {
        ActionBar ab = MainActivity.this.getActionBar();
        ab.setDisplayHomeAsUpEnabled(true);
        ab.setHomeButtonEnabled(true);
        ab.setDisplayShowTitleEnabled(true);
        setTitle(R.string.app_name);
        drawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawerList = (ListView) findViewById(R.id.drawer_list);
        items = getResources().getStringArray(R.array.List_items);
        drawerList.setAdapter(new ArrayAdapter<String>(this, R.layout.list_item, items));
        drawerList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                lastPressed = position;
                d_log("item at position " + position + " was clicked");
                if (drawerList != null) {
                    drawerList.setItemChecked(position, true);
                    FragmentTransaction frag = getFragmentManager().beginTransaction();
                    switch(position) {
                        case 0:
                            // default, go home
                            frag.replace(R.id.container, new MainFragment());
                            break;
                        case 1:
                            // Brand opinion per country
                            frag.replace(R.id.container, new BarChartFragment());
                            break;
                        case 2:
                            // Brand opinion over time
                            frag.replace(R.id.container, new LineChartFragment());
                        default:
                            break;
                    }
                    frag.commit();
                }
                if (drawerLayout != null) {
                   drawerLayout.closeDrawers();
                }
            }
        });
        drawerList.setItemChecked(lastPressed, true);
        drawerToggle = new ActionBarDrawerToggle(
                this,
                drawerLayout,
                R.drawable.ic_drawer,
                R.string.drawer_open,
                R.string.drawer_close) {

            public void onDrawerClosed(View view) {
                super.onDrawerClosed(view);
                setTitle(getString(R.string.app_name));
            }

            /** Called when a drawer has settled in a completely open state. */
            public void onDrawerOpened(View drawerView) {
                super.onDrawerOpened(drawerView);
                setTitle(getString(R.string.drawer_title));
            }

        };
        drawerLayout.setDrawerListener(drawerToggle);
    }

    private void d_log(String msg) {
        Log.d(getString(R.string.app_name) + " DEBUG ", msg);
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        // Sync the toggle state after onRestoreInstanceState has occurred.
        drawerToggle.syncState();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        drawerToggle.onConfigurationChanged(newConfig);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Pass the event to ActionBarDrawerToggle, if it returns
        // true, then it has handled the app icon touch event
        if(drawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        // Handle your other action bar items...

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

}
