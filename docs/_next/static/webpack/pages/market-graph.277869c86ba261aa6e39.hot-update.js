webpackHotUpdate_N_E("pages/market-graph",{

/***/ "./src/features/marketGraph/marketGraphSlice.ts":
/*!******************************************************!*\
  !*** ./src/features/marketGraph/marketGraphSlice.ts ***!
  \******************************************************/
/*! exports provided: default, parseMarketCloseData, changeInitialDate, changeFinalDate, changeInitialFund, changeTicker, addGraphDisplayOption, updateGraphDisplayOption, addAllioAllocationAsset, updateAllioAllocationProportion, generateMarketGraphData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseMarketCloseData\", function() { return parseMarketCloseData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialDate\", function() { return changeInitialDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeFinalDate\", function() { return changeFinalDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialFund\", function() { return changeInitialFund; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeTicker\", function() { return changeTicker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addGraphDisplayOption\", function() { return addGraphDisplayOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGraphDisplayOption\", function() { return updateGraphDisplayOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addAllioAllocationAsset\", function() { return addAllioAllocationAsset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateAllioAllocationProportion\", function() { return updateAllioAllocationProportion; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateMarketGraphData\", function() { return generateMarketGraphData; });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! decimal.js */ \"./node_modules/decimal.js/decimal.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(decimal_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var features_date_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! features/date/util */ \"./src/features/date/util.ts\");\n/* harmony import */ var _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datePriceDataEntityAdapter */ \"./src/features/marketGraph/datePriceDataEntityAdapter.ts\");\n/* harmony import */ var _fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fetchMarketDataByTickerThunk */ \"./src/features/marketGraph/fetchMarketDataByTickerThunk.ts\");\n/* harmony import */ var _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rawYahooFinanceChartDataEntityAdapter */ \"./src/features/marketGraph/rawYahooFinanceChartDataEntityAdapter.ts\");\n/* harmony import */ var _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assetDataEntityAdapter */ \"./src/features/marketGraph/assetDataEntityAdapter.ts\");\n\n\n\n\n\n\n\n/* eslint-disable no-param-reassign */\n\nvar rawYahooFinanceDataInitialState = _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInitialState({\n  loading: false,\n  errorMessage: ''\n});\nvar marketGraphSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__[\"createSlice\"])({\n  name: 'marketGraph',\n  initialState: {\n    rawYahooFinanceData: rawYahooFinanceDataInitialState,\n    parsedMarketCloseData: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(),\n    initialFund: 100,\n    initialDate: '2010-01-01',\n    finalDate: '2020-12-01',\n    ticker: '',\n    graphDisplayOptions: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].addOne(_assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(), {\n      assetType: 'Allio',\n      data: {\n        show: false,\n        color: 'navy'\n      }\n    }),\n    allioAllocation: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(),\n    marketGraphData: _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInitialState()\n  },\n  reducers: {\n    parseMarketCloseData: function parseMarketCloseData(state, action) {\n      var chartData = action.payload;\n      var ticker = chartData.meta.symbol;\n      var timestamp = chartData.timestamp,\n          indicators = chartData.indicators;\n\n      if (!timestamp) {\n        return;\n      }\n\n      var datePriceData = timestamp.reduce(function (data, ts, ind) {\n        if (ind >= timestamp.length - 1) {\n          return data;\n        }\n\n        var date = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"timestampToDate\"])(ts);\n        var dateString = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"approximateUTCDateString\"])(date);\n        var price = indicators.quote[0].close[ind] && new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](indicators.quote[0].close[ind]);\n        return _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].upsertOne(data, {\n          assetType: ticker,\n          id: dateString,\n          date: date,\n          price: price\n        });\n      }, _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInitialState());\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.parsedMarketCloseData, {\n        assetType: ticker,\n        data: datePriceData\n      });\n    },\n    changeTicker: function changeTicker(state, action) {\n      state.ticker = action.payload;\n    },\n    changeInitialFund: function changeInitialFund(state, action) {\n      state.initialFund = action.payload;\n    },\n    changeInitialDate: function changeInitialDate(state, action) {\n      state.initialDate = action.payload;\n    },\n    changeFinalDate: function changeFinalDate(state, action) {\n      state.finalDate = action.payload;\n    },\n    addGraphDisplayOption: function addGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.graphDisplayOptions, {\n        assetType: action.payload,\n        data: {\n          show: true,\n          color: 'black'\n        }\n      });\n    },\n    updateGraphDisplayOption: function updateGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.graphDisplayOptions, {\n        id: action.payload.assetType,\n        changes: {\n          data: {\n            show: action.payload.show,\n            color: action.payload.color\n          }\n        }\n      });\n    },\n    addAllioAllocationAsset: function addAllioAllocationAsset(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.allioAllocation, {\n        assetType: action.payload,\n        data: {\n          numerator: '0',\n          denominator: '1',\n          proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](0)\n        }\n      });\n      state.allioAllocation.ids.forEach(function (assetType) {\n        var totalNumber = state.allioAllocation.ids.length;\n        _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.allioAllocation, {\n          id: assetType,\n          changes: {\n            data: {\n              numerator: '1',\n              denominator: totalNumber.toString(),\n              proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](1).dividedBy(totalNumber)\n            }\n          }\n        });\n      });\n    },\n    updateAllioAllocationProportion: function updateAllioAllocationProportion(state, action) {\n      var numerator = action.payload.numerator || '0';\n      var denominator = action.payload.denominator || '1';\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].updateOne(state.allioAllocation, {\n        id: action.payload.assetType,\n        changes: {\n          data: {\n            numerator: numerator,\n            denominator: denominator,\n            proportion: new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](numerator).dividedBy(denominator)\n          }\n        }\n      });\n    },\n    generateMarketGraphData: function generateMarketGraphData(state, action) {// datePriceDataEntityAdapter.removeAll(state.marketGraphData);\n    }\n  },\n  extraReducers: function extraReducers(builder) {\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].fulfilled, function (state, action) {\n      state.rawYahooFinanceData.loading = false;\n      state.rawYahooFinanceData.errorMessage = '';\n      _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].upsertOne(state.rawYahooFinanceData, action.payload[0]);\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].pending, function (state) {\n      state.rawYahooFinanceData.loading = true;\n      state.rawYahooFinanceData.errorMessage = '';\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].rejected, function (state, action) {\n      console.error(action.error);\n      state.rawYahooFinanceData.errorMessage = action.error.message;\n      state.rawYahooFinanceData.loading = false;\n    });\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (marketGraphSlice.reducer);\nvar _marketGraphSlice$act = marketGraphSlice.actions,\n    parseMarketCloseData = _marketGraphSlice$act.parseMarketCloseData,\n    changeInitialDate = _marketGraphSlice$act.changeInitialDate,\n    changeFinalDate = _marketGraphSlice$act.changeFinalDate,\n    changeInitialFund = _marketGraphSlice$act.changeInitialFund,\n    changeTicker = _marketGraphSlice$act.changeTicker,\n    addGraphDisplayOption = _marketGraphSlice$act.addGraphDisplayOption,\n    updateGraphDisplayOption = _marketGraphSlice$act.updateGraphDisplayOption,\n    addAllioAllocationAsset = _marketGraphSlice$act.addAllioAllocationAsset,\n    updateAllioAllocationProportion = _marketGraphSlice$act.updateAllioAllocationProportion,\n    generateMarketGraphData = _marketGraphSlice$act.generateMarketGraphData;\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2ZlYXR1cmVzL21hcmtldEdyYXBoL21hcmtldEdyYXBoU2xpY2UudHM/NGEzNiJdLCJuYW1lcyI6WyJyYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlciIsImdldEluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJlcnJvck1lc3NhZ2UiLCJtYXJrZXRHcmFwaFNsaWNlIiwiY3JlYXRlU2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlRGF0YSIsInBhcnNlZE1hcmtldENsb3NlRGF0YSIsImFzc2V0RGF0YUVudGl0eUFkYXB0ZXIiLCJpbml0aWFsRnVuZCIsImluaXRpYWxEYXRlIiwiZmluYWxEYXRlIiwidGlja2VyIiwiZ3JhcGhEaXNwbGF5T3B0aW9ucyIsImFkZE9uZSIsImFzc2V0VHlwZSIsImRhdGEiLCJzaG93IiwiY29sb3IiLCJhbGxpb0FsbG9jYXRpb24iLCJtYXJrZXRHcmFwaERhdGEiLCJkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlciIsInJlZHVjZXJzIiwicGFyc2VNYXJrZXRDbG9zZURhdGEiLCJzdGF0ZSIsImFjdGlvbiIsImNoYXJ0RGF0YSIsInBheWxvYWQiLCJtZXRhIiwic3ltYm9sIiwidGltZXN0YW1wIiwiaW5kaWNhdG9ycyIsImRhdGVQcmljZURhdGEiLCJyZWR1Y2UiLCJ0cyIsImluZCIsImxlbmd0aCIsImRhdGUiLCJ0aW1lc3RhbXBUb0RhdGUiLCJkYXRlU3RyaW5nIiwiYXBwcm94aW1hdGVVVENEYXRlU3RyaW5nIiwicHJpY2UiLCJxdW90ZSIsImNsb3NlIiwiRGVjaW1hbCIsInVwc2VydE9uZSIsImlkIiwiY2hhbmdlVGlja2VyIiwiY2hhbmdlSW5pdGlhbEZ1bmQiLCJjaGFuZ2VJbml0aWFsRGF0ZSIsImNoYW5nZUZpbmFsRGF0ZSIsImFkZEdyYXBoRGlzcGxheU9wdGlvbiIsInVwZGF0ZUdyYXBoRGlzcGxheU9wdGlvbiIsInVwZGF0ZU9uZSIsImNoYW5nZXMiLCJhZGRBbGxpb0FsbG9jYXRpb25Bc3NldCIsIm51bWVyYXRvciIsImRlbm9taW5hdG9yIiwicHJvcG9ydGlvbiIsImlkcyIsImZvckVhY2giLCJ0b3RhbE51bWJlciIsInRvU3RyaW5nIiwiZGl2aWRlZEJ5IiwidXBkYXRlQWxsaW9BbGxvY2F0aW9uUHJvcG9ydGlvbiIsImdlbmVyYXRlTWFya2V0R3JhcGhEYXRhIiwiZXh0cmFSZWR1Y2VycyIsImJ1aWxkZXIiLCJhZGRDYXNlIiwiZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuayIsImZ1bGZpbGxlZCIsInBlbmRpbmciLCJyZWplY3RlZCIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJyZWR1Y2VyIiwiYWN0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLCtCQUErQixHQUFHQyw4RUFBcUMsQ0FBQ0MsZUFBdEMsQ0FDdEM7QUFBRUMsU0FBTyxFQUFFLEtBQVg7QUFBa0JDLGNBQVksRUFBRTtBQUFoQyxDQURzQyxDQUF4QztBQW9DQSxJQUFNQyxnQkFBZ0IsR0FBR0Msb0VBQVcsQ0FBQztBQUNuQ0MsTUFBSSxFQUFFLGFBRDZCO0FBRW5DQyxjQUFZLEVBQUU7QUFDWkMsdUJBQW1CLEVBQUVULCtCQURUO0FBRVpVLHlCQUFxQixFQUFFQywrREFBc0IsQ0FBQ1QsZUFBdkIsRUFGWDtBQUdaVSxlQUFXLEVBQUUsR0FIRDtBQUlaQyxlQUFXLEVBQUUsWUFKRDtBQUtaQyxhQUFTLEVBQUUsWUFMQztBQU1aQyxVQUFNLEVBQUUsRUFOSTtBQU9aQyx1QkFBbUIsRUFBRUwsK0RBQXNCLENBQUNNLE1BQXZCLENBQ25CTiwr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dUIseUJBQUFBLHVCIiwiZmlsZSI6Ii4vc3JjL2ZlYXR1cmVzL21hcmtldEdyYXBoL21hcmtldEdyYXBoU2xpY2UudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTbGljZSwgRW50aXR5U3RhdGUsIFBheWxvYWRBY3Rpb24gfSBmcm9tICdAcmVkdXhqcy90b29sa2l0JztcbmltcG9ydCB7IERlY2ltYWwgfSBmcm9tICdkZWNpbWFsLmpzJztcbmltcG9ydCB7IGFwcHJveGltYXRlVVRDRGF0ZVN0cmluZywgdGltZXN0YW1wVG9EYXRlIH0gZnJvbSAnZmVhdHVyZXMvZGF0ZS91dGlsJztcbmltcG9ydCB7IFlhaG9vRmluYW5jZUNoYXJ0RGF0YSB9IGZyb20gJ2ZlYXR1cmVzL21hcmtldEhpc3RvcnlRdWVyeS95YWhvb0ZpbmFuY2VNYXJrZXRBcGknO1xuaW1wb3J0IGRhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyLCB7XG4gIERhdGVQcmljZURhdHVtLFxufSBmcm9tICcuL2RhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyJztcbmltcG9ydCBmZXRjaE1hcmtldERhdGFCeVRpY2tlclRodW5rIGZyb20gJy4vZmV0Y2hNYXJrZXREYXRhQnlUaWNrZXJUaHVuayc7XG5pbXBvcnQgcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlciBmcm9tICcuL3Jhd1lhaG9vRmluYW5jZUNoYXJ0RGF0YUVudGl0eUFkYXB0ZXInO1xuaW1wb3J0IGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIgZnJvbSAnLi9hc3NldERhdGFFbnRpdHlBZGFwdGVyJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmNvbnN0IHJhd1lhaG9vRmluYW5jZURhdGFJbml0aWFsU3RhdGUgPSByYXdZYWhvb0ZpbmFuY2VDaGFydERhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZShcbiAgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3JNZXNzYWdlOiAnJyB9XG4pO1xuXG5pbnRlcmZhY2UgTWFya2V0R3JhcGhTdGF0ZSB7XG4gIHRpY2tlcjogc3RyaW5nO1xuICBpbml0aWFsRnVuZDogbnVtYmVyO1xuICBpbml0aWFsRGF0ZTogc3RyaW5nO1xuICBmaW5hbERhdGU6IHN0cmluZztcbiAgcmF3WWFob29GaW5hbmNlRGF0YTogdHlwZW9mIHJhd1lhaG9vRmluYW5jZURhdGFJbml0aWFsU3RhdGU7XG4gIHBhcnNlZE1hcmtldENsb3NlRGF0YTogRW50aXR5U3RhdGU8e1xuICAgIGFzc2V0VHlwZTogc3RyaW5nO1xuICAgIGRhdGE6IEVudGl0eVN0YXRlPERhdGVQcmljZURhdHVtPjtcbiAgfT47XG4gIG1hcmtldEdyYXBoRGF0YTogRW50aXR5U3RhdGU8RGF0ZVByaWNlRGF0dW0+O1xuICBncmFwaERpc3BsYXlPcHRpb25zOiBFbnRpdHlTdGF0ZTx7XG4gICAgYXNzZXRUeXBlOiBzdHJpbmc7XG4gICAgZGF0YToge1xuICAgICAgc2hvdzogYm9vbGVhbjtcbiAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgfTtcbiAgfT47XG4gIGFsbGlvQWxsb2NhdGlvbjogRW50aXR5U3RhdGU8e1xuICAgIGFzc2V0VHlwZTogc3RyaW5nO1xuICAgIGRhdGE6IHtcbiAgICAgIG51bWVyYXRvcjogc3RyaW5nIHwgdm9pZDtcbiAgICAgIGRlbm9taW5hdG9yOiBzdHJpbmcgfCB2b2lkO1xuICAgICAgcHJvcG9ydGlvbjogRGVjaW1hbDtcbiAgICB9O1xuICB9Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxNYXJrZXRHcmFwaFN0YXRlIHtcbiAgbWFya2V0R3JhcGg6IE1hcmtldEdyYXBoU3RhdGU7XG59XG5cbmNvbnN0IG1hcmtldEdyYXBoU2xpY2UgPSBjcmVhdGVTbGljZSh7XG4gIG5hbWU6ICdtYXJrZXRHcmFwaCcsXG4gIGluaXRpYWxTdGF0ZToge1xuICAgIHJhd1lhaG9vRmluYW5jZURhdGE6IHJhd1lhaG9vRmluYW5jZURhdGFJbml0aWFsU3RhdGUsXG4gICAgcGFyc2VkTWFya2V0Q2xvc2VEYXRhOiBhc3NldERhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZSgpLFxuICAgIGluaXRpYWxGdW5kOiAxMDAsXG4gICAgaW5pdGlhbERhdGU6ICcyMDEwLTAxLTAxJyxcbiAgICBmaW5hbERhdGU6ICcyMDIwLTEyLTAxJyxcbiAgICB0aWNrZXI6ICcnLFxuICAgIGdyYXBoRGlzcGxheU9wdGlvbnM6IGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIuYWRkT25lKFxuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci5nZXRJbml0aWFsU3RhdGUoKSxcbiAgICAgIHtcbiAgICAgICAgYXNzZXRUeXBlOiAnQWxsaW8nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgY29sb3I6ICduYXZ5JyxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApLFxuICAgIGFsbGlvQWxsb2NhdGlvbjogYXNzZXREYXRhRW50aXR5QWRhcHRlci5nZXRJbml0aWFsU3RhdGUoKSxcbiAgICBtYXJrZXRHcmFwaERhdGE6IGRhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZSgpLFxuICB9IGFzIE1hcmtldEdyYXBoU3RhdGUsXG4gIHJlZHVjZXJzOiB7XG4gICAgcGFyc2VNYXJrZXRDbG9zZURhdGEoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxZYWhvb0ZpbmFuY2VDaGFydERhdGE+KSB7XG4gICAgICBjb25zdCBjaGFydERhdGEgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGNvbnN0IHRpY2tlciA9IGNoYXJ0RGF0YS5tZXRhLnN5bWJvbDtcbiAgICAgIGNvbnN0IHsgdGltZXN0YW1wLCBpbmRpY2F0b3JzIH0gPSBjaGFydERhdGE7XG4gICAgICBpZiAoIXRpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVQcmljZURhdGEgPSB0aW1lc3RhbXAucmVkdWNlPEVudGl0eVN0YXRlPERhdGVQcmljZURhdHVtPj4oXG4gICAgICAgIChkYXRhLCB0cywgaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGluZCA+PSB0aW1lc3RhbXAubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aW1lc3RhbXBUb0RhdGUodHMpO1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBhcHByb3hpbWF0ZVVUQ0RhdGVTdHJpbmcoZGF0ZSk7XG4gICAgICAgICAgY29uc3QgcHJpY2UgPVxuICAgICAgICAgICAgaW5kaWNhdG9ycy5xdW90ZVswXS5jbG9zZVtpbmRdICYmXG4gICAgICAgICAgICBuZXcgRGVjaW1hbChpbmRpY2F0b3JzLnF1b3RlWzBdLmNsb3NlW2luZF0pO1xuICAgICAgICAgIHJldHVybiBkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoZGF0YSwge1xuICAgICAgICAgICAgYXNzZXRUeXBlOiB0aWNrZXIsXG4gICAgICAgICAgICBpZDogZGF0ZVN0cmluZyxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBwcmljZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKClcbiAgICAgICk7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwc2VydE9uZShzdGF0ZS5wYXJzZWRNYXJrZXRDbG9zZURhdGEsIHtcbiAgICAgICAgYXNzZXRUeXBlOiB0aWNrZXIsXG4gICAgICAgIGRhdGE6IGRhdGVQcmljZURhdGEsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNoYW5nZVRpY2tlcihzdGF0ZSwgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHN0cmluZz4pIHtcbiAgICAgIHN0YXRlLnRpY2tlciA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgY2hhbmdlSW5pdGlhbEZ1bmQoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxudW1iZXI+KSB7XG4gICAgICBzdGF0ZS5pbml0aWFsRnVuZCA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgY2hhbmdlSW5pdGlhbERhdGUoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxzdHJpbmc+KSB7XG4gICAgICBzdGF0ZS5pbml0aWFsRGF0ZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIH0sXG4gICAgY2hhbmdlRmluYWxEYXRlKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgc3RhdGUuZmluYWxEYXRlID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgfSxcbiAgICBhZGRHcmFwaERpc3BsYXlPcHRpb24oc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxzdHJpbmc+KSB7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwc2VydE9uZShzdGF0ZS5ncmFwaERpc3BsYXlPcHRpb25zLCB7XG4gICAgICAgIGFzc2V0VHlwZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVHcmFwaERpc3BsYXlPcHRpb24oXG4gICAgICBzdGF0ZSxcbiAgICAgIGFjdGlvbjogUGF5bG9hZEFjdGlvbjx7IGFzc2V0VHlwZTogc3RyaW5nOyBzaG93OiBib29sZWFuOyBjb2xvcjogc3RyaW5nIH0+XG4gICAgKSB7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwZGF0ZU9uZShzdGF0ZS5ncmFwaERpc3BsYXlPcHRpb25zLCB7XG4gICAgICAgIGlkOiBhY3Rpb24ucGF5bG9hZC5hc3NldFR5cGUsXG4gICAgICAgIGNoYW5nZXM6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzaG93OiBhY3Rpb24ucGF5bG9hZC5zaG93LFxuICAgICAgICAgICAgY29sb3I6IGFjdGlvbi5wYXlsb2FkLmNvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFkZEFsbGlvQWxsb2NhdGlvbkFzc2V0KHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoc3RhdGUuYWxsaW9BbGxvY2F0aW9uLCB7XG4gICAgICAgIGFzc2V0VHlwZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBudW1lcmF0b3I6ICcwJyxcbiAgICAgICAgICBkZW5vbWluYXRvcjogJzEnLFxuICAgICAgICAgIHByb3BvcnRpb246IG5ldyBEZWNpbWFsKDApLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBzdGF0ZS5hbGxpb0FsbG9jYXRpb24uaWRzLmZvckVhY2goKGFzc2V0VHlwZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvdGFsTnVtYmVyID0gc3RhdGUuYWxsaW9BbGxvY2F0aW9uLmlkcy5sZW5ndGg7XG4gICAgICAgIGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIudXBkYXRlT25lKHN0YXRlLmFsbGlvQWxsb2NhdGlvbiwge1xuICAgICAgICAgIGlkOiBhc3NldFR5cGUsXG4gICAgICAgICAgY2hhbmdlczoge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBudW1lcmF0b3I6ICcxJyxcbiAgICAgICAgICAgICAgZGVub21pbmF0b3I6IHRvdGFsTnVtYmVyLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHByb3BvcnRpb246IG5ldyBEZWNpbWFsKDEpLmRpdmlkZWRCeSh0b3RhbE51bWJlciksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVBbGxpb0FsbG9jYXRpb25Qcm9wb3J0aW9uKFxuICAgICAgc3RhdGUsXG4gICAgICBhY3Rpb246IFBheWxvYWRBY3Rpb248e1xuICAgICAgICBhc3NldFR5cGU6IHN0cmluZztcbiAgICAgICAgbnVtZXJhdG9yOiBzdHJpbmcgfCB2b2lkO1xuICAgICAgICBkZW5vbWluYXRvcjogc3RyaW5nIHwgdm9pZDtcbiAgICAgIH0+XG4gICAgKSB7XG4gICAgICBjb25zdCBudW1lcmF0b3IgPSBhY3Rpb24ucGF5bG9hZC5udW1lcmF0b3IgfHwgJzAnO1xuICAgICAgY29uc3QgZGVub21pbmF0b3IgPSBhY3Rpb24ucGF5bG9hZC5kZW5vbWluYXRvciB8fCAnMSc7XG4gICAgICBhc3NldERhdGFFbnRpdHlBZGFwdGVyLnVwZGF0ZU9uZShzdGF0ZS5hbGxpb0FsbG9jYXRpb24sIHtcbiAgICAgICAgaWQ6IGFjdGlvbi5wYXlsb2FkLmFzc2V0VHlwZSxcbiAgICAgICAgY2hhbmdlczoge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG51bWVyYXRvcixcbiAgICAgICAgICAgIGRlbm9taW5hdG9yLFxuICAgICAgICAgICAgcHJvcG9ydGlvbjogbmV3IERlY2ltYWwobnVtZXJhdG9yKS5kaXZpZGVkQnkoZGVub21pbmF0b3IpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdlbmVyYXRlTWFya2V0R3JhcGhEYXRhKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgIC8vIGRhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyLnJlbW92ZUFsbChzdGF0ZS5tYXJrZXRHcmFwaERhdGEpO1xuICAgIH0sXG4gIH0sXG4gIGV4dHJhUmVkdWNlcnM6IChidWlsZGVyKSA9PiB7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoXG4gICAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEsXG4gICAgICAgIGFjdGlvbi5wYXlsb2FkWzBdXG4gICAgICApO1xuICAgIH0pO1xuICAgIGJ1aWxkZXIuYWRkQ2FzZShmZXRjaE1hcmtldERhdGFCeVRpY2tlclRodW5rLnBlbmRpbmcsIChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgfSk7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGFjdGlvbi5lcnJvcik7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmVycm9yTWVzc2FnZSA9IGFjdGlvbi5lcnJvci5tZXNzYWdlO1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbWFya2V0R3JhcGhTbGljZS5yZWR1Y2VyO1xuZXhwb3J0IGNvbnN0IHtcbiAgcGFyc2VNYXJrZXRDbG9zZURhdGEsXG4gIGNoYW5nZUluaXRpYWxEYXRlLFxuICBjaGFuZ2VGaW5hbERhdGUsXG4gIGNoYW5nZUluaXRpYWxGdW5kLFxuICBjaGFuZ2VUaWNrZXIsXG4gIGFkZEdyYXBoRGlzcGxheU9wdGlvbixcbiAgdXBkYXRlR3JhcGhEaXNwbGF5T3B0aW9uLFxuICBhZGRBbGxpb0FsbG9jYXRpb25Bc3NldCxcbiAgdXBkYXRlQWxsaW9BbGxvY2F0aW9uUHJvcG9ydGlvbixcbiAgZ2VuZXJhdGVNYXJrZXRHcmFwaERhdGEsXG59ID0gbWFya2V0R3JhcGhTbGljZS5hY3Rpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/features/marketGraph/marketGraphSlice.ts\n");

/***/ })

})