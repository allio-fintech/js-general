webpackHotUpdate_N_E("pages/market-graph",{

/***/ "./src/features/marketGraph/marketGraphSlice.ts":
/*!******************************************************!*\
  !*** ./src/features/marketGraph/marketGraphSlice.ts ***!
  \******************************************************/
/*! exports provided: default, parseMarketCloseData, changeInitialDate, changeInitialFund, changeTicker, addGraphDisplayOption, updateGraphDisplayOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseMarketCloseData\", function() { return parseMarketCloseData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialDate\", function() { return changeInitialDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInitialFund\", function() { return changeInitialFund; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeTicker\", function() { return changeTicker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addGraphDisplayOption\", function() { return addGraphDisplayOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGraphDisplayOption\", function() { return updateGraphDisplayOption; });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! decimal.js */ \"./node_modules/decimal.js/decimal.js\");\n/* harmony import */ var decimal_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(decimal_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var features_date_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! features/date/util */ \"./src/features/date/util.ts\");\n/* harmony import */ var _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datePriceDataEntityAdapter */ \"./src/features/marketGraph/datePriceDataEntityAdapter.ts\");\n/* harmony import */ var _fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fetchMarketDataByTickerThunk */ \"./src/features/marketGraph/fetchMarketDataByTickerThunk.ts\");\n/* harmony import */ var _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rawYahooFinanceChartDataEntityAdapter */ \"./src/features/marketGraph/rawYahooFinanceChartDataEntityAdapter.ts\");\n/* harmony import */ var _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assetDataEntityAdapter */ \"./src/features/marketGraph/assetDataEntityAdapter.ts\");\n\n\n\n\n\n\n\n/* eslint-disable no-param-reassign */\n\nvar rawYahooFinanceDataInitialState = _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInitialState({\n  loading: false,\n  errorMessage: ''\n});\nvar marketGraphSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__[\"createSlice\"])({\n  name: 'marketGraph',\n  initialState: {\n    rawYahooFinanceData: rawYahooFinanceDataInitialState,\n    parsedMarketCloseData: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(),\n    initialFund: 100,\n    initialDate: '2010-01-01',\n    ticker: '',\n    graphDisplayOptions: _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].addOne(_assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].getInitialState(), {\n      assetType: 'Allio',\n      data: {\n        show: false,\n        color: 'navy'\n      }\n    })\n  },\n  reducers: {\n    parseMarketCloseData: function parseMarketCloseData(state, action) {\n      var chartData = action.payload;\n      var ticker = chartData.meta.symbol;\n      var timestamp = chartData.timestamp,\n          indicators = chartData.indicators;\n\n      if (!timestamp) {\n        return;\n      }\n\n      var datePriceData = timestamp.reduce(function (data, ts, ind) {\n        if (ind >= timestamp.length - 1) {\n          return data;\n        }\n\n        var date = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"timestampToDate\"])(ts);\n        var dateString = Object(features_date_util__WEBPACK_IMPORTED_MODULE_2__[\"approximateUTCDateString\"])(date);\n        var price = indicators.quote[0].close[ind] && new decimal_js__WEBPACK_IMPORTED_MODULE_1__[\"Decimal\"](indicators.quote[0].close[ind]);\n        return _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].upsertOne(data, {\n          assetType: ticker,\n          id: dateString,\n          date: date,\n          price: price\n        });\n      }, _datePriceDataEntityAdapter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInitialState());\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.parsedMarketCloseData, {\n        assetType: ticker,\n        data: datePriceData\n      });\n    },\n    changeTicker: function changeTicker(state, action) {\n      state.ticker = action.payload;\n    },\n    changeInitialFund: function changeInitialFund(state, action) {\n      state.initialFund = action.payload;\n    },\n    changeInitialDate: function changeInitialDate(state, action) {\n      state.initialDate = action.payload;\n    },\n    addGraphDisplayOption: function addGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.graphDisplayOptions, {\n        assetType: action.payload,\n        data: {\n          show: true,\n          color: 'black'\n        }\n      });\n    },\n    updateGraphDisplayOption: function updateGraphDisplayOption(state, action) {\n      _assetDataEntityAdapter__WEBPACK_IMPORTED_MODULE_6__[\"default\"].upsertOne(state.graphDisplayOptions, {\n        assetType: action.payload.assetType,\n        data: {\n          show: action.payload.show,\n          color: action.payload.color\n        }\n      });\n    }\n  },\n  extraReducers: function extraReducers(builder) {\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].fulfilled, function (state, action) {\n      state.rawYahooFinanceData.loading = false;\n      state.rawYahooFinanceData.errorMessage = '';\n      _rawYahooFinanceChartDataEntityAdapter__WEBPACK_IMPORTED_MODULE_5__[\"default\"].upsertOne(state.rawYahooFinanceData, action.payload[0]);\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].pending, function (state) {\n      state.rawYahooFinanceData.loading = true;\n      state.rawYahooFinanceData.errorMessage = '';\n    });\n    builder.addCase(_fetchMarketDataByTickerThunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"].rejected, function (state, action) {\n      console.error(action.error);\n      state.rawYahooFinanceData.errorMessage = action.error.message;\n      state.rawYahooFinanceData.loading = false;\n    });\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (marketGraphSlice.reducer);\nvar _marketGraphSlice$act = marketGraphSlice.actions,\n    parseMarketCloseData = _marketGraphSlice$act.parseMarketCloseData,\n    changeInitialDate = _marketGraphSlice$act.changeInitialDate,\n    changeInitialFund = _marketGraphSlice$act.changeInitialFund,\n    changeTicker = _marketGraphSlice$act.changeTicker,\n    addGraphDisplayOption = _marketGraphSlice$act.addGraphDisplayOption,\n    updateGraphDisplayOption = _marketGraphSlice$act.updateGraphDisplayOption;\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2ZlYXR1cmVzL21hcmtldEdyYXBoL21hcmtldEdyYXBoU2xpY2UudHM/NGEzNiJdLCJuYW1lcyI6WyJyYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlciIsImdldEluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJlcnJvck1lc3NhZ2UiLCJtYXJrZXRHcmFwaFNsaWNlIiwiY3JlYXRlU2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmF3WWFob29GaW5hbmNlRGF0YSIsInBhcnNlZE1hcmtldENsb3NlRGF0YSIsImFzc2V0RGF0YUVudGl0eUFkYXB0ZXIiLCJpbml0aWFsRnVuZCIsImluaXRpYWxEYXRlIiwidGlja2VyIiwiZ3JhcGhEaXNwbGF5T3B0aW9ucyIsImFkZE9uZSIsImFzc2V0VHlwZSIsImRhdGEiLCJzaG93IiwiY29sb3IiLCJyZWR1Y2VycyIsInBhcnNlTWFya2V0Q2xvc2VEYXRhIiwic3RhdGUiLCJhY3Rpb24iLCJjaGFydERhdGEiLCJwYXlsb2FkIiwibWV0YSIsInN5bWJvbCIsInRpbWVzdGFtcCIsImluZGljYXRvcnMiLCJkYXRlUHJpY2VEYXRhIiwicmVkdWNlIiwidHMiLCJpbmQiLCJsZW5ndGgiLCJkYXRlIiwidGltZXN0YW1wVG9EYXRlIiwiZGF0ZVN0cmluZyIsImFwcHJveGltYXRlVVRDRGF0ZVN0cmluZyIsInByaWNlIiwicXVvdGUiLCJjbG9zZSIsIkRlY2ltYWwiLCJkYXRlUHJpY2VEYXRhRW50aXR5QWRhcHRlciIsInVwc2VydE9uZSIsImlkIiwiY2hhbmdlVGlja2VyIiwiY2hhbmdlSW5pdGlhbEZ1bmQiLCJjaGFuZ2VJbml0aWFsRGF0ZSIsImFkZEdyYXBoRGlzcGxheU9wdGlvbiIsInVwZGF0ZUdyYXBoRGlzcGxheU9wdGlvbiIsImV4dHJhUmVkdWNlcnMiLCJidWlsZGVyIiwiYWRkQ2FzZSIsImZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsiLCJmdWxmaWxsZWQiLCJwZW5kaW5nIiwicmVqZWN0ZWQiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwicmVkdWNlciIsImFjdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsK0JBQStCLEdBQUdDLDhFQUFxQyxDQUFDQyxlQUF0QyxDQUN0QztBQUFFQyxTQUFPLEVBQUUsS0FBWDtBQUFrQkMsY0FBWSxFQUFFO0FBQWhDLENBRHNDLENBQXhDO0FBMEJBLElBQU1DLGdCQUFnQixHQUFHQyxvRUFBVyxDQUFDO0FBQ25DQyxNQUFJLEVBQUUsYUFENkI7QUFFbkNDLGNBQVksRUFBRTtBQUNaQyx1QkFBbUIsRUFBRVQsK0JBRFQ7QUFFWlUseUJBQXFCLEVBQUVDLCtEQUFzQixDQUFDVCxlQUF2QixFQUZYO0FBR1pVLGVBQVcsRUFBRSxHQUhEO0FBSVpDLGVBQVcsRUFBRSxZQUpEO0FBS1pDLFVBQU0sRUFBRSxFQUxJO0FBTVpDLHVCQUFtQixFQUFFSiwrREFBc0IsQ0FBQ0ssTUFBdkIsQ0FDbkJMLCtEQUFzQixDQUFDVCxlQUF2QixFQURtQixFQUVuQjtBQUNFZSxlQUFTLEVBQUUsT0FEYjtBQUVFQyxVQUFJLEVBQUU7QUFDSkMsWUFBSSxFQUFFLEtBREY7QUFFSkMsYUFBSyxFQUFFO0FBRkg7QUFGUixLQUZtQjtBQU5ULEdBRnFCO0FBbUJuQ0MsVUFBUSxFQUFFO0FBQ1JDLHdCQURRLGdDQUNhQyxLQURiLEVBQ29CQyxNQURwQixFQUNrRTtBQUN4RSxVQUFNQyxTQUFTLEdBQUdELE1BQU0sQ0FBQ0UsT0FBekI7QUFDQSxVQUFNWixNQUFNLEdBQUdXLFNBQVMsQ0FBQ0UsSUFBVixDQUFlQyxNQUE5QjtBQUZ3RSxVQUdoRUMsU0FIZ0UsR0FHdENK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R3JhcGhTbGljZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlLCBFbnRpdHlTdGF0ZSwgUGF5bG9hZEFjdGlvbiB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xuaW1wb3J0IHsgRGVjaW1hbCB9IGZyb20gJ2RlY2ltYWwuanMnO1xuaW1wb3J0IHsgYXBwcm94aW1hdGVVVENEYXRlU3RyaW5nLCB0aW1lc3RhbXBUb0RhdGUgfSBmcm9tICdmZWF0dXJlcy9kYXRlL3V0aWwnO1xuaW1wb3J0IHsgWWFob29GaW5hbmNlQ2hhcnREYXRhIH0gZnJvbSAnZmVhdHVyZXMvbWFya2V0SGlzdG9yeVF1ZXJ5L3lhaG9vRmluYW5jZU1hcmtldEFwaSc7XG5pbXBvcnQgZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXIsIHtcbiAgRGF0ZVByaWNlRGF0dW0sXG59IGZyb20gJy4vZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXInO1xuaW1wb3J0IGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsgZnJvbSAnLi9mZXRjaE1hcmtldERhdGFCeVRpY2tlclRodW5rJztcbmltcG9ydCByYXdZYWhvb0ZpbmFuY2VDaGFydERhdGFFbnRpdHlBZGFwdGVyIGZyb20gJy4vcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlcic7XG5pbXBvcnQgYXNzZXREYXRhRW50aXR5QWRhcHRlciBmcm9tICcuL2Fzc2V0RGF0YUVudGl0eUFkYXB0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuY29uc3QgcmF3WWFob29GaW5hbmNlRGF0YUluaXRpYWxTdGF0ZSA9IHJhd1lhaG9vRmluYW5jZUNoYXJ0RGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKFxuICB7IGxvYWRpbmc6IGZhbHNlLCBlcnJvck1lc3NhZ2U6ICcnIH1cbik7XG5cbmludGVyZmFjZSBNYXJrZXRHcmFwaFN0YXRlIHtcbiAgdGlja2VyOiBzdHJpbmc7XG4gIGluaXRpYWxGdW5kOiBudW1iZXI7XG4gIGluaXRpYWxEYXRlOiBzdHJpbmc7XG4gIHJhd1lhaG9vRmluYW5jZURhdGE6IHR5cGVvZiByYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlO1xuICBwYXJzZWRNYXJrZXRDbG9zZURhdGE6IEVudGl0eVN0YXRlPHtcbiAgICBhc3NldFR5cGU6IHN0cmluZztcbiAgICBkYXRhOiBFbnRpdHlTdGF0ZTxEYXRlUHJpY2VEYXR1bT47XG4gIH0+O1xuICBncmFwaERpc3BsYXlPcHRpb25zOiBFbnRpdHlTdGF0ZTx7XG4gICAgYXNzZXRUeXBlOiBzdHJpbmc7XG4gICAgZGF0YToge1xuICAgICAgc2hvdzogYm9vbGVhbjtcbiAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgfTtcbiAgfT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYmFsTWFya2V0R3JhcGhTdGF0ZSB7XG4gIG1hcmtldEdyYXBoOiBNYXJrZXRHcmFwaFN0YXRlO1xufVxuXG5jb25zdCBtYXJrZXRHcmFwaFNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiAnbWFya2V0R3JhcGgnLFxuICBpbml0aWFsU3RhdGU6IHtcbiAgICByYXdZYWhvb0ZpbmFuY2VEYXRhOiByYXdZYWhvb0ZpbmFuY2VEYXRhSW5pdGlhbFN0YXRlLFxuICAgIHBhcnNlZE1hcmtldENsb3NlRGF0YTogYXNzZXREYXRhRW50aXR5QWRhcHRlci5nZXRJbml0aWFsU3RhdGUoKSxcbiAgICBpbml0aWFsRnVuZDogMTAwLFxuICAgIGluaXRpYWxEYXRlOiAnMjAxMC0wMS0wMScsXG4gICAgdGlja2VyOiAnJyxcbiAgICBncmFwaERpc3BsYXlPcHRpb25zOiBhc3NldERhdGFFbnRpdHlBZGFwdGVyLmFkZE9uZShcbiAgICAgIGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIuZ2V0SW5pdGlhbFN0YXRlKCksXG4gICAgICB7XG4gICAgICAgIGFzc2V0VHlwZTogJ0FsbGlvJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgIGNvbG9yOiAnbmF2eScsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKSxcbiAgfSBhcyBNYXJrZXRHcmFwaFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIHBhcnNlTWFya2V0Q2xvc2VEYXRhKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248WWFob29GaW5hbmNlQ2hhcnREYXRhPikge1xuICAgICAgY29uc3QgY2hhcnREYXRhID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBjb25zdCB0aWNrZXIgPSBjaGFydERhdGEubWV0YS5zeW1ib2w7XG4gICAgICBjb25zdCB7IHRpbWVzdGFtcCwgaW5kaWNhdG9ycyB9ID0gY2hhcnREYXRhO1xuICAgICAgaWYgKCF0aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRlUHJpY2VEYXRhID0gdGltZXN0YW1wLnJlZHVjZTxFbnRpdHlTdGF0ZTxEYXRlUHJpY2VEYXR1bT4+KFxuICAgICAgICAoZGF0YSwgdHMsIGluZCkgPT4ge1xuICAgICAgICAgIGlmIChpbmQgPj0gdGltZXN0YW1wLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkYXRlID0gdGltZXN0YW1wVG9EYXRlKHRzKTtcbiAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYXBwcm94aW1hdGVVVENEYXRlU3RyaW5nKGRhdGUpO1xuICAgICAgICAgIGNvbnN0IHByaWNlID1cbiAgICAgICAgICAgIGluZGljYXRvcnMucXVvdGVbMF0uY2xvc2VbaW5kXSAmJlxuICAgICAgICAgICAgbmV3IERlY2ltYWwoaW5kaWNhdG9ycy5xdW90ZVswXS5jbG9zZVtpbmRdKTtcbiAgICAgICAgICByZXR1cm4gZGF0ZVByaWNlRGF0YUVudGl0eUFkYXB0ZXIudXBzZXJ0T25lKGRhdGEsIHtcbiAgICAgICAgICAgIGFzc2V0VHlwZTogdGlja2VyLFxuICAgICAgICAgICAgaWQ6IGRhdGVTdHJpbmcsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgcHJpY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGVQcmljZURhdGFFbnRpdHlBZGFwdGVyLmdldEluaXRpYWxTdGF0ZSgpXG4gICAgICApO1xuICAgICAgYXNzZXREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoc3RhdGUucGFyc2VkTWFya2V0Q2xvc2VEYXRhLCB7XG4gICAgICAgIGFzc2V0VHlwZTogdGlja2VyLFxuICAgICAgICBkYXRhOiBkYXRlUHJpY2VEYXRhLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGFuZ2VUaWNrZXIoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxzdHJpbmc+KSB7XG4gICAgICBzdGF0ZS50aWNrZXIgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICAgIGNoYW5nZUluaXRpYWxGdW5kKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248bnVtYmVyPikge1xuICAgICAgc3RhdGUuaW5pdGlhbEZ1bmQgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICAgIGNoYW5nZUluaXRpYWxEYXRlKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248c3RyaW5nPikge1xuICAgICAgc3RhdGUuaW5pdGlhbERhdGUgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICAgIGFkZEdyYXBoRGlzcGxheU9wdGlvbihzdGF0ZSwgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHN0cmluZz4pIHtcbiAgICAgIGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIudXBzZXJ0T25lKHN0YXRlLmdyYXBoRGlzcGxheU9wdGlvbnMsIHtcbiAgICAgICAgYXNzZXRUeXBlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUdyYXBoRGlzcGxheU9wdGlvbihcbiAgICAgIHN0YXRlLFxuICAgICAgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHsgYXNzZXRUeXBlOiBzdHJpbmc7IHNob3c6IGJvb2xlYW47IGNvbG9yOiBzdHJpbmcgfT5cbiAgICApIHtcbiAgICAgIGFzc2V0RGF0YUVudGl0eUFkYXB0ZXIudXBzZXJ0T25lKHN0YXRlLmdyYXBoRGlzcGxheU9wdGlvbnMsIHtcbiAgICAgICAgYXNzZXRUeXBlOiBhY3Rpb24ucGF5bG9hZC5hc3NldFR5cGUsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzaG93OiBhY3Rpb24ucGF5bG9hZC5zaG93LFxuICAgICAgICAgIGNvbG9yOiBhY3Rpb24ucGF5bG9hZC5jb2xvcixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGV4dHJhUmVkdWNlcnM6IChidWlsZGVyKSA9PiB7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgICAgcmF3WWFob29GaW5hbmNlQ2hhcnREYXRhRW50aXR5QWRhcHRlci51cHNlcnRPbmUoXG4gICAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEsXG4gICAgICAgIGFjdGlvbi5wYXlsb2FkWzBdXG4gICAgICApO1xuICAgIH0pO1xuICAgIGJ1aWxkZXIuYWRkQ2FzZShmZXRjaE1hcmtldERhdGFCeVRpY2tlclRodW5rLnBlbmRpbmcsIChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnJhd1lhaG9vRmluYW5jZURhdGEuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgfSk7XG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoTWFya2V0RGF0YUJ5VGlja2VyVGh1bmsucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGFjdGlvbi5lcnJvcik7XG4gICAgICBzdGF0ZS5yYXdZYWhvb0ZpbmFuY2VEYXRhLmVycm9yTWVzc2FnZSA9IGFjdGlvbi5lcnJvci5tZXNzYWdlO1xuICAgICAgc3RhdGUucmF3WWFob29GaW5hbmNlRGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbWFya2V0R3JhcGhTbGljZS5yZWR1Y2VyO1xuZXhwb3J0IGNvbnN0IHtcbiAgcGFyc2VNYXJrZXRDbG9zZURhdGEsXG4gIGNoYW5nZUluaXRpYWxEYXRlLFxuICBjaGFuZ2VJbml0aWFsRnVuZCxcbiAgY2hhbmdlVGlja2VyLFxuICBhZGRHcmFwaERpc3BsYXlPcHRpb24sXG4gIHVwZGF0ZUdyYXBoRGlzcGxheU9wdGlvbixcbn0gPSBtYXJrZXRHcmFwaFNsaWNlLmFjdGlvbnM7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/features/marketGraph/marketGraphSlice.ts\n");

/***/ })

})