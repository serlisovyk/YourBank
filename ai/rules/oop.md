# OOP Rules

The JavaScript is object-oriented: a class per component and per section. These rules apply
to every file in `scripts/`. Why: `ai/decisions/2026-10-23-oop-javascript.md`.

## Files and modules

- One class per file, the file named after the class in PascalCase: `Tabs.js` exports `Tabs`.
- The only non-class module is `main.js`, the composition root, in camelCase.
- Named exports only, no default exports; imports carry the `.js` extension.
- Folders by role: `scripts/components/` — reusable widgets (`Tabs`, `Toggle`,
  `Disclosure`, `Carousel`, `CurrencyConverter`, `Reveal`); `scripts/controllers/` — one controller per section (`HeaderMenuController`,
  `ProductsController`, `FeaturesController`, `FaqController`, `TestimonialsController`).
- `scripts/constants.js` — what scripts share: the media queries (equal to the CSS
  breakpoints), key names, button texts and state classes.

## Encapsulation

- State lives in private fields (`#field`); helpers that are not public API are private
  methods (`#method`). No public mutable fields.
- Expose state through getters or methods. Never hand out an internal array or object —
  return a copy.
- Constants are module exports; lookup objects are wrapped in `Object.freeze`.

## Responsibilities

Each class has one reason to change:

| Layer                        | Owns                                             | Must not                      |
| ---------------------------- | ------------------------------------------------ | ----------------------------- |
| Component (`components/`)    | one widget: its state, ARIA states, events       | know which section it sits in |
| Controller (`controllers/`)  | one section: wiring its components to its markup | repeat a component's logic    |
| Composition root (`main.js`) | finding section roots, creating and starting     | hold logic                    |

- A component works inside its `root`: it finds its children by `data-*` hooks within it,
  never by BEM classes and never from `document`. Component hooks are generic
  (`data-tab`, `data-toggle-button`, `data-disclosure-trigger`) and section roots are
  `data-<section>`; what is section-specific (classes, texts, a query) comes in `options`.
- A controller works with several instances on a page: `main.js` creates one per root.
- A section that a ready component covers needs no controller: `main.js` creates the
  component directly.

## Constructor and lifecycle

- One constructor shape everywhere: `constructor(root, options)`. `root` is the element the
  object owns; `options` is one object of dependencies and settings, with defaults set in
  the constructor.
- The constructor stores `root` and `options` and finds children. It attaches no listener
  and changes no DOM.
- `start()` attaches the listeners (`click`, `keydown`, `matchMedia`) and puts the DOM into
  its first state. A listener that is removed later gets a `stop()`.
- `main.js` only finds roots, creates instances and calls `start()`; a section missing from
  the page is skipped.
- No global event buses, no singletons, no state on `window`.

## One method vocabulary

- `render*` puts state into the DOM (`renderTabs`, `renderExpanded`).
- `show*` / `hide*` is a transient decoration.
- `open*` / `close*` is something expandable: a menu, an expander
  (`HeaderMenuController.open`, `Disclosure.close`).
- `select*` picks one of a set (`Tabs.select`).
- `on<Action>(handler)` reports a user action outward when a controller needs the answer.
- A DOM event handler is a private method attached through an inline arrow
  (`(event) => this.#handleClick(event)`). An arrow-function field is only for a function that
  is both added and removed.

## Design

- Composition over inheritance. No class hierarchies, abstract base classes, factories or DI
  containers until a second real implementation needs them.
- A pure helper that belongs to one class is a private static method (`static #nextIndex`). One that the build needs
  too is a public static method (`CurrencyConverter.convert`, called by `vite/handlebars/context.js`), so a formula has one home.
- A method does one thing and stays short: split it rather than comment its parts.

## Naming

- Classes: PascalCase nouns (`Tabs`, `FaqController`).
- Methods: camelCase verbs (`start`, `select`, `renderExpanded`).
- Booleans: `is` / `has` / `can` / `should` prefix (`isOpen`, `hasPanel`, `canWrap`).
- Constants: `UPPER_SNAKE_CASE`.
