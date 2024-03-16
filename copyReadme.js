import fs from 'fs';

const content = fs.readFileSync(`./README.md`).toString()
fs.writeFileSync(`./docs/install.md`, content);