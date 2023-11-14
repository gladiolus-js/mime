import { findMime } from "../dist/index.mjs"
import { readFileSync } from "node:fs"

const buffer = readFileSync("png.html").slice(0, 10)

console.log(findMime("png.html", buffer))
// image/png

// console.log(findMime('a.ico'))
// console.log(findMime('b.jpg'))
// console.log(findMime('c.png'))
// console.log(findMime('d.txt'))
// console.log(findMime('e.js'))
// console.log(findMime('f.dart'))
// console.log(findMime('g.css'))
// console.log(findMime('h.html'))
// console.log(findMime('i.json'))
// console.log(findMime('j.xml'))
// console.log(findMime('k.svg'))
// console.log(findMime('l.pdf'))
// console.log(findMime('m.zip'))
// console.log(findMime('n.tar'))
// console.log(findMime('o.rar'))
// console.log(findMime('p.7z'))
// console.log(findMime('q.mp4'))
// console.log(findMime('r.mp3'))
// console.log(findMime('s.flac'))
// console.log(findMime('t.doc'))
// console.log(findMime('u.xls'))
// console.log(findMime('v.ppt'))
// console.log(findMime('w.exe'))
// console.log(findMime('x.dll'))
// console.log(findMime('y.class'))
// console.log(findMime('z.jar'))