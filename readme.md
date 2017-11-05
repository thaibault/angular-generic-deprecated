<!-- #!/usr/bin/env markdown
-*- coding: utf-8 -*- -->

<!-- region header

Copyright Torben Sickert 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

endregion -->

[![Build Status](https://travis-ci.org/thaibault/angularGeneric.svg?branch=master)](https://travis-ci.org/thaibault/angularGeneric)

Use case
--------

This modules is ahead of time compatible and ready for tree-shaking, can be
used as umd module for just in time compilation and supports the babel-stack
as esnext with flow.js annotations or typescript within the same codebase!

This module provides generic tools needed for any non trivial appliction:

- Services
    - Initial data management (pre-)rendered by any backend.
    - Database abstraction layer and in-browser integration.
    - Easy extendable injector tokens through application specific injector
      auto detection.
- Pipes
    - Sorting
    - Extraction / Slicing
    - Number, Date(Time) and string representation
- Components build on top of material2
    - Abstract (auto updatedable) item and/or items components.
    - Simple content carousel.
    - File input / preview.
    - Form fields with generic description, placeholder and validation auto
      generated from a model specifications.
    - Text- and Codeeditor with lazy and optional resource loading.
    - Live Date and Time representation.
    - Pagination
- Helper
    - Easy and pre-configured prerendering utility.
    - Central default animation concept.
    - Generic pre-configured ahead of time compilation specification.
    - Automatic module asset determination of (exports, declarations and
      provider).

<!-- region vim modline
vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:
endregion -->
