import 'package:dio/dio.dart';
import '../generated/jue_list.dart';
import 'dart:convert' as convert;

const BasisUrl = 'http://119.3.11.154:7001';

class JueJinApi {
  static Future getArticleList(int pageNum) async {
    try {
      var response;
      Dio dio = new Dio();
      String url = '${BasisUrl}/jue/list?pageNum=${pageNum}';
      JueGenerated resData;


      Options options = Options(headers: {
        "Content-Type": "application/json"
      });
      //向指定URL发送带参数的POST请求
      response = await dio.get(url, options: options);
      print('响应200 data:${response}');
//      print('响应200 data:${response.body}');
      Map<String, Object> jsonStr = convert.jsonDecode(response.toString());
      resData = JueGenerated.fromJson(jsonStr);
      if (resData.code == 200) {
//        var json = await response.data.toString();
//        var data = jsonDecode(json);
//        print('响应200 data:${data}');
//
//        print('响应200 12:${resData}');
        return resData.content;
      } else {
        print('响应状态报错：状态码：${response.statusCode},请求路径：${url}');
      }
    } catch (e) {
      print(e);
    }
  }
}
