class Like {
  String id;
  String url;
  String title;
  String updatedAt;
  int likeCount;

  Like({this.id, this.url, this.title, this.updatedAt, this.likeCount});

  Like.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    url = json['url'];
    title = json['title'];
    updatedAt = json['updatedAt'];
    likeCount = json['likeCount'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['url'] = this.url;
    data['title'] = this.title;
    data['updatedAt'] = this.updatedAt;
    data['likeCount'] = this.likeCount;
    return data;
  }
  Map<String, dynamic> toMap() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['url'] = this.url;
    data['title'] = this.title;
    data['updatedAt'] = this.updatedAt;
    data['likeCount'] = this.likeCount;
    return data;
  }
}
