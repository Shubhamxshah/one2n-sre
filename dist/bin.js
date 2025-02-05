"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const PORT = process.env.PORT || 3002;
_1.app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
