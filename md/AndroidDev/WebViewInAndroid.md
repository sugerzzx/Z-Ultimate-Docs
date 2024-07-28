# 在 Android 中嵌入 WebView

## 1. 添加 WebView 组件

在一个布局中引入 WebView 组件

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".WebViewActivity">

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

## 2. 在 Activity 中引用 WebView

在 onCreate 方法中获取 WebView 实例，然后配置它。

```java
public class WebViewActivity extends AppCompatActivity {

    private WebView webView; // 声明一个 WebView 对象

    @Override // Override 重写
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); // 调用基类的方法
        setContentView(R.layout.activity_web_view);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) { // 判断当前 Android 版本是否大于等于 4.4
            WebView.setWebContentsDebuggingEnabled(true); // 开启调试模式
        }

        webView = findViewById(R.id.webView); // 获取 WebView 实例

        WebSettings webSettings = webView.getSettings(); // 获取 WebView 的配置
        webSettings.setJavaScriptEnabled(true); // 开启 JavaScript 支持

        webView.loadUrl("http://192.168.1.3:8081"); // 加载 URL
    }
}
```

## 3. 解决 net::ERR_CLEARTEXT_NOT_PERMITTED

Android P (known as Android 9 (API 28) )及以上版本的系统默认不允许加载明文的 HTTP 请求，而如果使用 HTTPS 请求则不会有这个问题。但是在开发阶段，我们通常使用的是 HTTP 请求，因此需要在 AndroidManifest.xml 文件中添加以下代码：

```xml
<application
    android:usesCleartextTraffic="true"
    ...>
    ...
</application>

```

## 4. WebView 中的返回事件

在 WebView 中处理返回事件时，通常会使用 `onBackPressed` 方法来实现返回操作。为了确保在 WebView 中返回上一级页面而不是直接退出应用或返回到 Android 页面，你可以通过监听 WebView 的历史记录来实现。以下是一种可能的解决方案：

在你的 `Activity` 或 `Fragment` 中，你需要保持对 WebView 的引用，并在 `onBackPressed` 方法中检查 WebView 是否有历史记录。如果有历史记录，执行返回操作，否则让默认的返回行为发生:

```java
public class WebViewActivity extends AppCompatActivity {

    private WebView webView; // 声明一个 WebView 对象

    @Override // Override 重写
    protected void onCreate(Bundle savedInstanceState) {
        /* ... */
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // 如果按下返回键并且 WebView 可以返回上一页
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack(); // 返回上一页
            return true; // 拦截返回事件，不让系统执行默认的返回操作
        }

        // 如果没有历史记录，或者 WebView 不能返回，让系统执行默认的返回操作
        return super.onKeyDown(keyCode, event);
    }
}
```

在这个示例中，`webView.canGoBack()` 检查 WebView 是否有历史记录，如果有，就调用 `webView.goBack()` 返回上一页。否则，允许系统执行默认的返回操作。
