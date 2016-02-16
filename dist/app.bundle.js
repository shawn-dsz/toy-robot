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
	
	var _x = null;
	var _y = null;
	var _direction = null;
	var _table = undefined;
	
	var moveNorth = function moveNorth() {
	  if (_table.isOnTable(_y + 1)) {
	    _y++;
	  } else {
	    console.log('Invalid placement');
	  }
	};
	
	var moveSouth = function moveSouth() {
	  if (_table.isOnTable(_y - 1)) {
	    _y--;
	  } else {
	    console.log('Invalid placement');
	  }
	};
	
	var moveEast = function moveEast() {
	  if (_table.isOnTable(_x + 1)) {
	    _x++;
	  } else {
	    console.log('Invalid placement');
	  }
	};
	
	var moveWest = function moveWest() {
	  if (_table.isOnTable(_x - 1)) {
	    _x--;
	  } else {
	    console.log('Invalid placement');
	  }
	};
	
	var Robot = function () {
	  function Robot(table) {
	    _classCallCheck(this, Robot);
	
	    if (!table) {
	      throw new Error('table is required');
	    } else {
	      _table = table;
	    }
	  }
	
	  _createClass(Robot, [{
	    key: 'instruct',
	    value: function instruct(instruction) {
	      var command = instruction.command;
	      var direction = instruction.direction;
	      var x = instruction.x;
	      var y = instruction.y;
	
	      console.log(_x, _y, _direction);
	
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
	      _direction = _directionResolver.LeftMap.get(_direction);
	      console.log('Facing:', _direction);
	    }
	  }, {
	    key: 'turnRight',
	    value: function turnRight() {
	      _direction = _directionResolver.RightMap.get(_direction);
	      console.log('Facing:', _direction);
	    }
	  }, {
	    key: 'place',
	    value: function place(x, y, direction) {
	      if (_commands.FACING.MAP.get(direction)) {
	        _direction = direction;
	      } else {
	        throw new Error('Invalid direction');
	      }
	      if (_table.isValidPlacement(x, y)) {
	        _x = x;
	        _y = y;
	      } else {
	        throw new Error('Invalid placement: ' + x + ', ' + y);
	      }
	    }
	  }, {
	    key: 'report',
	    value: function report() {
	      if (_x === null || _y === null || _direction === null) {
	        throw new Error('Cannot Report without placing robot');
	      } else {
	        console.log(_x, _y, _direction);
	        return 'Output: ' + _x + ', ' + _y + ', ' + _direction;
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      if (!_direction) {
	        throw new Error('direction must be set.');
	      }
	      switch (_direction) {
	        case _commands.FACING.NORTH:
	          moveNorth();
	          break;
	        case _commands.FACING.SOUTH:
	          moveSouth();
	          break;
	        case _commands.FACING.EAST:
	          moveEast();
	          break;
	        case _commands.FACING.WEST:
	          moveWest();
	          break;
	        default:
	          throw new Error('Invalid direction');
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
	
	var _size = undefined;
	
	var Table = function () {
	
	  /*
	   * @param  {[type]} size - 5 creates a board 0 -> 4
	   */
	
	  function Table(size) {
	    _classCallCheck(this, Table);
	
	    _size = size || 5;
	  }
	
	  _createClass(Table, [{
	    key: "isValidPlacement",
	    value: function isValidPlacement(x, y) {
	      return x < _size && y < _size && x >= 0 && y >= 0;
	    }
	  }, {
	    key: "isOnTable",
	    value: function isOnTable(pos) {
	      return pos < _size && pos >= 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzU5NzMxMzMxMTI1ZjA3ZDBhZDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzL2NvbW1hbmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Sb2JvdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kaXJlY3Rpb25SZXNvbHZlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzPzllZjAiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBLEtBQU0sUUFBUSxTQUFTLGVBQWU7QUFDdEMsS0FBTSxXQUFXLFNBQVMsZUFBZTtBQUN6QyxLQUFNLFFBQVksb0JBQU07QUFDeEIsVUFBa0I7O0FBRWxCLEtBQUksUUFBWSxvQkFBTTs7QUFFdEIsS0FBTSxpQ0FDSjtZQUFrQixRQUFFLFNBQWUsZUFDbkM7WUFBUyxZQUFZLFNBQVM7RUFGaEI7O0FBS2hCLE9BQU0saUJBQWlCLHdCQUNyQjtPQUFJLEVBQUUsV0FBVyxNQUFNLE1BQU0sTUFBTSxTQUFTO09BRzFDLGlCQUZBOztTQUVHLE1BQU0sTUFB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Q0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9kaXN0L2FwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGM1OTczMTMzMTEyNWYwN2QwYWQxXG4gKiovIiwiaW1wb3J0IHBhcnNlIGZyb20gJy4vdXRpbC9wYXJzZSdcclxuaW1wb3J0IHtDT01NQU5EfSBmcm9tICcuL2NvbnN0cy9jb21tYW5kcydcclxuaW1wb3J0IFJvYm90IGZyb20gJy4vUm9ib3QnXHJcbmltcG9ydCBUYWJsZSBmcm9tICcuL1RhYmxlJ1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hcHAuc2NzcydcclxuXHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9uLWlucHV0JylcclxuY29uc3QgdGVybWluYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWwnKVxyXG5jb25zdCB0YWJsZSA9IG5ldyBUYWJsZSg1KVxyXG50ZXJtaW5hbC52YWx1ZSA9IGBUYWJsZSBzaXplOiA1YFxyXG5cclxubGV0IHJvYm90ID0gbmV3IFJvYm90KHRhYmxlKVxyXG5cclxuY29uc3QgZGlzcGxheSA9ICh0ZXh0KSA9PiB7XHJcbiAgdGVybWluYWwudmFsdWUgPSBgJHt0ZXJtaW5hbC52YWx1ZX1cXG4ke3RleHR9YFxyXG4gIHRlcm1pbmFsLnNjcm9sbFRvcCA9IHRlcm1pbmFsLnNjcm9sbEhlaWdodFxyXG59XHJcblxyXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICBpZiAoZS5rZXlDb2RlID09IDEzICYmIGlucHV0LnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGlmKGlucHV0LnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09ICdDTFMnKXtcclxuICAgICAgdGVybWluYWwudmFsdWUgPSBudWxsXHJcbiAgICAgIHJvYm90ID0gbmV3IFJvYm90KHRhYmxlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkaXNwbGF5KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIHZhciBpbnN0cnVjdGlvbiA9IHBhcnNlKGlucHV0LnZhbHVlKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGluc3RydWN0aW9uLCBpbnB1dC52YWx1ZSlcclxuXHJcbiAgICAgICAgcm9ib3QuaW5zdHJ1Y3QoaW5zdHJ1Y3Rpb24pXHJcbiAgICAgICAgaWYoaW5zdHJ1Y3Rpb24uY29tbWFuZCA9PT0gQ09NTUFORC5SRVBPUlQpe1xyXG4gICAgICAgICAgZGlzcGxheShyb2JvdC5yZXBvcnQoKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGRpc3BsYXkoZXJyLm1lc3NhZ2UpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlucHV0LnZhbHVlID0gbnVsbFxyXG4gIH1cclxuXHJcbn0pXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcC5qc1xuICoqLyIsImltcG9ydCB7IENPTU1BTkQsIEZBQ0lORyB9IGZyb20gJy4uL2NvbnN0cy9jb21tYW5kcydcclxuXHJcbmNvbnN0IGlzSW50ID0gKG4pID0+IHtcclxuICByZXR1cm4gTnVtYmVyKG4pID09PSBuICYmIG4gJSAxID09PSAwXHJcbn1cclxuXHJcbi8qXHJcbiAqIFBhcnNlcyB0aGUgaW5wdXQgdGV4dFxyXG4gKiBAcGFyYW0ge1t0ZXh0XX0gdGV4dCB0aGUgaW5wdXQgc3RyaW5nIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJuIHtbb2JqZWN0XX0gcG9zaXRpb24gW3t4LCB5ICwgZGlyZWN0aW9uLCB0eXBlfV1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcnNlKHRleHQpIHtcclxuICBjb25zdCBhcmdzID0gdGV4dC5zcGxpdCgvWyAsXSsvKVxyXG4gIGNvbnN0IGNvbW1hbmQgPSBhcmdzWzBdLnRvVXBwZXJDYXNlKClcclxuXHJcbiAgaWYgKGNvbW1hbmQgPT09IENPTU1BTkQuUExBQ0UpIHtcclxuICAgIGNvbnN0IHggPSBwYXJzZUludChhcmdzWzFdKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGFyZ3NbMl0pXHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBhcmdzWzNdID8gYXJnc1szXS50b1VwcGVyQ2FzZSgpIDogbnVsbFxyXG5cclxuICAgIGlmICghaXNJbnQoeCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHt4fSBwb3NpdGlvbmApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0ludCh5KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQge3h9IHBvc2l0aW9uYClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoRkFDSU5HLk1BUC5nZXQoZGlyZWN0aW9uKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBkaXJlY3Rpb25gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHgsXHJcbiAgICAgIHksXHJcbiAgICAgIGRpcmVjdGlvbixcclxuICAgICAgY29tbWFuZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYoIUNPTU1BTkQuTUFQLmdldChjb21tYW5kKSl7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29tbWFuZC5gKVxyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgY29tbWFuZDogQ09NTUFORC5NQVAuZ2V0KGNvbW1hbmQpXHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3BhcnNlLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IEZBQ0lORyA9IHtcblxuICBNQVA6IG5ldyBNYXAoKSxcblxuICBOT1JUSDogJ05PUlRIJyxcbiAgRUFTVDogJ0VBU1QnLFxuICBXRVNUOiAnV0VTVCcsXG4gIFNPVVRIOiAnU09VVEgnXG59XG5cbkZBQ0lORy5NQVAuc2V0KCdOT1JUSCcsIEZBQ0lORy5OT1JUSClcbkZBQ0lORy5NQVAuc2V0KCdFQVNUJywgRkFDSU5HLkVBU1QpXG5GQUNJTkcuTUFQLnNldCgnV0VTVCcsIEZBQ0lORy5XRVNUKVxuRkFDSU5HLk1BUC5zZXQoJ1NPVVRIJywgRkFDSU5HLlNPVVRIKVxuXG5leHBvcnQgY29uc3QgQ09NTUFORCA9IHtcbiAgTUFQOiBuZXcgTWFwKCksXG4gIFBMQUNFOiAnUExBQ0UnLFxuICBNT1ZFOiAnTU9WRScsXG4gIFJFUE9SVDogJ1JFUE9SVCdcbn1cblxuZXhwb3J0IGNvbnN0IFJPVEFURSA9IHtcbiAgUklHSFQ6ICdSSUdIVCcsXG4gIExFRlQ6ICdMRUZUJ1xufVxuXG5DT01NQU5ELk1BUC5zZXQoJ1BMQUNFJywgQ09NTUFORC5QTEFDRSlcbkNPTU1BTkQuTUFQLnNldCgnTU9WRScsIENPTU1BTkQuTU9WRSlcbkNPTU1BTkQuTUFQLnNldCgnUkVQT1JUJywgQ09NTUFORC5SRVBPUlQpXG5DT01NQU5ELk1BUC5zZXQoJ0xFRlQnLCBST1RBVEUuTEVGVClcbkNPTU1BTkQuTUFQLnNldCgnUklHSFQnLCBST1RBVEUuUklHSFQpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25zdHMvY29tbWFuZHMuanNcbiAqKi8iLCJpbXBvcnQgeyBGQUNJTkcsIENPTU1BTkQsIFJPVEFURSB9IGZyb20gJy4vY29uc3RzL2NvbW1hbmRzJ1xyXG5pbXBvcnQgeyBMZWZ0TWFwLCBSaWdodE1hcCB9IGZyb20gJy4vdXRpbC9kaXJlY3Rpb25SZXNvbHZlcidcclxuXHJcbmxldCBfeCA9IG51bGxcclxubGV0IF95ID0gbnVsbFxyXG5sZXQgX2RpcmVjdGlvbiA9IG51bGxcclxubGV0IF90YWJsZVxyXG5cclxuY29uc3QgbW92ZU5vcnRoID0gKCkgPT4ge1xyXG4gIGlmIChfdGFibGUuaXNPblRhYmxlKF95ICsgMSkpIHtcclxuICAgIF95KytcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ0ludmFsaWQgcGxhY2VtZW50JylcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG1vdmVTb3V0aCA9ICgpID0+IHtcclxuICBpZiAoX3RhYmxlLmlzT25UYWJsZShfeSAtIDEpKSB7XHJcbiAgICBfeS0tXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtb3ZlRWFzdCA9ICgpID0+IHtcclxuICBpZiAoX3RhYmxlLmlzT25UYWJsZShfeCArIDEpKSB7XHJcbiAgICBfeCsrXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtb3ZlV2VzdCA9ICgpID0+IHtcclxuICBpZiAoX3RhYmxlLmlzT25UYWJsZShfeCAtIDEpKSB7XHJcbiAgICBfeC0tXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBsYWNlbWVudCcpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2JvdCB7XHJcbiAgY29uc3RydWN0b3IodGFibGUpIHtcclxuICAgIGlmICghdGFibGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YWJsZSBpcyByZXF1aXJlZCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfdGFibGUgPSB0YWJsZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5zdHJ1Y3QoaW5zdHJ1Y3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY29tbWFuZCwgZGlyZWN0aW9uLCB4LCB5IH0gPSBpbnN0cnVjdGlvblxyXG4gICAgY29uc29sZS5sb2coX3gsIF95LCBfZGlyZWN0aW9uKVxyXG5cclxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xyXG4gICAgICBjYXNlIENPTU1BTkQuUkVQT1JUOlxyXG4gICAgICAgIHRoaXMucmVwb3J0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIENPTU1BTkQuTU9WRTpcclxuICAgICAgICB0aGlzLm1vdmUoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgUk9UQVRFLkxFRlQ6XHJcbiAgICAgICAgdGhpcy50dXJuTGVmdCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBST1RBVEUuUklHSFQ6XHJcbiAgICAgICAgdGhpcy50dXJuUmlnaHQoKVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgQ09NTUFORC5QTEFDRTpcclxuICAgICAgICB0aGlzLnBsYWNlKHgsIHksIGRpcmVjdGlvbilcclxuICAgICAgICBicmVha1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjb21tYW5kYClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHR1cm5MZWZ0KCkge1xyXG4gICAgX2RpcmVjdGlvbiA9IExlZnRNYXAuZ2V0KF9kaXJlY3Rpb24pXHJcbiAgICBjb25zb2xlLmxvZygnRmFjaW5nOicsIF9kaXJlY3Rpb24pXHJcbiAgfVxyXG5cclxuICB0dXJuUmlnaHQoKSB7XHJcbiAgICBfZGlyZWN0aW9uID0gUmlnaHRNYXAuZ2V0KF9kaXJlY3Rpb24pXHJcbiAgICBjb25zb2xlLmxvZygnRmFjaW5nOicsIF9kaXJlY3Rpb24pXHJcbiAgfVxyXG5cclxuICBwbGFjZSh4LCB5LCBkaXJlY3Rpb24pIHtcclxuICAgIGlmKEZBQ0lORy5NQVAuZ2V0KGRpcmVjdGlvbikpe1xyXG4gICAgICBfZGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZGlyZWN0aW9uYClcclxuICAgIH1cclxuICAgIGlmIChfdGFibGUuaXNWYWxpZFBsYWNlbWVudCh4LCB5KSkge1xyXG4gICAgICBfeCA9IHhcclxuICAgICAgX3kgPSB5XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGxhY2VtZW50OiAke3h9LCAke3l9YClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlcG9ydCgpIHtcclxuICAgIGlmKF94ID09PSBudWxsIHx8IF95ID09PSBudWxsIHx8IF9kaXJlY3Rpb24gPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgUmVwb3J0IHdpdGhvdXQgcGxhY2luZyByb2JvdCcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhfeCwgX3ksIF9kaXJlY3Rpb24pXHJcbiAgICAgIHJldHVybiBgT3V0cHV0OiAke194fSwgJHtfeX0sICR7X2RpcmVjdGlvbn1gXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYoIV9kaXJlY3Rpb24pe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpcmVjdGlvbiBtdXN0IGJlIHNldC4nKVxyXG4gICAgfVxyXG4gICAgc3dpdGNoIChfZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgRkFDSU5HLk5PUlRIOlxyXG4gICAgICAgIG1vdmVOb3J0aCgpXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSBGQUNJTkcuU09VVEg6XHJcbiAgICAgICAgbW92ZVNvdXRoKClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIEZBQ0lORy5FQVNUOlxyXG4gICAgICAgIG1vdmVFYXN0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIEZBQ0lORy5XRVNUOlxyXG4gICAgICAgIG1vdmVXZXN0KClcclxuICAgICAgICBicmVha1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkaXJlY3Rpb24nKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUm9ib3QuanNcbiAqKi8iLCJpbXBvcnQgeyBGQUNJTkcgfSBmcm9tICcuLi9jb25zdHMvY29tbWFuZHMnXG5cbmV4cG9ydCBjb25zdCBMZWZ0TWFwID0gbmV3IE1hcCgpXG5cbkxlZnRNYXAuc2V0KEZBQ0lORy5OT1JUSCwgRkFDSU5HLldFU1QpXG5MZWZ0TWFwLnNldChGQUNJTkcuV0VTVCwgRkFDSU5HLlNPVVRIKVxuTGVmdE1hcC5zZXQoRkFDSU5HLlNPVVRILCBGQUNJTkcuRUFTVClcbkxlZnRNYXAuc2V0KEZBQ0lORy5FQVNULCBGQUNJTkcuTk9SVEgpXG5cbmV4cG9ydCBjb25zdCBSaWdodE1hcCA9IG5ldyBNYXAoKVxuXG5SaWdodE1hcC5zZXQoRkFDSU5HLk5PUlRILCBGQUNJTkcuRUFTVClcblJpZ2h0TWFwLnNldChGQUNJTkcuRUFTVCwgRkFDSU5HLlNPVVRIKVxuUmlnaHRNYXAuc2V0KEZBQ0lORy5TT1VUSCwgRkFDSU5HLldFU1QpXG5SaWdodE1hcC5zZXQoRkFDSU5HLldFU1QsIEZBQ0lORy5OT1JUSClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvZGlyZWN0aW9uUmVzb2x2ZXIuanNcbiAqKi8iLCJsZXQgX3NpemVcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIHtcclxuXHJcbiAgLypcclxuICAgKiBAcGFyYW0gIHtbdHlwZV19IHNpemUgLSA1IGNyZWF0ZXMgYSBib2FyZCAwIC0+IDRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICBfc2l6ZSA9IHNpemUgfHwgNVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZFBsYWNlbWVudCh4LCB5KSB7XHJcbiAgICByZXR1cm4geCA8IF9zaXplICYmIHkgPCBfc2l6ZSAmJiB4ID49IDAgJiYgeSA+PSAwXHJcbiAgfVxyXG5cclxuICBpc09uVGFibGUocG9zKSB7XHJcbiAgICByZXR1cm4gcG9zIDwgX3NpemUgJiYgcG9zID49IDBcclxuICB9XHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhYmxlLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3R5bGVzL2FwcC5zY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJpbnB1dCwgdGV4dGFyZWEge1xcbiAgZm9udC1zaXplOiAxMjUlO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiA2MDBweDsgfVxcblxcbnRleHRhcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHJlc2l6ZTogbm9uZTtcXG4gIGhlaWdodDogMTUwcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmhpbnQge1xcbiAgY29sb3I6ICNBQ0FDQUM7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBmb250LXNpemU6IDE0cHg7IH1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjBFMDtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi9zdHlsZXMvYXBwLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9