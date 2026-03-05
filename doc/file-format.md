---
title: File format
layout: default
---

<p class="mt-5"/>
<i class="fa-solid fa-chevron-left fa-2xs text-muted"></i> <a href="{{ '/doc' | relative_url }}">Docs</a>


# <span class="fa-stack fa-2xs" style="font-size: 45%"><i class="fa-solid fa-file fa-stack-2x " style="color: #AAA"></i><i class="fa-solid fa-layer-group fa-stack-1x fa-inverse" style="top: 2px;"></i></span> File format

There are two valid ways to create a stack file with a name like `notes-to-self.stack`:

* Simple: A stack file is a [YAML](https://yaml.org) file containing a list of nodes, edges, and metadata

* Rich: A stack file is a [ZIP](https://en.wikipedia.org/wiki/ZIP_(file_format)) file containing:
   * One simple YAML file called `stack.yml`
   * One directory called `pack/`
   * Any number of files (images, markdown, source code) under `pack/`

Both simple and rich stack files have the `.stack` suffix. The machines will know how to handle this.

The MIME type is `application/stack`


## How to create a rich stack

This command creates a rich stack file named `about.stack`, assuming you already have created `stack.yml` and put some files into `./pack/`:

```bash
% zip -r about.stack stack.yml pack
```

The resulting structure inside the `about.stack` archive will look something like this

<div class="mb-3"><i class="fa-solid fa-file text-muted d-inline me-2"></i><pre class="d-inline">about.stack
├── stack.yml
└── pack/
    ├── image.png
    ├── skill.md
    └── ...
</pre></div>

## Syntax


### Special chars

* `@handle` - use an `@` to identify the handle, a unique identifier for a node
* `$/path` - use `$/` to refer to a file included under `pack/` in a rich stack.
* `\@` or `\$` - use `\` to escape a special character at the beginning of a string

### The top level: the stack
Your `stack` should look like this:

```yaml
# Stack top level

title: My stack
first_card: "@about"
nodes:
   .. some nodes ..
links:
   .. some links ..
```

### The nodes

Each of the nodes should have a `handle`. This lets you refer to the
node. Each handle must be unique within the stack.

You probably want to add some `fields`, but these are optional. Each
field has a *name* and a *value*, which can be any valid JSON object.

```yaml
  - handle: about
    fields:
      name: About stackdb
      text: >
        A stack file for knowledge graphs is like a CSV file for spreadsheets.
        It's a simple way to save knowledge in a file you can share.
```

### The links

To create a link between two nodes, define the `source` and `target` using handles.

Use `rel` to name the outgoing relation. If the link is bidirectional,
use `bidirectional: true` and use `reverse-rel` to name the incoming
relation.


```
  # Plato was a student of Socrates
  - source: "@socrates"
    target: "@plato"
    bidirectional: true
    rel: student
    reverse-rel: teacher
```

### The Stack Pack

A rich `.stack` file is a zip archive containing a folder called
`/pack`. You can put any files you want into this: typically pictures
or source code files. Like a web site, the stack can use these files
to help render the cards for each node. (code description coming soon)
