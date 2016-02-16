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
	          this.rotateRight();
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
	      if (this.table.isOnTable(this.x + 1)) {
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
	exports.push([module.id, "input, textarea {\n  font-size: 125%;\n  padding: 5px;\n  background-color: #fff;\n  width: 300px; }\n\ntextarea {\n  background-color: #000;\n  color: #fff;\n  resize: none;\n  height: 150px;\n  overflow: hidden; }\n\n.hint {\n  color: #ACACAC;\n  padding: 10px 0;\n  font-size: 14px; }\n\n.error {\n  color: red; }\n\n.container {\n  height: 400px;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-justify-content: center;\n  justify-content: center; }\n\nbody {\n  background-color: #FFF0E0;\n  font-family: sans-serif; }\n", ""]);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM0YzdkMmJhZjg1MzYyZDMzNTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzL2NvbW1hbmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Sb2JvdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kaXJlY3Rpb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzPzllZjAiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBLEtBQU0sUUFBUSxTQUFTLGVBQWU7QUFDdEMsS0FBTSxXQUFXLFNBQVMsZUFBZTtBQUN6QyxLQUFNLFFBQVksb0JBQU07QUFDeEIsVUFBa0I7O0FBRWxCLEtBQUksUUFBWSxvQkFBTTs7QUFFdEIsS0FBTSxpQ0FDSjtZQUFrQixRQUFFLFNBQWUsZUFDbkM7WUFBUyxZQUFZLFNBQVM7RUFGaEI7O0FBS2hCLE9BQU0saUJBQWlCLHdCQUNyQjtPQUFJLEVBQUUsV0FBVyxNQUFNLE1BQU0sTUFBTSxTQUFTO09BRzFDLGlCQUZBOztTQUVHLE1BQU0sTUFB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RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9kaXN0L2FwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDgzNGM3ZDJiYWY4NTM2MmQzMzU2XG4gKiovIiwiaW1wb3J0IHBhcnNlIGZyb20gJy4vdXRpbC9wYXJzZSdcclxuaW1wb3J0IHtDT01NQU5EfSBmcm9tICcuL2NvbnN0cy9jb21tYW5kcydcclxuaW1wb3J0IFJvYm90IGZyb20gJy4vUm9ib3QnXHJcbmltcG9ydCBUYWJsZSBmcm9tICcuL1RhYmxlJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHAuc2NzcydcclxuXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWlucHV0JylcclxuY29uc3QgdGVybWluYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWwnKVxyXG5jb25zdCB0YWJsZSA9IG5ldyBUYWJsZSg1KVxyXG50ZXJtaW5hbC52YWx1ZSA9IGBUYWJsZSBzaXplOiA1YFxyXG5cclxubGV0IHJvYm90ID0gbmV3IFJvYm90KHRhYmxlKVxyXG5cclxuY29uc3QgZGlzcGxheSA9ICh0ZXh0KSA9PiB7XHJcbiAgdGVybWluYWwudmFsdWUgPSBgJHt0ZXJtaW5hbC52YWx1ZX1cXG4ke3RleHR9YFxyXG4gIHRlcm1pbmFsLnNjcm9sbFRvcCA9IHRlcm1pbmFsLnNjcm9sbEhlaWdodFxyXG59XHJcblxyXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICBpZiAoZS5rZXlDb2RlID09IDEzICYmIGlucHV0LnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGlmKGlucHV0LnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdDTFMnKXtcclxuICAgICAgdGVybWluYWwudmFsdWUgPSBudWxsXHJcbiAgICAgIHJvYm90ID0gbmV3IFJvYm90KHRhYmxlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkaXNwbGF5KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbiA9IHBhcnNlKGlucHV0LnZhbHVlKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGluc3RydWN0aW9uLCBpbnB1dC52YWx1ZSlcclxuXHJcbiAgICAgICAgcm9ib3QuaW5zdHJ1Y3QoaW5zdHJ1Y3Rpb24pXHJcbiAgICAgICAgaWYoaW5zdHJ1Y3Rpb24uY29tbWFuZCA9PT0gQ09NTUFORC5SRVBPUlQpe1xyXG4gICAgICAgICAgZGlzcGxheShyb2JvdC5yZXBvcnQoKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGRpc3BsYXkoZXJyLm1lc3NhZ2UpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlucHV0LnZhbHVlID0gbnVsbFxyXG4gIH1cclxuXHJcbn0pXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcC5qc1xuICoqLyIsImltcG9ydCB7IENPTU1BTkQsIEZBQ0lORyB9IGZyb20gJy4uL2NvbnN0cy9jb21tYW5kcydcclxuXHJcbmNvbnN0IGlzSW50ID0gKG4pID0+IHtcclxuICByZXR1cm4gTnVtYmVyKG4pID09PSBuICYmIG4gJSAxID09PSAwXHJcbn1cclxuXHJcbi8qXHJcbiAqIFBhcnNlcyB0aGUgaW5wdXQgdGV4dFxyXG4gKiBAcGFyYW0ge1t0ZXh0XX0gdGV4dCB0aGUgaW5wdXQgc3RyaW5nIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJuIHtbb2JqZWN0XX0gcG9zaXRpb24gW3t4LCB5ICwgZGlyZWN0aW9uLCB0eXBlfV1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnNlKHRleHQpIHtcclxuICBjb25zdCBhcmdzID0gdGV4dC5zcGxpdCgvWyAsXSsvKVxyXG4gIGNvbnN0IGNvbW1hbmQgPSBhcmdzWzBdLnRvVXBwZXJDYXNlKClcclxuXHJcbiAgaWYgKGNvbW1hbmQgPT09IENPTU1BTkQuUExBQ0UpIHtcclxuICAgIGNvbnN0IHggPSBwYXJzZUludChhcmdzWzFdKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGFyZ3NbMl0pXHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBhcmdzWzNdID8gYXJnc1szXS50b1VwcGVyQ2FzZSgpIDogbnVsbFxyXG5cclxuICAgIGlmICghaXNJbnQoeCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHt4fSBwb3NpdGlvbmApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0ludCh5KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQge3h9IHBvc2l0aW9uYClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoRkFDSU5HLk1BUC5nZXQoZGlyZWN0aW9uKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBkaXJlY3Rpb25gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHgsXHJcbiAgICAgIHksXHJcbiAgICAgIGRpcmVjdGlvbixcclxuICAgICAgY29tbWFuZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYoIUNPTU1BTkQuTUFQLmdldChjb21tYW5kKSl7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29tbWFuZC5gKVxyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgY29tbWFuZDogQ09NTUFORC5NQVAuZ2V0KGNvbW1hbmQpXHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3BhcnNlLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IEZBQ0lORyA9IHtcblxuICBNQVA6IG5ldyBNYXAoKSxcblxuICBOT1JUSDogJ05PUlRIJyxcbiAgRUFTVDogJ0VBU1QnLFxuICBXRVNUOiAnV0VTVCcsXG4gIFNPVVRIOiAnU09VVEgnXG59XG5cbkZBQ0lORy5NQVAuc2V0KCdOT1JUSCcsIEZBQ0lORy5OT1JUSClcbkZBQ0lORy5NQVAuc2V0KCdFQVNUJywgRkFDSU5HLkVBU1QpXG5GQUNJTkcuTUFQLnNldCgnV0VTVCcsIEZBQ0lORy5XRVNUKVxuRkFDSU5HLk1BUC5zZXQoJ1NPVVRIJywgRkFDSU5HLlNPVVRIKVxuXG5leHBvcnQgY29uc3QgQ09NTUFORCA9IHtcbiAgTUFQOiBuZXcgTWFwKCksXG4gIFBMQUNFOiAnUExBQ0UnLFxuICBNT1ZFOiAnTU9WRScsXG4gIFJFUE9SVDogJ1JFUE9SVCdcbn1cblxuZXhwb3J0IGNvbnN0IFJPVEFURSA9IHtcbiAgUklHSFQ6ICdSSUdIVCcsXG4gIExFRlQ6ICdMRUZUJ1xufVxuXG5DT01NQU5ELk1BUC5zZXQoJ1BMQUNFJywgQ09NTUFORC5QTEFDRSlcbkNPTU1BTkQuTUFQLnNldCgnTU9WRScsIENPTU1BTkQuTU9WRSlcbkNPTU1BTkQuTUFQLnNldCgnUkVQT1JUJywgQ09NTUFORC5SRVBPUlQpXG5DT01NQU5ELk1BUC5zZXQoJ0xFRlQnLCBST1RBVEUuTEVGVClcbkNPTU1BTkQuTUFQLnNldCgnUklHSFQnLCBST1RBVEUuUklHSFQpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25zdHMvY29tbWFuZHMuanNcbiAqKi8iLCJpbXBvcnQgeyBGQUNJTkcsIENPTU1BTkQsIFJPVEFURSB9IGZyb20gJy4vY29uc3RzL2NvbW1hbmRzJ1xyXG5pbXBvcnQgeyBMZWZ0TWFwLCBSaWdodE1hcCB9IGZyb20gJy4vdXRpbC9kaXJlY3Rpb25SZXNvbHZlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90IHtcclxuICBjb25zdHJ1Y3Rvcih0YWJsZSkge1xyXG4gICAgaWYgKCF0YWJsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhYmxlIGlzIHJlcXVpcmVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGFibGUgPSB0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5zdHJ1Y3QoaW5zdHJ1Y3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY29tbWFuZCwgZGlyZWN0aW9uLCB4LCB5IH0gPSBpbnN0cnVjdGlvblxyXG5cclxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xyXG4gICAgICBjYXNlIENPTU1BTkQuUkVQT1JUOlxyXG4gICAgICAgIHRoaXMucmVwb3J0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIENPTU1BTkQuTU9WRTpcclxuICAgICAgICB0aGlzLm1vdmUoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgUk9UQVRFLkxFRlQ6XHJcbiAgICAgICAgdGhpcy50dXJuTGVmdCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBST1RBVEUuUklHSFQ6XHJcbiAgICAgICAgdGhpcy5yb3RhdGVSaWdodCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBDT01NQU5ELlBMQUNFOlxyXG4gICAgICAgIHRoaXMucGxhY2UoeCwgeSwgZGlyZWN0aW9uKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbW1hbmRgKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHVybkxlZnQoKSB7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IExlZnRNYXAuZ2V0KHRoaXMuZGlyZWN0aW9uKVxyXG4gICAgY29uc29sZS5sb2coJ0ZhY2luZzonLCB0aGlzLmRpcmVjdGlvbilcclxuICB9XHJcblxyXG4gIHR1cm5SaWdodCgpIHtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gUmlnaHRNYXAuZ2V0KHRoaXMuZGlyZWN0aW9uKVxyXG4gICAgY29uc29sZS5sb2coJ0ZhY2luZzonLCB0aGlzLmRpcmVjdGlvbilcclxuICB9XHJcblxyXG4gIHBsYWNlKHgsIHksIGRpcmVjdGlvbikge1xyXG4gICAgaWYoRkFDSU5HLk1BUC5nZXQoZGlyZWN0aW9uKSl7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZGlyZWN0aW9uYClcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRhYmxlLmlzVmFsaWRQbGFjZW1lbnQoeCwgeSkpIHtcclxuICAgICAgdGhpcy54ID0geFxyXG4gICAgICB0aGlzLnkgPSB5XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGxhY2VtZW50OiAke3h9LCAke3l9YClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlcG9ydCgpIHtcclxuICAgIGlmKHRoaXMueCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMueSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuZGlyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgUmVwb3J0IHdpdGhvdXQgcGxhY2luZyByb2JvdCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLngsIHRoaXMueSwgdGhpcy5kaXJlY3Rpb24pXHJcbiAgICAgIHJldHVybiBgT3V0cHV0OiAke3RoaXMueH0sICR7dGhpcy55fSwgJHt0aGlzLmRpcmVjdGlvbn1gXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYoIXRoaXMuZGlyZWN0aW9uKXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkaXJlY3Rpb24gbXVzdCBiZSBzZXQuJylcclxuICAgIH1cclxuICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSBGQUNJTkcuTk9SVEg6XHJcbiAgICAgICAgdGhpcy5tb3ZlTm9ydGgoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgRkFDSU5HLlNPVVRIOlxyXG4gICAgICAgIHRoaXMubW92ZVNvdXRoKClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIEZBQ0lORy5FQVNUOlxyXG4gICAgICAgIHRoaXMubW92ZUVhc3QoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgRkFDSU5HLldFU1Q6XHJcbiAgICAgICAgdGhpcy5tb3ZlV2VzdCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGlyZWN0aW9uJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVOb3J0aCgpIHtcclxuICAgIGlmICh0aGlzLnRhYmxlLmlzT25UYWJsZSh0aGlzLnkgKyAxKSkge1xyXG4gICAgICB0aGlzLnkrK1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgcGxhY2VtZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVTb3V0aCgpIHtcclxuICAgIGlmICh0aGlzLnRhYmxlLmlzT25UYWJsZSh0aGlzLnkgLSAxKSkge1xyXG4gICAgICB0aGlzLnktLVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgcGxhY2VtZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVFYXN0KCkge1xyXG4gICAgaWYgKHRoaXMudGFibGUuaXNPblRhYmxlKHRoaXMueCArIDEpKSB7XHJcbiAgICAgIHRoaXMueCsrXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBwbGFjZW1lbnQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZVdlc3QoKSB7XHJcbiAgICBpZiAodGhpcy50YWJsZS5pc09uVGFibGUodGhpcy54ICsgMSkpIHtcclxuICAgICAgdGhpcy54LS1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Sb2JvdC5qc1xuICoqLyIsImltcG9ydCB7IEZBQ0lORyB9IGZyb20gJy4uL2NvbnN0cy9jb21tYW5kcydcblxuZXhwb3J0IGNvbnN0IExlZnRNYXAgPSBuZXcgTWFwKClcblxuTGVmdE1hcC5zZXQoRkFDSU5HLk5PUlRILCBGQUNJTkcuV0VTVClcbkxlZnRNYXAuc2V0KEZBQ0lORy5XRVNULCBGQUNJTkcuU09VVEgpXG5MZWZ0TWFwLnNldChGQUNJTkcuU09VVEgsIEZBQ0lORy5FQVNUKVxuTGVmdE1hcC5zZXQoRkFDSU5HLkVBU1QsIEZBQ0lORy5OT1JUSClcblxuZXhwb3J0IGNvbnN0IFJpZ2h0TWFwID0gbmV3IE1hcCgpXG5cblJpZ2h0TWFwLnNldChGQUNJTkcuTk9SVEgsIEZBQ0lORy5FQVNUKVxuUmlnaHRNYXAuc2V0KEZBQ0lORy5FQVNULCBGQUNJTkcuU09VVEgpXG5SaWdodE1hcC5zZXQoRkFDSU5HLlNPVVRILCBGQUNJTkcuV0VTVClcblJpZ2h0TWFwLnNldChGQUNJTkcuV0VTVCwgRkFDSU5HLk5PUlRIKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9kaXJlY3Rpb25SZXNvbHZlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIHtcclxuXHJcbiAgLypcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gc2l6ZSAtIDUgY3JlYXRlcyBhIGJvYXJkIDAgLT4gNFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemUgfHwgNVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZFBsYWNlbWVudCh4LCB5KSB7XHJcbiAgICByZXR1cm4geCA8IHRoaXMuc2l6ZSAmJiB5IDwgdGhpcy5zaXplICYmIHggPj0gMCAmJiB5ID49IDBcclxuICB9XHJcblxyXG4gIGlzT25UYWJsZShwb3MpIHtcclxuICAgIHJldHVybiBwb3MgPCB0aGlzLnNpemUgJiYgcG9zID49IDBcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3R5bGVzL2FwcC5zY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJpbnB1dCwgdGV4dGFyZWEge1xcbiAgZm9udC1zaXplOiAxMjUlO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiAzMDBweDsgfVxcblxcbnRleHRhcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHJlc2l6ZTogbm9uZTtcXG4gIGhlaWdodDogMTUwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmhpbnQge1xcbiAgY29sb3I6ICNBQ0FDQUM7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBmb250LXNpemU6IDE0cHg7IH1cXG5cXG4uZXJyb3Ige1xcbiAgY29sb3I6IHJlZDsgfVxcblxcbi5jb250YWluZXIge1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGMEUwO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuL3N0eWxlcy9hcHAuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=