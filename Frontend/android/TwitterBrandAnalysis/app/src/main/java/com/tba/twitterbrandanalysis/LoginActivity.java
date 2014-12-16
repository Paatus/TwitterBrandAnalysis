package com.tba.twitterbrandanalysis;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;
import java.util.jar.Attributes;

public class LoginActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        /*if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new MainFragment())
                    .commit();
        }*/
        Button login_button = (Button) findViewById(R.id.login_button);
        login_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(LoginActivity.this, MainActivity.class);
                TextView user_text = (TextView) findViewById(R.id.username);
                TextView pass_text = (TextView) findViewById(R.id.password);
                try {
                    HttpClient client = new DefaultHttpClient();
                    HttpPost post = new HttpPost("http://dev.kento.se:8080/api/login");
                    List<NameValuePair> credentials = new ArrayList<NameValuePair>(2);
                    credentials.add(new BasicNameValuePair("username", user_text.getText().toString()));
                    credentials.add(new BasicNameValuePair("pwd", pass_text.getText().toString()));
                    post.setEntity(new UrlEncodedFormEntity(credentials));

                    HttpResponse response = client.execute(post);
                    String resp_str = new BasicResponseHandler().handleResponse(response);
                    Toast.makeText(LoginActivity.this, resp_str, Toast.LENGTH_LONG).show();
                } catch (Exception e) {
                    Log.e("TBA ERROR", "exception in login" + e.getClass().getName() + " - - " + e.getMessage());
                }
                //i.putExtra("User", "TestUser");
                //startActivity(i);
            }
        });
    }
}
