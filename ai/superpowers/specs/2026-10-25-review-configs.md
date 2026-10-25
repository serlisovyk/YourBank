# Spec: review of configs, font, preview and source link (MY-211)

## Behavior

- Every page, and the 404 page, ends with a GitHub icon link next to the author name in the footer. It
  opens the repository in a new tab, is named "Source code on GitHub (opens in a new tab)" for assistive
  technology, shows the same text as a tooltip, takes the focus ring from the keyboard, and has a clickable box of 44 px.
- Until Lexend arrives the text is set in Arial; the swap can move the hero text by a line (the author
  accepted this for a simpler font stack).
- A shared link shows the new preview image: the Home header and hero with the author's name below.

## Not changed

- The look and layout of every page at every width, except the extra icon in the footer.
- The built files other than the font name, the preview image, the stylesheet and the footer markup.
