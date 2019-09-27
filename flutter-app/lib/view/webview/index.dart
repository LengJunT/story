import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../../generated/jue_list.dart';

class WebViewData {
  String title;
  String url;

  WebViewData({this.title, this.url});
}

class ArticleWebView extends StatelessWidget {
  final WebViewData article;

  ArticleWebView(this.article);

  @override
  Widget build(BuildContext context) {
    print('${article.url}');
    return Scaffold(
        appBar: AppBar(
          title: Text(article.title),
        ),
        body: new WebView(
          initialUrl: article.url,
        ));
  }
}
