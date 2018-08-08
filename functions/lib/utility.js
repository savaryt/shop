"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSnapshots = (snapshot) => {
    const items = [];
    snapshot
        .forEach(child => {
        const value = child.val();
        const $key = child.key;
        items.push(Object.assign({}, value, { $key }));
    });
    return items;
};
//# sourceMappingURL=utility.js.map