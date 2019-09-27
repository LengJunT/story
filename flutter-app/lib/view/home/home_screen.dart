import 'package:flutter/material.dart';
import '../tale_list/tale_list.dart';
import '../user_menu/index.dart';
class NavigationIconView {
  final String _title;
  final IconData _icon;

//  final IconData _activeIcon;
  final BottomNavigationBarItem item;

  NavigationIconView({Key key, String title, IconData icon})
      : _title = title,
//        _activeIcon = activeIcon,
        _icon = icon,
        item = new BottomNavigationBarItem(
            icon: Icon(icon),
            title: Text(
              title,
            ),
//            activeIcon: Icon(
//              activeIcon,
//              color: Colors.lightBlue,
//            ),
            backgroundColor: Colors.white);
}

class HomeScreen extends StatefulWidget {
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<NavigationIconView> _navigationViews;

  PageController _pageController;
  int _currentIndex = 0;
  Object _articleList;
  List<Widget> _pages;

  void initState() {
    super.initState();
    _pageController = PageController(initialPage: _currentIndex);
    _navigationViews = [
      NavigationIconView(
        title: '首页',
        icon: Icons.home,
//        activeIcon: Icons.home,
      ),
      NavigationIconView(
        title: '我的',
        icon: Icons.account_box,
//        activeIcon: Icons.account_box,
      )
    ];
    _pages = [
      Container(
        child: TaleList(),
        color: Colors.greenAccent,
      ),
      Container(
        child: UserMenu(),
        color: Colors.blue,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final BottomNavigationBar botNavBar = BottomNavigationBar(
      items: _navigationViews.map((NavigationIconView view) {
        return view.item;
      }).toList(),
      currentIndex: _currentIndex,
      type: BottomNavigationBarType.fixed,
      onTap: (int index) {
        setState(() {
          _currentIndex = index;
          _pageController.animateToPage(_currentIndex,
              duration: Duration(milliseconds: 200), curve: Curves.easeInOut);
        });
        print('切换tab');
      },
    );
    return Scaffold(
      appBar: AppBar(
        title: Text('物语'),
      ),
      body: PageView.builder(
        itemBuilder: (BuildContext context, int index) {
          return _pages[index];
        },
        controller: _pageController,
        itemCount: _pages.length,
        onPageChanged: (int index) {
          print('当前$index');
          setState(() {
            _currentIndex = index;
          });
        },
      ),
      bottomNavigationBar: botNavBar,
    );
  }
}
