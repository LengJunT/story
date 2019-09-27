class JueGenerated {
  int code;
  Content content;

  JueGenerated({this.code, this.content});

  JueGenerated.fromJson(Map<String, dynamic> json) {
    code = json['code'];
    content =
    json['content'] != null ? new Content.fromJson(json['content']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['code'] = this.code;
    if (this.content != null) {
      data['content'] = this.content.toJson();
    }
    return data;
  }
}

class Content {
  List<JueListData> data;
  int pageNum;
  int total;

  Content({this.data, this.pageNum, this.total});

  Content.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = new List<JueListData>();
      json['data'].forEach((v) {
        data.add(new JueListData.fromJson(v));
      });
    }
    pageNum = json['pageNum'];
    total = json['total'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.data != null) {
      data['data'] = this.data.map((v) => v.toJson()).toList();
    }
    data['pageNum'] = this.pageNum;
    data['total'] = this.total;
    return data;
  }
}

class JueListData {
  String originalUrl;
  String title;
  User user;
  String updatedAt;
  List<Tags> tags;
  int likeCount;
  var screenshot;
  int commentsCount;
  String id;
  String tid;

  JueListData(
      {this.originalUrl,
        this.title,
        this.user,
        this.updatedAt,
        this.tags,
        this.likeCount,
        this.screenshot,
        this.commentsCount,
        this.id,
        this.tid});

  JueListData.fromJson(Map<String, dynamic> json) {
    originalUrl = json['originalUrl'];
    title = json['title'];
    user = json['user'] != null ? new User.fromJson(json['user']) : null;
    updatedAt = json['updatedAt'];
    if (json['tags'] != null) {
      tags = new List<Tags>();
      json['tags'].forEach((v) {
        tags.add(new Tags.fromJson(v));
      });
    }
    likeCount = json['likeCount'];
    screenshot = json['screenshot'];
    commentsCount = json['commentsCount'];
    id = json['id'];
    tid = json['tid'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['originalUrl'] = this.originalUrl;
    data['title'] = this.title;
    if (this.user != null) {
      data['user'] = this.user.toJson();
    }
    data['updatedAt'] = this.updatedAt;
    if (this.tags != null) {
      data['tags'] = this.tags.map((v) => v.toJson()).toList();
    }
    data['likeCount'] = this.likeCount;
    data['screenshot'] = this.screenshot;
    data['commentsCount'] = this.commentsCount;
    data['id'] = this.id;
    data['tid'] = this.tid;
    return data;
  }
}

class User {
  String id;
  String role;
  String username;
  var avatar;

  User({this.id, this.role, this.username,this.avatar});

  User.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    role = json['role'];
    username = json['username'];
    avatar = json['avatar'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['role'] = this.role;
    data['username'] = this.username;
    data['avatar'] = this.avatar;
    return data;
  }
}

class Tags {
  String id;
  String title;

  Tags({this.id, this.title});

  Tags.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['title'] = this.title;
    return data;
  }
}
