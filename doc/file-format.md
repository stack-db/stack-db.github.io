---
title: File format
layout: default
---

<p class="mt-5"/>
<a href="."><i class="fa-solid fa-chevron-left"></i> back</a>


# File format

There are two valid ways to create a stack file:

* Simple: A stack file is a [YAML](https://yaml.org) file containing a list of nodes, edges, and metadata

* Rich: A stack file is a [ZIP](https://en.wikipedia.org/wiki/ZIP_(file_format)) file containing:
   * One simple YAML file called `stack.yml`
   * One directory called `docs/`
   * Any number of files (images, markdown, source code) under `docs/`

Both simple and rich stack files have the `.stack` suffix. The machines will know how to handle this.

The MIME type is `application/stack`



