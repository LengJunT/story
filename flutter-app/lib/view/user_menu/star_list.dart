import 'package:flutter/material.dart';
import '../../generated/like_db.dart';
import '../../db/index.dart';
import '../webview/index.dart';

class StarList extends StatefulWidget {
  _StarListState createState() => _StarListState();
}

class _StarListState extends State<StarList> {
  DatabaseHelper _DatabaseHelper = new DatabaseHelper();
  List<Like> _likeIds = new List();
  List<Like> _likeList = new List();

  void initState() {
    super.initState();
    _initLikeIds();
    _initLikeList();
  }

  Future _initLikeIds() async {
    List<Like> ids = await _DatabaseHelper.getLikeIds();
    setState(() {
      _likeIds = ids;
    });
  }

  Future _initLikeList() async {
    List<Like> list = await _DatabaseHelper.getLikeList();
    setState(() {
      _likeList = list;
    });
  }

  @override
  Widget build(BuildContext context) {
    final _biggerFont = const TextStyle(fontSize: 14.0);
    List<Widget> mItem = new List();
    for (int i = 0; i < _likeList.length; i++) {
      Like item = _likeList[i];
      WebViewData data = new WebViewData();
      data.title = item.title;
      data.url = item.url;
      mItem.add(new ListTile(
        contentPadding: EdgeInsets.only(top: 10,left: 8,right:8,bottom: 10),
        title: new Text(
          item.title,
          style: _biggerFont,
        ),
        trailing: new Icon(
          Icons.star,
          color: Colors.orangeAccent,
        ),
        onTap: () {
          Navigator.push(
            context,
            new MaterialPageRoute(
              builder: (context) => new ArticleWebView(data),
            ),
          );
        },
      ));
    }
    //添加分割线
    var divideListItem = ListTile.divideTiles(
            tiles: mItem, context: context, color: Colors.black38)
        .toList();
    return Scaffold(
        appBar: AppBar(
          title: Text('我的收藏'),
        ),
        body: Container(
//          padding: EdgeInsets.only(top: 10),
            color: Colors.white,
            child: new ListView(
              children: divideListItem,
            )));
  }
}
