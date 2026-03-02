---
title: Examples
layout: default
source: https://stackdb.org/examples/files/
---

<p class="mt-5"/>

# StackDB Examples

Here are some example stacks you can try:

<ul>
{% for item in site.data.examples %}
<li>
{{ item.name }} <span class="badge bg-secondary">{{ item.desc }}</span>
   <a href="/cardb?stack={{page.source}}{{ item.file }}">
   <i class="fa-solid fa-layer-group ms-3 mb-3"></i>
   view</a>
   <a href="./files/{{ item.file }}" type="application/stack" download>
   <i class="fa-solid fa-download ms-3"></i>
   download</a>
</li>
{% endfor %}
</ul>
