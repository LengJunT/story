import 'dart:async';

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../generated/like_db.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = new DatabaseHelper.internal();

  factory DatabaseHelper() => _instance;
  final String tableLike = 'likeList';
  final String columnId = 'id';
  final String url = 'url';
  final String updatedAt = 'updatedAt';
  final String title = 'title';
  final String likeCount = 'likeCount';
  static Database _db;

  DatabaseHelper.internal();

  Future<Database> getDB() async {
    if (_db != null) {
      return _db;
    }
    _db = await initDb();

    return _db;
  }

  initDb() async {
    String databasesPath = await getDatabasesPath();
    String path = join(databasesPath, 'flashgo.db');

    var db = await openDatabase(path, version: 1, onCreate: _onCreate);
    return db;
  }

  void _onCreate(Database db, int newVersion) async {
    await db.execute(
        'CREATE TABLE $tableLike($columnId TEXT PRIMARY KEY, $url TEXT, $updatedAt TEXT, $title TEXT, $likeCount INTEGER)');
  }

  Future<List<Like>> getLikeList() async {
    List<Like> articles = List();
    var dbClient = await getDB();
    List<Map> res = await dbClient.query(tableLike,
        columns: [columnId, url, updatedAt, title, likeCount]);
    if (res.length > 0) {
      for (Map<String, dynamic> map in res) {
        Like article = Like.fromJson(map);
        articles.add(article);
      }
    }
    return articles;
  }

  Future<List<Like>> getLikeIds() async {
    List<Like> articles = List();
    var dbClient = await getDB();
    List<Map<String, dynamic>>  res = await dbClient.query(tableLike,columns: [columnId]);
    print('getLikeIds $res}');
    if (res.length > 0) {
      for (Map<String, dynamic> map in res) {
        Like article = Like.fromJson(map);
        articles.add(article);
      }
    }
    return articles;
  }

  Future<int> insert(Like data) async {
    var dbClient = await getDB();
    var result = await dbClient.insert(tableLike, data.toMap());
    return result;
  }

  Future<int> delete(String id) async {
    var dbClient = await getDB();
    return await dbClient.delete(tableLike, where: '$columnId = ?', whereArgs: [id]);
  }
}