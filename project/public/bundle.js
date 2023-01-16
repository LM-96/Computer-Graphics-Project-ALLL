var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("types/functional", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractFunctionalObject = void 0;
    /**
     * The abstract implementation of a `FunctionalObject`
     */
    class AbstractFunctionalObject {
        map(mapper) {
            return mapper(this);
        }
        apply(block) {
            return block(this);
        }
    }
    exports.AbstractFunctionalObject = AbstractFunctionalObject;
});
define("types/exceptions/index-out-of-bound-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IndexOutOfBoundException = void 0;
    /**
     * An exception that is thrown when it is tried to access an invalid index/position
     * in somewhere
     */
    class IndexOutOfBoundException extends Error {
        constructor(triedIndex) {
            super("invalid index " + triedIndex);
            this.triedIndex = triedIndex;
            Object.setPrototypeOf(this, IndexOutOfBoundException.prototype);
        }
    }
    exports.IndexOutOfBoundException = IndexOutOfBoundException;
});
define("types/equatable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEquatable = void 0;
    /**
     * Checks if an object implements `Equatable`
     * @param {any} obj the object to be checked
     */
    function isEquatable(obj) {
        if (typeof obj == "object") {
            return 'equals' in obj;
        }
        return false;
    }
    exports.isEquatable = isEquatable;
});
define("types/cloneable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tryClone = exports.isCloneable = void 0;
    /**
     * Checks if an object implements `Cloneable`
     * (exposes a method to make a deep clone of the object)
     * @param {any} obj the object to be checked
     */
    // @ts-ignore
    function isCloneable(obj) {
        if (typeof obj == "object") {
            return 'clone' in obj;
        }
        return false;
    }
    exports.isCloneable = isCloneable;
    /**
     * Checks if the given object is cloneable and, if yes, returns the clone, otherwise
     * returns the same object
     * @param {T} obj the object
     * @return a clone of the object if possible, otherwise it returns the same object
     */
    function tryClone(obj) {
        if (isCloneable(obj)) {
            return obj.clone();
        }
        return obj;
    }
    exports.tryClone = tryClone;
});
define("types/copiable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tryClone = exports.isCopiable = void 0;
    /**
     * Checks if an object implements `Copiable`
     * (exposes a method to have a shallow copy of the object)
     * @param {any} obj the object to be checked
     */
    // @ts-ignore
    function isCopiable(obj) {
        if (typeof obj == "object") {
            return 'copy' in obj;
        }
        return false;
    }
    exports.isCopiable = isCopiable;
    /**
     * Checks if the given object is copiable and, if yes, returns the shallow copy, otherwise
     * returns the same object
     * @param {T} obj the object
     * @return a shallow copy of the object if possible, otherwise it returns the same object
     */
    function tryClone(obj) {
        if (isCopiable(obj)) {
            return obj.copy();
        }
        return obj;
    }
    exports.tryClone = tryClone;
});
define("types/pair", ["require", "exports", "types/functional", "types/exceptions/index-out-of-bound-exception", "types/cloneable", "geometry/matrix/matrix-factory"], function (require, exports, functional_1, index_out_of_bound_exception_1, cloneable_1, matrix_factory_1) {
    "use strict";
    var _Pair_first, _Pair_second;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.coupleAsColumnArray = exports.coupleAsRowArray = exports.coupleOf = exports.pairOf = exports.Pair = void 0;
    /**
     * An enumeration that allow to access the element to a specific position
     * in a `Pair` instance
     */
    var PairPosition;
    (function (PairPosition) {
        PairPosition[PairPosition["FIRST"] = 0] = "FIRST";
        PairPosition[PairPosition["SECOND"] = 1] = "SECOND";
    })(PairPosition || (PairPosition = {}));
    /**
     * A pair of two elements
     */
    class Pair extends functional_1.AbstractFunctionalObject {
        constructor(first, second) {
            super();
            _Pair_first.set(this, null);
            _Pair_second.set(this, null);
            __classPrivateFieldSet(this, _Pair_first, first, "f");
            __classPrivateFieldSet(this, _Pair_second, second, "f");
        }
        /**
         * Gets the element at the specified position
         * @param {PairPosition} position the position of the element to get
         * @return {F|S} the desired element
         * @throws {IndexOutOfBoundException} if the index is not valid
         */
        get(position) {
            switch (position) {
                case PairPosition.FIRST || 0: return __classPrivateFieldGet(this, _Pair_first, "f");
                case PairPosition.SECOND || 1: return __classPrivateFieldGet(this, _Pair_second, "f");
                default:
                    throw new index_out_of_bound_exception_1.IndexOutOfBoundException(position);
            }
        }
        /**
         * Sets the element of this pair at the specified position.
         * Please notice that **this method is not safe cause it is not possible to check the type** of
         * the value to be set
         * @param {F|S} value the value to be set
         * @param {PairPosition} position the position in which put the new value
         * @throws {IndexOutOfBoundException} if the index is not valid
         */
        set(value, position) {
            switch (position) {
                case PairPosition.FIRST: __classPrivateFieldSet(this, _Pair_first, value, "f");
                case PairPosition.SECOND: __classPrivateFieldSet(this, _Pair_second, value, "f");
                default:
                    throw new index_out_of_bound_exception_1.IndexOutOfBoundException(position);
            }
        }
        /**
         * Returns the **first** element of this pair
         */
        getFirst() {
            return __classPrivateFieldGet(this, _Pair_first, "f");
        }
        /**
         * Returns the **second** element of this pair
         */
        getSecond() {
            return __classPrivateFieldGet(this, _Pair_second, "f");
        }
        /**
         * Sets the **first** element of this pair
         * @param {F|null} first the first element
         */
        setFirst(first) {
            __classPrivateFieldSet(this, _Pair_first, first, "f");
        }
        /**
         * Sets the **second** element of this pair
         * @param {S|null} second the first element
         */
        setSecond(second) {
            __classPrivateFieldSet(this, _Pair_second, second, "f");
        }
        /**
         * Returns a copy of this pair which contains the same elements in this but with
         * the **reverse order** (the `first` element of this will become the `second` of the new, the
         * `second` element of this will become the `first` of the new)
         */
        reverted() {
            return new Pair(__classPrivateFieldGet(this, _Pair_second, "f"), __classPrivateFieldGet(this, _Pair_first, "f"));
        }
        /**
         * Collects the two element of this pair to produce a single result
         * @param {(first: F, second: S) => R} collector the function that accepts the two elements of this pair
         * and returns the result
         */
        collect(collector) {
            return collector(__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f"));
        }
        /**
         * Applies the `mapper` function on the **first** element of this pair and
         * returns a new pair which contains the result of this function as the first
         * element and the second element that is the second one of this pair
         * @param {(first: F|null) => R} mapper the transformation function for the `first` element
         * @return {Pair<R, S>} the new pair with the transformed first element
         */
        mapFirst(mapper) {
            return new Pair(mapper(__classPrivateFieldGet(this, _Pair_first, "f")), __classPrivateFieldGet(this, _Pair_second, "f"));
        }
        /**
         * Applies the `mapper` function on the **second** element of this pair and
         * returns a new pair which contains the result of this function as the second
         * element and the first element that is the first one of this pair
         * @param {(second: S|null) => R} mapper the transformation function for the `second` element
         * @return {Pair<R, S>} the new pair with the transformed second element
         */
        mapSecond(mapper) {
            return new Pair(__classPrivateFieldGet(this, _Pair_first, "f"), mapper(__classPrivateFieldGet(this, _Pair_second, "f")));
        }
        /**
         * Returns an array containing the two elements in this pair, preserving the order
         */
        toArray() {
            return [__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f")];
        }
        /**
         * Returns a clone of this pair. Every changes over the returning value **will not have effects** on
         * this.
         * **Notice that the copy will be deep only if the two elements are `Cloneable` themselves**, otherwise
         * the clone will be a shallow copy equivalent to the result of `copy()`
         */
        clone() {
            return new Pair((0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Pair_first, "f")), (0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Pair_second, "f")));
        }
        /**
         * Returns a shallow copy of this pair.
         * Every changes over the returning value **will not have effects** on this but changes on the elements
         * can be propagated (is a *shallow copy*)
         */
        copy() {
            return new Pair(__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f"));
        }
        toString() {
            return "Pair(" + __classPrivateFieldGet(this, _Pair_first, "f") + ", " + __classPrivateFieldGet(this, _Pair_second, "f") + ")";
        }
        /**
         * Returns `true` the `other` object is a `Pair` with the two elements that are
         * equals (intended as `===`) to the ones in this pair
         * @param {any} other the other object
         * @return {boolean} `true` if the `other` is a pair equals to this
         */
        equals(other) {
            if (other != null) {
                if (other instanceof Pair) {
                    return __classPrivateFieldGet(this, _Pair_first, "f") === __classPrivateFieldGet(other, _Pair_first, "f") && __classPrivateFieldGet(this, _Pair_second, "f") === __classPrivateFieldGet(other, _Pair_second, "f");
                }
            }
            return false;
        }
    }
    exports.Pair = Pair;
    _Pair_first = new WeakMap(), _Pair_second = new WeakMap();
    /**
     * Creates and returns a new **pair** with the two elements given as parameters
     * @param {F|null} first the first element
     * @param {S|null} second the second element
     * @return {Pair<F, S>} the new created pair
     */
    function pairOf(first, second) {
        return new Pair(first, second);
    }
    exports.pairOf = pairOf;
    /**
     * Creates and returns a new **couple** with the two elements given as parameters
     * @param {T|null} first the first element
     * @param {T|null} second the second element
     * @return {Couple<T>} the new created couple
     */
    function coupleOf(first, second) {
        return new Pair(first, second);
    }
    exports.coupleOf = coupleOf;
    /**
     * Creates and returns a row array intended as a *1x2* matrix
     * @param {Couple<T>} couple the couple to be converted
     * @return a *1x2* matrix with the elements of the given pair
     */
    function coupleAsRowArray(couple) {
        let data = couple.toArray();
        return (0, matrix_factory_1.matrix)(data);
    }
    exports.coupleAsRowArray = coupleAsRowArray;
    /**
     * Creates and returns a column array intended as a *2x1* matrix
     * @param {Couple<T>} couple the couple to be converted
     * @return a *2x1* matrix with the elements of the given pair
     */
    function coupleAsColumnArray(couple) {
        let data = new Array(2);
        for (let r = 0; r < data.length; r++) {
            data[r] = [couple.get(r)];
        }
        return (0, matrix_factory_1.matrix)(data);
    }
    exports.coupleAsColumnArray = coupleAsColumnArray;
});
define("geometry/matrix/matrix", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FlatType = void 0;
    var FlatType;
    (function (FlatType) {
        FlatType[FlatType["BY_ROWS"] = 0] = "BY_ROWS";
        FlatType[FlatType["BY_COLUMNS"] = 1] = "BY_COLUMNS";
    })(FlatType = exports.FlatType || (exports.FlatType = {}));
});
define("geometry/matrix/matrix-types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/illegal-argument-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IllegalArgumentException = void 0;
    /**
     * An exception that is thrown when a column is not valid for a reason
     */
    class IllegalArgumentException extends Error {
        constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, IllegalArgumentException.prototype);
        }
    }
    exports.IllegalArgumentException = IllegalArgumentException;
});
define("geometry/matrix/exceptions/illegal-column-index-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IllegalColumnIndexException = void 0;
    /**
     * An exception that is thrown when has been request access to an invalid column
     */
    class IllegalColumnIndexException extends Error {
        constructor(triedColumnIndex, maxAllowedColumnIndex = null) {
            let msg;
            if (maxAllowedColumnIndex != null) {
                msg = "invalid index [" + triedColumnIndex + "] for column: the index MUST be between [0] and [" +
                    maxAllowedColumnIndex + "]";
            }
            else {
                msg = "invalid index [" + triedColumnIndex + "]";
            }
            super(msg);
            Object.setPrototypeOf(this, IllegalColumnIndexException.prototype);
        }
    }
    exports.IllegalColumnIndexException = IllegalColumnIndexException;
});
define("geometry/matrix/exceptions/illegal-row-index-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IllegalRowIndexException = void 0;
    /**
     * An exception that is thrown when has been request access to an invalid row
     */
    class IllegalRowIndexException extends Error {
        constructor(triedRowIndex, maxAllowedRowIndex = null) {
            let msg;
            if (maxAllowedRowIndex != null) {
                msg = "invalid index [" + triedRowIndex + "] for row:  the index MUST be between [0] and [" +
                    maxAllowedRowIndex + "]";
            }
            else {
                msg = "invalid index [" + triedRowIndex + "]";
            }
            super(msg);
            Object.setPrototypeOf(this, IllegalRowIndexException.prototype);
        }
    }
    exports.IllegalRowIndexException = IllegalRowIndexException;
});
define("geometry/matrix/abstract-matrix", ["require", "exports", "geometry/matrix/matrix", "geometry/matrix/exceptions/illegal-column-index-exception", "geometry/matrix/exceptions/illegal-row-index-exception", "geometry/matrix/matrix-factory", "types/illegal-argument-exception", "types/pair"], function (require, exports, matrix_1, illegal_column_index_exception_1, illegal_row_index_exception_1, matrix_factory_2, illegal_argument_exception_1, pair_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractMatrix = void 0;
    class AbstractMatrix {
        checkValidColumnIndex(columnIndex, throwError) {
            if (throwError == undefined) {
                throwError = false;
            }
            if (columnIndex < 0 || columnIndex >= this.columnSize()) {
                if (throwError) {
                    throw new illegal_column_index_exception_1.IllegalColumnIndexException(columnIndex, this.columnSize() - 1);
                }
                return true;
            }
        }
        checkValidIndexes(rowIndex, columnIndex, throwError) {
            if (throwError == undefined) {
                throwError = false;
            }
            if (this.checkValidRowIndex(rowIndex, throwError))
                return this.checkValidColumnIndex(columnIndex, throwError);
            return false;
        }
        checkValidRowIndex(rowIndex, throwError) {
            if (throwError == undefined) {
                throwError = false;
            }
            if (rowIndex < 0 || rowIndex >= this.rowSize()) {
                if (throwError) {
                    throw new illegal_row_index_exception_1.IllegalRowIndexException(rowIndex, this.rowSize() - 1);
                }
                return true;
            }
        }
        clone(rowIndexesToRemove, columnIndexesToRemove) {
            if (rowIndexesToRemove == undefined) {
                rowIndexesToRemove = [];
            }
            if (columnIndexesToRemove == undefined) {
                columnIndexesToRemove = [];
            }
            let res;
            if (rowIndexesToRemove.length == 0 && columnIndexesToRemove.length == 0) {
                /* Normal Clone *************************************************** */
                res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res.set(this.get(r, c), r, c);
                    }
                }
            }
            else {
                /* Clone with cuts ************************************************ */
                res = this.getFactory().createMatrix(this.rowSize() - rowIndexesToRemove.length, this.columnSize() - columnIndexesToRemove.length);
                let rR = 0;
                let cR = 0;
                for (let r = 0; r < this.rowSize(); r++) {
                    if (!rowIndexesToRemove.includes(r)) {
                        cR = 0;
                        for (let c = 0; r < this.columnSize(); c++) {
                            if (!columnIndexesToRemove.includes(c)) {
                                res.set(this.get(r, c), rR, cR);
                                cR++;
                            }
                        }
                        rR++;
                    }
                }
            }
            return res;
        }
        elementSize() {
            return this.rowSize() * this.columnSize();
        }
        equals(other) {
            if (other != null) {
                if (other instanceof AbstractMatrix) {
                    if (this.sameStructureOf(other)) {
                        for (let row = 0; row < this.rowSize(); row++) {
                            for (let col = 0; col < this.columnSize(); col++) {
                                if (this.get(row, col) !== other.get(row, col)) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        flatten(flatType) {
            if (flatType == undefined) {
                flatType = matrix_1.FlatType.BY_ROWS;
            }
            let res = Array(this.elementSize());
            switch (flatType) {
                case matrix_1.FlatType.BY_ROWS: {
                    for (let r = 0; r < this.rowSize(); r++) {
                        for (let c = 0; c < this.columnSize(); c++) {
                            res[r * this.columnSize() + c] = this.get(r, c);
                        }
                    }
                    break;
                }
                case matrix_1.FlatType.BY_COLUMNS: {
                    for (let r = 0; r < this.rowSize(); r++) {
                        for (let c = 0; c < this.columnSize(); c++) {
                            res[c * this.rowSize() + r] = this.get(r, c);
                        }
                    }
                    break;
                }
            }
            return res;
        }
        forEachColumn(block) {
            for (let c = 0; c < this.columnSize(); c++) {
                block(this.getColumn(c), c);
            }
        }
        forEachElement(block) {
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    block(this.get(r, c), r, c);
                }
            }
        }
        forEachRow(block) {
            for (let r = 0; r < this.rowSize(); r++) {
                block(this.getRow(r), r);
            }
        }
        getCofactor(rowIndex, columnIndex) {
            this.checkValidIndexes(rowIndex, columnIndex, true);
            return Math.pow(-1, rowIndex + columnIndex) * (this.getMinor(rowIndex, columnIndex).determinant());
        }
        getCofactorMatrix() {
            let res = this.getFactory().createNumberMatrix(this.rowSize(), this.columnSize());
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    res.set(this.getCofactor(r, c), r, c);
                }
            }
            return res;
        }
        getMinor(rowIndex, columnIndex) {
            this.checkValidIndexes(rowIndex, columnIndex, true);
            let data = (0, matrix_factory_2.matrixData)(this.rowSize() - 1, this.columnSize() - 1);
            let rR = 0;
            let cR = 0;
            for (let r = 0; r < this.rowSize(); r++) {
                if (r != rowIndex) {
                    cR = 0;
                    for (let c = 0; c < this.columnSize(); c++) {
                        if (c != columnIndex) {
                            data[rR][cR] = this.get(r, c);
                            cR++;
                        }
                    }
                    rR++;
                }
            }
            return this.getFactory().createMatrix(data);
        }
        isDiagonal() {
            let element;
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    if (r != c) {
                        element = this.get(r, c);
                        if (element != null && element != 0)
                            return false;
                    }
                }
            }
            return true;
        }
        isInvertible() {
            return this.isSquared() && this.determinant() != 0;
        }
        isLowerTriangular() {
            let element;
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    if (r < c) {
                        element = this.get(r, c);
                        if (element != null && element != 0)
                            return false;
                    }
                }
            }
            return true;
        }
        isSquared() {
            return this.rowSize() === this.columnSize();
        }
        isTriangular() {
            return this.isUpperTriangular() || this.isLowerTriangular();
        }
        isUpperTriangular() {
            let element;
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    if (r > c) {
                        element = this.get(r, c);
                        if (element != null && element != 0)
                            return false;
                    }
                }
            }
            return true;
        }
        mapColumnByColumn(mapper) {
            let res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
            for (let c = 0; c < res.columnSize(); c++) {
                res.setColumn(mapper(this.getColumn(c), c), c);
            }
            return res;
        }
        mapElementByElement(mapper) {
            let res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
            for (let r = 0; r < res.rowSize(); r++) {
                for (let c = 0; c < res.columnSize(); c++) {
                    res.set(mapper(this.get(r, c), r, c), r, c);
                }
            }
            return res;
        }
        mapRowByRow(mapper) {
            let res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
            for (let r = 0; r < res.rowSize(); r++) {
                res.setRow(mapper(this.getRow(r), r), r);
            }
            return res;
        }
        sameStructureOf(other) {
            return this.rowSize() == other.rowSize() && this.columnSize() == other.columnSize();
        }
        size() {
            return (0, pair_1.coupleOf)(this.rowSize(), this.columnSize());
        }
        subMatrix(topRow, leftColumn, bottomRow, rightColumn) {
            if (bottomRow == undefined) {
                bottomRow = this.rowSize() - 1;
            }
            if (rightColumn == undefined) {
                rightColumn = this.columnSize() - 1;
            }
            // Check all >= 0
            if (topRow < 0)
                throw new illegal_argument_exception_1.IllegalArgumentException("top row [" + topRow + "] MUST be greater than 0");
            if (bottomRow < 0)
                throw new illegal_argument_exception_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST be greater than 0");
            if (rightColumn < 0)
                throw new illegal_argument_exception_1.IllegalArgumentException("right column [" + rightColumn + "] MUST be greater than 0");
            if (leftColumn < 0)
                throw new illegal_argument_exception_1.IllegalArgumentException("left column [" + leftColumn + "] MUST be greater than 0");
            // Check coherence
            if (bottomRow < topRow)
                throw new illegal_argument_exception_1.IllegalArgumentException("bottom row [" + bottomRow + "] must be greater than top row [" + topRow + "]");
            if (rightColumn < leftColumn)
                throw new illegal_argument_exception_1.IllegalArgumentException("right column [" + rightColumn + "] must be greater than left column [" + leftColumn + "]");
            //Check inside matrix
            if (topRow >= this.rowSize())
                throw new illegal_argument_exception_1.IllegalArgumentException("top row [" + topRow + "] MUST NOT go outside the matrix");
            if (bottomRow >= this.rowSize())
                throw new illegal_argument_exception_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST NOT go outside the matrix");
            if (leftColumn >= this.columnSize())
                throw new illegal_argument_exception_1.IllegalArgumentException("left column [" + leftColumn + "] MUST NOT go outside the matrix");
            if (rightColumn >= this.columnSize())
                throw new illegal_argument_exception_1.IllegalArgumentException("left column [" + rightColumn + "] MUST NOT go outside the matrix");
            let res = this.getFactory().createMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1);
            for (let r = topRow; r <= bottomRow; r++) {
                for (let c = leftColumn; c <= rightColumn; c++) {
                    this.set(this.get(r, c), r - topRow, c - leftColumn);
                }
            }
            return res;
        }
        toArrayOfColumns() {
            let res = new Array();
            for (let c = 0; c < this.columnSize(); c++) {
                res.push(this.getColumn(c));
            }
            return res;
        }
        toArrayOfRows() {
            let res = new Array();
            for (let r = 0; r < this.rowSize(); r++) {
                res.push(this.getRow(r));
            }
            return res;
        }
        trace() {
            if (!this.isSquared()) {
                throw new illegal_argument_exception_1.IllegalArgumentException("this matrix is not squared [size: " + this.size().toArray() + "]");
            }
            let res = 0;
            for (let i = 0; i < this.rowSize(); i++)
                res += this.get(i, i);
            return res;
        }
        toString() {
            return this.toArrayOfRows().toString();
        }
    }
    exports.AbstractMatrix = AbstractMatrix;
});
define("geometry/matrix/exceptions/not-invertible-matrix-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotInvertibleMatrixException = exports.NotInvertibleReason = void 0;
    /**
     * The reason why is not possible to invert a matrix
     */
    var NotInvertibleReason;
    (function (NotInvertibleReason) {
        NotInvertibleReason[NotInvertibleReason["NOT_SQUARED"] = 0] = "NOT_SQUARED";
        NotInvertibleReason[NotInvertibleReason["ZERO_DETERMINANT"] = 1] = "ZERO_DETERMINANT";
    })(NotInvertibleReason = exports.NotInvertibleReason || (exports.NotInvertibleReason = {}));
    /**
     * An exception that is thrown when a matrix is not invertible
     */
    class NotInvertibleMatrixException extends Error {
        constructor(reason) {
            let msg = "this matrix is not invertible: ";
            switch (reason) {
                case NotInvertibleReason.NOT_SQUARED: {
                    msg += "matrix is not squared";
                    break;
                }
                case NotInvertibleReason.ZERO_DETERMINANT: {
                    msg += "the determinant is 0";
                    break;
                }
            }
            super(msg);
            this.reason = reason;
            Object.setPrototypeOf(this, NotInvertibleMatrixException);
        }
    }
    exports.NotInvertibleMatrixException = NotInvertibleMatrixException;
});
define("geometry/matrix/matrix-algebra", ["require", "exports", "geometry/matrix/matrix-factory", "types/illegal-argument-exception", "geometry/matrix/exceptions/not-invertible-matrix-exception"], function (require, exports, matrix_factory_3, illegal_argument_exception_2, not_invertible_matrix_exception_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MatrixAlgebra = void 0;
    /**
     * A class with methods to realize operation between matrix following the algebra of matrices
     */
    class MatrixAlgebra {
        static add(mat1, mat2OrScalar) {
            let res;
            if (typeof mat2OrScalar == "number") {
                let scalar = mat2OrScalar;
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat1.columnSize());
                for (let r = 0; r < mat1.rowSize(); r++) {
                    for (let c = 0; c < mat1.columnSize(); c++) {
                        res.set(mat1.get(r, c) + scalar, r, c);
                    }
                }
            }
            else {
                let mat2 = mat2OrScalar;
                if (!mat1.sameStructureOf(mat2)) {
                    throw new illegal_argument_exception_2.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                        mat1.rowSize() + " x " + mat1.columnSize() + " while the argument has " + mat2.rowSize() +
                        " x " + mat2.columnSize());
                }
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat1.columnSize());
                for (let r = 0; r < mat1.rowSize(); r++) {
                    for (let c = 0; c < mat1.columnSize(); c++) {
                        res.set(mat1.get(r, c) + mat2.get(r, c), r, c);
                    }
                }
            }
            return res;
        }
        static subtract(mat1, mat2OrScalar) {
            let res;
            if (typeof mat2OrScalar == "number") {
                let scalar = mat2OrScalar;
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat1.columnSize());
                for (let r = 0; r < mat1.rowSize(); r++) {
                    for (let c = 0; c < mat1.columnSize(); c++) {
                        res.set(mat1.get(r, c) - scalar, r, c);
                    }
                }
            }
            else {
                let mat2 = mat2OrScalar;
                if (!mat1.sameStructureOf(mat2)) {
                    throw new illegal_argument_exception_2.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                        mat1.rowSize() + " x " + mat1.columnSize() + " while the argument has " + mat2.rowSize() +
                        " x " + mat2.columnSize());
                }
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat1.columnSize());
                for (let r = 0; r < mat1.rowSize(); r++) {
                    for (let c = 0; c < mat1.columnSize(); c++) {
                        res.set(mat1.get(r, c) - mat2.get(r, c), r, c);
                    }
                }
            }
            return res;
        }
        static multiply(mat1, mat2OrScalar) {
            let res;
            if (typeof mat2OrScalar == "number") {
                let scalar = mat2OrScalar;
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat1.columnSize());
                for (let r = 0; r < mat1.rowSize(); r++) {
                    for (let c = 0; c < mat1.columnSize(); c++) {
                        res.set(mat1.get(r, c) * scalar, r, c);
                    }
                }
            }
            else {
                let mat2 = mat2OrScalar;
                if (mat1.columnSize() != mat2.columnSize()) {
                    throw new illegal_argument_exception_2.IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                        mat1.columnSize() + " while the argument has rows " + mat2.rowSize());
                }
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat2.columnSize(), 0);
                for (let rT = 0; rT < mat1.rowSize(); rT++) {
                    for (let cO = 0; cO < mat1.rowSize(); cO++) {
                        for (let rO = 0; rO < mat2.rowSize(); rO++) {
                            res.set(res.get(rT, cO) + mat1.get(rT, rO) * mat2.get(rO, cO), rT, cO);
                        }
                    }
                }
            }
            return res;
        }
        static divide(mat1, mat2OrScalar) {
            let res;
            if (typeof mat2OrScalar == "number") {
                let scalar = mat2OrScalar;
                res = (0, matrix_factory_3.matrix)(mat1.rowSize(), mat1.columnSize());
                for (let r = 0; r < mat1.rowSize(); r++) {
                    for (let c = 0; c < mat1.columnSize(); c++) {
                        res.set(mat1.get(r, c) / scalar, r, c);
                    }
                }
            }
            else {
                let mat2 = mat2OrScalar;
                if (!mat2.isSquared()) {
                    throw new illegal_argument_exception_2.IllegalArgumentException("illegal matrix: the second matrix MUST be squared");
                }
                res = this.multiply(mat1, this.invert(mat2));
            }
            return res;
        }
        /**
         * Returns the transposition of the given matrix
         * @param {Matrix<T>} mat the original matrix
         * @return {Matrix<T>} the transposed matrix
         */
        static transpose(mat) {
            let res = (0, matrix_factory_3.matrix)(mat.columnSize(), mat.rowSize());
            for (let r = 0; r < mat.rowSize(); r++) {
                for (let c = 0; c < mat.columnSize(); c++) {
                    res.set(mat.get(r, c), c, r);
                }
            }
            return res;
        }
        /**
         * Calculates and returns the determinant of the given matrix
         * This method will work properly **only if the two matrix contain only
         * numbers**: this means that the behaviour of this method is not predictable
         * using different types of matrices and will throw exceptions
         * @param {NumMatrix} matrix the original matrix
         * @return {number} the determinant of the matrix
         * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
         * is not defined to **non-squared** matrix)
         */
        static determinant(matrix) {
            if (!matrix.isSquared()) {
                throw new illegal_argument_exception_2.IllegalArgumentException("this matrix is not squared [size: " + matrix.size().toArray() +
                    "]: determinant undefined for non-squared matrix");
            }
            switch (matrix.rowSize()) {
                case 1: {
                    return matrix.get(0, 0);
                }
                case 2: {
                    return matrix.get(0, 0) * matrix.get(1, 1) - matrix.get(0, 1) * matrix.get(1, 0);
                }
                case 3: {
                    return matrix.get(0, 0) * (matrix.get(1, 1) * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 1)) -
                        matrix.get(0, 1) * (matrix.get(1, 0) * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 0)) +
                        matrix.get(0, 2) * (matrix.get(1, 0) * matrix.get(2, 1) - matrix.get(1, 1) * matrix.get(2, 0));
                }
                case 4: {
                    return matrix.get(0, 0) * matrix.get(1, 1) * matrix.get(2, 2) * matrix.get(3, 3)
                        + matrix.get(0, 0) * matrix.get(1, 2) * matrix.get(2, 3) * matrix.get(3, 1)
                        + matrix.get(0, 0) * matrix.get(1, 3) * matrix.get(2, 1) * matrix.get(3, 2)
                        - matrix.get(0, 0) * matrix.get(1, 3) * matrix.get(2, 2) * matrix.get(3, 1)
                        - matrix.get(0, 0) * matrix.get(1, 2) * matrix.get(2, 1) * matrix.get(3, 3)
                        - matrix.get(0, 0) * matrix.get(1, 1) * matrix.get(2, 3) * matrix.get(3, 2)
                        - matrix.get(0, 1) * matrix.get(1, 0) * matrix.get(2, 2) * matrix.get(3, 3)
                        - matrix.get(0, 2) * matrix.get(1, 0) * matrix.get(2, 3) * matrix.get(3, 1)
                        - matrix.get(0, 3) * matrix.get(1, 0) * matrix.get(2, 1) * matrix.get(3, 2)
                        + matrix.get(0, 3) * matrix.get(1, 0) * matrix.get(2, 2) * matrix.get(3, 1)
                        + matrix.get(0, 2) * matrix.get(1, 0) * matrix.get(2, 1) * matrix.get(3, 3)
                        + matrix.get(0, 1) * matrix.get(1, 0) * matrix.get(2, 3) * matrix.get(3, 2)
                        + matrix.get(0, 1) * matrix.get(1, 2) * matrix.get(2, 0) * matrix.get(3, 3)
                        + matrix.get(0, 2) * matrix.get(1, 3) * matrix.get(2, 0) * matrix.get(3, 1)
                        + matrix.get(0, 3) * matrix.get(1, 1) * matrix.get(2, 0) * matrix.get(3, 2)
                        - matrix.get(0, 3) * matrix.get(1, 2) * matrix.get(2, 0) * matrix.get(3, 1)
                        - matrix.get(0, 2) * matrix.get(1, 1) * matrix.get(2, 0) * matrix.get(3, 3)
                        - matrix.get(0, 1) * matrix.get(1, 3) * matrix.get(2, 0) * matrix.get(3, 2)
                        - matrix.get(0, 1) * matrix.get(1, 2) * matrix.get(2, 3) * matrix.get(3, 0)
                        - matrix.get(0, 2) * matrix.get(1, 3) * matrix.get(2, 1) * matrix.get(3, 0)
                        - matrix.get(0, 3) * matrix.get(1, 1) * matrix.get(2, 2) * matrix.get(3, 0)
                        + matrix.get(0, 3) * matrix.get(1, 2) * matrix.get(2, 1) * matrix.get(3, 0)
                        + matrix.get(0, 2) * matrix.get(1, 1) * matrix.get(2, 3) * matrix.get(3, 0)
                        + matrix.get(0, 1) * matrix.get(1, 3) * matrix.get(2, 2) * matrix.get(3, 0);
                }
                default: {
                    let res = 0;
                    let sign = 1;
                    for (let col = 0; col < matrix.columnSize(); col++) {
                        res += (sign * matrix.get(0, col) * this.determinant(this.minor(matrix, 0, col)));
                        sign *= -1;
                    }
                    return res;
                }
            }
        }
        /**
         * Returns the trace of this matrix.
         * This method will work properly **only if the two matrix contain only
         * numbers**: this means that the behaviour of this method is not predictable
         * using different types of matrices and will throw exceptions
         * @param {NumMatrix} mat the original matrix
         * @return the trace of this matrix
         * @throws {IllegalArgumentException} if this matrix is not squared
         */
        static trace(mat) {
            if (!mat.isSquared()) {
                throw new illegal_argument_exception_2.IllegalArgumentException("this matrix is not squared [size: " + mat.size().toArray() + "]");
            }
            let res = 0;
            for (let i = 0; i < mat.rowSize(); i++)
                res += mat.get(i, i);
            return res;
        }
        /**
         * Returns the *minor matrix* of the one specified as parameter.
         * The *minor matrix* is the same matrix but with the specified `row` and the specified `column`
         * dropped
         * @param {Matrix<T>} mat the original matrix
         * @param {number} row the index of the row to be dropped
         * @param {number} column the index of the column to be dropped
         * @return {Matrix<T>} the matrix with the specified row and column dropped
         * @throws {IllegalRowIndexException} if the index of the row is not valid for the given matrix
         * @throws {IllegalColumnIndexException} if the index of the column is not valid for the fiven matrix
         */
        static minor(mat, row, column) {
            let res = (0, matrix_factory_3.matrixData)(mat.rowSize() - 1, mat.columnSize() - 1);
            let rR = 0;
            let cR = 0;
            for (let r = 0; r < mat.rowSize(); r++) {
                if (r != row) {
                    cR = 0;
                    for (let c = 0; c < mat.columnSize(); c++) {
                        if (c != column) {
                            res[rR][cR] = mat.get(r, c);
                            cR++;
                        }
                    }
                    rR++;
                }
            }
            return (0, matrix_factory_3.matrix)(res);
        }
        /**
         * Calculates and returns the cofactor of the element specified by `row` and `column`
         * of the given matrix.
         * Make sure that the matrix given as parameter **contains only numbers** otherwise
         * this method will throw exceptions
         * @param {NumMatrix} mat the original matrix
         * @param {number} row the index of the row of the element
         * @param {number} column the index of the column of the element
         * @return {number} the *cofactor* of the given matrix for the specified `row` and `column`
         * @throws {IllegalRowIndexException} if the index of the row is not valid
         * @throws {IllegalColumnIndexException} if the index of the column is not valid
         * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
         * is not defined to **non-squared** matrix)
         */
        static cofactor(mat, row, column) {
            mat.checkValidIndexes(row, column, true);
            return Math.pow(-1, row + column) * (this.minor(mat, row, column).determinant());
        }
        /**
         * Computes and returns the **cofactor matrix** which is the matrix that contains
         * each element of the one given as parameter replaced with its cofactor
         * @param {NumMatrix} mat the original matrix
         * @return {NumMatrix} the *cofactor matrix*
         * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
         * is not defined to **non-squared** matrix)
         */
        static cofactorMatrix(mat) {
            let res = (0, matrix_factory_3.matrix)(mat.rowSize(), mat.columnSize());
            for (let r = 0; r < mat.rowSize(); r++) {
                for (let c = 0; c < mat.columnSize(); c++) {
                    res.set(this.cofactor(mat, r, c), r, c);
                }
            }
            return res;
        }
        /**
         * Checks if a numeric matrix is invertible and returns the determinant of the given matrix.
         * If the matrix is not invertible, this method will return `undefined`
         *
         * If `throwError` is `true`, this method will throw an error instead of returning the determinant.
         * @param {NumMatrix} mat the matrix
         * @param {boolean} throwError the flag that if `true` make this method throwing an error
         * @return {boolean} the determinant of the matrix or `undefined` if the matrix is not invertible
         * @throws NotInvertibleMatrixException if `throwError` is `true` and the matrix is not invertible
         */
        static checkInvertible(mat, throwError = false) {
            if (!mat.isSquared()) {
                if (throwError)
                    throw new not_invertible_matrix_exception_1.NotInvertibleMatrixException(not_invertible_matrix_exception_1.NotInvertibleReason.NOT_SQUARED);
                return undefined;
            }
            let determinant = this.determinant(mat);
            if (determinant == 0) {
                if (throwError)
                    throw new not_invertible_matrix_exception_1.NotInvertibleMatrixException(not_invertible_matrix_exception_1.NotInvertibleReason.ZERO_DETERMINANT);
                return undefined;
            }
            return determinant;
        }
        /**
         * Calculates and returns the inverse matrix of the one given as parameter.
         * This method will work properly **only if the two matrix contain only
         * numbers**: this means that the behaviour of this method is not predictable
         * using different types of matrices and will throw exceptions
         * @param {NumMatrix} mat the original matrix
         * @return {NumMatrix} the inverse matrix
         * @throws {NotInvertibleMatrixException} if the matrix is not invertible
         * (it's not squared or had a determinant that is 0)
         */
        static invert(mat) {
            let determinant = this.checkInvertible(mat, true);
            let res;
            res = this.cofactorMatrix(mat); /* 1. Take the cofactor matrix */
            res = this.transpose(res); /* 2. Calculate the transposed cofactor matrix (added matrix) */
            res = this.multiply(res, (1 / determinant)); /* 3. Multiply by 1/det */
            return res;
        }
        /**
         * Returns a function that represents the characteristic polynomial of the
         * given matrix
         * @param {NumMatrix} mat the original matrix
         * @return {((lambda: number) => number)} the function that allow to calculate the characteristic
         * polynomial for a given lambda
         */
        static characteristicPolynomial(mat) {
            if (!mat.isSquared()) {
                throw new illegal_argument_exception_2.IllegalArgumentException("the given matrix is not squared: unable to calculate the " +
                    "characteristic polynomial");
            }
            return function (lambda) {
                return MatrixAlgebra.determinant(MatrixAlgebra.subtract(mat, MatrixAlgebra.multiply((0, matrix_factory_3.identityMatrix)(mat.rowSize()), lambda)));
            };
        }
    }
    exports.MatrixAlgebra = MatrixAlgebra;
});
define("geometry/matrix/exceptions/invalid-row-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidRowException = void 0;
    class InvalidRowException extends Error {
        constructor(row, reason) {
            super("invalid row {" + row + "}: " + reason);
            Object.setPrototypeOf(this, InvalidRowException.prototype);
        }
    }
    exports.InvalidRowException = InvalidRowException;
});
define("types/arrays", ["require", "exports", "types/illegal-argument-exception"], function (require, exports, illegal_argument_exception_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Arrays = void 0;
    class Arrays {
        /**
         * Copies the `src` array into `dst`.
         * This method will consider all different cases about the lenghts of the arrays:
         *
         * - if `src.length == dst.length` the source array will be entirely copied into the destination
         * with no problems so, at the end, `dst` will be an exact clone of `src`
         *
         * - if `src.length > dst.length` then `dst` will be a *truncated* copy of `src` (the copy will be stopped
         * when `dst` has no more index available)
         *
         * - if `src.length < dst.length` then `src` will be entirely copied to `dst` and the exceeded indexes will
         * be not touched by this method
         * @param {Array<T>} src the source array
         * @param {Array<T>} dst the destination array
         */
        static copy(src, dst) {
            for (let i = 0; i < Math.min(src.length, dst.length); i++) {
                dst[i] = src[i];
            }
        }
        /**
         * Copies the `src` array of array to `dst` (2-dimensional array)
         * The copy will follow the mechanism explained in the `Arrays.copy()` method that copy
         * *until is possible*
         * @param {Array<Array<T>>} src the source array
         * @param {Array<Array<T>>} dst the destination array
         */
        static copy2(src, dst) {
            let srci;
            let dsti;
            for (let i = 0; i < Math.min(src.length, dst.length); i++) {
                srci = src[i];
                dsti = dst[i];
                for (let j = 0; j < Math.min(srci.length, dsti.length); j++) {
                    dsti[j] = srci[j];
                }
            }
        }
        static clone(original, newLength) {
            if (newLength == undefined) {
                newLength = original.length;
            }
            else {
                if (newLength < 0) {
                    throw new illegal_argument_exception_3.IllegalArgumentException("newLength can not be negative");
                }
            }
            let res = new Array(newLength);
            for (let i = 0; i < newLength; i++) {
                res[i] = original[i];
            }
            return res;
        }
        static clone2(original, newHigh, newLength) {
            let res;
            let originali;
            let resi;
            if (newHigh == undefined && newLength == undefined) {
                res = new Array(original.length);
                for (let i = 0; i < original.length; i++) {
                    originali = original[i];
                    resi = new Array(originali.length);
                    for (let j = 0; j < resi.length; j++) {
                        resi[j] = originali[j];
                    }
                    res[i] = resi;
                }
            }
            else if (newHigh != undefined && newLength == undefined) {
                if (newHigh < 0) {
                    throw new illegal_argument_exception_3.IllegalArgumentException("newHigh can not be negative");
                }
                res = new Array(newHigh);
                for (let i = 0; i < Math.min(newHigh, original.length); i++) {
                    originali = original[i];
                    resi = new Array();
                    for (let j = 0; j < originali.length; j++) {
                        resi[j] = originali[j];
                    }
                    res[i] = resi;
                }
            }
            else if (newHigh == undefined && newLength != undefined) {
                if (newLength < 0) {
                    throw new illegal_argument_exception_3.IllegalArgumentException("newLength can not be negative");
                }
                res = new Array(original.length);
                for (let i = 0; i < original.length; i++) {
                    originali = original[i];
                    resi = new Array();
                    for (let j = 0; j < Math.min(originali.length, newLength); j++) {
                        resi[j] = originali[j];
                    }
                    res[i] = resi;
                }
            }
            else if (newHigh != undefined && newLength != undefined) {
                if (newHigh < 0) {
                    throw new illegal_argument_exception_3.IllegalArgumentException("newHigh can not be negative");
                }
                if (newLength < 0) {
                    throw new illegal_argument_exception_3.IllegalArgumentException("newLength can not be negative");
                }
                res = new Array(newHigh);
                for (let i = 0; i < Math.min(original.length, newHigh); i++) {
                    originali = original[i];
                    resi = new Array();
                    for (let j = 0; j < Math.min(originali.length, newLength); j++) {
                        resi[j] = originali[j];
                    }
                    res[i] = resi;
                }
            }
            return res;
        }
        /**
         * Reshape an array.
         * The behaviour of this method depends on the `newLength` parameter:
         * - if the size of the array is equals to `newLength`, this method will perform nothing
         * - if the `newLength` of the array is greater than the current size, then the array will be padded with `null`
         * element until the desired length is reached (or with the element specified using the `fill` parameter)
         * - if the `newLength` of the array is less than the current size, then the array will be truncated to reach
         * the desired length
         * @param {Array<T>} array the array to be reshaped
         * @param {number} newLength the new length of the array
         * @param {T|null} fill the element to use to pad the array (`null` as default)
         * @return {Array<T>} An array containing the deleted elements.
         * If only one element is removed, an array of one element is returned.
         * If no elements are removed, an empty array is returned.
         */
        static reshape(array, newLength, fill = null) {
            if (newLength != array.length) {
                if (newLength < array.length) {
                    return array.splice(newLength - 1, array.length);
                }
                else {
                    array.push(fill);
                    return new Array();
                }
            }
        }
        static reshape2(array, newHigh, newWeight) {
            let res;
            if (newHigh != array.length) {
                if (newHigh < array.length) {
                    res = array.splice(newHigh - 1, array.length);
                }
                else {
                    array.push(new Array(0));
                    res = new Array(0);
                }
            }
            if (newWeight != undefined) {
                for (let r = 0; r < newHigh; r++) {
                    res.splice(0, 0, this.reshape(array[r], newWeight));
                }
            }
            return res;
        }
    }
    exports.Arrays = Arrays;
});
define("geometry/matrix/exceptions/invalid-column-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidColumnException = void 0;
    class InvalidColumnException extends Error {
        constructor(column, reason) {
            super("invalid column {" + column + "}: " + reason);
            Object.setPrototypeOf(this, InvalidColumnException.prototype);
        }
    }
    exports.InvalidColumnException = InvalidColumnException;
});
define("geometry/matrix/mutable-row-based-matrix", ["require", "exports", "geometry/matrix/abstract-matrix", "geometry/matrix/matrix-factory", "types/illegal-argument-exception", "geometry/matrix/exceptions/invalid-column-exception", "geometry/matrix/exceptions/invalid-row-exception", "geometry/matrix/matrix-algebra", "geometry/matrix/frozen-row-based-matrix", "types/arrays"], function (require, exports, abstract_matrix_1, matrix_factory_4, illegal_argument_exception_4, invalid_column_exception_1, invalid_row_exception_1, matrix_algebra_1, frozen_row_based_matrix_1, arrays_1) {
    "use strict";
    var _MutableRowBasedMatrix_data, _MutableRowBasedMatrix_totRows, _MutableRowBasedMatrix_totColumns;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MutableRowBasedMatrix = void 0;
    /**
     * A **mutable** implementation of matrix based on a bi-dimensional array.
     * Every instance of this class is mutable and this means that can be modified with no problems.
     * So, methods like the matrix operations (`add()`, `multiply()`, `subtract()`, `divide()`) or
     * the matrix manipulation (`addRow()`, `removeRow()`, `addColumn()`, `removeColumn()`, `set()`, ecc...)
     * will modify the internal data of the matrix; **these methods will return this matrix** after the modification
     */
    class MutableRowBasedMatrix extends abstract_matrix_1.AbstractMatrix {
        constructor(data) {
            super();
            _MutableRowBasedMatrix_data.set(this, void 0);
            _MutableRowBasedMatrix_totRows.set(this, void 0);
            _MutableRowBasedMatrix_totColumns.set(this, void 0);
            if (data.length > 0) {
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, data.length, "f");
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, data[0].length, "f");
                for (let row of data) {
                    if (row.length != __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f")) {
                        throw Error("every row must have the same number of elements");
                    }
                }
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_data, data, "f");
            }
        }
        add(other) {
            let mat = this;
            if (typeof other == 'number') {
                for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                    for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                        (__classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c]) += other;
                    }
                }
            }
            else if (other instanceof abstract_matrix_1.AbstractMatrix) {
                if (!this.sameStructureOf(this)) {
                    throw new illegal_argument_exception_4.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                        __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") + " x " + __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") + " while the argument has " + other.rowSize() +
                        " x " + other.columnSize());
                }
                for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                    for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                        __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c] += other.get(r, c);
                    }
                }
            }
            return mat;
        }
        addColumn(column) {
            var _a;
            if (__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") == 0) {
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, column.length, "f");
                for (let i = 0; i < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); i++) {
                    __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[i] = [];
                }
            }
            else {
                if (column.length != __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f")) {
                    throw new invalid_column_exception_1.InvalidColumnException(column, "the number of the element is not the same of the column of the matrix");
                }
            }
            for (let i = 0; i < column.length; i++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[i].push(column[i]);
            }
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), _a++, _a), "f");
            return this;
        }
        addRow(row) {
            var _a;
            if (__classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") == 0) {
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, row.length, "f");
            }
            else {
                if (row.length != __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f")) {
                    throw new invalid_row_exception_1.InvalidRowException(row, "the number of the element of the row [" + row.length +
                        "] is not the same of the column of the matrix [" + __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") + "]");
                }
            }
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f").push(row);
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), _a++, _a), "f");
            return this;
        }
        calculateAndFill(builder) {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c] = builder(r, c);
                }
            }
            return this;
        }
        columnSize() {
            return __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f");
        }
        determinant() {
            return matrix_algebra_1.MatrixAlgebra.determinant(this);
        }
        divide(other) {
            let mat = this;
            if (typeof other == "number") {
                for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                    for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                        __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c] /= other;
                    }
                }
            }
            else {
                mat.multiply(matrix_algebra_1.MatrixAlgebra.invert(other));
            }
            return mat;
        }
        fill(value) {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c] = value;
                }
            }
            return this;
        }
        frozen() {
            return new frozen_row_based_matrix_1.FrozenRowBasedMatrix(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"));
        }
        get(rowIndex, columnIndex) {
            return __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex][columnIndex];
        }
        getCharacteristicPolynomial() {
            return matrix_algebra_1.MatrixAlgebra.characteristicPolynomial(this);
        }
        getColumn(columnIndex) {
            let res = new Array(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"));
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                res[r] = __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][columnIndex];
            }
            return res;
        }
        getFactory() {
            return MutableRowBasedMatrix.factory;
        }
        getRow(rowIndex) {
            return arrays_1.Arrays.clone(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex]);
        }
        invert() {
            let determinant = matrix_algebra_1.MatrixAlgebra.checkInvertible(this, true);
            return this.getCofactorMatrix().transpose().multiply((1 / determinant));
        }
        isFrozen() {
            return false;
        }
        isUnfrozen() {
            return true;
        }
        multiply(other) {
            let mat = this;
            if (typeof other == "number") {
                for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                    for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                        __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c] *= other;
                    }
                }
            }
            else {
                let data = (0, matrix_factory_4.matrixData)(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"));
                for (let rT = 0; rT < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); rT++) {
                    for (let cO = 0; cO < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); cO++) {
                        for (let rO = 0; rO < other.rowSize(); rO++) {
                            data[rT][cO] = data[rT][cO] + __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[rT][rO] * other.get(rO, cO);
                        }
                    }
                }
                arrays_1.Arrays.copy2(data, __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"));
            }
            return mat;
        }
        removeColumn() {
            var _a;
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f").splice(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") - 1, 1);
            }
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), _a--, _a), "f");
            return this;
        }
        removeRow() {
            var _a;
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f").splice(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") - 1, 1);
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), _a--, _a), "f");
            return this;
        }
        rowSize() {
            return __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f");
        }
        set(value, rowIndex, columnIndex) {
            this.checkValidIndexes(rowIndex, columnIndex);
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex][columnIndex] = value;
        }
        setColumn(column, columnIndex) {
            this.checkValidColumnIndex(columnIndex);
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][columnIndex] = column[r];
            }
            return this;
        }
        setRow(row, rowIndex) {
            this.checkValidRowIndex(rowIndex);
            for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex][c] = row[c];
            }
            return this;
        }
        subtract(other) {
            let mat = this;
            let row;
            if (typeof other == "number") {
                for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                    row = __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r];
                    for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                        row[c] -= other;
                    }
                }
            }
            else {
                for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                    row = __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r];
                    for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                        row[c] -= other.get(r, c);
                    }
                }
            }
            return mat;
        }
        transpose() {
            if (!this.isSquared()) {
                let dim = Math.max(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"));
                arrays_1.Arrays.reshape2(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"), dim, dim);
            }
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") - 1; r++) {
                for (let c = r + 1; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    [__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c], __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[c][r]] = [__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[c][r], __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c]];
                }
            }
            if (!this.isSquared()) {
                arrays_1.Arrays.reshape2(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"));
                let temp = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f");
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), "f");
                __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, temp, "f");
            }
            return this;
        }
        unfrozen() {
            return this;
        }
    }
    exports.MutableRowBasedMatrix = MutableRowBasedMatrix;
    _MutableRowBasedMatrix_data = new WeakMap(), _MutableRowBasedMatrix_totRows = new WeakMap(), _MutableRowBasedMatrix_totColumns = new WeakMap();
    MutableRowBasedMatrix.factory = new class extends matrix_factory_4.MatrixFactory {
        createMatrix(rows, columns, fill) {
            if (typeof rows == "number") {
                let data = new Array(rows);
                for (let r = 0; r < rows; r++) {
                    data[r] = Array(columns);
                }
                let res = new MutableRowBasedMatrix(data);
                if (fill != undefined) {
                    res.fill(fill);
                }
                return res;
            }
            else {
                return new MutableRowBasedMatrix(rows);
            }
        }
    };
});
define("geometry/matrix/frozen-row-based-matrix", ["require", "exports", "geometry/matrix/abstract-matrix", "geometry/matrix/matrix-factory", "geometry/matrix/matrix-algebra", "geometry/matrix/exceptions/invalid-row-exception", "types/arrays", "geometry/matrix/mutable-row-based-matrix"], function (require, exports, abstract_matrix_2, matrix_factory_5, matrix_algebra_2, invalid_row_exception_2, arrays_2, mutable_row_based_matrix_1) {
    "use strict";
    var _FrozenRowBasedMatrix_data, _FrozenRowBasedMatrix_totRows, _FrozenRowBasedMatrix_totColumns;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FrozenRowBasedMatrix = void 0;
    /**
     * A **frozen** implementation of matrix based on a bi-dimensional array.
     * Every instance of this class **can NOT be modified** and each method that has to modify the
     * internal data *returns a copy* of this matrix with the required modification.
     * This means that the original matrix will never been modified
     */
    class FrozenRowBasedMatrix extends abstract_matrix_2.AbstractMatrix {
        constructor(data) {
            super();
            _FrozenRowBasedMatrix_data.set(this, void 0);
            _FrozenRowBasedMatrix_totRows.set(this, void 0);
            _FrozenRowBasedMatrix_totColumns.set(this, void 0);
            if (data.length > 0) {
                (0, matrix_factory_5.checkValidMatrixData)(data, true);
                __classPrivateFieldSet(this, _FrozenRowBasedMatrix_data, data, "f");
                __classPrivateFieldSet(this, _FrozenRowBasedMatrix_totRows, data.length, "f");
                __classPrivateFieldSet(this, _FrozenRowBasedMatrix_totColumns, data[0].length, "f");
            }
        }
        add(other) {
            if (typeof other == "number") {
                return matrix_algebra_2.MatrixAlgebra.add(this, other);
            }
            return matrix_algebra_2.MatrixAlgebra.add(this, other);
        }
        addColumn(column) {
            return new FrozenRowBasedMatrix(arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f") + 1));
        }
        addRow(row) {
            if (row.length != __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f")) {
                throw new invalid_row_exception_2.InvalidRowException(row, "the row to add has size " + row.length + " but " +
                    "the matrix has " + __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f") + " columns");
            }
            let data = arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f") + 1, __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
            for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                data[__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f")][c] = row[c];
            }
            return new FrozenRowBasedMatrix(data);
        }
        calculateAndFill(builder) {
            let data = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"));
            for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
                data[r] = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
                for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                    data[r][c] = builder(r, c);
                }
            }
            return new FrozenRowBasedMatrix(data);
        }
        columnSize() {
            return __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f");
        }
        determinant() {
            return matrix_algebra_2.MatrixAlgebra.determinant(this);
        }
        divide(other) {
            if (typeof other == "number")
                return matrix_algebra_2.MatrixAlgebra.divide(this, other);
            return matrix_algebra_2.MatrixAlgebra.divide(this, other);
        }
        fill(value) {
            let data = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"));
            for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
                data[r] = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
                for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                    data[r][c] = value;
                }
            }
            return new FrozenRowBasedMatrix(data);
        }
        frozen() {
            return this;
        }
        get(rowIndex, columnIndex) {
            return __classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f")[rowIndex][columnIndex];
        }
        getCharacteristicPolynomial() {
            return matrix_algebra_2.MatrixAlgebra.characteristicPolynomial(this);
        }
        getColumn(columnIndex) {
            let res = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"));
            for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
                res[r] = __classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f")[r][columnIndex];
            }
            return res;
        }
        getFactory() {
            return FrozenRowBasedMatrix.factory;
        }
        getRow(rowIndex) {
            let res = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
            for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                res[c] = __classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f")[rowIndex][c];
            }
            return res;
        }
        invert() {
            return matrix_algebra_2.MatrixAlgebra.invert(this);
        }
        isFrozen() {
            return true;
        }
        isUnfrozen() {
            return false;
        }
        multiply(other) {
            if (typeof other == "number") {
                return matrix_algebra_2.MatrixAlgebra.multiply(this, other);
            }
            return matrix_algebra_2.MatrixAlgebra.multiply(this, other);
        }
        removeColumn() {
            return new FrozenRowBasedMatrix(arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f") - 1));
        }
        removeRow() {
            return new FrozenRowBasedMatrix(arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f") - 1, __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f")));
        }
        rowSize() {
            return __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f");
        }
        set(value, rowIndex, columnIndex) {
            this.checkValidIndexes(rowIndex, columnIndex);
            let data = arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
            data[rowIndex][columnIndex] = value;
            return new FrozenRowBasedMatrix(data);
        }
        setColumn(column, columnIndex) {
            this.checkValidColumnIndex(columnIndex);
            let data = arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
            for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
                data[r][columnIndex] = column[r];
            }
            return new FrozenRowBasedMatrix(data);
        }
        setRow(row, rowIndex) {
            this.checkValidRowIndex(rowIndex);
            let data = arrays_2.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
            for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                data[rowIndex][c] = row[c];
            }
            return new FrozenRowBasedMatrix(data);
        }
        subtract(other) {
            if (typeof other == "number") {
                return matrix_algebra_2.MatrixAlgebra.subtract(this, other);
            }
            return matrix_algebra_2.MatrixAlgebra.subtract(this, other);
        }
        transpose() {
            return matrix_algebra_2.MatrixAlgebra.transpose(this);
        }
        unfrozen() {
            return new mutable_row_based_matrix_1.MutableRowBasedMatrix(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
        }
    }
    exports.FrozenRowBasedMatrix = FrozenRowBasedMatrix;
    _FrozenRowBasedMatrix_data = new WeakMap(), _FrozenRowBasedMatrix_totRows = new WeakMap(), _FrozenRowBasedMatrix_totColumns = new WeakMap();
    FrozenRowBasedMatrix.factory = new class extends matrix_factory_5.MatrixFactory {
        createMatrix(rows, columns, fill) {
            if (typeof rows == "number") {
                return new FrozenRowBasedMatrix((0, matrix_factory_5.matrixData)(rows, columns, fill));
            }
            else {
                return new FrozenRowBasedMatrix(rows);
            }
        }
    };
});
define("geometry/matrix/matrix-factory", ["require", "exports", "types/illegal-argument-exception", "geometry/matrix/matrix", "geometry/matrix/frozen-row-based-matrix", "geometry/matrix/mutable-row-based-matrix"], function (require, exports, illegal_argument_exception_5, matrix_2, frozen_row_based_matrix_2, mutable_row_based_matrix_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.identityMatrix = exports.checkValidMatrixData = exports.matrixData = exports.mutableMatrix = exports.frozenMatrix = exports.matrix = exports.MatrixFactory = void 0;
    /**
     * A factory for a type of matrix.
     * Each class which extends `Matrix` should have a *static* factory
     */
    class MatrixFactory {
        createSquaredMatrix(dim, fill) {
            return this.createMatrix(dim, dim, fill);
        }
        createNumberMatrix(rows, columns, fill) {
            return this.createMatrix(rows, columns, fill);
        }
        createSquaredNumberMatrix(dim, fill) {
            return this.createSquaredMatrix(dim, fill);
        }
        /**
         * Creates and return the identity matrix with the given dimension
         * @param {number} dim the dimension of the identity matrix
         */
        createIdentityMatrix(dim) {
            return this.createSquaredNumberMatrix(dim).calculateAndFill((rowIndex, columnIndex) => {
                if (rowIndex == columnIndex) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        /**
         * Converts a flat array to a matrix by specifying the type of the flat and the numbers of the
         * element of a group. This method performs the opposite operations of `flatten`.
         * Precisely, if `flatType` is:
         *
         * - `FlatType.BY_ROWS` then the elements of the array will be split in groups, each with the
         * dimension specified by `groupSize`; **each group will be a row** of the resulting matrix
         * (for example `[1, 2, 3, 4, 5, 6]` with `groupSize=2` and `flatType=FlatType.BY_ROWS` will make
         * this method returning the matrix `[[1, 2], [3, 4], [5, 6]]`);
         * this means that in this case **`groupSize` will become the number of the columns** of the resulting matrix
         *
         * - `FlatType.BY_COLUMNS` then the elements of the array will be split in groups, each with the
         * dimension specified by `groupSize`; **each group will be a column** of the resulting matrix
         * (for example `[1, 2, 3, 4, 5, 6]` with `groupSize=2` and `flatType=FlatType.BY_COLUMNS` will make
         * this method returning the matrix `[[1, 3, 5], [2, 4, 6]]`);
         * this means that in this case **`groupSize` will become the number of the rows** of the resulting matrix
         * @param array the flat array to be converted into a matrix
         * @param groupSize the number of the elements of each group
         * @param flatType the type of the groups (indicates if each group will be a *row* or a *column*
         * of the new matrix
         */
        createFromFlatten(array, groupSize, flatType = matrix_2.FlatType.BY_ROWS) {
            if (array.length % groupSize != 0) {
                throw new illegal_argument_exception_5.IllegalArgumentException("the dimension of the given array is not a multiple of the size of the group");
            }
            let res;
            switch (flatType) {
                case matrix_2.FlatType.BY_ROWS: {
                    let rows = array.length / groupSize;
                    res = this.createMatrix(rows, groupSize);
                    for (let i = 0; i < array.length; i++) {
                        res.set(array[i], Math.floor(i / groupSize), groupSize);
                    }
                    break;
                }
                case matrix_2.FlatType.BY_COLUMNS: {
                    let columns = array.length / groupSize;
                    res = this.createMatrix(groupSize, columns);
                    for (let i = 0; i < array.length; i++) {
                        res.set(array[i], i % groupSize, Math.floor(i / groupSize));
                    }
                    break;
                }
            }
            return res;
        }
        /**
         * Creates a new matrix starting from another one by transforming each element of the `other` matrix
         * to the elements of the new one by applying the `elementMapper` function
         * @param {Matrix<T>>} other the other matrix
         * @param {element: T, row: number, column: number) => R} elementMapper the function to be applied on each
         * element of the `other` matrix to create the new ones
         * @return {Matrix<R>} the new matrix
         */
        createFromOther(other, elementMapper) {
            let res = this.createMatrix(other.rowSize(), other.columnSize());
            for (let r = 0; r < res.rowSize(); r++) {
                for (let c = 0; c < res.columnSize(); c++) {
                    res = res.set(elementMapper(other.get(r, c), r, c), r, c);
                }
            }
            return res;
        }
        /**
         * Creates and returns a new matrix with the same structure of the `other` given as parameter
         * (with the same number of rows and columns)
         * @param {Matrix<any>} other the other matrix
         * @return {Matrix<T>} the new matrix with the same structure of the `other`
         */
        createWithSameStructureOf(other) {
            return this.createMatrix(other.rowSize(), other.columnSize());
        }
    }
    exports.MatrixFactory = MatrixFactory;
    function matrix(arrayOrRows, columns, fill) {
        let factory = frozen_row_based_matrix_2.FrozenRowBasedMatrix.factory;
        if (typeof arrayOrRows == "number") {
            return factory.createMatrix(arrayOrRows, columns, fill);
        }
        else {
            return factory.createMatrix(arrayOrRows);
        }
        /*
        let factory: MatrixFactory = FrozenRowBasedMatrix.factory
    
        if(arrayOrRows instanceof Array) {
            let rRows = arrayOrRows.length
            let rColumns = Math.max(...arrayOrRows.map((array: Array<T>) => array.length))
            let res: Matrix<T> = factory.createMatrix(rRows, rColumns)
            let currRow: Row<T>
    
            for(let r = 0; r < rRows; r++) {
                currRow = arrayOrRows[r]
                for(let c = 0; c < currRow.length; c++) {
                    res.set(currRow[c], r, c)
                }
            }
            return res
    
        } else {
            return factory.createMatrix<T>(arrayOrRows as number, columns, fill)
        }*/
    }
    exports.matrix = matrix;
    function frozenMatrix(arrayOrRows, columns, fill) {
        let factory = frozen_row_based_matrix_2.FrozenRowBasedMatrix.factory;
        if (typeof arrayOrRows == "number") {
            return factory.createMatrix(arrayOrRows, columns, fill);
        }
        else {
            return factory.createMatrix(arrayOrRows);
        }
    }
    exports.frozenMatrix = frozenMatrix;
    function mutableMatrix(arrayOrRows, columns, fill) {
        let factory = mutable_row_based_matrix_2.MutableRowBasedMatrix.factory;
        if (typeof arrayOrRows == "number") {
            return factory.createMatrix(arrayOrRows, columns, fill);
        }
        else {
            return factory.createMatrix(arrayOrRows);
        }
    }
    exports.mutableMatrix = mutableMatrix;
    function matrixData(rows, columns, fill) {
        let res = new Array(rows);
        if (fill == undefined) {
            for (let r = 0; r < rows; r++) {
                res[r] = new Array(columns);
            }
        }
        else {
            let row;
            for (let r = 0; r < rows; r++) {
                row = new Array(columns);
                for (let c = 0; c < columns; c++) {
                    row[c] = fill;
                }
                res[r] = row;
            }
        }
        return res;
    }
    exports.matrixData = matrixData;
    /**
     * Checks if the given bi-dimensional array has a valid format to be the internal data af a matrix.
     * This means that the bi-dimensional array given has parameter must have each element that is an
     * array with the same length as the others,
     * If `throwError` is true, this method will throw `IllegalArgumentException` if the given data
     * is not valid instead of returning a boolean
     * @param {Array<Array<T>>|Array<Row<T>>|MatrixData<T>} data the data to be checked
     * @param {boolean} throwError a flag that, if `true` make this method throwing an exception
     * @return {boolean} a boolean that indicates if the data is valid
     * @throws {IllegalArgumentException} if `throwError` is `true` and the data is not valid
     */
    function checkValidMatrixData(data, throwError = false) {
        let totColumns = data[0].length;
        for (let row of data) {
            if (row.length != totColumns) {
                if (throwError) {
                    throw new illegal_argument_exception_5.IllegalArgumentException("every row must have the same number of elements");
                }
                return false;
            }
        }
        return true;
    }
    exports.checkValidMatrixData = checkValidMatrixData;
    /**
     * Creates and returns the identity matrix
     * @param {number} dim the dimension of the matrix to be created
     * @return {NumMatrix} the identity matrix with the specified dimension
     */
    function identityMatrix(dim) {
        let res = matrix(dim, dim, 0);
        for (let i = 0; i < dim; i++) {
            res.set(1, i, i);
        }
        return res;
    }
    exports.identityMatrix = identityMatrix;
});
define("test/TestTs", ["require", "exports", "types/equatable"], function (require, exports, equatable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertNoError = exports.assertNotTrows = exports.assertTrows = exports.assertNotNull = exports.assertNull = exports.assertNotUndefined = exports.assertUndefined = exports.assertFalse = exports.assertTrue = exports.assertArrayEquals = exports.getTypeName = exports.assertSame = exports.assertLooseEquals = exports.assertStrictEquals = exports.assertEquals = exports.TestCase = exports.Test = void 0;
    const TestMethod = Symbol('TestMethod');
    /**
     * An exception that is thrown when a test is not passed
     */
    class TestNotPassedException extends Error {
        constructor(msg) {
            super(msg);
            this.msg = msg;
            Object.setPrototypeOf(this, TestNotPassedException.prototype);
        }
    }
    /**
     * A method that is a **test** inside a *test case* class.
     * The method annotated with this decorator will be automatically executed as tests
     */
    function Test() {
        return function (target, propertyKey, descriptor) {
            target[TestMethod] = target[TestMethod] || new Map();
            target[TestMethod].set(propertyKey, descriptor.value);
        };
    }
    exports.Test = Test;
    /**
     * A class that represents a *test case*.
     * The methods of this class that are annotated with the `@Test()` decorator will be automatically
     * executed
     */
    function TestCase(clazz) {
        let instance = new clazz();
        let lines = new Array();
        let passed = new Array();
        let notPassed = new Array();
        for (let method of clazz.prototype[TestMethod]) {
            try {
                instance[method[0]]();
                passed.push(method[0]);
                lines.push("[V] " + method[0] + ": passed");
            }
            catch (testNotPassedException) {
                if (testNotPassedException instanceof TestNotPassedException) {
                    notPassed.push(method[0]);
                    lines.push("[X] " + method[0] + ": NOT PASSED: [" + testNotPassedException.msg + "]");
                    console.log(testNotPassedException);
                }
                else {
                    throw testNotPassedException;
                }
            }
        }
        console.log("!-- " + clazz.name + " ---------------------------------!");
        console.log("PASSED: \t" + passed.length + " \t[" + passed.join(", ") +
            "]\nNOT PASSED: \t" + notPassed.length + " \t[" + notPassed.join(", ") + "]");
        console.log("\t" + lines.join("\n\t") + "\n");
    }
    exports.TestCase = TestCase;
    /**
     * Asserts that two object arrays are *equal*.
     * This method first checks for the *reference equality* then, if it's not satisfied,
     * try to use the `equals()` method of the objects if they implement the `Equatable` interface.
     * This means that this method can be used to check:
     * - if two primitive types contains the same value
     * - if two variable refers to the same object
     * - if two objects that implements `Equatable` are equals<br>
     *
     * @param {T} expected the expected object
     * @param {T} obj the object to be checked
     * @throws {TestNotPassedException} if the test is not passed
     */
    function assertEquals(expected, obj) {
        if (expected !== obj) {
            if ((0, equatable_1.isEquatable)(expected) && (0, equatable_1.isEquatable)(obj)) {
                if (obj.equals(expected))
                    return;
            }
            throw new TestNotPassedException("expected [" + expected.toString() + ":" + getTypeName(expected) +
                "] but obtained [" + obj.toString() + ":" + getTypeName(obj) + "]");
        }
    }
    exports.assertEquals = assertEquals;
    /**
     * Assert that two object are *strictly* equals.
     * The *strictly* equality is the one that make the operator `===` returning `true`
     * @param {any} obj1 the first object
     * @param {any} obj2 the second object
     */
    function assertStrictEquals(obj1, obj2) {
        if (obj1 !== obj2) {
            throw new TestNotPassedException("expected strict equality but not obtained");
        }
    }
    exports.assertStrictEquals = assertStrictEquals;
    /**
     * Assert that two object are *loosely* equals.
     * The *loosely* equality is the one that make the operator `==` returning `true`
     * @param {any} obj1 the first object
     * @param {any} obj2 the second object
     */
    function assertLooseEquals(obj1, obj2) {
        if (obj1 != obj2) {
            throw new TestNotPassedException("expected strict equality but not obtained");
        }
    }
    exports.assertLooseEquals = assertLooseEquals;
    /**
     * Assert that two object are the *same* value.
     * If the assertion is `true`, that the two objects make `Object.is()` return `true`
     * @param {any} obj1 the first object
     * @param {any} obj2 the second object
     */
    function assertSame(obj1, obj2) {
        if (!Object.is(obj1, obj2)) {
            throw new TestNotPassedException("expected the same value but not obtained");
        }
    }
    exports.assertSame = assertSame;
    function getTypeName(obj) {
        if (typeof obj == "object" || typeof obj == "function") {
            return obj.constructor.name;
        }
        return typeof obj;
    }
    exports.getTypeName = getTypeName;
    /**
     * Assert that two arrays are *equals* using the same mechanism of `assertEquals()` on each correspondent
     * elements of the two arrays
     * @param {Array<T>} expected the expected array
     * @param {Array<T>} obj the object to be checked
     */
    function assertArrayEquals(expected, obj) {
        if (!Array.isArray(expected)) {
            throw new TestNotPassedException("expected is instance of [" + getTypeName(expected) + "] but must be an array");
        }
        if (!Array.isArray(obj)) {
            throw new TestNotPassedException("obj is instance of [" + getTypeName(obj) + "] but must be an array");
        }
        if (expected.length != obj.length) {
            throw new TestNotPassedException("expected array length [" + expected.length
                + "] but obtained [" + obj.length + "]");
        }
        for (let i = 0; i < obj.length; i++) {
            try {
                assertEquals(expected[i], obj[i]);
            }
            catch (testNotPassedException) {
                if (testNotPassedException instanceof TestNotPassedException) {
                    throw new TestNotPassedException("different elements at index [" +
                        i + "]: " + testNotPassedException.msg);
                }
                else {
                    throw testNotPassedException;
                }
            }
        }
    }
    exports.assertArrayEquals = assertArrayEquals;
    /**
     * Asserts that a condition is `true`
     * @param {boolean} condition the condition to be checked
     */
    function assertTrue(condition) {
        if (!condition) {
            throw new TestNotPassedException("expected [true] but obtained [false]");
        }
    }
    exports.assertTrue = assertTrue;
    /**
     * Asserts that a condition is `false`
     * @param {boolean} condition the condition to be checked
     */
    function assertFalse(condition) {
        if (condition) {
            {
                throw new TestNotPassedException("expected [false] but obtained [true]");
            }
        }
    }
    exports.assertFalse = assertFalse;
    /**
     * Assert the given object is `undefined`
     * @param {T} obj the object to be checked
     */
    function assertUndefined(obj) {
        if (obj != undefined) {
            throw new TestNotPassedException("expected [undefined] but obtained [" + obj.toString() + "]");
        }
    }
    exports.assertUndefined = assertUndefined;
    /**
     * Assert the given object is **not** `undefined`
     * @param {T} obj the object to be checked
     */
    function assertNotUndefined(obj) {
        if (obj == undefined) {
            throw new TestNotPassedException("expected not undefined but obtained [" + obj + "]");
        }
    }
    exports.assertNotUndefined = assertNotUndefined;
    /**
     * Assert the given object is `null`
     * @param {T} obj the object to be checked
     */
    function assertNull(obj) {
        if (obj != null) {
            throw new TestNotPassedException("expected [null] but obtained [" + obj.toString() + "]");
        }
    }
    exports.assertNull = assertNull;
    /**
     * Assert the given object is **not** `null`
     * @param {T} obj the object to be checked
     */
    function assertNotNull(obj) {
        if (obj == undefined) {
            throw new TestNotPassedException("expected not undefined but obtained [" + obj + "]");
        }
    }
    exports.assertNotNull = assertNotNull;
    /**
     * Assert the given function will throw a specific type of error
     * @param {Function} errorClass the type of the error that has to be thrown
     * @param {Function} fun the function that has to throw the error
     * @param {any} args the arguments to be passed to `fun`
     */
    function assertTrows(errorClass, fun, ...args) {
        try {
            fun(...args);
        }
        catch (e) {
            if (e instanceof errorClass) {
                return;
            }
            else {
                throw new TestNotPassedException("expected error of type [" +
                    errorClass.name + "] but obtained [" + getTypeName(e) + "]");
            }
        }
        throw new TestNotPassedException("expected error of type" + getTypeName(errorClass) +
            " but no error was thrown");
    }
    exports.assertTrows = assertTrows;
    /**
     * Assert the given function will **not** throw a specific type of error
     * @param {Function} errorClass the type of the error that has to be thrown
     * @param {Function} fun the function that has to throw the error
     * @param {any} args the arguments to be passed to `fun`
     */
    function assertNotTrows(errorClass, fun, ...args) {
        try {
            fun(...args);
        }
        catch (e) {
            if (e instanceof errorClass) {
                throw new TestNotPassedException("expected no error of type [" +
                    errorClass.name + "] but obtained [" + getTypeName(e) + "]");
            }
        }
    }
    exports.assertNotTrows = assertNotTrows;
    /**
     * Assert the given function will **not** throw any exceptions
     * @param {Function} fun the function that has not to throw the error
     * @param {any} args the arguments to be passed to `fun`
     */
    function assertNoError(fun, ...args) {
        try {
            fun(...args);
        }
        catch (e) {
            throw new TestNotPassedException("expected no error but thrown [" + getTypeName(e) + "]");
        }
    }
    exports.assertNoError = assertNoError;
});
define("main-test", ["require", "exports", "geometry/matrix/matrix-factory", "geometry/matrix/mutable-row-based-matrix", "geometry/matrix/frozen-row-based-matrix", "types/arrays", "test/TestTs"], function (require, exports, matrix_factory_6, mutable_row_based_matrix_3, frozen_row_based_matrix_3, arrays_3, TestTs_1) {
    "use strict";
    var MatrixTestCase_1;
    Object.defineProperty(exports, "__esModule", { value: true });
    let MatrixTestCase = MatrixTestCase_1 = class MatrixTestCase {
        constructor() {
            this.matrix1_2x2 = new mutable_row_based_matrix_3.MutableRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA2x2));
            this.matrix2_2x2 = new frozen_row_based_matrix_3.FrozenRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA2x2));
            this.matrix1_3x3 = new mutable_row_based_matrix_3.MutableRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA3x3));
            this.matrix2_3x3 = new frozen_row_based_matrix_3.FrozenRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA3x3));
            this.matrix1_4x4 = new mutable_row_based_matrix_3.MutableRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA4x4));
            this.matrix2_4x4 = new frozen_row_based_matrix_3.FrozenRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA4x4));
            this.matrix1_5x5 = new mutable_row_based_matrix_3.MutableRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA5x5));
            this.matrix2_5x5 = new frozen_row_based_matrix_3.FrozenRowBasedMatrix(arrays_3.Arrays.clone2(MatrixTestCase_1.DATA5x5));
        }
        minorTest() {
            let rowIndex = 1;
            let columnIndex = 1;
            let rightMatrix = (0, matrix_factory_6.matrix)([[0, 0, -2, 1], [1, 1, 1, 1], [2, 1, 0, 1], [3, 1, 1, 2]]);
            let minor1_5x5 = this.matrix1_5x5.getMinor(1, 1);
            let minor2_5x5 = this.matrix2_5x5.getMinor(1, 1);
            (0, TestTs_1.assertEquals)(rightMatrix, minor1_5x5);
            (0, TestTs_1.assertEquals)(rightMatrix, minor2_5x5);
        }
        determinant2x2Test() {
            let rigthDeterminant = -2;
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_2x2.determinant());
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_2x2.determinant());
        }
        determinant3x3Test() {
            let rigthDeterminant = 25;
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_3x3.determinant());
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_3x3.determinant());
        }
        determinant4x4Test() {
            let rigthDeterminant = -4;
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_4x4.determinant());
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_4x4.determinant());
        }
        determinant5x5Test() {
            let rigthDeterminant = 4;
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_5x5.determinant());
            (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_5x5.determinant());
        }
    };
    MatrixTestCase.DATA2x2 = [
        [1, 2],
        [3, 4]
    ];
    MatrixTestCase.DATA3x3 = [
        [1, -2, 3],
        [2, 0, 3],
        [1, 5, 4]
    ];
    MatrixTestCase.DATA4x4 = [
        [1, 3, 1, 4],
        [3, 9, 5, 15],
        [0, 2, 1, 1],
        [0, 4, 2, 3]
    ];
    MatrixTestCase.DATA5x5 = [[0, 1, 0, -2, 1],
        [1, 0, 3, 1, 1],
        [1, -1, 1, 1, 1],
        [2, 2, 1, 0, 1],
        [3, 1, 1, 1, 2]
    ];
    __decorate([
        (0, TestTs_1.Test)()
    ], MatrixTestCase.prototype, "minorTest", null);
    __decorate([
        (0, TestTs_1.Test)()
    ], MatrixTestCase.prototype, "determinant2x2Test", null);
    __decorate([
        (0, TestTs_1.Test)()
    ], MatrixTestCase.prototype, "determinant3x3Test", null);
    __decorate([
        (0, TestTs_1.Test)()
    ], MatrixTestCase.prototype, "determinant4x4Test", null);
    __decorate([
        (0, TestTs_1.Test)()
    ], MatrixTestCase.prototype, "determinant5x5Test", null);
    MatrixTestCase = MatrixTestCase_1 = __decorate([
        TestTs_1.TestCase
    ], MatrixTestCase);
});
define("geometry/point/readable-point-3d", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("geometry/angle", ["require", "exports", "types/functional"], function (require, exports, functional_2) {
    "use strict";
    var _Angle_value, _Angle_unit;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.degree = exports.radians = exports.deg2Rad = exports.rad2Deg = exports.angle = exports.Angle = exports.AngleUnit = void 0;
    var AngleUnit;
    (function (AngleUnit) {
        AngleUnit["RAD"] = "rad";
        AngleUnit["DEG"] = "deg";
    })(AngleUnit = exports.AngleUnit || (exports.AngleUnit = {}));
    class Angle extends functional_2.AbstractFunctionalObject {
        constructor(value, unit) {
            super();
            _Angle_value.set(this, void 0);
            _Angle_unit.set(this, void 0);
            __classPrivateFieldSet(this, _Angle_value, value, "f");
            __classPrivateFieldSet(this, _Angle_unit, unit, "f");
        }
        /**
         * Returns the value of this angle
         * @return {number} the value of this angle
         */
        getValue() {
            return __classPrivateFieldGet(this, _Angle_value, "f");
        }
        /**
         * Returns the value of this angle in the desired unit
         * @param {AngleUnit} unit the desired unit of the value of this angle
         * @return {number} the value of this angle
         */
        getValueIn(unit) {
            if (__classPrivateFieldGet(this, _Angle_unit, "f") == unit)
                return __classPrivateFieldGet(this, _Angle_value, "f");
            return this.cloneAndConvert(unit).getValue();
        }
        /**
         * Sets the value of this angle preserving the unit
         * @param {number} value the value of the angle
         */
        setValue(value) {
            __classPrivateFieldSet(this, _Angle_value, value, "f");
        }
        /**
         * Gets the unit of this angle
         * @return the unit of this angle
         */
        getUnit() {
            return __classPrivateFieldGet(this, _Angle_unit, "f");
        }
        /**
         * Converts this angle to the desired unit.
         * **The conversion is internal** so this object will be updated
         * with the desired unit and the value will be automatically converted.
         *
         * If it's needed a copy of this angle with the modified unit, please consider
         * using `copyAndConvert()` instead.
         * This method returns this angle
         * @param {AngleUnit} unit the desired target unit
         * @return {Angle} this angle
         */
        convert(unit) {
            if (__classPrivateFieldGet(this, _Angle_unit, "f") != unit) {
                if (__classPrivateFieldGet(this, _Angle_unit, "f") == AngleUnit.RAD && unit == AngleUnit.DEG) {
                    __classPrivateFieldSet(this, _Angle_value, rad2Deg(__classPrivateFieldGet(this, _Angle_value, "f")), "f");
                }
                else if (__classPrivateFieldGet(this, _Angle_unit, "f") == AngleUnit.DEG && unit == AngleUnit.RAD) {
                    __classPrivateFieldSet(this, _Angle_value, deg2Rad(__classPrivateFieldGet(this, _Angle_value, "f")), "f");
                }
                __classPrivateFieldSet(this, _Angle_unit, unit, "f");
            }
            return this;
        }
        clone() {
            return new Angle(__classPrivateFieldGet(this, _Angle_value, "f"), __classPrivateFieldGet(this, _Angle_unit, "f"));
        }
        /**
         * Clones this angle and convert it to the desired unit
         * @param {AngleUnit} unit the desired unit of the angle
         * @return {Angle} the clone converted to the desired unit
         */
        cloneAndConvert(unit) {
            return this.clone().convert(unit);
        }
        /**
         * Aligns this angle to unit of measurement of the other angle.
         * This method basically converts this angle to unit of measure of the given one and
         * returns this angle after the conversion
         * @param {Angle} other the other angle
         * @return {Angle} this angle after the alignment
         */
        alignWith(other) {
            return this.convert(other.getUnit());
        }
        /**
         * Checks if the `other` object is an `Angle` *equals* to this.
         * The equality is checked considering also the `unit, so
         * @param other
         */
        equals(other) {
            if (other != undefined) {
                if (other instanceof Angle) {
                    if (__classPrivateFieldGet(this, _Angle_unit, "f") !== __classPrivateFieldGet(other, _Angle_unit, "f")) {
                        other = other.cloneAndConvert(__classPrivateFieldGet(this, _Angle_unit, "f"));
                        return __classPrivateFieldGet(other, _Angle_unit, "f") == __classPrivateFieldGet(this, _Angle_unit, "f") && __classPrivateFieldGet(other, _Angle_value, "f") == __classPrivateFieldGet(this, _Angle_value, "f");
                    }
                }
            }
            return false;
        }
        toString() {
            return __classPrivateFieldGet(this, _Angle_value, "f") + " " + __classPrivateFieldGet(this, _Angle_unit, "f");
        }
        add(value, unit) {
            if (typeof value == "number") {
                if (unit == undefined) {
                    unit = __classPrivateFieldGet(this, _Angle_unit, "f");
                }
                value = new Angle(value, unit).convert(__classPrivateFieldGet(this, _Angle_unit, "f"));
            }
            else {
                value = value.cloneAndConvert(__classPrivateFieldGet(this, _Angle_unit, "f"));
            }
            __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") + __classPrivateFieldGet(value, _Angle_value, "f"), "f");
            return this;
        }
        subtract(value, unit) {
            if (typeof value == "number") {
                if (unit == undefined) {
                    unit = __classPrivateFieldGet(this, _Angle_unit, "f");
                }
                value = new Angle(value, unit).convert(__classPrivateFieldGet(this, _Angle_unit, "f"));
            }
            else {
                value = value.cloneAndConvert(__classPrivateFieldGet(this, _Angle_unit, "f"));
            }
            __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") - __classPrivateFieldGet(value, _Angle_value, "f"), "f");
            return this;
        }
        /**
         * Multiply the internal value of this angle by the given `factor`.<br>
         * **This method modify the internal value of this angle**, putting the result
         * of the operation into the `value` of this angle.
         * @param {number} factor the factor to be used for the multiplication
         * @return {Angle} this angle after the multiplication
         */
        multiply(factor) {
            __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") * factor, "f");
            return this;
        }
        /**
         * Divide the internal value of this angle by the given `factor`.<br>
         * **This method modify the internal value of this angle**, putting the result
         * of the operation into the `value` of this angle.
         * @param {number} factor the factor to be used for the division
         * @return {Angle} this angle after the division
         */
        divide(factor) {
            __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") * factor, "f");
            return this;
        }
    }
    exports.Angle = Angle;
    _Angle_value = new WeakMap(), _Angle_unit = new WeakMap();
    /**
     * Creates and return a new angle given a value and a unit.
     * The default unit is *radians*
     * @param {number} value the value of the angle
     * @param {AngleUnit} unit the unit of measurement of the angle (*radians* ad default)
     * @return {Angle} the new angle
     */
    function angle(value, unit = AngleUnit.RAD) {
        return new Angle(value, unit);
    }
    exports.angle = angle;
    /**
     * Converts an angle in radians to degree
     * @param {number} angle the value of the angle in radians
     * @return {number} the value of the angle in degree
     */
    function rad2Deg(angle) {
        return (180 * angle) / Math.PI;
    }
    exports.rad2Deg = rad2Deg;
    /**
     * Converts an angle in degree to radians
     * @param {number} angle the value of the angle in degree
     * @return {number} the value of the angle in radians
     */
    function deg2Rad(angle) {
        return (Math.PI * angle) / 180;
    }
    exports.deg2Rad = deg2Rad;
    /**
     * Creates and returns a new angle in *radians* with the given value
     * @param {number} value the value of the angle in *radians*
     * @return {Angle} the new angle in radians
     */
    function radians(value) {
        return angle(value, AngleUnit.RAD);
    }
    exports.radians = radians;
    /**
     * Creates and returns a new angle in *degree* with the given value
     * @param {number} value the value of the angle in *degree*
     * @return {Angle} the new angle in radians
     */
    function degree(value) {
        return angle(value, AngleUnit.DEG);
    }
    exports.degree = degree;
});
define("geometry/point/point-3d", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkNotNullCoordinates = exports.samePoints = exports.isPoint = void 0;
    /**
     * Returns `true` if the given `object` is a **point**
     * @param {any} object
     * @return {boolean} `true` if the given `object` is a **point**, `false` otherwise
     */
    function isPoint(object) {
        return 'getX' in object && 'getY' in object && 'getZ' in object;
    }
    exports.isPoint = isPoint;
    /**
     * Returns `true` if the two objects are the same point.
     * Notice that **this function return `false` if one or both of the arguments
     * are `null` or `undefined`**
     * @param {any} point1 the first object
     * @param {any} point2 the second object
     * @return {boolean} `true` if the two objects are the same point, `false` otherwise
     */
    function samePoints(point1, point2) {
        if (point1 != null && point2 != null) {
            if (isPoint(point1) && isPoint(point2)) {
                return point1.getX() === point2.getX() &&
                    point1.getY() === point2.getY() &&
                    point1.getZ() === point2.getZ();
            }
        }
        return false;
    }
    exports.samePoints = samePoints;
    /**
     * Checks if all the given coordinates are not `null`.
     * If `throwError` is enabled, this function will immediately throw an error
     * when it will find a `null` value for a coordinate
     * @param {number} x the `x` coordinate
     * @param {number} y the `y` coordinate
     * @param {number} z the `z` coordinate
     * @param throwError the `flag` that if enabled will make this function able to throw an exception
     * @return {boolean} `true` if all the coordinates are not null, `false` otherwise
     * @throws {Error} if `throwError` is `true` and a coordinate is `null`
     */
    function checkNotNullCoordinates(x, y, z, throwError = false) {
        if (x == null) {
            if (throwError) {
                throw Error("x coordinate can not be null");
            }
            return false;
        }
        if (y == null) {
            if (throwError) {
                throw Error("y coordinate can not be null");
            }
            return false;
        }
        if (z == null) {
            if (throwError) {
                throw Error("z coordinate can not be null");
            }
            return false;
        }
        return true;
    }
    exports.checkNotNullCoordinates = checkNotNullCoordinates;
});
define("geometry/point/abstract-point-3d", ["require", "exports", "types/functional", "geometry/point/point-3d", "geometry/matrix/matrix-factory"], function (require, exports, functional_3, point_3d_1, matrix_factory_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractPoint3D = void 0;
    /**
     * The abstract implementation of a `Point3D`.
     * This point can be
     *
     * - **frozen**: in this case is not possible to modify the values of the internal coordinates;
     * this kind of point can **throw an exception** or **returns a modified copy** depending on the
     * configuration
     *
     * - **mutable**: in this case is possible to modify the values of the internal coordinates using all the
     * method for these kind of purposes; these methods will return `this`
     */
    class AbstractPoint3D extends functional_3.AbstractFunctionalObject {
        asRowVector() {
            let matrixData = new Array(1);
            matrixData[0][0] = this.getX();
            matrixData[0][1] = this.getY();
            matrixData[0][2] = this.getZ();
            return (0, matrix_factory_7.frozenMatrix)(matrixData);
        }
        asColumnVector() {
            let matrixData = new Array(3);
            matrixData[0] = [this.getX()];
            matrixData[1] = [this.getY()];
            matrixData[2] = [this.getZ()];
            return (0, matrix_factory_7.frozenMatrix)(matrixData);
        }
        dilate(mx, my, mz) {
            let result = this;
            if (mx != null) {
                result = result.dilateCoordinate(mx, Axis.X);
            }
            if (my != null) {
                result = result.dilateCoordinate(my, Axis.Y);
            }
            if (mz != null) {
                result = result.dilateCoordinate(mz, Axis.Z);
            }
            return result;
        }
        dilateX(mx) {
            return this.dilateCoordinate(mx, Axis.X);
        }
        dilateY(my) {
            return this.dilateCoordinate(my, Axis.Y);
        }
        dilateZ(mz) {
            return this.dilateCoordinate(mz, Axis.Z);
        }
        dilateByVector(vector) {
            return this
                .dilateCoordinate(vector.getX(), Axis.X)
                .dilateCoordinate(vector.getY(), Axis.Y)
                .dilateCoordinate(vector.getZ(), Axis.Z);
        }
        getX() {
            return this.getCoordinate(Axis.X);
        }
        getY() {
            return this.getCoordinate(Axis.Y);
        }
        getZ() {
            return this.getCoordinate(Axis.Z);
        }
        rotateAroundX(angle) {
            return this.rotateAround(Axis.X, angle);
        }
        rotateAroundY(angle) {
            return this.rotateAround(Axis.X, angle);
        }
        rotateAroundZ(angle) {
            return this.rotateAround(Axis.X, angle);
        }
        set(newX, newY, newZ) {
            let result = this;
            if (newX != null) {
                result = this.setCoordinate(newX, Axis.X);
            }
            if (newY != null) {
                result = this.setCoordinate(newY, Axis.Y);
            }
            if (newZ != null) {
                result = this.setCoordinate(newZ, Axis.Z);
            }
            return result;
        }
        setX(newX) {
            return this.setCoordinate(newX, Axis.X);
        }
        setY(newY) {
            return this.setCoordinate(newY, Axis.Y);
        }
        setZ(newZ) {
            return this.setCoordinate(newZ, Axis.Z);
        }
        translate(dx, dy, dz) {
            let result = this;
            if (dx != null) {
                result = this.translateCoordinate(dx, Axis.X);
            }
            if (dy != null) {
                result = this.translateCoordinate(dy, Axis.Y);
            }
            if (dz != null) {
                result = this.translateCoordinate(dz, Axis.Z);
            }
            return result;
        }
        translateByVector(vector) {
            return this
                .translateCoordinate(vector.getX(), Axis.X)
                .translateCoordinate(vector.getY(), Axis.Y)
                .translateCoordinate(vector.getZ(), Axis.Z);
        }
        translateX(dx) {
            return this.translateCoordinate(dx, Axis.X);
        }
        translateY(dy) {
            return this.translateCoordinate(dy, Axis.Y);
        }
        translateZ(dz) {
            return this.translateCoordinate(dz, Axis.Z);
        }
        equals(other) {
            return (0, point_3d_1.samePoints)(this, other);
        }
        toString() {
            return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")";
        }
    }
    exports.AbstractPoint3D = AbstractPoint3D;
});
define("types/illegal-modification-exception", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IllegalModificationException = void 0;
    /**
     * An exception that is thrown when the modification of a certain value is not allowed
     */
    class IllegalModificationException extends Error {
        constructor(message) {
            super(message);
            Object.setPrototypeOf(this, IllegalModificationException.prototype);
        }
    }
    exports.IllegalModificationException = IllegalModificationException;
});
define("geometry/matrix/angle-matrices", ["require", "exports", "geometry/angle", "geometry/matrix/matrix-factory"], function (require, exports, angle_1, matrix_factory_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotationMatrices = void 0;
    class RotationMatrices {
        /**
         * Returns the matrix for the elementary angle around the `x` axis for the specified
         * angle. Multiply a point for this matrix will return the coordinates of the point after the angle
         * @param {Angle} angle the angle of the angle
         * @return {NumMatrix} the matrix for the angle
         */
        static RX(angle) {
            let theta = angle.getValueIn(angle_1.AngleUnit.RAD);
            return (0, matrix_factory_8.matrix)([
                [1, 0, 0],
                [0, Math.cos(theta), -1 * Math.sin(theta)],
                [0, Math.sin(theta), Math.cos(theta)]
            ]);
        }
        /**
         * Returns the matrix for the elementary angle around the `y` axis for the specified
         * angle. Multiply a point for this matrix will return the coordinates of the point after the angle
         * @param {Angle} angle the angle of the angle
         * @return {NumMatrix} the matrix for the angle
         */
        static RY(angle) {
            let theta = angle.getValueIn(angle_1.AngleUnit.RAD);
            return (0, matrix_factory_8.matrix)([
                [Math.cos(theta), 0, Math.sin(theta)],
                [0, 1, 0],
                [-1 * Math.sin(theta), 0, Math.cos(theta)]
            ]);
        }
        /**
         * Returns the matrix for the elementary angle around the `z` axis for the specified
         * angle. Multiply a point for this matrix will return the coordinates of the point after the angle
         * @param {Angle} angle the angle of the angle
         * @return {NumMatrix} the matrix for the angle
         */
        static RZ(angle) {
            let theta = angle.getValueIn(angle_1.AngleUnit.RAD);
            return (0, matrix_factory_8.matrix)([
                [Math.cos(theta), -1 * Math.sin(theta), 0],
                [Math.sin(theta), Math.cos(theta), 0],
                [0, 0, 1]
            ]);
        }
        /**
         * Return the matrix for the elementary angle around the specified axis for the specified axis.
         * Multiply a point for this matrix will return the coordinates of the point after the angle
         * @param {Axis} axis the axis around which the angle is desired to be performed
         * @param {Angle} angle the angle of the angle
         * @return {NumMatrix} the matrix for the angle
         */
        static R(axis, angle) {
            switch (axis) {
                case Axis.X: {
                    return this.RX(angle);
                }
                case Axis.Y: {
                    return this.RY(angle);
                }
                case Axis.Z: {
                    return this.RZ(angle);
                }
            }
        }
    }
    exports.RotationMatrices = RotationMatrices;
});
define("geometry/point/mutable-point-3d", ["require", "exports", "geometry/point/abstract-point-3d", "geometry/point/point-3d", "geometry/point/frozen-point-3d", "geometry/matrix/angle-matrices"], function (require, exports, abstract_point_3d_1, point_3d_2, frozen_point_3d_1, rotation_matrices_1) {
    "use strict";
    var _MutablePoint3D_x, _MutablePoint3D_y, _MutablePoint3D_z;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MutablePoint3D = void 0;
    /**
     * The implementation of a mutable point in a 3D reference system.
     * This class extends `AbstractPoint3D` and implements `Point3D`.
     * All the methods of this class that change the value of one of the coordinates of
     * this point will return `this` object after the modification
     */
    class MutablePoint3D extends abstract_point_3d_1.AbstractPoint3D {
        constructor(x, y, z) {
            super();
            _MutablePoint3D_x.set(this, void 0);
            _MutablePoint3D_y.set(this, void 0);
            _MutablePoint3D_z.set(this, void 0);
            (0, point_3d_2.checkNotNullCoordinates)(x, y, z, true);
            __classPrivateFieldSet(this, _MutablePoint3D_x, x, "f");
            __classPrivateFieldSet(this, _MutablePoint3D_y, y, "f");
            __classPrivateFieldSet(this, _MutablePoint3D_z, z, "f");
        }
        getCoordinate(axis) {
            switch (axis) {
                case Axis.X:
                    return __classPrivateFieldGet(this, _MutablePoint3D_x, "f");
                case Axis.Y:
                    return __classPrivateFieldGet(this, _MutablePoint3D_y, "f");
                case Axis.Z:
                    return __classPrivateFieldGet(this, _MutablePoint3D_z, "f");
            }
        }
        setCoordinate(newValue, axis) {
            switch (axis) {
                case Axis.X: {
                    __classPrivateFieldSet(this, _MutablePoint3D_x, newValue, "f");
                    break;
                }
                case Axis.Y: {
                    __classPrivateFieldSet(this, _MutablePoint3D_y, newValue, "f");
                    break;
                }
                case Axis.Z: {
                    __classPrivateFieldSet(this, _MutablePoint3D_z, newValue, "f");
                    break;
                }
            }
            return this;
        }
        translateCoordinate(translation, axis) {
            switch (axis) {
                case Axis.X: {
                    __classPrivateFieldSet(this, _MutablePoint3D_x, __classPrivateFieldGet(this, _MutablePoint3D_x, "f") + translation, "f");
                    break;
                }
                case Axis.Y: {
                    __classPrivateFieldSet(this, _MutablePoint3D_y, __classPrivateFieldGet(this, _MutablePoint3D_y, "f") + translation, "f");
                    break;
                }
                case Axis.Z: {
                    __classPrivateFieldSet(this, _MutablePoint3D_z, __classPrivateFieldGet(this, _MutablePoint3D_z, "f") + translation, "f");
                    break;
                }
            }
            return this;
        }
        dilateCoordinate(dilation, axis) {
            switch (axis) {
                case Axis.X: {
                    __classPrivateFieldSet(this, _MutablePoint3D_x, __classPrivateFieldGet(this, _MutablePoint3D_x, "f") * dilation, "f");
                    break;
                }
                case Axis.Y: {
                    __classPrivateFieldSet(this, _MutablePoint3D_y, __classPrivateFieldGet(this, _MutablePoint3D_y, "f") * dilation, "f");
                    break;
                }
                case Axis.Z: {
                    __classPrivateFieldSet(this, _MutablePoint3D_z, __classPrivateFieldGet(this, _MutablePoint3D_z, "f") * dilation, "f");
                    break;
                }
            }
            return this;
        }
        rotateAround(axis, angle) {
            let rotated = this.asColumnVector().multiply(rotation_matrices_1.RotationMatrices.R(axis, angle));
            __classPrivateFieldSet(this, _MutablePoint3D_x, rotated.get(0, 0), "f");
            __classPrivateFieldSet(this, _MutablePoint3D_y, rotated.get(1, 0), "f");
            __classPrivateFieldSet(this, _MutablePoint3D_z, rotated.get(2, 0), "f");
            return this;
        }
        frozen(denyModifiedCopy = true) {
            return new frozen_point_3d_1.FrozenPoint3D(__classPrivateFieldGet(this, _MutablePoint3D_x, "f"), __classPrivateFieldGet(this, _MutablePoint3D_y, "f"), __classPrivateFieldGet(this, _MutablePoint3D_z, "f"), denyModifiedCopy);
        }
        isFrozen() {
            return false;
        }
        isUnfrozen() {
            return true;
        }
        unfrozen() {
            return this;
        }
        clone() {
            return new MutablePoint3D(__classPrivateFieldGet(this, _MutablePoint3D_x, "f"), __classPrivateFieldGet(this, _MutablePoint3D_y, "f"), __classPrivateFieldGet(this, _MutablePoint3D_z, "f"));
        }
    }
    exports.MutablePoint3D = MutablePoint3D;
    _MutablePoint3D_x = new WeakMap(), _MutablePoint3D_y = new WeakMap(), _MutablePoint3D_z = new WeakMap();
});
define("geometry/point/frozen-point-3d", ["require", "exports", "geometry/point/point-3d", "geometry/point/abstract-point-3d", "types/illegal-modification-exception", "geometry/point/mutable-point-3d", "geometry/matrix/angle-matrices"], function (require, exports, point_3d_3, abstract_point_3d_2, illegal_modification_exception_1, mutable_point_3d_1, rotation_matrices_2) {
    "use strict";
    var _FrozenPoint3D_instances, _FrozenPoint3D_x, _FrozenPoint3D_y, _FrozenPoint3D_z, _FrozenPoint3D_denyModCopy, _FrozenPoint3D_checkCopyDenied;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FrozenPoint3D = void 0;
    /**
     * The frozen implementation of a point in 3D reference system.
     * This class extends `AbstractPoint3D` and implement `Point3D`.
     * Notice that every object of this class keeps the setting of the denying of
     * the returning modified copies.
     * If `denyModCopy` is disabled in the constructor, every method that tries to modify
     * a coordinate of this point will return a copy of this after the modification; if this
     * flag is false, then every of these methods will throw an `IllegalModificationException`
     */
    class FrozenPoint3D extends abstract_point_3d_2.AbstractPoint3D {
        constructor(x, y, z, denyModCopy = true) {
            super();
            _FrozenPoint3D_instances.add(this);
            _FrozenPoint3D_x.set(this, void 0);
            _FrozenPoint3D_y.set(this, void 0);
            _FrozenPoint3D_z.set(this, void 0);
            _FrozenPoint3D_denyModCopy.set(this, void 0);
            (0, point_3d_3.checkNotNullCoordinates)(x, y, z, true);
            __classPrivateFieldSet(this, _FrozenPoint3D_x, x, "f");
            __classPrivateFieldSet(this, _FrozenPoint3D_y, y, "f");
            __classPrivateFieldSet(this, _FrozenPoint3D_z, z, "f");
            __classPrivateFieldSet(this, _FrozenPoint3D_denyModCopy, denyModCopy, "f");
        }
        setCoordinate(newValue, axis) {
            __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
            switch (axis) {
                case Axis.X: {
                    return new FrozenPoint3D(newValue, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
                }
                case Axis.Y: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), newValue, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
                }
                case Axis.Z: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), newValue);
                }
            }
        }
        translateCoordinate(translation, axis) {
            __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
            switch (axis) {
                case Axis.X: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f") + translation, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
                }
                case Axis.Y: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f") + translation, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
                }
                case Axis.Z: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f") + translation);
                }
            }
        }
        dilateCoordinate(dilation, axis) {
            __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
            switch (axis) {
                case Axis.X: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f") * dilation, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
                }
                case Axis.Y: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f") * dilation, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
                }
                case Axis.Z: {
                    return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f") * dilation);
                }
            }
        }
        rotateAround(axis, angle) {
            let rotated = this.asColumnVector().multiply(rotation_matrices_2.RotationMatrices.R(axis, angle));
            return new FrozenPoint3D(rotated.get(0, 0), rotated.get(1, 0), rotated.get(2, 0), __classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f"));
        }
        getCoordinate(axis) {
            switch (axis) {
                case Axis.X: {
                    return __classPrivateFieldGet(this, _FrozenPoint3D_x, "f");
                }
                case Axis.Y: {
                    return __classPrivateFieldGet(this, _FrozenPoint3D_y, "f");
                }
                case Axis.Z: {
                    return __classPrivateFieldGet(this, _FrozenPoint3D_z, "f");
                }
            }
        }
        frozen(denyModifiedCopy) {
            if (__classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f") === denyModifiedCopy) {
                return this;
            }
            else {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), denyModifiedCopy);
            }
        }
        unfrozen() {
            return new mutable_point_3d_1.MutablePoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
        }
        isFrozen() {
            return true;
        }
        isUnfrozen() {
            return false;
        }
        clone() {
            return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
        }
    }
    exports.FrozenPoint3D = FrozenPoint3D;
    _FrozenPoint3D_x = new WeakMap(), _FrozenPoint3D_y = new WeakMap(), _FrozenPoint3D_z = new WeakMap(), _FrozenPoint3D_denyModCopy = new WeakMap(), _FrozenPoint3D_instances = new WeakSet(), _FrozenPoint3D_checkCopyDenied = function _FrozenPoint3D_checkCopyDenied() {
        if (__classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f")) {
            throw new illegal_modification_exception_1.IllegalModificationException("this point is frozen and copy is denied: unable to modify values or to return a modified copy");
        }
        else {
            console.log("warning: this point 3D is frozen: a copy will be returned");
        }
    };
});
define("types/triple", ["require", "exports", "types/functional", "types/exceptions/index-out-of-bound-exception", "types/cloneable", "geometry/matrix/matrix-factory"], function (require, exports, functional_4, index_out_of_bound_exception_2, cloneable_2, matrix_factory_9) {
    "use strict";
    var _Triple_first, _Triple_second, _Triple_third;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trioAsColumnArray = exports.trioAsRowArray = exports.trioOf = exports.tripleOf = exports.Triple = void 0;
    /**
     * An enumeration that allow to access the element to a specific position
     * in a `Pair` instance
     */
    var TriplePosition;
    (function (TriplePosition) {
        TriplePosition[TriplePosition["FIRST"] = 0] = "FIRST";
        TriplePosition[TriplePosition["SECOND"] = 1] = "SECOND";
        TriplePosition[TriplePosition["THIRD"] = 2] = "THIRD";
    })(TriplePosition || (TriplePosition = {}));
    /***
     * A set of three objects
     */
    class Triple extends functional_4.AbstractFunctionalObject {
        constructor(first, second, third) {
            super();
            _Triple_first.set(this, void 0);
            _Triple_second.set(this, void 0);
            _Triple_third.set(this, void 0);
            __classPrivateFieldSet(this, _Triple_first, first, "f");
            __classPrivateFieldSet(this, _Triple_second, second, "f");
            __classPrivateFieldSet(this, _Triple_third, third, "f");
        }
        /**
         * Gets the element at the specified position
         * @param {TriplePosition} position the position of the element to get
         * @return {F|S|T} the desired element
         * @throws {IndexOutOfBoundException} if the index is not valid
         */
        get(position) {
            switch (position) {
                case TriplePosition.FIRST || 0: return __classPrivateFieldGet(this, _Triple_first, "f");
                case TriplePosition.SECOND || 0: return __classPrivateFieldGet(this, _Triple_second, "f");
                case TriplePosition.THIRD || 0: return __classPrivateFieldGet(this, _Triple_third, "f");
                default:
                    throw new index_out_of_bound_exception_2.IndexOutOfBoundException(position);
            }
        }
        /**
         * Sets the element of this triple at the specified position.
         * Please notice that **this method is not safe cause it is not possible to check the type** of
         * the value to be set
         * @param {F|S} value the value to be set
         * @param {PairPosition} position the position in which put the new value
         * @throws {IndexOutOfBoundException} if the index is not valid
         */
        set(value, position) {
            switch (position) {
                case TriplePosition.FIRST: __classPrivateFieldSet(this, _Triple_first, value, "f");
                case TriplePosition.SECOND: __classPrivateFieldSet(this, _Triple_second, value, "f");
                case TriplePosition.THIRD: __classPrivateFieldSet(this, _Triple_third, value, "f");
                default:
                    throw new index_out_of_bound_exception_2.IndexOutOfBoundException(position);
            }
        }
        /**
         * Returns the **first** element of this pair
         */
        getFirst() {
            return __classPrivateFieldGet(this, _Triple_first, "f");
        }
        /**
         * Returns the **second** element of this pair
         */
        getSecond() {
            return __classPrivateFieldGet(this, _Triple_second, "f");
        }
        /**
         * Returns the **third** element of this pair
         */
        getThird() {
            return __classPrivateFieldGet(this, _Triple_third, "f");
        }
        /**
         * Sets the **first** element of this pair
         * @param {F|null} first the first element
         */
        setFirst(first) {
            __classPrivateFieldSet(this, _Triple_first, first, "f");
        }
        /**
         * Sets the **second** element of this pair
         * @param {S|null} second the first element
         */
        setSecond(second) {
            __classPrivateFieldSet(this, _Triple_second, second, "f");
        }
        /**
         * Sets the **third** element of this pair
         * @param {T|null} second the first element
         */
        setThird(third) {
            __classPrivateFieldSet(this, _Triple_third, third, "f");
        }
        /**
         * Returns a copy of this triple but **switched to right**
         * (the `first` element of this will become the `second` of the new, the
         * `second` element of this will become the `third` of the new and the current `third` will
         * become the new `first`)
         */
        switched() {
            return new Triple(__classPrivateFieldGet(this, _Triple_third, "f"), __classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"));
        }
        /**
         * Collects the three element of this triple to produce a single result
         * @param {(first: F, second: S, third: T) => R} collector the function that accepts the three elements of this
         * triple and returns the result
         */
        collect(collector) {
            return collector(__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f"));
        }
        /**
         * Applies the `mapper` function on the **first** element of this triple and
         * returns a new triple which contains the result of this function as the first
         * element, the second element and the third that are the second and the third one of this triple
         * @param {(first: F|null) => R} mapper the transformation function for the `first` element
         * @return {Triple<R, S, T>} the new pair with the transformed first element
         */
        mapFirst(mapper) {
            return new Triple(mapper(__classPrivateFieldGet(this, _Triple_first, "f")), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f"));
        }
        /**
         * Applies the `mapper` function on the **second** element of this triple and
         * returns a new triple which contains the result of this function as the second
         * element and the first and the third element that are the first and the third ones of this triple
         * @param {(second: S|null) => R} mapper the transformation function for the `second` element
         * @return {Triple<F, R, T>} the new triple with the transformed second element
         */
        mapSecond(mapper) {
            return new Triple(__classPrivateFieldGet(this, _Triple_first, "f"), mapper(__classPrivateFieldGet(this, _Triple_second, "f")), __classPrivateFieldGet(this, _Triple_third, "f"));
        }
        /**
         * Applies the `mapper` function on the **third** element of this triple and
         * returns a new triple which contains the result of this function as the third
         * element and the first and the second element that are the first and the second ones of this triple
         * @param {(third: T|null) => R} mapper the transformation function for the `third` element
         * @return {Triple<F, S, R>} the new triple with the transformed second element
         */
        mapThird(mapper) {
            return new Triple(__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), mapper(__classPrivateFieldGet(this, _Triple_third, "f")));
        }
        /**
         * Returns an array containing the two elements in this pair, preserving the order
         */
        toArray() {
            return [__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f")];
        }
        /**
         * Returns a clone of this pair. Every changes over the returning value **will not have effects** on
         * this.
         * **Notice that the copy will be deep only if the two elements are `Cloneable` themselves**, otherwise
         * the clone will be a shallow copy equivalent to the result of `copy()`
         */
        clone() {
            return new Triple((0, cloneable_2.tryClone)(__classPrivateFieldGet(this, _Triple_first, "f")), (0, cloneable_2.tryClone)(__classPrivateFieldGet(this, _Triple_second, "f")), (0, cloneable_2.tryClone)(__classPrivateFieldGet(this, _Triple_third, "f")));
        }
        /**
         * Returns a shallow copy of this pair.
         * Every changes over the returning value **will not have effects** on this but changes on the elements
         * can be propagated (is a *shallow copy*)
         */
        copy() {
            return new Triple(__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f"));
        }
        toString() {
            return "Pair(" + __classPrivateFieldGet(this, _Triple_first, "f") + ", " + __classPrivateFieldGet(this, _Triple_second, "f") + ")";
        }
        /**
         * Returns `true` the `other` object is a `Triple` with the two elements that are
         * equals (intended as `===`) to the ones in this pair
         * @param {any} other the other object
         * @return {boolean} `true` if the `other` is a triple equals to this
         */
        equals(other) {
            if (other != null) {
                if (other instanceof Triple) {
                    return __classPrivateFieldGet(this, _Triple_first, "f") === __classPrivateFieldGet(other, _Triple_first, "f") && __classPrivateFieldGet(this, _Triple_second, "f") === __classPrivateFieldGet(other, _Triple_second, "f");
                }
            }
            return false;
        }
    }
    exports.Triple = Triple;
    _Triple_first = new WeakMap(), _Triple_second = new WeakMap(), _Triple_third = new WeakMap();
    /**
     * Creates and returns a new **triple** with the three elements given as parameters
     * @param {F|null} first the first element
     * @param {S|null} second the second element
     * @param {T|null} third the third element
     * @return {Triple<F, S, T>} the new created triple
     */
    function tripleOf(first, second, third) {
        return new Triple(first, second, third);
    }
    exports.tripleOf = tripleOf;
    /**
     * Creates and returns a new **trio** with the three elements given as parameters
     * @param {F|null} first the first element
     * @param {S|null} second the second element
     * @param {T|null} third the third element
     * @return {Triple<F, S, T>} the new created trio
     */
    function trioOf(first, second, third) {
        return new Triple(first, second, third);
    }
    exports.trioOf = trioOf;
    /**
     * Creates and returns a row array intended as a *1x3* matrix
     * @param {Trio<T>} trio the trio to be converted
     * @return a *1x3* matrix with the elements of the given triple
     */
    function trioAsRowArray(trio) {
        let data = trio.toArray();
        return (0, matrix_factory_9.matrix)(data);
    }
    exports.trioAsRowArray = trioAsRowArray;
    /**
     * Creates and returns a column array intended as a *3x1* matrix
     * @param {Trio<T>} trio the trio to be converted
     * @return a *3x1* matrix with the elements of the given triple
     */
    function trioAsColumnArray(trio) {
        let data = new Array(2);
        for (let r = 0; r < data.length; r++) {
            data[r] = [trio.get(r)];
        }
        return (0, matrix_factory_9.matrix)(data);
    }
    exports.trioAsColumnArray = trioAsColumnArray;
});
define("types/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTypeName = void 0;
    /**
     * Returns the name of the type of the object looking for the class name if it's an object
     * or returning the primitive name if not
     * @param {any} obj the object
     * @return the name of the type of the object
     */
    function getTypeName(obj) {
        if (typeof obj == "object" || typeof obj == "function") {
            return obj.constructor.name;
        }
        return typeof obj;
    }
    exports.getTypeName = getTypeName;
});
define("geometry/point/point-factory", ["require", "exports", "geometry/point/frozen-point-3d", "geometry/point/mutable-point-3d", "types/triple", "types/illegal-argument-exception", "geometry/matrix/abstract-matrix", "types/types"], function (require, exports, frozen_point_3d_2, mutable_point_3d_2, triple_1, illegal_argument_exception_6, abstract_matrix_3, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mutablePoint3D = exports.frozenPoint3D = exports.point3D = exports.PointFactory = void 0;
    /**
     * A factory for the points
     */
    class PointFactory {
        /**
         * Creates and return a new frozen point.
         * If `denyModifiedCopy` is set to `true`, all the methods that modify the values of the
         * coordinates of the point will throw an error. Instead, if it is `false`, all of this methods
         * will not modify the internal values of the coordinates but will return new frozen copies that
         * will contain the modification
         * @param {number} x the value of the `x` coordinate
         * @param {number} y the value of the `y` coordinate
         * @param {number} z the value of the `z` coordinate
         * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy (`false` by default)
         * @return {Point3D} the new point
         */
        static newFrozenPoint3D(x, y, z, denyModifiedCopy = false) {
            return new frozen_point_3d_2.FrozenPoint3D(x, y, z, denyModifiedCopy);
        }
        /**
         * Creates and return a new point that is modifiable
         * @param {number} x the value of the `x` coordinate
         * @param {number} y the value of the `y` coordinate
         * @param {number} z the value of the `z` coordinate
         * @return {Point3D} the new point
         */
        static newMutablePoint3D(x, y, z) {
            return new mutable_point_3d_2.MutablePoint3D(x, y, z);
        }
        /**
         * Returns the origin of a cartesian reference system
         * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
         * by default)
         * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
         * the point is frozen (`true` by default)
         */
        static origin(frozen = false, denyModifiedCopy = true) {
            if (frozen) {
                return new frozen_point_3d_2.FrozenPoint3D(0, 0, 0, denyModifiedCopy);
            }
            else {
                return new mutable_point_3d_2.MutablePoint3D(0, 0, 0);
            }
        }
        /**
         * Creates and returns a new `Point3D`
         * @param {number} x the value of the `x` coordinate
         * @param {number} y the value of the `y` coordinate
         * @param {number} z the value of the `z` coordinate
         * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
         * by default)
         * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
         * the point is frozen (`true` by default)
         */
        static newPoint3D(x, y, z, frozen = false, denyModifiedCopy = true) {
            if (frozen) {
                return this.newFrozenPoint3D(x, y, z, denyModifiedCopy);
            }
            else {
                return this.newMutablePoint3D(x, y, z);
            }
        }
    }
    exports.PointFactory = PointFactory;
    function point3D(xOrData, y, z) {
        if (typeof xOrData == "number") {
            return PointFactory.newPoint3D(xOrData, y, z);
        }
        else if (xOrData instanceof triple_1.Triple) {
            return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird());
        }
        else if (xOrData instanceof (Array)) {
            if (xOrData.length != 3)
                throw new illegal_argument_exception_6.IllegalArgumentException("the array must have exactly 3 elements and not [" + xOrData.length + "]");
            return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2]);
        }
        else if (xOrData instanceof abstract_matrix_3.AbstractMatrix) {
            if (xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
                return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1), xOrData.get(0, 2));
            }
            else if (xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
                return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0), xOrData.get(2, 0));
            }
            else {
                throw new illegal_argument_exception_6.IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                    xOrData.rowSize() + "x" + xOrData.columnSize() + "]");
            }
        }
        throw new illegal_argument_exception_6.IllegalArgumentException("invalid parameter type [" + (0, types_1.getTypeName)(xOrData) + "]");
    }
    exports.point3D = point3D;
    function frozenPoint3D(xOrData, y, z) {
        if (typeof xOrData == "number") {
            return PointFactory.newPoint3D(xOrData, y, z, true, false);
        }
        else if (xOrData instanceof triple_1.Triple) {
            return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird(), true, false);
        }
        else if (xOrData instanceof (Array)) {
            if (xOrData.length != 3)
                throw new illegal_argument_exception_6.IllegalArgumentException("the array must have exactly 3 elements and not [" + xOrData.length + "]");
            return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2], true, false);
        }
        else if (xOrData instanceof abstract_matrix_3.AbstractMatrix) {
            if (xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
                return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1), xOrData.get(0, 2), true, false);
            }
            else if (xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
                return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0), xOrData.get(2, 0), true, false);
            }
            else {
                throw new illegal_argument_exception_6.IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                    xOrData.rowSize() + "x" + xOrData.columnSize() + "]");
            }
        }
        throw new illegal_argument_exception_6.IllegalArgumentException("invalid parameter type [" + (0, types_1.getTypeName)(xOrData) + "]");
    }
    exports.frozenPoint3D = frozenPoint3D;
    function mutablePoint3D(xOrData, y, z) {
        if (typeof xOrData == "number") {
            return PointFactory.newPoint3D(xOrData, y, z, false);
        }
        else if (xOrData instanceof triple_1.Triple) {
            return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird(), false);
        }
        else if (xOrData instanceof (Array)) {
            if (xOrData.length != 3)
                throw new illegal_argument_exception_6.IllegalArgumentException("the array must have exactly 3 elements and not [" + xOrData.length + "]");
            return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2], false);
        }
        else if (xOrData instanceof abstract_matrix_3.AbstractMatrix) {
            if (xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
                return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1), xOrData.get(0, 2), false);
            }
            else if (xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
                return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0), xOrData.get(2, 0), false);
            }
            else {
                throw new illegal_argument_exception_6.IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                    xOrData.rowSize() + "x" + xOrData.columnSize() + "]");
            }
        }
        throw new illegal_argument_exception_6.IllegalArgumentException("invalid parameter type [" + (0, types_1.getTypeName)(xOrData) + "]");
    }
    exports.mutablePoint3D = mutablePoint3D;
});
//import {sayHello} from "../../lib/js/hello";
define("test", ["require", "exports", "geometry/point/point-factory"], function (require, exports, point_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log('started');
    // console.log('typeof sayhello: ' + typeof sayHello)
    // sayHello()
    const point = (0, point_factory_1.point3D)(0, 0, 0);
    console.log('point: ' + point.toString());
});
var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
    Axis[Axis["Z"] = 2] = "Z";
})(Axis || (Axis = {}));
//# sourceMappingURL=bundle.js.map