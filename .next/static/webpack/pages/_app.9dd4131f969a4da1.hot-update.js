"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./components/ModalSubmitting.js":
/*!***************************************!*\
  !*** ./components/ModalSubmitting.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ModalSubmitting; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ModalBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ModalBase */ \"./components/ModalBase.js\");\n\nvar _s = $RefreshSig$();\n\n\nfunction Spinner() {\n    _s();\n    const [loader, setLoader] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"border-t-gray-500\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setTimeout(()=>{\n            setLoader(\"\".concat(loader, \" border-r-gray-600\"));\n            setTimeout(()=>{\n                setLoader(\"\".concat(loader, \" border-r-gray-600 border-b-gray-700\"));\n            }, 2000);\n        }, 2000);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"py-2\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"h-10 w-10 mx-auto border-4 rounded-full animate-spin \".concat(loader)\n        }, void 0, false, {\n            fileName: \"/data/data/com.termux/files/home/quiz-website/components/ModalSubmitting.js\",\n            lineNumber: 18,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/data/data/com.termux/files/home/quiz-website/components/ModalSubmitting.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n_s(Spinner, \"EFgGBGYQzyLedmRKVYIJ5crYYw4=\");\n_c = Spinner;\nfunction ModalSubmitting() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ModalBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"font-semibold text-xl my-2\",\n                children: \"Submitting Your Quiz Data\"\n            }, void 0, false, {\n                fileName: \"/data/data/com.termux/files/home/quiz-website/components/ModalSubmitting.js\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Spinner, {}, void 0, false, {\n                fileName: \"/data/data/com.termux/files/home/quiz-website/components/ModalSubmitting.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/data/data/com.termux/files/home/quiz-website/components/ModalSubmitting.js\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this);\n}\n_c1 = ModalSubmitting;\nvar _c, _c1;\n$RefreshReg$(_c, \"Spinner\");\n$RefreshReg$(_c1, \"ModalSubmitting\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL01vZGFsU3VibWl0dGluZy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE0QztBQUNHO0FBRS9DLFNBQVNHLFVBQVU7O0lBQ2pCLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUVyQ0MsZ0RBQVNBLENBQUMsSUFBSTtRQUNaSyxXQUFXLElBQUk7WUFDYkQsVUFBVSxHQUFVLE9BQVBELFFBQU87WUFDcEJFLFdBQVcsSUFBSTtnQkFDYkQsVUFBVSxHQUFVLE9BQVBELFFBQU87WUFDdEIsR0FBRztRQUNMLEdBQUc7SUFDTCxHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0c7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0Q7WUFBSUMsV0FBVyx3REFBK0QsT0FBUEo7Ozs7Ozs7Ozs7O0FBRzlFO0dBakJTRDtLQUFBQTtBQW1CTSxTQUFTTSxrQkFBa0I7SUFDeEMscUJBQ0UsOERBQUNQLDZEQUFTQTs7MEJBQ1IsOERBQUNRO2dCQUFFRixXQUFVOzBCQUE2Qjs7Ozs7OzBCQUMxQyw4REFBQ0w7Ozs7Ozs7Ozs7O0FBR1AsQ0FBQztNQVB1Qk0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Nb2RhbFN1Ym1pdHRpbmcuanM/YWFlYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTW9kYWxCYXNlIGZyb20gXCJAL2NvbXBvbmVudHMvTW9kYWxCYXNlXCI7XG5cbmZ1bmN0aW9uIFNwaW5uZXIoKSB7XG4gIGNvbnN0IFtsb2FkZXIsIHNldExvYWRlcl0gPSB1c2VTdGF0ZShcImJvcmRlci10LWdyYXktNTAwXCIpXG4gIFxuICB1c2VFZmZlY3QoKCk9PntcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBzZXRMb2FkZXIoYCR7bG9hZGVyfSBib3JkZXItci1ncmF5LTYwMGApXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgIHNldExvYWRlcihgJHtsb2FkZXJ9IGJvcmRlci1yLWdyYXktNjAwIGJvcmRlci1iLWdyYXktNzAwYClcbiAgICAgIH0sIDIwMDApXG4gICAgfSwgMjAwMCk7XG4gIH0sIFtdKVxuICBcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaC0xMCB3LTEwIG14LWF1dG8gYm9yZGVyLTQgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpbiAke2xvYWRlcn1gfT48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTW9kYWxTdWJtaXR0aW5nKCkge1xuICByZXR1cm4gKFxuICAgIDxNb2RhbEJhc2U+XG4gICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQteGwgbXktMlwiPlN1Ym1pdHRpbmcgWW91ciBRdWl6IERhdGE8L3A+XG4gICAgICA8U3Bpbm5lciAvPlxuICAgIDwvTW9kYWxCYXNlPlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiTW9kYWxCYXNlIiwiU3Bpbm5lciIsImxvYWRlciIsInNldExvYWRlciIsInNldFRpbWVvdXQiLCJkaXYiLCJjbGFzc05hbWUiLCJNb2RhbFN1Ym1pdHRpbmciLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/ModalSubmitting.js\n"));

/***/ })

});