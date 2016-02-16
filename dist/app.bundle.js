/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _parse = __webpack_require__(2);
	
	var _parse2 = _interopRequireDefault(_parse);
	
	var _commands = __webpack_require__(3);
	
	var _Robot = __webpack_require__(4);
	
	var _Robot2 = _interopRequireDefault(_Robot);
	
	var _Table = __webpack_require__(6);
	
	var _Table2 = _interopRequireDefault(_Table);
	
	__webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var input = document.getElementById('instruction-input');
	var terminal = document.getElementById('terminal');
	var table = new _Table2.default(5);
	terminal.value = 'Table size: 5';
	
	var robot = new _Robot2.default(table);
	
	var display = function display(text) {
	  terminal.value = terminal.value + '\n' + text;
	  terminal.scrollTop = terminal.scrollHeight;
	};
	
	input.addEventListener('keydown', function (e) {
	  if (e.keyCode == 13 && input.value.length > 0) {
	    e.preventDefault();
	
	    if (input.value.toUpperCase() === 'CLS') {
	      terminal.value = null;
	      robot = new _Robot2.default(table);
	    } else {
	      try {
	        display(input.value);
	        var instruction = (0, _parse2.default)(input.value);
	        console.log(instruction, input.value);
	
	        robot.instruct(instruction);
	        if (instruction.command === _commands.COMMAND.REPORT) {
	          display(robot.report());
	        }
	      } catch (err) {
	        display(err.message);
	      }
	    }
	    input.value = null;
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Parse;
	
	var _commands = __webpack_require__(3);
	
	var isInt = function isInt(n) {
	  return Number(n) === n && n % 1 === 0;
	};
	
	/*
	 * Parses the input text
	 * @param {[text]} text the input string to be parsed
	 * @return {[object]} position [{x, y , direction, type}]
	 */
	function Parse(text) {
	  var args = text.split(/[ ,]+/);
	  var command = args[0].toUpperCase();
	
	  if (command === _commands.COMMAND.PLACE) {
	    var x = parseInt(args[1]);
	    var y = parseInt(args[2]);
	    var direction = args[3] ? args[3].toUpperCase() : null;
	
	    if (!isInt(x)) {
	      throw new Error('Invalid {x} position');
	    }
	
	    if (!isInt(y)) {
	      throw new Error('Invalid {x} position');
	    }
	
	    if (_commands.FACING.MAP.get(direction) === undefined) {
	      throw new Error('Invalid direction');
	    }
	
	    return {
	      x: x,
	      y: y,
	      direction: direction,
	      command: command
	    };
	  }
	
	  if (!_commands.COMMAND.MAP.get(command)) {
	    throw new Error('Invalid command.');
	  }
	  return {
	    command: _commands.COMMAND.MAP.get(command)
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FACING = exports.FACING = {
	
	  MAP: new Map(),
	
	  NORTH: 'NORTH',
	  EAST: 'EAST',
	  WEST: 'WEST',
	  SOUTH: 'SOUTH'
	};
	
	FACING.MAP.set('NORTH', FACING.NORTH);
	FACING.MAP.set('EAST', FACING.EAST);
	FACING.MAP.set('WEST', FACING.WEST);
	FACING.MAP.set('SOUTH', FACING.SOUTH);
	
	var COMMAND = exports.COMMAND = {
	  MAP: new Map(),
	  PLACE: 'PLACE',
	  MOVE: 'MOVE',
	  REPORT: 'REPORT'
	};
	
	var ROTATE = exports.ROTATE = {
	  RIGHT: 'RIGHT',
	  LEFT: 'LEFT'
	};
	
	COMMAND.MAP.set('PLACE', COMMAND.PLACE);
	COMMAND.MAP.set('MOVE', COMMAND.MOVE);
	COMMAND.MAP.set('REPORT', COMMAND.REPORT);
	COMMAND.MAP.set('LEFT', ROTATE.LEFT);
	COMMAND.MAP.set('RIGHT', ROTATE.RIGHT);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _commands = __webpack_require__(3);
	
	var _directionResolver = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Robot = function () {
	  function Robot(table) {
	    _classCallCheck(this, Robot);
	
	    if (!table) {
	      throw new Error('table is required');
	    } else {
	      this.table = table;
	    }
	  }
	
	  _createClass(Robot, [{
	    key: 'instruct',
	    value: function instruct(instruction) {
	      var command = instruction.command;
	      var direction = instruction.direction;
	      var x = instruction.x;
	      var y = instruction.y;
	
	
	      switch (command) {
	        case _commands.COMMAND.REPORT:
	          this.report();
	          break;
	        case _commands.COMMAND.MOVE:
	          this.move();
	          break;
	        case _commands.ROTATE.LEFT:
	          this.turnLeft();
	          break;
	        case _commands.ROTATE.RIGHT:
	          this.turnRight();
	          break;
	        case _commands.COMMAND.PLACE:
	          this.place(x, y, direction);
	          break;
	        default:
	          throw new Error('Invalid command');
	      }
	    }
	  }, {
	    key: 'turnLeft',
	    value: function turnLeft() {
	      this.direction = _directionResolver.LeftMap.get(this.direction);
	      console.log('Facing:', this.direction);
	    }
	  }, {
	    key: 'turnRight',
	    value: function turnRight() {
	      this.direction = _directionResolver.RightMap.get(this.direction);
	      console.log('Facing:', this.direction);
	    }
	  }, {
	    key: 'place',
	    value: function place(x, y, direction) {
	      if (_commands.FACING.MAP.get(direction)) {
	        this.direction = direction;
	      } else {
	        throw new Error('Invalid direction');
	      }
	      if (this.table.isValidPlacement(x, y)) {
	        this.x = x;
	        this.y = y;
	      } else {
	        throw new Error('Invalid placement: ' + x + ', ' + y);
	      }
	    }
	  }, {
	    key: 'report',
	    value: function report() {
	      if (this.x === undefined || this.y === undefined || this.direction === undefined) {
	        throw new Error('Cannot Report without placing robot');
	      } else {
	        console.log(this.x, this.y, this.direction);
	        return 'Output: ' + this.x + ', ' + this.y + ', ' + this.direction;
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      if (!this.direction) {
	        throw new Error('direction must be set.');
	      }
	      switch (this.direction) {
	        case _commands.FACING.NORTH:
	          this.moveNorth();
	          break;
	        case _commands.FACING.SOUTH:
	          this.moveSouth();
	          break;
	        case _commands.FACING.EAST:
	          this.moveEast();
	          break;
	        case _commands.FACING.WEST:
	          this.moveWest();
	          break;
	        default:
	          throw new Error('Invalid direction');
	      }
	    }
	  }, {
	    key: 'moveNorth',
	    value: function moveNorth() {
	      if (this.table.isOnTable(this.y + 1)) {
	        this.y++;
	      } else {
	        console.log('Invalid placement');
	      }
	    }
	  }, {
	    key: 'moveSouth',
	    value: function moveSouth() {
	      if (this.table.isOnTable(this.y - 1)) {
	        this.y--;
	      } else {
	        console.log('Invalid placement');
	      }
	    }
	  }, {
	    key: 'moveEast',
	    value: function moveEast() {
	      if (this.table.isOnTable(this.x + 1)) {
	        this.x++;
	      } else {
	        console.log('Invalid placement');
	      }
	    }
	  }, {
	    key: 'moveWest',
	    value: function moveWest() {
	      if (this.table.isOnTable(this.x - 1)) {
	        this.x--;
	      } else {
	        console.log('Invalid placement');
	      }
	    }
	  }]);

	  return Robot;
	}();

	exports.default = Robot;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RightMap = exports.LeftMap = undefined;
	
	var _commands = __webpack_require__(3);
	
	var LeftMap = exports.LeftMap = new Map();
	
	LeftMap.set(_commands.FACING.NORTH, _commands.FACING.WEST);
	LeftMap.set(_commands.FACING.WEST, _commands.FACING.SOUTH);
	LeftMap.set(_commands.FACING.SOUTH, _commands.FACING.EAST);
	LeftMap.set(_commands.FACING.EAST, _commands.FACING.NORTH);
	
	var RightMap = exports.RightMap = new Map();
	
	RightMap.set(_commands.FACING.NORTH, _commands.FACING.EAST);
	RightMap.set(_commands.FACING.EAST, _commands.FACING.SOUTH);
	RightMap.set(_commands.FACING.SOUTH, _commands.FACING.WEST);
	RightMap.set(_commands.FACING.WEST, _commands.FACING.NORTH);

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Table = function () {
	  /*
	   *
	   * @param  {[type]} size - 5 creates a board 0 -> 4
	   */
	
	  function Table(size) {
	    _classCallCheck(this, Table);
	
	    this.size = size || 5;
	  }
	
	  _createClass(Table, [{
	    key: "isValidPlacement",
	    value: function isValidPlacement(x, y) {
	      console.log(x, y);
	      return x < this.size && y < this.size && x >= 0 && y >= 0;
	    }
	  }, {
	    key: "isOnTable",
	    value: function isOnTable(pos) {
	      return pos < this.size && pos >= 0;
	    }
	  }]);

	  return Table;
	}();

	exports.default = Table;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "input, textarea {\n  font-size: 125%;\n  padding: 5px;\n  background-color: #fff;\n  width: 600px; }\n\ntextarea {\n  background-color: #000;\n  color: #fff;\n  resize: none;\n  height: 150px;\n  overflow: hidden; }\n\n.hint {\n  color: #ACACAC;\n  padding: 10px 0;\n  font-size: 14px; }\n\n.container {\n  height: 400px;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-justify-content: center;\n  justify-content: center; }\n\nbody {\n  background-color: #FFF0E0;\n  font-family: sans-serif; }\n", ""]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGZhNDJlNDc4YTRlNGI0YWIzMjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzL2NvbW1hbmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Sb2JvdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kaXJlY3Rpb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzPzllZjAiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBLEtBQU0sUUFBUSxTQUFTLGVBQWU7QUFDdEMsS0FBTSxXQUFXLFNBQVMsZUFBZTtBQUN6QyxLQUFNLFFBQVksb0JBQU07QUFDeEIsVUFBa0I7O0FBRWxCLEtBQUksUUFBWSxvQkFBTTs7QUFFdEIsS0FBTSxpQ0FDSjtZQUFrQixRQUFFLFNBQWUsZUFDbkM7WUFBUyxZQUFZLFNBQVM7RUFGaEI7O0FBS2hCLE9BQU0saUJBQWlCLHdCQUNyQjtPQUFJLEVBQUUsV0FBVyxNQUFNLE1BQU0sTUFBTSxTQUFTO09BRzFDLGlCQUZBOztTQUVHLE1BQU0sTUFB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQ7O0FBRUEsOEJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vZGlzdC9hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkZmE0MmU0NzhhNGU0YjRhYjMyMlxuICoqLyIsImltcG9ydCBwYXJzZSBmcm9tICcuL3V0aWwvcGFyc2UnXHJcbmltcG9ydCB7Q09NTUFORH0gZnJvbSAnLi9jb25zdHMvY29tbWFuZHMnXHJcbmltcG9ydCBSb2JvdCBmcm9tICcuL1JvYm90J1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi9UYWJsZSdcclxuaW1wb3J0ICcuLi9zdHlsZXMvYXBwLnNjc3MnXHJcblxyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbi1pbnB1dCcpXHJcbmNvbnN0IHRlcm1pbmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlcm1pbmFsJylcclxuY29uc3QgdGFibGUgPSBuZXcgVGFibGUoNSlcclxudGVybWluYWwudmFsdWUgPSBgVGFibGUgc2l6ZTogNWBcclxuXHJcbmxldCByb2JvdCA9IG5ldyBSb2JvdCh0YWJsZSlcclxuXHJcbmNvbnN0IGRpc3BsYXkgPSAodGV4dCkgPT4ge1xyXG4gIHRlcm1pbmFsLnZhbHVlID0gYCR7dGVybWluYWwudmFsdWV9XFxuJHt0ZXh0fWBcclxuICB0ZXJtaW5hbC5zY3JvbGxUb3AgPSB0ZXJtaW5hbC5zY3JvbGxIZWlnaHRcclxufVxyXG5cclxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgaWYgKGUua2V5Q29kZSA9PSAxMyAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBpZihpbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpID09PSAnQ0xTJyl7XHJcbiAgICAgIHRlcm1pbmFsLnZhbHVlID0gbnVsbFxyXG4gICAgICByb2JvdCA9IG5ldyBSb2JvdCh0YWJsZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZGlzcGxheShpbnB1dC52YWx1ZSlcclxuICAgICAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBwYXJzZShpbnB1dC52YWx1ZSlcclxuICAgICAgICBjb25zb2xlLmxvZyhpbnN0cnVjdGlvbiwgaW5wdXQudmFsdWUpXHJcblxyXG4gICAgICAgIHJvYm90Lmluc3RydWN0KGluc3RydWN0aW9uKVxyXG4gICAgICAgIGlmKGluc3RydWN0aW9uLmNvbW1hbmQgPT09IENPTU1BTkQuUkVQT1JUKXtcclxuICAgICAgICAgIGRpc3BsYXkocm9ib3QucmVwb3J0KCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBkaXNwbGF5KGVyci5tZXNzYWdlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpbnB1dC52YWx1ZSA9IG51bGxcclxuICB9XHJcblxyXG59KVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHAuanNcbiAqKi8iLCJpbXBvcnQgeyBDT01NQU5ELCBGQUNJTkcgfSBmcm9tICcuLi9jb25zdHMvY29tbWFuZHMnXHJcblxyXG5jb25zdCBpc0ludCA9IChuKSA9PiB7XHJcbiAgcmV0dXJuIE51bWJlcihuKSA9PT0gbiAmJiBuICUgMSA9PT0gMFxyXG59XHJcblxyXG4vKlxyXG4gKiBQYXJzZXMgdGhlIGlucHV0IHRleHRcclxuICogQHBhcmFtIHtbdGV4dF19IHRleHQgdGhlIGlucHV0IHN0cmluZyB0byBiZSBwYXJzZWRcclxuICogQHJldHVybiB7W29iamVjdF19IHBvc2l0aW9uIFt7eCwgeSAsIGRpcmVjdGlvbiwgdHlwZX1dXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYXJzZSh0ZXh0KSB7XHJcbiAgY29uc3QgYXJncyA9IHRleHQuc3BsaXQoL1sgLF0rLylcclxuICBjb25zdCBjb21tYW5kID0gYXJnc1swXS50b1VwcGVyQ2FzZSgpXHJcblxyXG4gIGlmIChjb21tYW5kID09PSBDT01NQU5ELlBMQUNFKSB7XHJcbiAgICBjb25zdCB4ID0gcGFyc2VJbnQoYXJnc1sxXSlcclxuICAgIGNvbnN0IHkgPSBwYXJzZUludChhcmdzWzJdKVxyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gYXJnc1szXSA/IGFyZ3NbM10udG9VcHBlckNhc2UoKSA6IG51bGxcclxuXHJcbiAgICBpZiAoIWlzSW50KHgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB7eH0gcG9zaXRpb25gKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNJbnQoeSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHt4fSBwb3NpdGlvbmApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEZBQ0lORy5NQVAuZ2V0KGRpcmVjdGlvbikgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZGlyZWN0aW9uYClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4LFxyXG4gICAgICB5LFxyXG4gICAgICBkaXJlY3Rpb24sXHJcbiAgICAgIGNvbW1hbmRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmKCFDT01NQU5ELk1BUC5nZXQoY29tbWFuZCkpe1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbW1hbmQuYClcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbW1hbmQ6IENPTU1BTkQuTUFQLmdldChjb21tYW5kKVxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9wYXJzZS5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBGQUNJTkcgPSB7XG5cbiAgTUFQOiBuZXcgTWFwKCksXG5cbiAgTk9SVEg6ICdOT1JUSCcsXG4gIEVBU1Q6ICdFQVNUJyxcbiAgV0VTVDogJ1dFU1QnLFxuICBTT1VUSDogJ1NPVVRIJ1xufVxuXG5GQUNJTkcuTUFQLnNldCgnTk9SVEgnLCBGQUNJTkcuTk9SVEgpXG5GQUNJTkcuTUFQLnNldCgnRUFTVCcsIEZBQ0lORy5FQVNUKVxuRkFDSU5HLk1BUC5zZXQoJ1dFU1QnLCBGQUNJTkcuV0VTVClcbkZBQ0lORy5NQVAuc2V0KCdTT1VUSCcsIEZBQ0lORy5TT1VUSClcblxuZXhwb3J0IGNvbnN0IENPTU1BTkQgPSB7XG4gIE1BUDogbmV3IE1hcCgpLFxuICBQTEFDRTogJ1BMQUNFJyxcbiAgTU9WRTogJ01PVkUnLFxuICBSRVBPUlQ6ICdSRVBPUlQnXG59XG5cbmV4cG9ydCBjb25zdCBST1RBVEUgPSB7XG4gIFJJR0hUOiAnUklHSFQnLFxuICBMRUZUOiAnTEVGVCdcbn1cblxuQ09NTUFORC5NQVAuc2V0KCdQTEFDRScsIENPTU1BTkQuUExBQ0UpXG5DT01NQU5ELk1BUC5zZXQoJ01PVkUnLCBDT01NQU5ELk1PVkUpXG5DT01NQU5ELk1BUC5zZXQoJ1JFUE9SVCcsIENPTU1BTkQuUkVQT1JUKVxuQ09NTUFORC5NQVAuc2V0KCdMRUZUJywgUk9UQVRFLkxFRlQpXG5DT01NQU5ELk1BUC5zZXQoJ1JJR0hUJywgUk9UQVRFLlJJR0hUKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uc3RzL2NvbW1hbmRzLmpzXG4gKiovIiwiaW1wb3J0IHsgRkFDSU5HLCBDT01NQU5ELCBST1RBVEUgfSBmcm9tICcuL2NvbnN0cy9jb21tYW5kcydcclxuaW1wb3J0IHsgTGVmdE1hcCwgUmlnaHRNYXAgfSBmcm9tICcuL3V0aWwvZGlyZWN0aW9uUmVzb2x2ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2JvdCB7XHJcbiAgY29uc3RydWN0b3IodGFibGUpIHtcclxuICAgIGlmICghdGFibGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YWJsZSBpcyByZXF1aXJlZCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRhYmxlID0gdGFibGVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluc3RydWN0KGluc3RydWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNvbW1hbmQsIGRpcmVjdGlvbiwgeCwgeSB9ID0gaW5zdHJ1Y3Rpb25cclxuXHJcbiAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcclxuICAgICAgY2FzZSBDT01NQU5ELlJFUE9SVDpcclxuICAgICAgICB0aGlzLnJlcG9ydCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBDT01NQU5ELk1PVkU6XHJcbiAgICAgICAgdGhpcy5tb3ZlKClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIFJPVEFURS5MRUZUOlxyXG4gICAgICAgIHRoaXMudHVybkxlZnQoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgUk9UQVRFLlJJR0hUOlxyXG4gICAgICAgIHRoaXMudHVyblJpZ2h0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIENPTU1BTkQuUExBQ0U6XHJcbiAgICAgICAgdGhpcy5wbGFjZSh4LCB5LCBkaXJlY3Rpb24pXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29tbWFuZGApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0dXJuTGVmdCgpIHtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gTGVmdE1hcC5nZXQodGhpcy5kaXJlY3Rpb24pXHJcbiAgICBjb25zb2xlLmxvZygnRmFjaW5nOicsIHRoaXMuZGlyZWN0aW9uKVxyXG4gIH1cclxuXHJcbiAgdHVyblJpZ2h0KCkge1xyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBSaWdodE1hcC5nZXQodGhpcy5kaXJlY3Rpb24pXHJcbiAgICBjb25zb2xlLmxvZygnRmFjaW5nOicsIHRoaXMuZGlyZWN0aW9uKVxyXG4gIH1cclxuXHJcbiAgcGxhY2UoeCwgeSwgZGlyZWN0aW9uKSB7XHJcbiAgICBpZihGQUNJTkcuTUFQLmdldChkaXJlY3Rpb24pKXtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBkaXJlY3Rpb25gKVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudGFibGUuaXNWYWxpZFBsYWNlbWVudCh4LCB5KSkge1xyXG4gICAgICB0aGlzLnggPSB4XHJcbiAgICAgIHRoaXMueSA9IHlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbGFjZW1lbnQ6ICR7eH0sICR7eX1gKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVwb3J0KCkge1xyXG4gICAgaWYodGhpcy54ID09PSB1bmRlZmluZWQgfHwgdGhpcy55ID09PSB1bmRlZmluZWQgfHwgdGhpcy5kaXJlY3Rpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBSZXBvcnQgd2l0aG91dCBwbGFjaW5nIHJvYm90JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMueCwgdGhpcy55LCB0aGlzLmRpcmVjdGlvbilcclxuICAgICAgcmV0dXJuIGBPdXRwdXQ6ICR7dGhpcy54fSwgJHt0aGlzLnl9LCAke3RoaXMuZGlyZWN0aW9ufWBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICBpZighdGhpcy5kaXJlY3Rpb24pe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpcmVjdGlvbiBtdXN0IGJlIHNldC4nKVxyXG4gICAgfVxyXG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIEZBQ0lORy5OT1JUSDpcclxuICAgICAgICB0aGlzLm1vdmVOb3J0aCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBGQUNJTkcuU09VVEg6XHJcbiAgICAgICAgdGhpcy5tb3ZlU291dGgoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgRkFDSU5HLkVBU1Q6XHJcbiAgICAgICAgdGhpcy5tb3ZlRWFzdCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBGQUNJTkcuV0VTVDpcclxuICAgICAgICB0aGlzLm1vdmVXZXN0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkaXJlY3Rpb24nKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZU5vcnRoKCkge1xyXG4gICAgaWYgKHRoaXMudGFibGUuaXNPblRhYmxlKHRoaXMueSArIDEpKSB7XHJcbiAgICAgIHRoaXMueSsrXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBwbGFjZW1lbnQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZVNvdXRoKCkge1xyXG4gICAgaWYgKHRoaXMudGFibGUuaXNPblRhYmxlKHRoaXMueSAtIDEpKSB7XHJcbiAgICAgIHRoaXMueS0tXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBwbGFjZW1lbnQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZUVhc3QoKSB7XHJcbiAgICBpZiAodGhpcy50YWJsZS5pc09uVGFibGUodGhpcy54ICsgMSkpIHtcclxuICAgICAgdGhpcy54KytcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlV2VzdCgpIHtcclxuICAgIGlmICh0aGlzLnRhYmxlLmlzT25UYWJsZSh0aGlzLnggLSAxKSkge1xyXG4gICAgICB0aGlzLngtLVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgcGxhY2VtZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1JvYm90LmpzXG4gKiovIiwiaW1wb3J0IHsgRkFDSU5HIH0gZnJvbSAnLi4vY29uc3RzL2NvbW1hbmRzJ1xuXG5leHBvcnQgY29uc3QgTGVmdE1hcCA9IG5ldyBNYXAoKVxuXG5MZWZ0TWFwLnNldChGQUNJTkcuTk9SVEgsIEZBQ0lORy5XRVNUKVxuTGVmdE1hcC5zZXQoRkFDSU5HLldFU1QsIEZBQ0lORy5TT1VUSClcbkxlZnRNYXAuc2V0KEZBQ0lORy5TT1VUSCwgRkFDSU5HLkVBU1QpXG5MZWZ0TWFwLnNldChGQUNJTkcuRUFTVCwgRkFDSU5HLk5PUlRIKVxuXG5leHBvcnQgY29uc3QgUmlnaHRNYXAgPSBuZXcgTWFwKClcblxuUmlnaHRNYXAuc2V0KEZBQ0lORy5OT1JUSCwgRkFDSU5HLkVBU1QpXG5SaWdodE1hcC5zZXQoRkFDSU5HLkVBU1QsIEZBQ0lORy5TT1VUSClcblJpZ2h0TWFwLnNldChGQUNJTkcuU09VVEgsIEZBQ0lORy5XRVNUKVxuUmlnaHRNYXAuc2V0KEZBQ0lORy5XRVNULCBGQUNJTkcuTk9SVEgpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2RpcmVjdGlvblJlc29sdmVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUge1xyXG4gIC8qXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtbdHlwZV19IHNpemUgLSA1IGNyZWF0ZXMgYSBib2FyZCAwIC0+IDRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplIHx8IDVcclxuICB9XHJcblxyXG4gIGlzVmFsaWRQbGFjZW1lbnQoeCwgeSkge1xyXG4gICAgY29uc29sZS5sb2coeCwgeSlcclxuICAgIHJldHVybiB4IDwgdGhpcy5zaXplICYmIHkgPCB0aGlzLnNpemUgJiYgeCA+PSAwICYmIHkgPj0gMFxyXG4gIH1cclxuXHJcbiAgaXNPblRhYmxlKHBvcykge1xyXG4gICAgcmV0dXJuIHBvcyA8IHRoaXMuc2l6ZSAmJiBwb3MgPj0gMFxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGUuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vYXBwLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zdHlsZXMvYXBwLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImlucHV0LCB0ZXh0YXJlYSB7XFxuICBmb250LXNpemU6IDEyNSU7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgd2lkdGg6IDYwMHB4OyB9XFxuXFxudGV4dGFyZWEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcmVzaXplOiBub25lO1xcbiAgaGVpZ2h0OiAxNTBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uaGludCB7XFxuICBjb2xvcjogI0FDQUNBQztcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGZvbnQtc2l6ZTogMTRweDsgfVxcblxcbi5jb250YWluZXIge1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGMEUwO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuL3N0eWxlcy9hcHAuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=