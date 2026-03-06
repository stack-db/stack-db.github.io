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

A rich `.stack` file is a zip archive containing a folder called
`/pack`. You can put any files you want into this: typically pictures
or [source code]({{ "/doc/code" | relative_url }}) files. Like a web site, the stack can use these files
to help render the cards for each node.

A rich stack looks something like this:

<div class="mb-3"><i class="fa-solid fa-file text-muted d-inline me-2"></i><pre class="d-inline">about.stack
├── stack.yml
└── pack/
    ├── image.png
    ├── skill.md
    └── ...
</pre></div>

Here is a command to create a rich stack file named `about.stack`, assuming you already have created `stack.yml` and put some files into `./pack/`:

```bash
% zip -r about.stack stack.yml pack
```

## Syntax


### Special chars

* `@handle` - use an `@` to identify the handle, a unique identifier for a node
* `$/path` - use `$/` to refer to a file included under `pack/` in a rich stack.
* `\@` or `\$` - use `\` to escape a special character at the beginning of a string

### The top level: the stack
Your `stack` should look like this. Everything here is optional:

```yaml
# Stack top level

title: My stack
first_card: "@about"
version: 0.1
fields:
   .. some fields ..
nodes:
   .. some nodes ..
links:
   .. some links ..
```

`version` declares that this file uses a version of the `stack`
format. For now only `version: 0.1` is defined. This spec is still
very fluid and subject to change.

`first_card` declares the handle of the card to display when the stack
is opened.

### Nodes

Each of the nodes should have a `handle`. This lets you refer to the
node. Each handle must be unique within the stack. You can define the
handle like this: `handle: mona_lisa`


### Fields

You probably want to add some `fields` to a node, but these are optional. Each
field has a *name* and a *value*. 

The value can be one of:

 * a simple entity (e.g. a `boolean`, `number`, `string`)
 * a JSON object

This is an example of a node with two fields, named `title` and `text`:

```yaml
  - handle: about
    fields:
      title: About stackdb
      text: >
        A stack file for knowledge graphs is like a CSV file for spreadsheets.
        It's a simple way to save knowledge in a file you can share.
```

#### Field values

Besides simple string values, a field's value can be a JSON
object. When the value is an object, its keys have special
interpretations:

Note: The `object` type is included to allow arbitrary JSON objects as
values nested under the `value` key.


```yaml
 # Example: field value keys for a field named 'quality'
 quality:
    value: awesome        # [optional] declares a value
    type:  string         # [optional] declares the type of the value
    style: ...            # [optional] declares a css style which is applied when rendering this field
    label: ...            # [optional] [only used with <a> fields] a string
    defaultLabel: ...     # [optional] [only used with <a> fields] must be 'url' or 'field'
    href: ...             # [optional] [only used with <img> fields] a url or handle
```

`type`: A type should have one of these values. Depending on the value
of `type`, some other field value keys might also be specified.

* `boolean`
* `string`
* `number`
* `object`: The `value` is an arbitrary JSON object. This avoids collisions when having keys like 
   `type` or `value` in the object.

* `a`: The `value` is expected to be a valid URL or a handle. This is displayed on the card 
  as a clickable link.
   * `label`: For `a` fields, if `label` is defined, it declares the label for the clickable link
   * `defaultLabel`: For `a` fields, if `defaultLabel` is defined, it must have a value of 
   either `url` (display the url/handle as the label) or `field` (display the field name as the label).

* `img`: The `value` is expected to be a valid URL or pack pathname (`"$/path"`). This is displayed on the
  card as an image.
   * If `href` is also defined, it's expected to be a valid URL or a handle. The
     image is a clickable link to this URL or the card with the handle.


#### Field merging

There are three places to declare fields:

* The `stack` can have fields. These are declarations that apply to all nodes in the stack.

* A `tag` can have fields if you define a node for it. See below for more about tags.

* A `node` of course can have fields.

When a card is displayed, fields are merged, and the card's field
definitions take priority over those inherited by its tag or stack. If
there are any `stack` fields, their definitions are overidden by any
`tag` fields for the current card. These are then overridden by any
fields defined on the `card`.


### Links

To create a link between two nodes, define the `source` and `target` using handles [required].

Use `rel` to name the outgoing relation [optional]. Links are bidirectional by default.
Use `reverse-rel` [optional] to name the incoming relation. You can specify
`bidirectional: false` to indicate there's no incoming relation.

```
  # Plato was a student of Socrates
  - source: "@socrates"
    target: "@plato"
    bidirectional: true
    rel: student
    reverse-rel: teacher
```

### Tags

A `tag` helps you search for tagged nodes and to define fields for
them. A simple `tag` is just a string, so there's not much else to
defined with it.  You can add tags to a node with one or more strings
like this:

```yaml
  tags:
    - funny
    - expensive
```

Tags can define their own fields. You can define fields for a tag by
defining a *tag node*. This is a node whose handle is the name of the
tag. For example, here we define two nodes.

* The `tag node` for `tag: expensive` is defined using `handle: expensive`.
  This node defines a field named `price`. Notice that
  this tag defines the field type (`number`) which is applied to all
  `expensive` nodes (including `mona_lisa`), but the *value* is left undeclared.

* The `node` for the Mona Lisa, tagged as `expensive` and also has a
  `price`. It also has an `img` field so we can see a picture
  displayed on its card.
  
  Since `mona_lisa` is tagged with `expensive`, the `price` field will
  inherit `type: number` from the `expensive` tag.

```yaml
nodes:
  # a tag node
  - handle: expensive
    fields:
      - price:
          type: number

  # a regular node
  - handle: mona_lisa
    tags:
      - expensive
    fields:
      - price: 1000000000
      - picture:
         - type: img
         - value: https://louvre.fr/images/mona_lisa.png
``` 




