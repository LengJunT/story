import 'package:flutter/material.dart';
import '../../network/juejin_api.dart';
import '../../generated/jue_list.dart';
import '../../db/index.dart';
import '../../generated/like_db.dart';
import '../webview/index.dart';
//class Article {
//  String title;
//  String content;
//
//  Article({this.title, this.content});
//}

//class ArticleWebView extends StatelessWidget {
//  final JueListData article;
//
//  ArticleWebView(this.article);
//
//  @override
//  Widget build(BuildContext context) {
//    return Scaffold(
//        appBar: AppBar(
//          title: Text(article.title),
//        ),
//        body: new WebView(
//          initialUrl: article.originalUrl,
//        ));
//  }
//}

class TaleList extends StatefulWidget {
  _TaleListState createState() => _TaleListState();
}

class _TaleListState extends State<TaleList> {
  List _articleList = [];
  int _pageNum = 1;
  int _total = 10;
  List<Like> _likeIds = new List();
  bool isLoading = false;
  ScrollController _scrollController = new ScrollController();
  DatabaseHelper _DatabaseHelper = new DatabaseHelper();
  void initState() {
    super.initState();
    _initLikeIds();
    print('aaax $_likeIds');
    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        _getMore();
      }
    });
    _getData(1,false);
  }

  Future _initLikeIds() async{
    List<Like> ids = await _DatabaseHelper.getLikeIds();
    setState(() {
      _likeIds = ids;
    });
  }

  void dispose(){
    _scrollController.dispose();
    super.dispose();
  }

  // 上拉加载
  Future _getMore() async {
    if (!isLoading) {
      if((_total - _pageNum*10) > 0){
        _getData(_pageNum+1,false);
      }else{
        double edge = 50.0;
        double offsetFromBottom = _scrollController.position.maxScrollExtent - _scrollController.position.pixels;
        if (offsetFromBottom < edge) {
          _scrollController.animateTo(
              _scrollController.offset - (edge - offsetFromBottom),
              duration: new Duration(milliseconds: 500),
              curve: Curves.easeOut);
        }
      }
    }
  }

  Future<Null> _getData(int newPageNum, bool isRefresh) async {
    try {
      if (!isLoading) {
        setState(() {
          isLoading = true;
        });
        Content res = await JueJinApi.getArticleList(newPageNum);
        print('_getData ok');
        setState(() {
          _articleList = isRefresh?res.data:new List.from(_articleList)..addAll(res.data);
          _pageNum = res.pageNum;
          _total = res.total;
          isLoading = false;
        });
      }
    } catch (e) {
      print('_getData ERROR: ${e}');
    }
  }

  // 渲染行
  Widget _renderRow(BuildContext context, int index) {
    if (index == _articleList.length -1) {
      return _buildProgressIndicator();
    }
    if (index < _articleList.length -1) {
      JueListData item = _articleList[index];
      String url = item.user.avatar;
      String id = item.id;
      bool isLike = _likeIds.indexWhere((obj)=>obj.id == id) != -1;
      if (url == null) {
        url = 'https://avatars1.githubusercontent.com/u/26812133?s=40&v=4';
      }
      WebViewData data = new WebViewData();
      data.title = item.title;
      data.url = item.originalUrl;
      List<String> tag = [];
      item.tags.forEach((i) => {tag.add(i.title)});
      return GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            new MaterialPageRoute(
              builder: (context) => new ArticleWebView(data),
            ),
          );
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 12.0),
          color: Colors.white,
          margin: const EdgeInsets.symmetric(vertical: 6.0),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                      width: 20,
                      height: 20,
                      child: ClipOval(
                        child: Image.network(
                          url,
                          width: 20,
                          height: 20,
                        ),
                      )),
                  SizedBox(width: 10.0),
                  Text(item.user.username),
                  Expanded(
                      child: Align(
                    alignment: Alignment.centerRight,
                    child: Text(tag.join('/')),
                  ))
                ],
              ),
              Container(
                alignment: Alignment.centerLeft,
                margin: const EdgeInsets.symmetric(vertical: 3.0),
                child: Text(
                  item.title,
                  softWrap: true,
                  textAlign: TextAlign.left,
                  style: TextStyle(fontSize: 16, color: Color(0xFF333333)),
                ),
              ),
              Container(
                alignment: Alignment.centerLeft,
                child: Row(children:<Widget> [
                  GestureDetector(child:Icon(Icons.star, size: 14, color: isLike?Colors.redAccent:Color(0xFF999999)), onTap: ()=>{_addLike(item)},),
                  SizedBox(width: 4.0),
                  Text(
                    '${isLike?item.commentsCount+1:item.commentsCount}',
                    style: TextStyle(fontSize: 14, color: Color(0xFF999999)),
                  ),
                  SizedBox(width: 14.0),
                  Icon(Icons.feedback, size: 14, color: Color(0xFF999999)),
                  SizedBox(width: 4.0),
                  Text(
                    '${item.likeCount}',
                    style: TextStyle(fontSize: 14,color: Color(0xFF999999)),
                  ),
                ]),
              ),
            ],
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFf8f8f8),
      child: RefreshIndicator(
        onRefresh: _onRefresh,
        child: ListView.builder(
          itemBuilder: _renderRow,
          itemCount: _articleList.length,
          controller: _scrollController,
        ),
      ),
    );
  }

  Widget _getMoreWidget() {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Text(
              '加载中...',
              style: TextStyle(fontSize: 16.0),
            ),
            CircularProgressIndicator(
              strokeWidth: 1.0,
            )
          ],
        ),
      ),
    );
  }
  Widget _buildProgressIndicator() {
    print('_buildProgressIndicator');
    return new Padding(
      padding: const EdgeInsets.all(8.0),
      child: new Center(
        child: new Opacity(
          opacity: isLoading?1.0:0.0,
          child: new CircularProgressIndicator(),
        ),
      ),
    );
  }

  Future<Null> _onRefresh() async {
    _getData(1, true);
  }

  Future<Null> _addLike(JueListData data) async {
    try{
      Like obj = new Like();
      obj.id = data.id;
      obj.url = data.originalUrl;
      obj.updatedAt = data.updatedAt;
      obj.title = data.title;
      obj.likeCount = data.likeCount;
      bool isLike = _likeIds.indexWhere((obj)=>obj.id == data.id) != -1;
      if(isLike){
        int res = await _DatabaseHelper.delete(data.id);
      }else{
        int res = await _DatabaseHelper.insert(obj);
      }
      _initLikeIds();
    } catch(e){
      print('_addLike err $e');

    }
  }
}
