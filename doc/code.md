---
title: Code
layout: default
---

<p class="mt-5"/>
<i class="fa-solid fa-chevron-left fa-2xs text-muted"></i> <a href="{{ '/doc' | relative_url }}">Docs</a>


# Code

In the [user interface](https://stackdb.org/cardb), you'll see that
every card can show a `front` side or a `back` side. The front of the
card is meant to be the people-friendly side, and the back is more of
an ingredients list. It shows the tags, fields, and links on that card.

The default front view is not very pretty. You can override its
behavior by supplying your own code. Javascript is currently
supported.

### The `code` field

Add a `code` field to the top level of the stack, and it will apply to all the cards in the stack.

Add a `code` field to one card, and it will apply only to that one card.

```yaml
      code:
        src: "function onShowCard(...){...}"
```

If the `code` field is plain text, it's interpreted as javascript.

If the `code` field is an object, you can load code from a zipped
source file.  Specify a zipped pathname as the value of `src`. In this
example, the code will be loaded from `/docs/my-script.js` from inside
the stack.

```yaml
      code:
        src: "$/my-script.js"
```

### onShowCard

Define the `onShowCard` function to override the default behavior. It takes 3 parameters
  * `node` info about the currently displayed card
  * `stack` info about the currently displayed stack
  * `element` info about the blank DOM element containing the card

For example, here's a function that finds the `body` field on a card and draws it.

```javascript
function onShowCard(node, stack, element) {
  const text = node.fields['body']
  if (text) {
    element.innerHTML = text
  } else {
    element.innerHTML = 'No text'
  }
```

### Shadowing

If `onShowCard` is undefined, the default card front is drawn

If `onShowCard` is defined at the stack level, it's used to draw every
card in the stack, unless the card also defines this.

If `onShowCard` is defined for a card, it's used to draw that card.

If you just want to add something new, but not replace the default behavior, here are two handy functions you can call:

 * You can call `defaultOnShowCard(node, stack, element)` from your
definition if you also want the default behavior.

 * You can call `stack.onShowCard(node, stack, element)` from your
definition if you also want the stack's behavior. This is useful if
you just want to add something new, but not replace the default
behavior.

