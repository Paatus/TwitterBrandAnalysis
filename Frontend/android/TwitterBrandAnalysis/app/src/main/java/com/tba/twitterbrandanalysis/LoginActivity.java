package com.tba.twitterbrandanalysis;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import java.net.HttpCookie;
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
                TextView user_text = (TextView) findViewById(R.id.username);
                TextView pass_text = (TextView) findViewById(R.id.password);

                String username = user_text.getText().toString();
                String pwd = pass_text.getText().toString();
                new AsyncLogin().execute(username, pwd);
            }
        });
    }

    private class AsyncLogin extends AsyncTask<String, Void, String> {

        HttpCookie cookie = null;
        String cookie_string = "";

        @Override
        protected String doInBackground(String... params) {
            String resp_str = null;
            try {
                HttpClient client = new DefaultHttpClient();
                HttpPost post = new HttpPost("http://dev.kento.se:8080/api/login/json");
                List<NameValuePair> credentials = new ArrayList<NameValuePair>(2);
                credentials.add(new BasicNameValuePair("username", params[0]));
                credentials.add(new BasicNameValuePair("pwd", params[1]));
                post.setEntity(new UrlEncodedFormEntity(credentials));

                HttpResponse response = client.execute(post);
                if(response.getStatusLine().getStatusCode() == 200) {
                    Header[] headers = response.getAllHeaders();
                    for(int i = 0; i < headers.length;i++) {
                        if(headers[i].getName().equals("Set-Cookie")) {
                            String fixed_cookie = remove_expiry(headers[i].getValue());
                            cookie = HttpCookie.parse(fixed_cookie).get(0);
                        }
                    }
                } else {
                    resp_str = "Invalid username or password, try again";
                }
            } catch (Exception e) {
                Log.e("TBA ERROR", "exception in login" + e.getClass().getName() + " - - " + e.getMessage());
            }
            return resp_str;
        }

        private String remove_expiry(String s) {
            int start = s.indexOf("Expires=");
            int end = s.indexOf("Max-Age", start);
            String ret = s.substring(0,start) + s.substring(end);
            Log.d("TBA DEBUG", ret);
            return ret;
        }

        protected void onProgressUpdate(Integer... progress) {
        }

        protected void onPostExecute(String result) {
            if(result != null) {
                Toast.makeText(LoginActivity.this, result, Toast.LENGTH_LONG).show();
            } else {
                Intent i = new Intent(LoginActivity.this, MainActivity.class);
                i.putExtra("cookie_string", cookie.getName()+"="+cookie.getValue());
                startActivity(i);
            }
        }

    }
}
