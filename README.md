# @gladiolus/mime

> In general, the suffix of a file should reflect its mime type to some extent. But no matter what, adding another dimension of judgment can always improve the accuracy somewhat.

Determining the MIME type for a file

## Install

```bash
npm install @gladiolus/mime
```

## Usage

commonjs

```js
const { findMime } = require('@gladiolus/mime');

findMime('README.md'); // => 'text/markdown'
```

esm

```js
import { findMime } from '@gladiolus/mime';

findMime('README.md'); // => 'text/markdown'
```

## API

| overloads                                                                       | description                                                                                                             |
|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `function findMime(filename: string): string \| null`                           | Find mime type of file by filename                                                                                      |
| `function findMime(beginBytes: ToBeginBytes): string \| null`                   | Find mime type of file by begin bytes                                                                                   |
| `function findMime(filename: string, beginBytes: ToBeginBytes): string \| null` | Find mime type of file by filename or begin bytes.<br/>It will use begin bytes first (if any), then filename if failed. |

Note: `type ToBeginBytes = ArrayLike<number> | Iterable<number>`