---
layout: Post
permalink: /articles
titel: Articles
feedformat: row
category: article
---
这里发布了一些我的个人公众号上的文章。

<ul>
{% for note in site.notes %}
  {% if note.category == 'article' %}
    <li><a href="{{ note.url | prepend: site.baseurl }}">{{ note.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>