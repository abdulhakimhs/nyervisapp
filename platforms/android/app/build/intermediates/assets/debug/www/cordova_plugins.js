cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "skwas-cordova-plugin-datetimepicker.DateTimePicker",
    "file": "plugins/skwas-cordova-plugin-datetimepicker/www/datetimepicker.js",
    "pluginId": "skwas-cordova-plugin-datetimepicker",
    "clobbers": [
      "cordova.plugins.DateTimePicker"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "skwas-cordova-plugin-datetimepicker": "1.1.3"
};
// BOTTOM OF METADATA
});