---
layout: Post
permalink: /notes
feedformat: card
title: Digital Garden
category: note
---

这里是个人知识库。

<ul>
{% for note in site.notes %}
  {% if note.category == 'note' %}
    <li><a href="{{ note.url | prepend: site.baseurl }}">{{ note.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>