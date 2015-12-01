'use strict';

exports.yell = function (msg) {
    return msg.toUpperCase();
};

// This helper returns either:
// 1. An empty string for the home page.
// 2. The 'description' field for the 'artistDetail' page.
// 3. The 'summary' field for the 'artistDetail' page.
exports.artistInfo = function (page) {
  if (page == 'home') {
    return '';
  } else if (page == 'artistDetail'){
    return this.description;
  } else {
    return this.summary;
  }
}
