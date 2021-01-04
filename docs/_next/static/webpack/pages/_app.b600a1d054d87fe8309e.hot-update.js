webpackHotUpdate_N_E("pages/_app",{

/***/ "./src/features/marketGraph/marketGraphSlice.ts":
/*!******************************************************!*\
  !*** ./src/features/marketGraph/marketGraphSlice.ts ***!
  \******************************************************/
/*! exports provided: default, parseMarketCloseData, changeInitialDate, changeFinalDate, changeInitialFund, changeTicker, addGraphDisplayOption, updateGraphDisplayOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseMarketCloseData\", function() { return parseMarketCloseData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialDate\", function() { return changeInitialDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeFinalDate\", function() { return changeFinalDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialFund\", function() { return changeInitialFund; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeTicker\", function() { return changeTicker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addGraphDisplayOption\", function() { return addGraphDisplayOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGraphDisplayOption\", function() { return updateGraphDisplayOption; });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! decimal.js */ \"./node_modules/decimal.js/decimal.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(decimal_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var features_date_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! features/date/util */ \"./src/features/date/util.ts\");\n/* harmony import */ var _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datePriceDataEntityAdapter */ \"./src/features/marketGraph/datePriceDataEntityAdapter.ts\");\n/* harmony import */ var _fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fetchMarketDataByTickerThunk */ \"./src/features/marketGraph/fetchMarketDataByTickerThunk.ts\");\n/* harmony import */ var _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rawYahooFinanceChartDataEntityAdapter */ \"./src/features/marketGraph/rawYahooFinanceChartDataEntityAdapter.ts\");\n/* harmony import */ var _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assetDataEntityAdapter */ \"./src/features/marketGraph/assetDataEntityAdapter.ts\");\n\n\n\n\n\n\n\n/* eslint-disable no-param-reassign */\n\nvar rawYahooFinanceDataInitialState = _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInitialState({\n  loading: false,\n  errorMessage: ''\n});\nvar marketGraphSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__[\"createSlice\"])({\n  name: 'marketGraph',\n  initialState: {\n    rawYahooFinanceData: rawYahooFinanceDataInitialState,\n    parsedMarketCloseData: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(),\n    initialFund: 100,\n    initialDate: '2010-01-01',\n    finalDate: '2020-12-01',\n    ticker: '',\n    graphDisplayOptions: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].addOne(_assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(), {\n      assetType: 'Allio',\n      data: {\n        show: false,\n        color: 'navy'\n      }\n    }),\n    allioAllocation: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState()\n  },\n  reducers: {\n    parseMarketCloseData: function parseMarketCloseData(state, action) {\n      var chartData = action.payload;\n      var ticker = chartData.meta.symbol;\n      var timestamp = chartData.timestamp,\n          indicators = chartData.indicators;\n\n      if (!timestamp) {\n        return;\n      }\n\n      var datePriceData = timestamp.reduce(function (data, ts, ind) {\n        if (ind >= timestamp.length - 1) {\n          return data;\n        }\n\n        var date = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"timestampToDate\"])(ts);\n        var dateString = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"approximateUTCDateString\"])(date);\n        var price = indicators.quote[0].close[ind] && new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](indicators.quote[0].close[ind]);\n        return _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].upsertOne(data, {\n          assetType: ticker,\n          id: dateString,\n          date: date,\n          price: price\n        });\n      }, _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInitialState());\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.parsedMarketCloseData, {\n        assetType: ticker,\n        data: datePriceData\n      });\n    },\n    changeTicker: function changeTicker(state, action) {\n      state.ticker = action.payload;\n    },\n    changeInitialFund: function changeInitialFund(state, action) {\n      state.initialFund = action.payload;\n    },\n    changeInitialDate: function changeInitialDate(state, action) {\n      state.initialDate = action.payload;\n    },\n    changeFinalDate: function changeFinalDate(state, action) {\n      state.finalDate = action.payload;\n    },\n    addGraphDisplayOption: function addGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.graphDisplayOptions, {\n        assetType: action.payload,\n        data: {\n          show: true,\n          color: 'black'\n        }\n      });\n    },\n    updateGraphDisplayOption: function updateGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.graphDisplayOptions, {\n        assetType: action.payload.assetType,\n        data: {\n          show: action.payload.show,\n          color: action.payload.color\n        }\n      });\n    },\n    addAllioAllocationAsset: function addAllioAllocationAsset(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].addOne(state.allioAllocation, {\n        assetType: action.payload,\n        data: {\n          numerator: 0,\n          denominator: 1,\n          proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](0)\n        }\n      });\n      state.allioAllocation.ids.forEach(function (assetType) {\n        var totalNumber = state.allioAllocation.ids.length;\n        _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.allioAllocation, {\n          id: assetType,\n          change: {\n            data: {\n              numerator: 1,\n              denominator: totalNumber,\n              proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](1).dividedBy(totalNumber)\n            }\n          }\n        });\n      });\n    }\n  },\n  extraReducers: function extraReducers(builder) {\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].fulfilled, function (state, action) {\n      state.rawYahooFinanceData.loading = false;\n      state.rawYahooFinanceData.errorMessage = '';\n      _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].upsertOne(state.rawYahooFinanceData, action.payload[0]);\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].pending, function (state) {\n      state.rawYahooFinanceData.loading = true;\n      state.rawYahooFinanceData.errorMessage = '';\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].rejected, function (state, action) {\n      console.error(action.error);\n      state.rawYahooFinanceData.errorMessage = action.error.message;\n      state.rawYahooFinanceData.loading = false;\n    });\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (marketGraphSlice.reducer);\nvar _marketGraphSlice$act = marketGraphSlice.actions,\n    parseMarketCloseData = _marketGraphSlice$act.parseMarketCloseData,\n    changeInitialDate = _marketGraphSlice$act.changeInitialDate,\n    changeFinalDate = _marketGraphSlice$act.changeFinalDate,\n    changeInitialFund = _marketGraphSlice$act.changeInitialFund,\n    changeTicker = _marketGraphSlice$act.changeTicker,\n    addGraphDisplayOption = _marketGraphSlice$act.addGraphDisplayOption,\n    updateGraphDisplayOption = _marketGraphSlice$act.updateGraphDisplayOption;\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2ZlYXR1cmVzL21hcmtldEdyYXBoL21hcmtldEdyYXBoU2xpY2UudHM/NGEzNiJdLCJuYW1lcyI6WyJyYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlciIsImdldEluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJlcnJvck1lc3NhZ2UiLCJtYXJrZXRHcmFwaFNsaWNlIiwiY3JlYXRlU2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlRGF0YSIsInBhcnNlZE1hcmtldENsb3NlRGF0YSIsImFzc2V0RGF0YUVudGl0eUFkYXB0ZXIiLCJpbml0aWFsRnVuZCIsImluaXRpYWxEYXRlIiwiZmluYWxEYXRlIiwidGlja2VyIiwiZ3JhcGhEaXNwbGF5T3B0aW9ucyIsImFkZE9uZSIsImFzc2V0VHlwZSIsImRhdGEiLCJzaG93IiwiY29sb3IiLCJhbGxpb0FsbG9jYXRpb24iLCJyZWR1Y2VycyIsInBhcnNlTWFya2V0Q2xvc2VEYXRhIiwic3RhdGUiLCJhY3Rpb24iLCJjaGFydERhdGEiLCJwYXlsb2FkIiwibWV0YSIsInN5bWJvbCIsInRpbWVzdGFtcCIsImluZGljYXRvcnMiLCJkYXRlUHJpY2VEYXRhIiwicmVkdWNlIiwidHMiLCJpbmQiLCJsZW5ndGgiLCJkYXRlIiwidGltZXN0YW1wVG9EYXRlIiwiZGF0ZVN0cmluZyIsImFwcHJveGltYXRlVVRDRGF0ZVN0cmluZyIsInByaWNlIiwicXVvdGUiLCJjbG9zZSIsIkRlY2ltYWwiLCJkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlciIsInVwc2VydE9uZSIsImlkIiwiY2hhbmdlVGlja2VyIiwiY2hhbmdlSW5pdGlhbEZ1bmQiLCJjaGFuZ2VJbml0aWFsRGF0ZSIsImNoYW5nZUZpbmFsRGF0ZSIsImFkZEdyYXBoRGlzcGxheU9wdGlvbiIsInVwZGF0ZUdyYXBoRGlzcGxheU9wdGlvbiIsImFkZEFsbGlvQWxsb2NhdGlvbkFzc2V0IiwibnVtZXJhdG9yIiwiZGVub21pbmF0b3IiLCJwcm9wb3J0aW9uIiwiaWRzIiwiZm9yRWFjaCIsInRvdGFsTnVtYmVyIiwidXBkYXRlT25lIiwiY2hhbmdlIiwiZGl2aWRlZEJ5IiwiZXh0cmFSZWR1Y2VycyIsImJ1aWxkZXIiLCJhZGRDYXNlIiwiZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuayIsImZ1bGZpbGxlZCIsInBlbmRpbmciLCJyZWplY3RlZCIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJyZWR1Y2VyIiwiYWN0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLCtCQUErQixHQUFHQyw4RUFBcUMsQ0FBQ0MsZUFBdEMsQ0FDdEM7QUFBRUMsU0FBTyxFQUFFLEtBQVg7QUFBa0JDLGNBQVksRUFBRTtBQUFoQyxDQURzQyxDQUF4QztBQW1DQSxJQUFNQyxnQkFBZ0IsR0FBR0Msb0VBQVcsQ0FBQztBQUNuQ0MsTUFBSSxFQUFFLGFBRDZCO0FBRW5DQyxjQUFZLEVBQUU7QUFDWkMsdUJBQW1CLEVBQUVULCtCQURUO0FBRVpVLHlCQUFxQixFQUFFQywrREFBc0IsQ0FBQ1QsZUFBdkIsRUFGWDtBQUdaVSxlQUFXLEVBQUUsR0FIRDtBQUlaQyxlQUFXLEVBQUUsWUFKRDtBQUtaQyxhQUFTLEVBQUUsWUFMQztBQU1aQyxVQUFNLEVBQUUsRUFOSTtBQU9aQyx1QkFBbUIsRUFBRUwsK0RBQXNCLENBQUNNLE1BQXZCLENBQ25CTiwrREFBc0IsQ0FBQ1QsZUFBdkIsRUFEbUIsRUFFbkI7QUFDRWdCLGVBQVMsRUFBRSxPQURiO0FBRUVDLFVBQUksRUFBRTtBQUNKQyxZQUFJLEVBQUUsS0FERjtBQUVKQyxhQUFLLEVBQUU7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QkFBQUEsb0I7SUFDQTJCLGlCLHlCQUFBQSxpQjtJQUNBQyxlLHlCQUFBQSxlO0lBQ0FGLGlCLHlCQUFBQSxpQjtJQUNBRCxZLHlCQUFBQSxZO0lBQ0FJLHFCLHlCQUFBQSxxQjtJQUNBQyx3Qix5QkFBQUEsd0IiLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvbWFya2V0R3JhcGgvbWFya2V0R3JhcGhTbGljZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlLCBFbnRpdHlTdGF0ZSwgUGF5bG9hZEFjdGlvbiB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xuaW1wb3J0IHsgRGVjaW1hbCB9IGZyb20gJ2RlY2ltYWwuanMnO1xuaW1wb3J0IHsgYXBwcm94aW1hdGVVVENEYXRlU3RyaW5nLCB0aW1lc3RhbXBUb0RhdGUgfSBmcm9tICdmZWF0dXJlcy9kYXRlL3V0aWwnO1xuaW1wb3J0IHsgWWFob29GaW5hbmNlQ2hhcnREYXRhIH0gZnJvbSAnZmVhdHVyZXMvbWFya2V0SGlzdG9yeVF1ZXJ5L3lhaG9vRmluYW5jZU1hcmtldEFwaSc7XG5pbXBvcnQgZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXIsIHtcbiAgRGF0ZVByaWNlRGF0dW0sXG59IGZyb20gJy4vZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXInO1xuaW1wb3J0IGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsgZnJvbSAnLi9mZXRjaE1hcmtldERhdGFCeVRpY2tlclRodW5rJztcbmltcG9ydCByYXdZYWhvb0ZpbmFuY2VDaGFydERhdGFFbnRpdHlBZGFwdGVyIGZyb20gJy4vcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlcic7XG5pbXBvcnQgYXNzZXREYXRhRW50aXR5QWRhcHRlciBmcm9tICcuL2Fzc2V0RGF0YUVudGl0eUFkYXB0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuY29uc3QgcmF3WWFob29GaW5hbmNlRGF0YUluaXRpYWxTdGF0ZSA9IHJhd1lhaG9vRmluYW5jZUNoYXJ0RGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKFxuICB7IGxvYWRpbmc6IGZhbHNlLCBlcnJvck1lc3NhZ2U6ICcnIH1cbik7XG5cbmludGVyZmFjZSBNYXJrZXRHcmFwaFN0YXRlIHtcbiAgdGlja2VyOiBzdHJpbmc7XG4gIGluaXRpYWxGdW5kOiBudW1iZXI7XG4gIGluaXRpYWxEYXRlOiBzdHJpbmc7XG4gIGZpbmFsRGF0ZTogc3RyaW5nO1xuICByYXdZYWhvb0ZpbmFuY2VEYXRhOiB0eXBlb2YgcmF3WWFob29GaW5hbmNlRGF0YUluaXRpYWxTdGF0ZTtcbiAgcGFyc2VkTWFya2V0Q2xvc2VEYXRhOiBFbnRpdHlTdGF0ZTx7XG4gICAgYXNzZXRUeXBlOiBzdHJpbmc7XG4gICAgZGF0YTogRW50aXR5U3RhdGU8RGF0ZVByaWNlRGF0dW0+O1xuICB9PjtcbiAgZ3JhcGhEaXNwbGF5T3B0aW9uczogRW50aXR5U3RhdGU8e1xuICAgIGFzc2V0VHlwZTogc3RyaW5nO1xuICAgIGRhdGE6IHtcbiAgICAgIHNob3c6IGJvb2xlYW47XG4gICAgICBjb2xvcjogc3RyaW5nO1xuICAgIH07XG4gIH0+O1xuICBhbGxpb0FsbG9jYXRpb246IEVudGl0eVN0YXRlPHtcbiAgICBhc3NldFR5cGU6IHN0cmluZztcbiAgICBkYXRhOiB7XG4gICAgICBudW1lcmF0b3I6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIGRlbm9taW5hdG9yOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwcm9wb3J0aW9uOiBEZWNpbWFsO1xuICAgIH07XG4gIH0+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbE1hcmtldEdyYXBoU3RhdGUge1xuICBtYXJrZXRHcmFwaDogTWFya2V0R3JhcGhTdGF0ZTtcbn1cblxuY29uc3QgbWFya2V0R3JhcGhTbGljZSA9IGNyZWF0ZVNsaWNlKHtcbiAgbmFtZTogJ21hcmtldEdyYXBoJyxcbiAgaW5pdGlhbFN0YXRlOiB7XG4gICAgcmF3WWFob29GaW5hbmNlRGF0YTogcmF3WWFob29GaW5hbmNlRGF0YUluaXRpYWxTdGF0ZSxcbiAgICBwYXJzZWRNYXJrZXRDbG9zZURhdGE6IGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKCksXG4gICAgaW5pdGlhbEZ1bmQ6IDEwMCxcbiAgICBpbml0aWFsRGF0ZTogJzIwMTAtMDEtMDEnLFxuICAgIGZpbmFsRGF0ZTogJzIwMjAtMTItMDEnLFxuICAgIHRpY2tlcjogJycsXG4gICAgZ3JhcGhEaXNwbGF5T3B0aW9uczogYXNzZXREYXRhRW50aXR5QWRhcHRlci5hZGRPbmUoXG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZSgpLFxuICAgICAge1xuICAgICAgICBhc3NldFR5cGU6ICdBbGxpbycsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICBjb2xvcjogJ25hdnknLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICksXG4gICAgYWxsaW9BbGxvY2F0aW9uOiBhc3NldERhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZSgpLFxuICB9IGFzIE1hcmtldEdyYXBoU3RhdGUsXG4gIHJlZHVjZXJzOiB7XG4gICAgcGFyc2VNYXJrZXRDbG9zZURhdGEoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxZYWhvb0ZpbmFuY2VDaGFydERhdGE+KSB7XG4gICAgICBjb25zdCBjaGFydERhdGEgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGNvbnN0IHRpY2tlciA9IGNoYXJ0RGF0YS5tZXRhLnN5bWJvbDtcbiAgICAgIGNvbnN0IHsgdGltZXN0YW1wLCBpbmRpY2F0b3JzIH0gPSBjaGFydERhdGE7XG4gICAgICBpZiAoIXRpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVQcmljZURhdGEgPSB0aW1lc3RhbXAucmVkdWNlPEVudGl0eVN0YXRlPERhdGVQcmljZURhdHVtPj4oXG4gICAgICAgIChkYXRhLCB0cywgaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGluZCA+PSB0aW1lc3RhbXAubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aW1lc3RhbXBUb0RhdGUodHMpO1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBhcHByb3hpbWF0ZVVUQ0RhdGVTdHJpbmcoZGF0ZSk7XG4gICAgICAgICAgY29uc3QgcHJpY2UgPVxuICAgICAgICAgICAgaW5kaWNhdG9ycy5xdW90ZVswXS5jbG9zZVtpbmRdICYmXG4gICAgICAgICAgICBuZXcgRGVjaW1hbChpbmRpY2F0b3JzLnF1b3RlWzBdLmNsb3NlW2luZF0pO1xuICAgICAgICAgIHJldHVybiBkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoZGF0YSwge1xuICAgICAgICAgICAgYXNzZXRUeXBlOiB0aWNrZXIsXG4gICAgICAgICAgICBpZDogZGF0ZVN0cmluZyxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBwcmljZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKClcbiAgICAgICk7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwc2VydE9uZShzdGF0ZS5wYXJzZWRNYXJrZXRDbG9zZURhdGEsIHtcbiAgICAgICAgYXNzZXRUeXBlOiB0aWNrZXIsXG4gICAgICAgIGRhdGE6IGRhdGVQcmljZURhdGEsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNoYW5nZVRpY2tlcihzdGF0ZSwgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHN0cmluZz4pIHtcbiAgICAgIHN0YXRlLnRpY2tlciA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgY2hhbmdlSW5pdGlhbEZ1bmQoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxudW1iZXI+KSB7XG4gICAgICBzdGF0ZS5pbml0aWFsRnVuZCA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgY2hhbmdlSW5pdGlhbERhdGUoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxzdHJpbmc+KSB7XG4gICAgICBzdGF0ZS5pbml0aWFsRGF0ZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgY2hhbmdlRmluYWxEYXRlKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgc3RhdGUuZmluYWxEYXRlID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgfSxcbiAgICBhZGRHcmFwaERpc3BsYXlPcHRpb24oc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxzdHJpbmc+KSB7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwc2VydE9uZShzdGF0ZS5ncmFwaERpc3BsYXlPcHRpb25zLCB7XG4gICAgICAgIGFzc2V0VHlwZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVHcmFwaERpc3BsYXlPcHRpb24oXG4gICAgICBzdGF0ZSxcbiAgICAgIGFjdGlvbjogUGF5bG9hZEFjdGlvbjx7IGFzc2V0VHlwZTogc3RyaW5nOyBzaG93OiBib29sZWFuOyBjb2xvcjogc3RyaW5nIH0+XG4gICAgKSB7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwc2VydE9uZShzdGF0ZS5ncmFwaERpc3BsYXlPcHRpb25zLCB7XG4gICAgICAgIGFzc2V0VHlwZTogYWN0aW9uLnBheWxvYWQuYXNzZXRUeXBlLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc2hvdzogYWN0aW9uLnBheWxvYWQuc2hvdyxcbiAgICAgICAgICBjb2xvcjogYWN0aW9uLnBheWxvYWQuY29sb3IsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFkZEFsbGlvQWxsb2NhdGlvbkFzc2V0KHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci5hZGRPbmUoc3RhdGUuYWxsaW9BbGxvY2F0aW9uLCB7XG4gICAgICAgIGFzc2V0VHlwZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBudW1lcmF0b3I6IDAsXG4gICAgICAgICAgZGVub21pbmF0b3I6IDEsXG4gICAgICAgICAgcHJvcG9ydGlvbjogbmV3IERlY2ltYWwoMCksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHN0YXRlLmFsbGlvQWxsb2NhdGlvbi5pZHMuZm9yRWFjaCgoYXNzZXRUeXBlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdG90YWxOdW1iZXIgPSBzdGF0ZS5hbGxpb0FsbG9jYXRpb24uaWRzLmxlbmd0aDtcbiAgICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cGRhdGVPbmUoc3RhdGUuYWxsaW9BbGxvY2F0aW9uLCB7XG4gICAgICAgICAgaWQ6IGFzc2V0VHlwZSxcbiAgICAgICAgICBjaGFuZ2U6IHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgbnVtZXJhdG9yOiAxLFxuICAgICAgICAgICAgICBkZW5vbWluYXRvcjogdG90YWxOdW1iZXIsXG4gICAgICAgICAgICAgIHByb3BvcnRpb246IG5ldyBEZWNpbWFsKDEpLmRpdmlkZWRCeSh0b3RhbE51bWJlciksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcbiAgICBidWlsZGVyLmFkZENhc2UoZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuay5mdWxmaWxsZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgICByYXdZYWhvb0ZpbmFuY2VDaGFydERhdGFFbnRpdHlBZGFwdGVyLnVwc2VydE9uZShcbiAgICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YSxcbiAgICAgICAgYWN0aW9uLnBheWxvYWRbMF1cbiAgICAgICk7XG4gICAgfSk7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsucGVuZGluZywgKHN0YXRlKSA9PiB7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB9KTtcbiAgICBidWlsZGVyLmFkZENhc2UoZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuay5yZWplY3RlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYWN0aW9uLmVycm9yKTtcbiAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEuZXJyb3JNZXNzYWdlID0gYWN0aW9uLmVycm9yLm1lc3NhZ2U7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtYXJrZXRHcmFwaFNsaWNlLnJlZHVjZXI7XG5leHBvcnQgY29uc3Qge1xuICBwYXJzZU1hcmtldENsb3NlRGF0YSxcbiAgY2hhbmdlSW5pdGlhbERhdGUsXG4gIGNoYW5nZUZpbmFsRGF0ZSxcbiAgY2hhbmdlSW5pdGlhbEZ1bmQsXG4gIGNoYW5nZVRpY2tlcixcbiAgYWRkR3JhcGhEaXNwbGF5T3B0aW9uLFxuICB1cGRhdGVHcmFwaERpc3BsYXlPcHRpb24sXG59ID0gbWFya2V0R3JhcGhTbGljZS5hY3Rpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/features/marketGraph/marketGraphSlice.ts\n");

/***/ })

})