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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjFlNmYwZWFkOGE0Zjc2OTVhOTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzL2NvbW1hbmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Sb2JvdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kaXJlY3Rpb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzPzllZjAiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBLEtBQU0sUUFBUSxTQUFTLGVBQWU7QUFDdEMsS0FBTSxXQUFXLFNBQVMsZUFBZTtBQUN6QyxLQUFNLFFBQVksb0JBQU07QUFDeEIsVUFBa0I7O0FBRWxCLEtBQUksUUFBWSxvQkFBTTs7QUFFdEIsS0FBTSxpQ0FDSjtZQUFrQixRQUFFLFNBQWUsZUFDbkM7WUFBUyxZQUFZLFNBQVM7RUFGaEI7O0FBS2hCLE9BQU0saUJBQWlCLHdCQUNyQjtPQUFJLEVBQUUsV0FBVyxNQUFNLE1BQU0sTUFBTSxTQUFTO09BRzFDLGlCQUZBOztTQUVHLE1BQU0sTUFB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QTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9kaXN0L2FwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGIxZTZmMGVhZDhhNGY3Njk1YTk4XG4gKiovIiwiaW1wb3J0IHBhcnNlIGZyb20gJy4vdXRpbC9wYXJzZSdcclxuaW1wb3J0IHtDT01NQU5EfSBmcm9tICcuL2NvbnN0cy9jb21tYW5kcydcclxuaW1wb3J0IFJvYm90IGZyb20gJy4vUm9ib3QnXHJcbmltcG9ydCBUYWJsZSBmcm9tICcuL1RhYmxlJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHAuc2NzcydcclxuXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWlucHV0JylcclxuY29uc3QgdGVybWluYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWwnKVxyXG5jb25zdCB0YWJsZSA9IG5ldyBUYWJsZSg1KVxyXG50ZXJtaW5hbC52YWx1ZSA9IGBUYWJsZSBzaXplOiA1YFxyXG5cclxubGV0IHJvYm90ID0gbmV3IFJvYm90KHRhYmxlKVxyXG5cclxuY29uc3QgZGlzcGxheSA9ICh0ZXh0KSA9PiB7XHJcbiAgdGVybWluYWwudmFsdWUgPSBgJHt0ZXJtaW5hbC52YWx1ZX1cXG4ke3RleHR9YFxyXG4gIHRlcm1pbmFsLnNjcm9sbFRvcCA9IHRlcm1pbmFsLnNjcm9sbEhlaWdodFxyXG59XHJcblxyXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICBpZiAoZS5rZXlDb2RlID09IDEzICYmIGlucHV0LnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGlmKGlucHV0LnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdDTFMnKXtcclxuICAgICAgdGVybWluYWwudmFsdWUgPSBudWxsXHJcbiAgICAgIHJvYm90ID0gbmV3IFJvYm90KHRhYmxlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkaXNwbGF5KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbiA9IHBhcnNlKGlucHV0LnZhbHVlKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGluc3RydWN0aW9uLCBpbnB1dC52YWx1ZSlcclxuXHJcbiAgICAgICAgcm9ib3QuaW5zdHJ1Y3QoaW5zdHJ1Y3Rpb24pXHJcbiAgICAgICAgaWYoaW5zdHJ1Y3Rpb24uY29tbWFuZCA9PT0gQ09NTUFORC5SRVBPUlQpe1xyXG4gICAgICAgICAgZGlzcGxheShyb2JvdC5yZXBvcnQoKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGRpc3BsYXkoZXJyLm1lc3NhZ2UpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlucHV0LnZhbHVlID0gbnVsbFxyXG4gIH1cclxuXHJcbn0pXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcC5qc1xuICoqLyIsImltcG9ydCB7IENPTU1BTkQsIEZBQ0lORyB9IGZyb20gJy4uL2NvbnN0cy9jb21tYW5kcydcclxuXHJcbmNvbnN0IGlzSW50ID0gKG4pID0+IHtcclxuICByZXR1cm4gTnVtYmVyKG4pID09PSBuICYmIG4gJSAxID09PSAwXHJcbn1cclxuXHJcbi8qXHJcbiAqIFBhcnNlcyB0aGUgaW5wdXQgdGV4dFxyXG4gKiBAcGFyYW0ge1t0ZXh0XX0gdGV4dCB0aGUgaW5wdXQgc3RyaW5nIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJuIHtbb2JqZWN0XX0gcG9zaXRpb24gW3t4LCB5ICwgZGlyZWN0aW9uLCB0eXBlfV1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnNlKHRleHQpIHtcclxuICBjb25zdCBhcmdzID0gdGV4dC5zcGxpdCgvWyAsXSsvKVxyXG4gIGNvbnN0IGNvbW1hbmQgPSBhcmdzWzBdLnRvVXBwZXJDYXNlKClcclxuXHJcbiAgaWYgKGNvbW1hbmQgPT09IENPTU1BTkQuUExBQ0UpIHtcclxuICAgIGNvbnN0IHggPSBwYXJzZUludChhcmdzWzFdKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGFyZ3NbMl0pXHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBhcmdzWzNdID8gYXJnc1szXS50b1VwcGVyQ2FzZSgpIDogbnVsbFxyXG5cclxuICAgIGlmICghaXNJbnQoeCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHt4fSBwb3NpdGlvbmApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0ludCh5KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQge3h9IHBvc2l0aW9uYClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoRkFDSU5HLk1BUC5nZXQoZGlyZWN0aW9uKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBkaXJlY3Rpb25gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHgsXHJcbiAgICAgIHksXHJcbiAgICAgIGRpcmVjdGlvbixcclxuICAgICAgY29tbWFuZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYoIUNPTU1BTkQuTUFQLmdldChjb21tYW5kKSl7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29tbWFuZC5gKVxyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgY29tbWFuZDogQ09NTUFORC5NQVAuZ2V0KGNvbW1hbmQpXHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3BhcnNlLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IEZBQ0lORyA9IHtcblxuICBNQVA6IG5ldyBNYXAoKSxcblxuICBOT1JUSDogJ05PUlRIJyxcbiAgRUFTVDogJ0VBU1QnLFxuICBXRVNUOiAnV0VTVCcsXG4gIFNPVVRIOiAnU09VVEgnXG59XG5cbkZBQ0lORy5NQVAuc2V0KCdOT1JUSCcsIEZBQ0lORy5OT1JUSClcbkZBQ0lORy5NQVAuc2V0KCdFQVNUJywgRkFDSU5HLkVBU1QpXG5GQUNJTkcuTUFQLnNldCgnV0VTVCcsIEZBQ0lORy5XRVNUKVxuRkFDSU5HLk1BUC5zZXQoJ1NPVVRIJywgRkFDSU5HLlNPVVRIKVxuXG5leHBvcnQgY29uc3QgQ09NTUFORCA9IHtcbiAgTUFQOiBuZXcgTWFwKCksXG4gIFBMQUNFOiAnUExBQ0UnLFxuICBNT1ZFOiAnTU9WRScsXG4gIFJFUE9SVDogJ1JFUE9SVCdcbn1cblxuZXhwb3J0IGNvbnN0IFJPVEFURSA9IHtcbiAgUklHSFQ6ICdSSUdIVCcsXG4gIExFRlQ6ICdMRUZUJ1xufVxuXG5DT01NQU5ELk1BUC5zZXQoJ1BMQUNFJywgQ09NTUFORC5QTEFDRSlcbkNPTU1BTkQuTUFQLnNldCgnTU9WRScsIENPTU1BTkQuTU9WRSlcbkNPTU1BTkQuTUFQLnNldCgnUkVQT1JUJywgQ09NTUFORC5SRVBPUlQpXG5DT01NQU5ELk1BUC5zZXQoJ0xFRlQnLCBST1RBVEUuTEVGVClcbkNPTU1BTkQuTUFQLnNldCgnUklHSFQnLCBST1RBVEUuUklHSFQpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25zdHMvY29tbWFuZHMuanNcbiAqKi8iLCJpbXBvcnQgeyBGQUNJTkcsIENPTU1BTkQsIFJPVEFURSB9IGZyb20gJy4vY29uc3RzL2NvbW1hbmRzJ1xyXG5pbXBvcnQgeyBMZWZ0TWFwLCBSaWdodE1hcCB9IGZyb20gJy4vdXRpbC9kaXJlY3Rpb25SZXNvbHZlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvYm90IHtcclxuICBjb25zdHJ1Y3Rvcih0YWJsZSkge1xyXG4gICAgaWYgKCF0YWJsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhYmxlIGlzIHJlcXVpcmVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGFibGUgPSB0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5zdHJ1Y3QoaW5zdHJ1Y3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY29tbWFuZCwgZGlyZWN0aW9uLCB4LCB5IH0gPSBpbnN0cnVjdGlvblxyXG5cclxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xyXG4gICAgICBjYXNlIENPTU1BTkQuUkVQT1JUOlxyXG4gICAgICAgIHRoaXMucmVwb3J0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIENPTU1BTkQuTU9WRTpcclxuICAgICAgICB0aGlzLm1vdmUoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgUk9UQVRFLkxFRlQ6XHJcbiAgICAgICAgdGhpcy50dXJuTGVmdCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBST1RBVEUuUklHSFQ6XHJcbiAgICAgICAgdGhpcy50dXJuUmlnaHQoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgQ09NTUFORC5QTEFDRTpcclxuICAgICAgICB0aGlzLnBsYWNlKHgsIHksIGRpcmVjdGlvbilcclxuICAgICAgICBicmVha1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjb21tYW5kYClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHR1cm5MZWZ0KCkge1xyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBMZWZ0TWFwLmdldCh0aGlzLmRpcmVjdGlvbilcclxuICAgIGNvbnNvbGUubG9nKCdGYWNpbmc6JywgdGhpcy5kaXJlY3Rpb24pXHJcbiAgfVxyXG5cclxuICB0dXJuUmlnaHQoKSB7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IFJpZ2h0TWFwLmdldCh0aGlzLmRpcmVjdGlvbilcclxuICAgIGNvbnNvbGUubG9nKCdGYWNpbmc6JywgdGhpcy5kaXJlY3Rpb24pXHJcbiAgfVxyXG5cclxuICBwbGFjZSh4LCB5LCBkaXJlY3Rpb24pIHtcclxuICAgIGlmKEZBQ0lORy5NQVAuZ2V0KGRpcmVjdGlvbikpe1xyXG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGRpcmVjdGlvbmApXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50YWJsZS5pc1ZhbGlkUGxhY2VtZW50KHgsIHkpKSB7XHJcbiAgICAgIHRoaXMueCA9IHhcclxuICAgICAgdGhpcy55ID0geVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsYWNlbWVudDogJHt4fSwgJHt5fWApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXBvcnQoKSB7XHJcbiAgICBpZih0aGlzLnggPT09IHVuZGVmaW5lZCB8fCB0aGlzLnkgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IFJlcG9ydCB3aXRob3V0IHBsYWNpbmcgcm9ib3QnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy54LCB0aGlzLnksIHRoaXMuZGlyZWN0aW9uKVxyXG4gICAgICByZXR1cm4gYE91dHB1dDogJHt0aGlzLnh9LCAke3RoaXMueX0sICR7dGhpcy5kaXJlY3Rpb259YFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGlmKCF0aGlzLmRpcmVjdGlvbil7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGlyZWN0aW9uIG11c3QgYmUgc2V0LicpXHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgRkFDSU5HLk5PUlRIOlxyXG4gICAgICAgIHRoaXMubW92ZU5vcnRoKClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIEZBQ0lORy5TT1VUSDpcclxuICAgICAgICB0aGlzLm1vdmVTb3V0aCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBGQUNJTkcuRUFTVDpcclxuICAgICAgICB0aGlzLm1vdmVFYXN0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIEZBQ0lORy5XRVNUOlxyXG4gICAgICAgIHRoaXMubW92ZVdlc3QoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRpcmVjdGlvbicpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlTm9ydGgoKSB7XHJcbiAgICBpZiAodGhpcy50YWJsZS5pc09uVGFibGUodGhpcy55ICsgMSkpIHtcclxuICAgICAgdGhpcy55KytcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlU291dGgoKSB7XHJcbiAgICBpZiAodGhpcy50YWJsZS5pc09uVGFibGUodGhpcy55IC0gMSkpIHtcclxuICAgICAgdGhpcy55LS1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlRWFzdCgpIHtcclxuICAgIGlmICh0aGlzLnRhYmxlLmlzT25UYWJsZSh0aGlzLnggKyAxKSkge1xyXG4gICAgICB0aGlzLngrK1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgcGxhY2VtZW50JylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVXZXN0KCkge1xyXG4gICAgaWYgKHRoaXMudGFibGUuaXNPblRhYmxlKHRoaXMueCAtIDEpKSB7XHJcbiAgICAgIHRoaXMueC0tXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBwbGFjZW1lbnQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUm9ib3QuanNcbiAqKi8iLCJpbXBvcnQgeyBGQUNJTkcgfSBmcm9tICcuLi9jb25zdHMvY29tbWFuZHMnXG5cbmV4cG9ydCBjb25zdCBMZWZ0TWFwID0gbmV3IE1hcCgpXG5cbkxlZnRNYXAuc2V0KEZBQ0lORy5OT1JUSCwgRkFDSU5HLldFU1QpXG5MZWZ0TWFwLnNldChGQUNJTkcuV0VTVCwgRkFDSU5HLlNPVVRIKVxuTGVmdE1hcC5zZXQoRkFDSU5HLlNPVVRILCBGQUNJTkcuRUFTVClcbkxlZnRNYXAuc2V0KEZBQ0lORy5FQVNULCBGQUNJTkcuTk9SVEgpXG5cbmV4cG9ydCBjb25zdCBSaWdodE1hcCA9IG5ldyBNYXAoKVxuXG5SaWdodE1hcC5zZXQoRkFDSU5HLk5PUlRILCBGQUNJTkcuRUFTVClcblJpZ2h0TWFwLnNldChGQUNJTkcuRUFTVCwgRkFDSU5HLlNPVVRIKVxuUmlnaHRNYXAuc2V0KEZBQ0lORy5TT1VUSCwgRkFDSU5HLldFU1QpXG5SaWdodE1hcC5zZXQoRkFDSU5HLldFU1QsIEZBQ0lORy5OT1JUSClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvZGlyZWN0aW9uUmVzb2x2ZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSB7XHJcblxyXG4gIC8qXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtbdHlwZV19IHNpemUgLSA1IGNyZWF0ZXMgYSBib2FyZCAwIC0+IDRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplIHx8IDVcclxuICB9XHJcblxyXG4gIGlzVmFsaWRQbGFjZW1lbnQoeCwgeSkge1xyXG4gICAgY29uc29sZS5sb2coeCwgeSlcclxuICAgIHJldHVybiB4IDwgdGhpcy5zaXplICYmIHkgPCB0aGlzLnNpemUgJiYgeCA+PSAwICYmIHkgPj0gMFxyXG4gIH1cclxuXHJcbiAgaXNPblRhYmxlKHBvcykge1xyXG4gICAgcmV0dXJuIHBvcyA8IHRoaXMuc2l6ZSAmJiBwb3MgPj0gMFxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFibGUuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vYXBwLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zdHlsZXMvYXBwLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImlucHV0LCB0ZXh0YXJlYSB7XFxuICBmb250LXNpemU6IDEyNSU7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgd2lkdGg6IDMwMHB4OyB9XFxuXFxudGV4dGFyZWEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcmVzaXplOiBub25lO1xcbiAgaGVpZ2h0OiAxNTBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uaGludCB7XFxuICBjb2xvcjogI0FDQUNBQztcXG4gIHBhZGRpbmc6IDEwcHggMDtcXG4gIGZvbnQtc2l6ZTogMTRweDsgfVxcblxcbi5lcnJvciB7XFxuICBjb2xvcjogcmVkOyB9XFxuXFxuLmNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkYwRTA7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vc3R5bGVzL2FwcC5zY3NzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==