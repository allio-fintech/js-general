webpackHotUpdate_N_E("pages/market-graph",{

/***/ "./src/features/marketGraph/marketGraphSlice.ts":
/*!******************************************************!*\
  !*** ./src/features/marketGraph/marketGraphSlice.ts ***!
  \******************************************************/
/*! exports provided: default, parseMarketCloseData, changeInitialDate, changeFinalDate, changeInitialFund, changeTicker, addGraphDisplayOption, updateGraphDisplayOption, addAllioAllocationAsset, updateAllioAllocationProportion, generateMarketGraphData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseMarketCloseData\", function() { return parseMarketCloseData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialDate\", function() { return changeInitialDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeFinalDate\", function() { return changeFinalDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialFund\", function() { return changeInitialFund; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeTicker\", function() { return changeTicker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addGraphDisplayOption\", function() { return addGraphDisplayOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGraphDisplayOption\", function() { return updateGraphDisplayOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addAllioAllocationAsset\", function() { return addAllioAllocationAsset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateAllioAllocationProportion\", function() { return updateAllioAllocationProportion; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateMarketGraphData\", function() { return generateMarketGraphData; });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! decimal.js */ \"./node_modules/decimal.js/decimal.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(decimal_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var features_date_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! features/date/util */ \"./src/features/date/util.ts\");\n/* harmony import */ var _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datePriceDataEntityAdapter */ \"./src/features/marketGraph/datePriceDataEntityAdapter.ts\");\n/* harmony import */ var _fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fetchMarketDataByTickerThunk */ \"./src/features/marketGraph/fetchMarketDataByTickerThunk.ts\");\n/* harmony import */ var _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rawYahooFinanceChartDataEntityAdapter */ \"./src/features/marketGraph/rawYahooFinanceChartDataEntityAdapter.ts\");\n/* harmony import */ var _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assetDataEntityAdapter */ \"./src/features/marketGraph/assetDataEntityAdapter.ts\");\n\n\n\n\n\n\n\n/* eslint-disable no-param-reassign */\n\nvar rawYahooFinanceDataInitialState = _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInitialState({\n  loading: false,\n  errorMessage: ''\n});\nvar marketGraphSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__[\"createSlice\"])({\n  name: 'marketGraph',\n  initialState: {\n    rawYahooFinanceData: rawYahooFinanceDataInitialState,\n    parsedMarketCloseData: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(),\n    initialFund: 100,\n    initialDate: '2010-01-01',\n    finalDate: '2020-12-01',\n    ticker: '',\n    graphDisplayOptions: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].addOne(_assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(), {\n      assetType: 'Allio',\n      data: {\n        show: false,\n        color: 'navy'\n      }\n    }),\n    allioAllocation: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(),\n    marketGraphData: _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInitialState()\n  },\n  reducers: {\n    parseMarketCloseData: function parseMarketCloseData(state, action) {\n      var chartData = action.payload;\n      var ticker = chartData.meta.symbol;\n      var timestamp = chartData.timestamp,\n          indicators = chartData.indicators;\n\n      if (!timestamp) {\n        return;\n      }\n\n      var datePriceData = timestamp.reduce(function (data, ts, ind) {\n        if (ind >= timestamp.length - 1) {\n          return data;\n        }\n\n        var date = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"timestampToDate\"])(ts);\n        var dateString = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"approximateUTCDateString\"])(date);\n        var price = indicators.quote[0].close[ind] && new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](indicators.quote[0].close[ind]);\n        return _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].upsertOne(data, {\n          assetType: ticker,\n          id: dateString,\n          date: date,\n          price: price\n        });\n      }, _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInitialState());\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.parsedMarketCloseData, {\n        assetType: ticker,\n        data: datePriceData\n      });\n    },\n    changeTicker: function changeTicker(state, action) {\n      state.ticker = action.payload;\n    },\n    changeInitialFund: function changeInitialFund(state, action) {\n      state.initialFund = action.payload;\n    },\n    changeInitialDate: function changeInitialDate(state, action) {\n      state.initialDate = action.payload;\n    },\n    changeFinalDate: function changeFinalDate(state, action) {\n      state.finalDate = action.payload;\n    },\n    addGraphDisplayOption: function addGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.graphDisplayOptions, {\n        assetType: action.payload,\n        data: {\n          show: true,\n          color: 'black'\n        }\n      });\n    },\n    updateGraphDisplayOption: function updateGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.graphDisplayOptions, {\n        id: action.payload.assetType,\n        changes: {\n          data: {\n            show: action.payload.show,\n            color: action.payload.color\n          }\n        }\n      });\n    },\n    addAllioAllocationAsset: function addAllioAllocationAsset(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.allioAllocation, {\n        assetType: action.payload,\n        data: {\n          numerator: '0',\n          denominator: '1',\n          proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](0)\n        }\n      });\n      state.allioAllocation.ids.forEach(function (assetType) {\n        var totalNumber = state.allioAllocation.ids.length;\n        _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.allioAllocation, {\n          id: assetType,\n          changes: {\n            data: {\n              numerator: '1',\n              denominator: totalNumber.toString(),\n              proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](1).dividedBy(totalNumber)\n            }\n          }\n        });\n      });\n    },\n    updateAllioAllocationProportion: function updateAllioAllocationProportion(state, action) {\n      var numerator = action.payload.numerator || '0';\n      var denominator = action.payload.denominator || '1';\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.allioAllocation, {\n        id: action.payload.assetType,\n        changes: {\n          data: {\n            numerator: numerator,\n            denominator: denominator,\n            proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](numerator).dividedBy(denominator)\n          }\n        }\n      });\n    },\n    generateMarketGraphData: function generateMarketGraphData() {// datePriceDataEntityAdapter.removeAll(state.marketGraphData);\n    }\n  },\n  extraReducers: function extraReducers(builder) {\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].fulfilled, function (state, action) {\n      state.rawYahooFinanceData.loading = false;\n      state.rawYahooFinanceData.errorMessage = '';\n      _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].upsertOne(state.rawYahooFinanceData, action.payload[0]);\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].pending, function (state) {\n      state.rawYahooFinanceData.loading = true;\n      state.rawYahooFinanceData.errorMessage = '';\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].rejected, function (state, action) {\n      console.error(action.error);\n      state.rawYahooFinanceData.errorMessage = action.error.message;\n      state.rawYahooFinanceData.loading = false;\n    });\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (marketGraphSlice.reducer);\nvar _marketGraphSlice$act = marketGraphSlice.actions,\n    parseMarketCloseData = _marketGraphSlice$act.parseMarketCloseData,\n    changeInitialDate = _marketGraphSlice$act.changeInitialDate,\n    changeFinalDate = _marketGraphSlice$act.changeFinalDate,\n    changeInitialFund = _marketGraphSlice$act.changeInitialFund,\n    changeTicker = _marketGraphSlice$act.changeTicker,\n    addGraphDisplayOption = _marketGraphSlice$act.addGraphDisplayOption,\n    updateGraphDisplayOption = _marketGraphSlice$act.updateGraphDisplayOption,\n    addAllioAllocationAsset = _marketGraphSlice$act.addAllioAllocationAsset,\n    updateAllioAllocationProportion = _marketGraphSlice$act.updateAllioAllocationProportion,\n    generateMarketGraphData = _marketGraphSlice$act.generateMarketGraphData;\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2ZlYXR1cmVzL21hcmtldEdyYXBoL21hcmtldEdyYXBoU2xpY2UudHM/NGEzNiJdLCJuYW1lcyI6WyJyYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlciIsImdldEluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJlcnJvck1lc3NhZ2UiLCJtYXJrZXRHcmFwaFNsaWNlIiwiY3JlYXRlU2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlRGF0YSIsInBhcnNlZE1hcmtldENsb3NlRGF0YSIsImFzc2V0RGF0YUVudGl0eUFkYXB0ZXIiLCJpbml0aWFsRnVuZCIsImluaXRpYWxEYXRlIiwiZmluYWxEYXRlIiwidGlja2VyIiwiZ3JhcGhEaXNwbGF5T3B0aW9ucyIsImFkZE9uZSIsImFzc2V0VHlwZSIsImRhdGEiLCJzaG93IiwiY29sb3IiLCJhbGxpb0FsbG9jYXRpb24iLCJtYXJrZXRHcmFwaERhdGEiLCJkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlciIsInJlZHVjZXJzIiwicGFyc2VNYXJrZXRDbG9zZURhdGEiLCJzdGF0ZSIsImFjdGlvbiIsImNoYXJ0RGF0YSIsInBheWxvYWQiLCJtZXRhIiwic3ltYm9sIiwidGltZXN0YW1wIiwiaW5kaWNhdG9ycyIsImRhdGVQcmljZURhdGEiLCJyZWR1Y2UiLCJ0cyIsImluZCIsImxlbmd0aCIsImRhdGUiLCJ0aW1lc3RhbXBUb0RhdGUiLCJkYXRlU3RyaW5nIiwiYXBwcm94aW1hdGVVVENEYXRlU3RyaW5nIiwicHJpY2UiLCJxdW90ZSIsImNsb3NlIiwiRGVjaW1hbCIsInVwc2VydE9uZSIsImlkIiwiY2hhbmdlVGlja2VyIiwiY2hhbmdlSW5pdGlhbEZ1bmQiLCJjaGFuZ2VJbml0aWFsRGF0ZSIsImNoYW5nZUZpbmFsRGF0ZSIsImFkZEdyYXBoRGlzcGxheU9wdGlvbiIsInVwZGF0ZUdyYXBoRGlzcGxheU9wdGlvbiIsInVwZGF0ZU9uZSIsImNoYW5nZXMiLCJhZGRBbGxpb0FsbG9jYXRpb25Bc3NldCIsIm51bWVyYXRvciIsImRlbm9taW5hdG9yIiwicHJvcG9ydGlvbiIsImlkcyIsImZvckVhY2giLCJ0b3RhbE51bWJlciIsInRvU3RyaW5nIiwiZGl2aWRlZEJ5IiwidXBkYXRlQWxsaW9BbGxvY2F0aW9uUHJvcG9ydGlvbiIsImdlbmVyYXRlTWFya2V0R3JhcGhEYXRhIiwiZXh0cmFSZWR1Y2VycyIsImJ1aWxkZXIiLCJhZGRDYXNlIiwiZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuayIsImZ1bGZpbGxlZCIsInBlbmRpbmciLCJyZWplY3RlZCIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJyZWR1Y2VyIiwiYWN0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLCtCQUErQixHQUFHQyw4RUFBcUMsQ0FBQ0MsZUFBdEMsQ0FDdEM7QUFBRUMsU0FBTyxFQUFFLEtBQVg7QUFBa0JDLGNBQVksRUFBRTtBQUFoQyxDQURzQyxDQUF4QztBQW9DQSxJQUFNQyxnQkFBZ0IsR0FBR0Msb0VBQVcsQ0FBQztBQUNuQ0MsTUFBSSxFQUFFLGFBRDZCO0FBRW5DQyxjQUFZLEVBQUU7QUFDWkMsdUJBQW1CLEVBQUVULCtCQURUO0FBRVpVLHlCQUFxQixFQUFFQywrREFBc0IsQ0FBQ1QsZUFBdkIsRUFGWDtBQUdaVSxlQUFXLEVBQUUsR0FIRDtBQUlaQyxlQUFXLEVBQUUsWUFKRDtBQUtaQyxhQUFTLEVBQUUsWUFMQztBQU1aQyxVQUFNLEVBQUUsRUFOSTtBQU9aQyx1QkFBbUIsRUFBRUwsK0RBQXNCLENBQUNNLE1BQXZCLENBQ25CTiwr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dXJlcy9tYXJrZXRHcmFwaC9tYXJrZXRHcmFwaFNsaWNlLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2xpY2UsIEVudGl0eVN0YXRlLCBQYXlsb2FkQWN0aW9uIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQgeyBEZWNpbWFsIH0gZnJvbSAnZGVjaW1hbC5qcyc7XG5pbXBvcnQgeyBhcHByb3hpbWF0ZVVUQ0RhdGVTdHJpbmcsIHRpbWVzdGFtcFRvRGF0ZSB9IGZyb20gJ2ZlYXR1cmVzL2RhdGUvdXRpbCc7XG5pbXBvcnQgeyBZYWhvb0ZpbmFuY2VDaGFydERhdGEgfSBmcm9tICdmZWF0dXJlcy9tYXJrZXRIaXN0b3J5UXVlcnkveWFob29GaW5hbmNlTWFya2V0QXBpJztcbmltcG9ydCBkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlciwge1xuICBEYXRlUHJpY2VEYXR1bSxcbn0gZnJvbSAnLi9kYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlcic7XG5pbXBvcnQgZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuayBmcm9tICcuL2ZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsnO1xuaW1wb3J0IHJhd1lhaG9vRmluYW5jZUNoYXJ0RGF0YUVudGl0eUFkYXB0ZXIgZnJvbSAnLi9yYXdZYWhvb0ZpbmFuY2VDaGFydERhdGFFbnRpdHlBZGFwdGVyJztcbmltcG9ydCBhc3NldERhdGFFbnRpdHlBZGFwdGVyIGZyb20gJy4vYXNzZXREYXRhRW50aXR5QWRhcHRlcic7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5jb25zdCByYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlID0gcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlci5nZXRJbml0aWFsU3RhdGUoXG4gIHsgbG9hZGluZzogZmFsc2UsIGVycm9yTWVzc2FnZTogJycgfVxuKTtcblxuaW50ZXJmYWNlIE1hcmtldEdyYXBoU3RhdGUge1xuICB0aWNrZXI6IHN0cmluZztcbiAgaW5pdGlhbEZ1bmQ6IG51bWJlcjtcbiAgaW5pdGlhbERhdGU6IHN0cmluZztcbiAgZmluYWxEYXRlOiBzdHJpbmc7XG4gIHJhd1lhaG9vRmluYW5jZURhdGE6IHR5cGVvZiByYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlO1xuICBwYXJzZWRNYXJrZXRDbG9zZURhdGE6IEVudGl0eVN0YXRlPHtcbiAgICBhc3NldFR5cGU6IHN0cmluZztcbiAgICBkYXRhOiBFbnRpdHlTdGF0ZTxEYXRlUHJpY2VEYXR1bT47XG4gIH0+O1xuICBtYXJrZXRHcmFwaERhdGE6IEVudGl0eVN0YXRlPERhdGVQcmljZURhdHVtPjtcbiAgZ3JhcGhEaXNwbGF5T3B0aW9uczogRW50aXR5U3RhdGU8e1xuICAgIGFzc2V0VHlwZTogc3RyaW5nO1xuICAgIGRhdGE6IHtcbiAgICAgIHNob3c6IGJvb2xlYW47XG4gICAgICBjb2xvcjogc3RyaW5nO1xuICAgIH07XG4gIH0+O1xuICBhbGxpb0FsbG9jYXRpb246IEVudGl0eVN0YXRlPHtcbiAgICBhc3NldFR5cGU6IHN0cmluZztcbiAgICBkYXRhOiB7XG4gICAgICBudW1lcmF0b3I6IHN0cmluZyB8IHZvaWQ7XG4gICAgICBkZW5vbWluYXRvcjogc3RyaW5nIHwgdm9pZDtcbiAgICAgIHByb3BvcnRpb246IERlY2ltYWw7XG4gICAgfTtcbiAgfT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYmFsTWFya2V0R3JhcGhTdGF0ZSB7XG4gIG1hcmtldEdyYXBoOiBNYXJrZXRHcmFwaFN0YXRlO1xufVxuXG5jb25zdCBtYXJrZXRHcmFwaFNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiAnbWFya2V0R3JhcGgnLFxuICBpbml0aWFsU3RhdGU6IHtcbiAgICByYXdZYWhvb0ZpbmFuY2VEYXRhOiByYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlLFxuICAgIHBhcnNlZE1hcmtldENsb3NlRGF0YTogYXNzZXREYXRhRW50aXR5QWRhcHRlci5nZXRJbml0aWFsU3RhdGUoKSxcbiAgICBpbml0aWFsRnVuZDogMTAwLFxuICAgIGluaXRpYWxEYXRlOiAnMjAxMC0wMS0wMScsXG4gICAgZmluYWxEYXRlOiAnMjAyMC0xMi0wMScsXG4gICAgdGlja2VyOiAnJyxcbiAgICBncmFwaERpc3BsYXlPcHRpb25zOiBhc3NldERhdGFFbnRpdHlBZGFwdGVyLmFkZE9uZShcbiAgICAgIGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKCksXG4gICAgICB7XG4gICAgICAgIGFzc2V0VHlwZTogJ0FsbGlvJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgIGNvbG9yOiAnbmF2eScsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKSxcbiAgICBhbGxpb0FsbG9jYXRpb246IGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKCksXG4gICAgbWFya2V0R3JhcGhEYXRhOiBkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlci5nZXRJbml0aWFsU3RhdGUoKSxcbiAgfSBhcyBNYXJrZXRHcmFwaFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIHBhcnNlTWFya2V0Q2xvc2VEYXRhKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248WWFob29GaW5hbmNlQ2hhcnREYXRhPikge1xuICAgICAgY29uc3QgY2hhcnREYXRhID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBjb25zdCB0aWNrZXIgPSBjaGFydERhdGEubWV0YS5zeW1ib2w7XG4gICAgICBjb25zdCB7IHRpbWVzdGFtcCwgaW5kaWNhdG9ycyB9ID0gY2hhcnREYXRhO1xuICAgICAgaWYgKCF0aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRlUHJpY2VEYXRhID0gdGltZXN0YW1wLnJlZHVjZTxFbnRpdHlTdGF0ZTxEYXRlUHJpY2VEYXR1bT4+KFxuICAgICAgICAoZGF0YSwgdHMsIGluZCkgPT4ge1xuICAgICAgICAgIGlmIChpbmQgPj0gdGltZXN0YW1wLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkYXRlID0gdGltZXN0YW1wVG9EYXRlKHRzKTtcbiAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYXBwcm94aW1hdGVVVENEYXRlU3RyaW5nKGRhdGUpO1xuICAgICAgICAgIGNvbnN0IHByaWNlID1cbiAgICAgICAgICAgIGluZGljYXRvcnMucXVvdGVbMF0uY2xvc2VbaW5kXSAmJlxuICAgICAgICAgICAgbmV3IERlY2ltYWwoaW5kaWNhdG9ycy5xdW90ZVswXS5jbG9zZVtpbmRdKTtcbiAgICAgICAgICByZXR1cm4gZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXIudXBzZXJ0T25lKGRhdGEsIHtcbiAgICAgICAgICAgIGFzc2V0VHlwZTogdGlja2VyLFxuICAgICAgICAgICAgaWQ6IGRhdGVTdHJpbmcsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgcHJpY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZSgpXG4gICAgICApO1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoc3RhdGUucGFyc2VkTWFya2V0Q2xvc2VEYXRhLCB7XG4gICAgICAgIGFzc2V0VHlwZTogdGlja2VyLFxuICAgICAgICBkYXRhOiBkYXRlUHJpY2VEYXRhLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGFuZ2VUaWNrZXIoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxzdHJpbmc+KSB7XG4gICAgICBzdGF0ZS50aWNrZXIgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICAgIGNoYW5nZUluaXRpYWxGdW5kKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248bnVtYmVyPikge1xuICAgICAgc3RhdGUuaW5pdGlhbEZ1bmQgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICAgIGNoYW5nZUluaXRpYWxEYXRlKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgc3RhdGUuaW5pdGlhbERhdGUgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICAgIGNoYW5nZUZpbmFsRGF0ZShzdGF0ZSwgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHN0cmluZz4pIHtcbiAgICAgIHN0YXRlLmZpbmFsRGF0ZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgYWRkR3JhcGhEaXNwbGF5T3B0aW9uKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoc3RhdGUuZ3JhcGhEaXNwbGF5T3B0aW9ucywge1xuICAgICAgICBhc3NldFR5cGU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlR3JhcGhEaXNwbGF5T3B0aW9uKFxuICAgICAgc3RhdGUsXG4gICAgICBhY3Rpb246IFBheWxvYWRBY3Rpb248eyBhc3NldFR5cGU6IHN0cmluZzsgc2hvdzogYm9vbGVhbjsgY29sb3I6IHN0cmluZyB9PlxuICAgICkge1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cGRhdGVPbmUoc3RhdGUuZ3JhcGhEaXNwbGF5T3B0aW9ucywge1xuICAgICAgICBpZDogYWN0aW9uLnBheWxvYWQuYXNzZXRUeXBlLFxuICAgICAgICBjaGFuZ2VzOiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2hvdzogYWN0aW9uLnBheWxvYWQuc2hvdyxcbiAgICAgICAgICAgIGNvbG9yOiBhY3Rpb24ucGF5bG9hZC5jb2xvcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBhZGRBbGxpb0FsbG9jYXRpb25Bc3NldChzdGF0ZSwgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHN0cmluZz4pIHtcbiAgICAgIGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIudXBzZXJ0T25lKHN0YXRlLmFsbGlvQWxsb2NhdGlvbiwge1xuICAgICAgICBhc3NldFR5cGU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbnVtZXJhdG9yOiAnMCcsXG4gICAgICAgICAgZGVub21pbmF0b3I6ICcxJyxcbiAgICAgICAgICBwcm9wb3J0aW9uOiBuZXcgRGVjaW1hbCgwKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgc3RhdGUuYWxsaW9BbGxvY2F0aW9uLmlkcy5mb3JFYWNoKChhc3NldFR5cGU6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0b3RhbE51bWJlciA9IHN0YXRlLmFsbGlvQWxsb2NhdGlvbi5pZHMubGVuZ3RoO1xuICAgICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwZGF0ZU9uZShzdGF0ZS5hbGxpb0FsbG9jYXRpb24sIHtcbiAgICAgICAgICBpZDogYXNzZXRUeXBlLFxuICAgICAgICAgIGNoYW5nZXM6IHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgbnVtZXJhdG9yOiAnMScsXG4gICAgICAgICAgICAgIGRlbm9taW5hdG9yOiB0b3RhbE51bWJlci50b1N0cmluZygpLFxuICAgICAgICAgICAgICBwcm9wb3J0aW9uOiBuZXcgRGVjaW1hbCgxKS5kaXZpZGVkQnkodG90YWxOdW1iZXIpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlQWxsaW9BbGxvY2F0aW9uUHJvcG9ydGlvbihcbiAgICAgIHN0YXRlLFxuICAgICAgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHtcbiAgICAgICAgYXNzZXRUeXBlOiBzdHJpbmc7XG4gICAgICAgIG51bWVyYXRvcjogc3RyaW5nIHwgdm9pZDtcbiAgICAgICAgZGVub21pbmF0b3I6IHN0cmluZyB8IHZvaWQ7XG4gICAgICB9PlxuICAgICkge1xuICAgICAgY29uc3QgbnVtZXJhdG9yID0gYWN0aW9uLnBheWxvYWQubnVtZXJhdG9yIHx8ICcwJztcbiAgICAgIGNvbnN0IGRlbm9taW5hdG9yID0gYWN0aW9uLnBheWxvYWQuZGVub21pbmF0b3IgfHwgJzEnO1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cGRhdGVPbmUoc3RhdGUuYWxsaW9BbGxvY2F0aW9uLCB7XG4gICAgICAgIGlkOiBhY3Rpb24ucGF5bG9hZC5hc3NldFR5cGUsXG4gICAgICAgIGNoYW5nZXM6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBudW1lcmF0b3IsXG4gICAgICAgICAgICBkZW5vbWluYXRvcixcbiAgICAgICAgICAgIHByb3BvcnRpb246IG5ldyBEZWNpbWFsKG51bWVyYXRvcikuZGl2aWRlZEJ5KGRlbm9taW5hdG9yKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZW5lcmF0ZU1hcmtldEdyYXBoRGF0YSgpIHtcbiAgICAgIC8vIGRhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyLnJlbW92ZUFsbChzdGF0ZS5tYXJrZXRHcmFwaERhdGEpO1xuICAgIH0sXG4gIH0sXG4gIGV4dHJhUmVkdWNlcnM6IChidWlsZGVyKSA9PiB7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoXG4gICAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEsXG4gICAgICAgIGFjdGlvbi5wYXlsb2FkWzBdXG4gICAgICApO1xuICAgIH0pO1xuICAgIGJ1aWxkZXIuYWRkQ2FzZShmZXRjaE1hcmtldERhdGFCeVRpY2tlclRodW5rLnBlbmRpbmcsIChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgfSk7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGFjdGlvbi5lcnJvcik7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmVycm9yTWVzc2FnZSA9IGFjdGlvbi5lcnJvci5tZXNzYWdlO1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbWFya2V0R3JhcGhTbGljZS5yZWR1Y2VyO1xuZXhwb3J0IGNvbnN0IHtcbiAgcGFyc2VNYXJrZXRDbG9zZURhdGEsXG4gIGNoYW5nZUluaXRpYWxEYXRlLFxuICBjaGFuZ2VGaW5hbERhdGUsXG4gIGNoYW5nZUluaXRpYWxGdW5kLFxuICBjaGFuZ2VUaWNrZXIsXG4gIGFkZEdyYXBoRGlzcGxheU9wdGlvbixcbiAgdXBkYXRlR3JhcGhEaXNwbGF5T3B0aW9uLFxuICBhZGRBbGxpb0FsbG9jYXRpb25Bc3NldCxcbiAgdXBkYXRlQWxsaW9BbGxvY2F0aW9uUHJvcG9ydGlvbixcbiAgZ2VuZXJhdGVNYXJrZXRHcmFwaERhdGEsXG59ID0gbWFya2V0R3JhcGhTbGljZS5hY3Rpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/features/marketGraph/marketGraphSlice.ts\n");

/***/ })

})