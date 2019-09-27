import 'package:flutter/material.dart';
import '../user_menu/star_list.dart';
import '../../generated/like_db.dart';
import '../../db/index.dart';
class ConfigItem {
  Widget icon;
  String title;
  String right;
}

class UserMenu extends StatefulWidget {
  _UserMenuState createState() => _UserMenuState();
}

class _UserMenuState extends State<UserMenu> {
  Map<dynamic, dynamic> myStar = {
    'icon': Icon(
      Icons.star,
      color: Colors.orangeAccent,
    ),
    'title': '我赞过的',
    'right': '12篇',
    'showBorder': true,
    'type':'star'
  };
  Map<dynamic, dynamic> myFavorite = {
    'icon': Icon(
      Icons.favorite,
      color: Colors.redAccent,
    ),
    'title': '我收藏的',
    'right': '12篇',
    'showBorder': false,
    'type':'favorite'
  };
  DatabaseHelper _DatabaseHelper = new DatabaseHelper();
  List<Like> _likeIds = new List();
  void initState() {
    super.initState();
    _initLikeIds();
  }
  Future _initLikeIds() async {
    List<Like> ids = await _DatabaseHelper.getLikeIds();
    setState(() {
      _likeIds = ids;
      myStar['right'] = '${ids.length}篇';
    });
  }
  Widget _renderUserRow() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 12.0),
      color: Colors.white,
      margin: const EdgeInsets.symmetric(vertical: 12.0),
      child: Row(
        children: <Widget>[
          Container(
            width: 50,
            height: 50,
            child: ClipOval(
                child: Image.network(
              'https://avatars1.githubusercontent.com/u/26812133?s=40&v=4',
              width: 50,
              height: 50,
            )),
          ),
          SizedBox(width: 15.0),
          Expanded(
            child: Column(
              children: <Widget>[
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Name',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                      fontSize: 22,
                      color: Color(0xFF333333),
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'subText',
                    textAlign: TextAlign.left,
                    style: TextStyle(fontSize: 16, color: Color(0xFF999999)),
                  ),
                ),
              ],
            ),
          ),
          Icon(Icons.chevron_right)
        ],
      ),
    );
  }

  Widget _renderConfigItem(Map<dynamic, dynamic> obj) {
    Widget icon = obj['icon'];
    String title = obj['title'];
    String right = obj['right'];
    bool showBorder = obj['showBorder'];
    BoxDecoration boxDec;
    if (!showBorder) {
      boxDec = BoxDecoration(
        color: Colors.white,
      );
    } else {
      boxDec = BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(width: 0.6, color: const Color(0xffd5d5d5)),
        ),
      );
    }
    return GestureDetector(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
          decoration: boxDec,
          child: Row(
            children: <Widget>[
              icon,
              SizedBox(width: 15.0),
              Text(
                title,
                style: TextStyle(fontSize: 16, color: Color(0xFF333333)),
              ),
              Expanded(
                  child: Align(
                alignment: Alignment.centerRight,
                child: Text(
                  right,
                  textAlign: TextAlign.left,
                  style: TextStyle(fontSize: 14, color: Color(0xFF999999)),
                ),
              ))
            ],
          ),
        ),
        onTap: ()=>_toPage(obj['type']));
  }

  _toPage(String type){
    Navigator.push(
      context,
      new MaterialPageRoute(
        builder: (context) => new StarList(),
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFf8f8f8),
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            _renderUserRow(),
            _renderConfigItem(myStar),
            _renderConfigItem(myFavorite),
          ],
        ),
      ),
    );
  }
}
