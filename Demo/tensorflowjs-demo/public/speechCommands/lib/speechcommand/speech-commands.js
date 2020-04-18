/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs'), require('util')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs', 'util'], factory) :
    (factory((global.speechCommands = {}),global.tf,null));
}(this, (function (exports,tf,util) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function loadMetadataJson(url) {
        return __awaiter(this, void 0, void 0, function () {
            var HTTP_SCHEME, HTTPS_SCHEME, FILE_SCHEME, response, parsed, fs, readFile, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        HTTP_SCHEME = 'http://';
                        HTTPS_SCHEME = 'https://';
                        FILE_SCHEME = 'file://';
                        if (!(url.indexOf(HTTP_SCHEME) === 0 || url.indexOf(HTTPS_SCHEME) === 0)) return [3, 3];
                        return [4, fetch(url)];
                    case 1:
                        response = _c.sent();
                        return [4, response.json()];
                    case 2:
                        parsed = _c.sent();
                        return [2, parsed];
                    case 3:
                        if (!(url.indexOf(FILE_SCHEME) === 0)) return [3, 5];
                        fs = require('fs');
                        readFile = util.promisify(fs.readFile);
                        _b = (_a = JSON).parse;
                        return [4, readFile(url.slice(FILE_SCHEME.length), { encoding: 'utf-8' })];
                    case 4: return [2, _b.apply(_a, [_c.sent()])];
                    case 5: throw new Error("Unsupported URL scheme in metadata URL: " + url + ". " +
                        "Supported schemes are: http://, https://, and " +
                        "(node.js-only) file://");
                }
            });
        });
    }
    var EPSILON = null;
    function normalize(x) {
        if (EPSILON == null) {
            EPSILON = tf.backend().epsilon();
        }
        return tf.tidy(function () {
            var _a = tf.moments(x), mean = _a.mean, variance = _a.variance;
            return x.sub(mean).div(variance.sqrt().add(EPSILON));
        });
    }
    function normalizeFloat32Array(x) {
        if (x.length < 2) {
            throw new Error('Cannot normalize a Float32Array with fewer than 2 elements.');
        }
        if (EPSILON == null) {
            EPSILON = tf.backend().epsilon();
        }
        return tf.tidy(function () {
            var _a = tf.moments(tf.tensor1d(x)), mean = _a.mean, variance = _a.variance;
            var meanVal = mean.arraySync();
            var stdVal = Math.sqrt(variance.arraySync());
            var yArray = Array.from(x).map(function (y) { return (y - meanVal) / (stdVal + EPSILON); });
            return new Float32Array(yArray);
        });
    }
    function getAudioContextConstructor() {
        return window.AudioContext || window.webkitAudioContext;
    }
    function getAudioMediaStream(audioTrackConstraints) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, navigator.mediaDevices.getUserMedia({
                        audio: audioTrackConstraints == null ? true : audioTrackConstraints,
                        video: false
                    })];
            });
        });
    }
    function playRawAudio(rawAudio, onEnded) {
        var audioContextConstructor = window.AudioContext || window.webkitAudioContext;
        var audioContext = new audioContextConstructor({sampleRate:44100});
        var arrayBuffer = audioContext.createBuffer(1, rawAudio.data.length, rawAudio.sampleRateHz);
        var nowBuffering = arrayBuffer.getChannelData(0);
        nowBuffering.set(rawAudio.data);
        var source = audioContext.createBufferSource();
        source.buffer = arrayBuffer;
        source.connect(audioContext.destination);
        source.start();
        source.onended = function () {
            if (onEnded != null) {
                onEnded();
            }
        };
    }

    var BrowserFftFeatureExtractor = (function () {
        function BrowserFftFeatureExtractor(config) {
            var _this = this;
            if (config == null) {
                throw new Error("Required configuration object is missing for " +
                    "BrowserFftFeatureExtractor constructor");
            }
            if (config.spectrogramCallback == null) {
                throw new Error("spectrogramCallback cannot be null or undefined");
            }
            if (!(config.numFramesPerSpectrogram > 0)) {
                throw new Error("Invalid value in numFramesPerSpectrogram: " +
                    ("" + config.numFramesPerSpectrogram));
            }
            if (config.suppressionTimeMillis < 0) {
                throw new Error("Expected suppressionTimeMillis to be >= 0, " +
                    ("but got " + config.suppressionTimeMillis));
            }
            this.suppressionTimeMillis = config.suppressionTimeMillis;
            this.spectrogramCallback = config.spectrogramCallback;
            this.numFrames = config.numFramesPerSpectrogram;
            this.sampleRateHz = config.sampleRateHz || 44100;
            this.fftSize = config.fftSize || 1024;
            this.frameDurationMillis = this.fftSize / this.sampleRateHz * 1e3;
            this.columnTruncateLength = config.columnTruncateLength || this.fftSize;
            this.overlapFactor = config.overlapFactor;
            this.includeRawAudio = config.includeRawAudio;
            tf.util.assert(this.overlapFactor >= 0 && this.overlapFactor < 1, function () { return "Expected overlapFactor to be >= 0 and < 1, " +
                ("but got " + _this.overlapFactor); });
            if (this.columnTruncateLength > this.fftSize) {
                throw new Error("columnTruncateLength " + this.columnTruncateLength + " exceeds " +
                    ("fftSize (" + this.fftSize + ")."));
            }
            this.audioContextConstructor = getAudioContextConstructor();
        }
        BrowserFftFeatureExtractor.prototype.start = function (audioTrackConstraints) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, streamSource, period;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.frameIntervalTask != null) {
                                throw new Error('Cannot start already-started BrowserFftFeatureExtractor');
                            }
                            _a = this;
                            return [4, getAudioMediaStream(audioTrackConstraints)];
                        case 1:
                            _a.stream = _b.sent();
                            this.audioContext = new this.audioContextConstructor({sampleRate:44100});
                            if (this.audioContext.sampleRate !== this.sampleRateHz) {
                                console.warn("Mismatch in sampling rate: " +
                                    ("Expected: " + this.sampleRateHz + "; ") +
                                    ("Actual: " + this.audioContext.sampleRate));
                            }
                            streamSource = this.audioContext.createMediaStreamSource(this.stream);
                            this.analyser = this.audioContext.createAnalyser();
                            this.analyser.fftSize = this.fftSize * 2;
                            this.analyser.smoothingTimeConstant = 0.0;
                            streamSource.connect(this.analyser);
                            this.freqDataQueue = [];
                            this.freqData = new Float32Array(this.fftSize);
                            if (this.includeRawAudio) {
                                this.timeDataQueue = [];
                                this.timeData = new Float32Array(this.fftSize);
                            }
                            period = Math.max(1, Math.round(this.numFrames * (1 - this.overlapFactor)));
                            this.tracker = new Tracker(period, Math.round(this.suppressionTimeMillis / this.frameDurationMillis));
                            this.frameIntervalTask = setInterval(this.onAudioFrame.bind(this), this.fftSize / this.sampleRateHz * 1e3);
                            return [2];
                    }
                });
            });
        };
        BrowserFftFeatureExtractor.prototype.onAudioFrame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var shouldFire, freqData, freqDataTensor, timeDataTensor, timeData, shouldRest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.analyser.getFloatFrequencyData(this.freqData);
                            if (this.freqData[0] === -Infinity) {
                                return [2];
                            }
                            this.freqDataQueue.push(this.freqData.slice(0, this.columnTruncateLength));
                            if (this.includeRawAudio) {
                                this.analyser.getFloatTimeDomainData(this.timeData);
                                this.timeDataQueue.push(this.timeData.slice());
                            }
                            if (this.freqDataQueue.length > this.numFrames) {
                                this.freqDataQueue.shift();
                            }
                            shouldFire = this.tracker.tick();
                            if (!shouldFire) return [3, 2];
                            freqData = flattenQueue(this.freqDataQueue);
                            freqDataTensor = getInputTensorFromFrequencyData(freqData, [1, this.numFrames, this.columnTruncateLength, 1]);
                            timeDataTensor = void 0;
                            if (this.includeRawAudio) {
                                timeData = flattenQueue(this.timeDataQueue);
                                timeDataTensor = getInputTensorFromFrequencyData(timeData, [1, this.numFrames * this.fftSize]);
                            }
                            return [4, this.spectrogramCallback(freqDataTensor, timeDataTensor)];
                        case 1:
                            shouldRest = _a.sent();
                            if (shouldRest) {
                                this.tracker.suppress();
                            }
                            tf.dispose([freqDataTensor, timeDataTensor]);
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            });
        };
        BrowserFftFeatureExtractor.prototype.stop = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.frameIntervalTask == null) {
                        throw new Error('Cannot stop because there is no ongoing streaming activity.');
                    }
                    clearInterval(this.frameIntervalTask);
                    this.frameIntervalTask = null;
                    this.analyser.disconnect();
                    this.audioContext.close();
                    if (this.stream != null && this.stream.getTracks().length > 0) {
                        this.stream.getTracks()[0].stop();
                    }
                    return [2];
                });
            });
        };
        BrowserFftFeatureExtractor.prototype.setConfig = function (params) {
            throw new Error('setConfig() is not implemented for BrowserFftFeatureExtractor.');
        };
        BrowserFftFeatureExtractor.prototype.getFeatures = function () {
            throw new Error('getFeatures() is not implemented for ' +
                'BrowserFftFeatureExtractor. Use the spectrogramCallback ' +
                'field of the constructor config instead.');
        };
        return BrowserFftFeatureExtractor;
    }());
    function flattenQueue(queue) {
        var frameSize = queue[0].length;
        var freqData = new Float32Array(queue.length * frameSize);
        queue.forEach(function (data, i) { return freqData.set(data, i * frameSize); });
        return freqData;
    }
    function getInputTensorFromFrequencyData(freqData, shape) {
        var vals = new Float32Array(tf.util.sizeFromShape(shape));
        vals.set(freqData, vals.length - freqData.length);
        return tf.tensor(vals, shape);
    }
    var Tracker = (function () {
        function Tracker(period, suppressionPeriod) {
            var _this = this;
            this.period = period;
            this.suppressionTime = suppressionPeriod == null ? 0 : suppressionPeriod;
            this.counter = 0;
            tf.util.assert(this.period > 0, function () { return "Expected period to be positive, but got " + _this.period; });
        }
        Tracker.prototype.tick = function () {
            this.counter++;
            var shouldFire = (this.counter % this.period === 0) &&
                (this.suppressionOnset == null ||
                    this.counter - this.suppressionOnset > this.suppressionTime);
            return shouldFire;
        };
        Tracker.prototype.suppress = function () {
            this.suppressionOnset = this.counter;
        };
        return Tracker;
    }());

    function concatenateArrayBuffers(buffers) {
        var totalByteLength = 0;
        buffers.forEach(function (buffer) {
            totalByteLength += buffer.byteLength;
        });
        var temp = new Uint8Array(totalByteLength);
        var offset = 0;
        buffers.forEach(function (buffer) {
            temp.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        });
        return temp.buffer;
    }
    function concatenateFloat32Arrays(xs) {
        var totalLength = 0;
        xs.forEach(function (x) { return totalLength += x.length; });
        var concatenated = new Float32Array(totalLength);
        var index = 0;
        xs.forEach(function (x) {
            concatenated.set(x, index);
            index += x.length;
        });
        return concatenated;
    }
    function string2ArrayBuffer(str) {
        if (str == null) {
            throw new Error('Received null or undefind string');
        }
        var strUTF8 = unescape(encodeURIComponent(str));
        var buf = new Uint8Array(strUTF8.length);
        for (var i = 0; i < strUTF8.length; ++i) {
            buf[i] = strUTF8.charCodeAt(i);
        }
        return buf.buffer;
    }
    function arrayBuffer2String(buffer) {
        if (buffer == null) {
            throw new Error('Received null or undefind buffer');
        }
        var buf = new Uint8Array(buffer);
        return decodeURIComponent(escape(String.fromCharCode.apply(String, __spread(buf))));
    }
    function getUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
            s4() + s4();
    }
    function getRandomInteger(min, max) {
        return Math.floor((max - min) * Math.random()) + min;
    }

    function balancedTrainValSplit(xs, ys, valSplit) {
        tf.util.assert(valSplit > 0 && valSplit < 1, function () { return "validationSplit is expected to be >0 and <1, " +
            ("but got " + valSplit); });
        return tf.tidy(function () {
            var classIndices = ys.argMax(-1).dataSync();
            var indicesByClasses = [];
            for (var i = 0; i < classIndices.length; ++i) {
                var classIndex = classIndices[i];
                if (indicesByClasses[classIndex] == null) {
                    indicesByClasses[classIndex] = [];
                }
                indicesByClasses[classIndex].push(i);
            }
            var numClasses = indicesByClasses.length;
            var trainIndices = [];
            var valIndices = [];
            indicesByClasses.map(function (classIndices) { return tf.util.shuffle(classIndices); });
            for (var i = 0; i < numClasses; ++i) {
                var classIndices_1 = indicesByClasses[i];
                var cutoff = Math.round(classIndices_1.length * (1 - valSplit));
                for (var j = 0; j < classIndices_1.length; ++j) {
                    if (j < cutoff) {
                        trainIndices.push(classIndices_1[j]);
                    }
                    else {
                        valIndices.push(classIndices_1[j]);
                    }
                }
            }
            var trainXs = tf.gather(xs, trainIndices);
            var trainYs = tf.gather(ys, trainIndices);
            var valXs = tf.gather(xs, valIndices);
            var valYs = tf.gather(ys, valIndices);
            return { trainXs: trainXs, trainYs: trainYs, valXs: valXs, valYs: valYs };
        });
    }
    function balancedTrainValSplitNumArrays(xs, ys, valSplit) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        tf.util.assert(valSplit > 0 && valSplit < 1, function () { return "validationSplit is expected to be >0 and <1, " +
            ("but got " + valSplit); });
        var isXsFloat32Array = !Array.isArray(xs[0]);
        var classIndices = ys;
        var indicesByClasses = [];
        for (var i = 0; i < classIndices.length; ++i) {
            var classIndex = classIndices[i];
            if (indicesByClasses[classIndex] == null) {
                indicesByClasses[classIndex] = [];
            }
            indicesByClasses[classIndex].push(i);
        }
        var numClasses = indicesByClasses.length;
        var trainIndices = [];
        var valIndices = [];
        indicesByClasses.map(function (classIndices) { return tf.util.shuffle(classIndices); });
        for (var i = 0; i < numClasses; ++i) {
            var classIndices_2 = indicesByClasses[i];
            var cutoff = Math.round(classIndices_2.length * (1 - valSplit));
            for (var j = 0; j < classIndices_2.length; ++j) {
                if (j < cutoff) {
                    trainIndices.push(classIndices_2[j]);
                }
                else {
                    valIndices.push(classIndices_2[j]);
                }
            }
        }
        if (isXsFloat32Array) {
            var trainXs = [];
            var trainYs = [];
            var valXs = [];
            var valYs = [];
            try {
                for (var trainIndices_1 = __values(trainIndices), trainIndices_1_1 = trainIndices_1.next(); !trainIndices_1_1.done; trainIndices_1_1 = trainIndices_1.next()) {
                    var index = trainIndices_1_1.value;
                    trainXs.push(xs[index]);
                    trainYs.push(ys[index]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (trainIndices_1_1 && !trainIndices_1_1.done && (_a = trainIndices_1.return)) _a.call(trainIndices_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var valIndices_1 = __values(valIndices), valIndices_1_1 = valIndices_1.next(); !valIndices_1_1.done; valIndices_1_1 = valIndices_1.next()) {
                    var index = valIndices_1_1.value;
                    valXs.push(xs[index]);
                    valYs.push(ys[index]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (valIndices_1_1 && !valIndices_1_1.done && (_b = valIndices_1.return)) _b.call(valIndices_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return { trainXs: trainXs, trainYs: trainYs, valXs: valXs, valYs: valYs };
        }
        else {
            var trainXs = [];
            var trainYs = [];
            var valXs = [];
            var valYs = [];
            try {
                for (var trainIndices_2 = __values(trainIndices), trainIndices_2_1 = trainIndices_2.next(); !trainIndices_2_1.done; trainIndices_2_1 = trainIndices_2.next()) {
                    var index = trainIndices_2_1.value;
                    trainXs.push(xs[index]);
                    trainYs.push(ys[index]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (trainIndices_2_1 && !trainIndices_2_1.done && (_c = trainIndices_2.return)) _c.call(trainIndices_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var valIndices_2 = __values(valIndices), valIndices_2_1 = valIndices_2.next(); !valIndices_2_1.done; valIndices_2_1 = valIndices_2.next()) {
                    var index = valIndices_2_1.value;
                    valXs.push(xs[index]);
                    valYs.push(ys[index]);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (valIndices_2_1 && !valIndices_2_1.done && (_d = valIndices_2.return)) _d.call(valIndices_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return { trainXs: trainXs, trainYs: trainYs, valXs: valXs, valYs: valYs };
        }
    }

    var DATASET_SERIALIZATION_DESCRIPTOR = 'TFJSSCDS';
    var DATASET_SERIALIZATION_VERSION = 1;
    var BACKGROUND_NOISE_TAG = '_background_noise_';
    var Dataset = (function () {
        function Dataset(serialized) {
            this.examples = {};
            this.label2Ids = {};
            if (serialized != null) {
                var artifacts = arrayBuffer2SerializedExamples(serialized);
                var offset = 0;
                for (var i = 0; i < artifacts.manifest.length; ++i) {
                    var spec = artifacts.manifest[i];
                    var byteLen = spec.spectrogramNumFrames * spec.spectrogramFrameSize;
                    if (spec.rawAudioNumSamples != null) {
                        byteLen += spec.rawAudioNumSamples;
                    }
                    byteLen *= 4;
                    this.addExample(deserializeExample({ spec: spec, data: artifacts.data.slice(offset, offset + byteLen) }));
                    offset += byteLen;
                }
            }
        }
        Dataset.prototype.addExample = function (example) {
            tf.util.assert(example != null, function () { return 'Got null or undefined example'; });
            tf.util.assert(example.label != null && example.label.length > 0, function () { return "Expected label to be a non-empty string, " +
                ("but got " + JSON.stringify(example.label)); });
            var uid = getUID();
            this.examples[uid] = example;
            if (!(example.label in this.label2Ids)) {
                this.label2Ids[example.label] = [];
            }
            this.label2Ids[example.label].push(uid);
            return uid;
        };
        Dataset.prototype.merge = function (dataset) {
            var e_1, _a, e_2, _b;
            tf.util.assert(dataset !== this, function () { return 'Cannot merge a dataset into itself'; });
            var vocab = dataset.getVocabulary();
            try {
                for (var vocab_1 = __values(vocab), vocab_1_1 = vocab_1.next(); !vocab_1_1.done; vocab_1_1 = vocab_1.next()) {
                    var word = vocab_1_1.value;
                    var examples = dataset.getExamples(word);
                    try {
                        for (var examples_1 = (e_2 = void 0, __values(examples)), examples_1_1 = examples_1.next(); !examples_1_1.done; examples_1_1 = examples_1.next()) {
                            var example = examples_1_1.value;
                            this.addExample(example.example);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (examples_1_1 && !examples_1_1.done && (_b = examples_1.return)) _b.call(examples_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (vocab_1_1 && !vocab_1_1.done && (_a = vocab_1.return)) _a.call(vocab_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        Dataset.prototype.getExampleCounts = function () {
            var counts = {};
            for (var uid in this.examples) {
                var example = this.examples[uid];
                if (!(example.label in counts)) {
                    counts[example.label] = 0;
                }
                counts[example.label]++;
            }
            return counts;
        };
        Dataset.prototype.getExamples = function (label) {
            var _this = this;
            tf.util.assert(label != null, function () {
                return "Expected label to be a string, but got " + JSON.stringify(label);
            });
            tf.util.assert(label in this.label2Ids, function () { return "No example of label \"" + label + "\" exists in dataset"; });
            var output = [];
            this.label2Ids[label].forEach(function (id) {
                output.push({ uid: id, example: _this.examples[id] });
            });
            return output;
        };
        Dataset.prototype.getData = function (label, config) {
            var _this = this;
            tf.util.assert(this.size() > 0, function () {
                return "Cannot get spectrograms as tensors because the dataset is empty";
            });
            var vocab = this.getVocabulary();
            if (label != null) {
                tf.util.assert(vocab.indexOf(label) !== -1, function () { return "Label " + label + " is not in the vocabulary " +
                    ("(" + JSON.stringify(vocab) + ")"); });
            }
            else {
                tf.util.assert(vocab.length > 1, function () { return "One-hot encoding of labels requires the vocabulary to have " +
                    ("at least two words, but it has only " + vocab.length + " word."); });
            }
            if (config == null) {
                config = {};
            }
            var sortedUniqueNumFrames = this.getSortedUniqueNumFrames();
            var numFrames;
            var hopFrames;
            if (sortedUniqueNumFrames.length === 1) {
                numFrames = config.numFrames == null ? sortedUniqueNumFrames[0] :
                    config.numFrames;
                hopFrames = config.hopFrames == null ? 1 : config.hopFrames;
            }
            else {
                numFrames = config.numFrames;
                tf.util.assert(numFrames != null && Number.isInteger(numFrames) && numFrames > 0, function () { return "There are " + sortedUniqueNumFrames.length + " unique lengths among " +
                    ("the " + _this.size() + " examples of this Dataset, hence numFrames ") +
                    "is required. But it is not provided."; });
                tf.util.assert(numFrames <= sortedUniqueNumFrames[0], function () { return "numFrames (" + numFrames + ") exceeds the minimum numFrames " +
                    ("(" + sortedUniqueNumFrames[0] + ") among the examples of ") +
                    "the Dataset."; });
                hopFrames = config.hopFrames;
                tf.util.assert(hopFrames != null && Number.isInteger(hopFrames) && hopFrames > 0, function () { return "There are " + sortedUniqueNumFrames.length + " unique lengths among " +
                    ("the " + _this.size() + " examples of this Dataset, hence hopFrames ") +
                    "is required. But it is not provided."; });
            }
            var toNormalize = config.normalize == null ? true : config.normalize;
            return tf.tidy(function () {
                var e_3, _a;
                var xTensors = [];
                var xArrays = [];
                var labelIndices = [];
                var uniqueFrameSize;
                for (var i = 0; i < vocab.length; ++i) {
                    var currentLabel = vocab[i];
                    if (label != null && currentLabel !== label) {
                        continue;
                    }
                    var ids = _this.label2Ids[currentLabel];
                    var _loop_1 = function (id) {
                        var e_4, _a;
                        var example = _this.examples[id];
                        var spectrogram = example.spectrogram;
                        var frameSize = spectrogram.frameSize;
                        if (uniqueFrameSize == null) {
                            uniqueFrameSize = frameSize;
                        }
                        else {
                            tf.util.assert(frameSize === uniqueFrameSize, function () { return "Mismatch in frameSize  " +
                                ("(" + frameSize + " vs " + uniqueFrameSize + ")"); });
                        }
                        var snippetLength = spectrogram.data.length / frameSize;
                        var focusIndex = null;
                        if (currentLabel !== BACKGROUND_NOISE_TAG) {
                            focusIndex = spectrogram.keyFrameIndex == null ?
                                getMaxIntensityFrameIndex(spectrogram).dataSync()[0] :
                                spectrogram.keyFrameIndex;
                        }
                        var snippet = tf.tensor3d(spectrogram.data, [snippetLength, frameSize, 1]);
                        var windows = getValidWindows(snippetLength, focusIndex, numFrames, hopFrames);
                        var _loop_2 = function (window_1) {
                            var windowedSnippet = tf.tidy(function () {
                                var output = snippet.slice([window_1[0], 0, 0], [window_1[1] - window_1[0], -1, -1]);
                                return toNormalize ? normalize(output) : output;
                            });
                            if (config.getDataset) {
                                xArrays.push(windowedSnippet.dataSync());
                            }
                            else {
                                xTensors.push(windowedSnippet);
                            }
                            if (label == null) {
                                labelIndices.push(i);
                            }
                        };
                        try {
                            for (var windows_1 = (e_4 = void 0, __values(windows)), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                                var window_1 = windows_1_1.value;
                                _loop_2(window_1);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        tf.dispose(snippet);
                    };
                    try {
                        for (var ids_1 = (e_3 = void 0, __values(ids)), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                            var id = ids_1_1.value;
                            _loop_1(id);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                if (config.augmentByMixingNoiseRatio != null) {
                    _this.augmentByMixingNoise(config.getDataset ? xArrays :
                        xTensors, labelIndices, config.augmentByMixingNoiseRatio);
                }
                var shuffle = config.shuffle == null ? true : config.shuffle;
                if (config.getDataset) {
                    var batchSize = config.datasetBatchSize == null ? 32 : config.datasetBatchSize;
                    var valSplit_1 = config.datasetValidationSplit == null ?
                        0.15 :
                        config.datasetValidationSplit;
                    tf.util.assert(valSplit_1 > 0 && valSplit_1 < 1, function () { return "Invalid dataset validation split: " + valSplit_1; });
                    var zippedXandYArrays = xArrays.map(function (xArray, i) { return [xArray, labelIndices[i]]; });
                    tf.util.shuffle(zippedXandYArrays);
                    xArrays = zippedXandYArrays.map(function (item) { return item[0]; });
                    var yArrays = zippedXandYArrays.map(function (item) { return item[1]; });
                    var _b = balancedTrainValSplitNumArrays(xArrays, yArrays, valSplit_1), trainXs = _b.trainXs, trainYs = _b.trainYs, valXs = _b.valXs, valYs = _b.valYs;
                    var xTrain = tf.data.array(trainXs).map(function (x) { return tf.tensor3d(x, [
                        numFrames, uniqueFrameSize, 1
                    ]); });
                    var yTrain = tf.data.array(trainYs).map(function (y) { return tf.oneHot([y], vocab.length).squeeze([0]); });
                    var trainDataset = tf.data.zip({ xs: xTrain, ys: yTrain });
                    if (shuffle) {
                        trainDataset = trainDataset.shuffle(xArrays.length);
                    }
                    trainDataset = trainDataset.batch(batchSize).prefetch(4);
                    var xVal = tf.data.array(valXs).map(function (x) { return tf.tensor3d(x, [
                        numFrames, uniqueFrameSize, 1
                    ]); });
                    var yVal = tf.data.array(valYs).map(function (y) { return tf.oneHot([y], vocab.length).squeeze([0]); });
                    var valDataset = tf.data.zip({ xs: xVal, ys: yVal });
                    valDataset = valDataset.batch(batchSize).prefetch(4);
                    return [trainDataset, valDataset];
                }
                else {
                    if (shuffle) {
                        var zipped_1 = [];
                        xTensors.forEach(function (xTensor, i) {
                            zipped_1.push({ x: xTensor, y: labelIndices[i] });
                        });
                        tf.util.shuffle(zipped_1);
                        xTensors = zipped_1.map(function (item) { return item.x; });
                        labelIndices = zipped_1.map(function (item) { return item.y; });
                    }
                    var targets = label == null ?
                        tf.oneHot(tf.tensor1d(labelIndices, 'int32'), vocab.length)
                            .asType('float32') :
                        undefined;
                    return {
                        xs: tf.stack(xTensors),
                        ys: targets
                    };
                }
            });
        };
        Dataset.prototype.augmentByMixingNoise = function (xs, labelIndices, ratio) {
            var e_5, _a;
            if (xs == null || xs.length === 0) {
                throw new Error("Cannot perform augmentation because data is null or empty");
            }
            var isTypedArray = xs[0] instanceof Float32Array;
            var vocab = this.getVocabulary();
            var noiseExampleIndices = [];
            var wordExampleIndices = [];
            for (var i = 0; i < labelIndices.length; ++i) {
                if (vocab[labelIndices[i]] === BACKGROUND_NOISE_TAG) {
                    noiseExampleIndices.push(i);
                }
                else {
                    wordExampleIndices.push(i);
                }
            }
            if (noiseExampleIndices.length === 0) {
                throw new Error("Cannot perform augmentation by mixing with noise when " +
                    ("there is no example with label " + BACKGROUND_NOISE_TAG));
            }
            var mixedXTensors = [];
            var mixedLabelIndices = [];
            var _loop_3 = function (index) {
                var noiseIndex = noiseExampleIndices[getRandomInteger(0, noiseExampleIndices.length)];
                var signalTensor = isTypedArray ?
                    tf.tensor1d(xs[index]) :
                    xs[index];
                var noiseTensor = isTypedArray ?
                    tf.tensor1d(xs[noiseIndex]) :
                    xs[noiseIndex];
                var mixed = tf.tidy(function () { return normalize(signalTensor.add(noiseTensor.mul(ratio))); });
                if (isTypedArray) {
                    mixedXTensors.push(mixed.dataSync());
                }
                else {
                    mixedXTensors.push(mixed);
                }
                mixedLabelIndices.push(labelIndices[index]);
            };
            try {
                for (var wordExampleIndices_1 = __values(wordExampleIndices), wordExampleIndices_1_1 = wordExampleIndices_1.next(); !wordExampleIndices_1_1.done; wordExampleIndices_1_1 = wordExampleIndices_1.next()) {
                    var index = wordExampleIndices_1_1.value;
                    _loop_3(index);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (wordExampleIndices_1_1 && !wordExampleIndices_1_1.done && (_a = wordExampleIndices_1.return)) _a.call(wordExampleIndices_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            console.log("Data augmentation: mixing noise: added " + mixedXTensors.length + " " +
                "examples");
            mixedXTensors.forEach(function (tensor) { return xs.push(tensor); });
            labelIndices.push.apply(labelIndices, __spread(mixedLabelIndices));
        };
        Dataset.prototype.getSortedUniqueNumFrames = function () {
            var e_6, _a;
            var numFramesSet = new Set();
            var vocab = this.getVocabulary();
            for (var i = 0; i < vocab.length; ++i) {
                var label = vocab[i];
                var ids = this.label2Ids[label];
                try {
                    for (var ids_2 = (e_6 = void 0, __values(ids)), ids_2_1 = ids_2.next(); !ids_2_1.done; ids_2_1 = ids_2.next()) {
                        var id = ids_2_1.value;
                        var spectrogram = this.examples[id].spectrogram;
                        var numFrames = spectrogram.data.length / spectrogram.frameSize;
                        numFramesSet.add(numFrames);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (ids_2_1 && !ids_2_1.done && (_a = ids_2.return)) _a.call(ids_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            var uniqueNumFrames = __spread(numFramesSet);
            uniqueNumFrames.sort();
            return uniqueNumFrames;
        };
        Dataset.prototype.removeExample = function (uid) {
            if (!(uid in this.examples)) {
                throw new Error("Nonexistent example UID: " + uid);
            }
            var label = this.examples[uid].label;
            delete this.examples[uid];
            var index = this.label2Ids[label].indexOf(uid);
            this.label2Ids[label].splice(index, 1);
            if (this.label2Ids[label].length === 0) {
                delete this.label2Ids[label];
            }
        };
        Dataset.prototype.setExampleKeyFrameIndex = function (uid, keyFrameIndex) {
            if (!(uid in this.examples)) {
                throw new Error("Nonexistent example UID: " + uid);
            }
            var spectrogram = this.examples[uid].spectrogram;
            var numFrames = spectrogram.data.length / spectrogram.frameSize;
            tf.util.assert(keyFrameIndex >= 0 && keyFrameIndex < numFrames &&
                Number.isInteger(keyFrameIndex), function () { return "Invalid keyFrameIndex: " + keyFrameIndex + ". " +
                ("Must be >= 0, < " + numFrames + ", and an integer."); });
            spectrogram.keyFrameIndex = keyFrameIndex;
        };
        Dataset.prototype.size = function () {
            return Object.keys(this.examples).length;
        };
        Dataset.prototype.durationMillis = function () {
            var durMillis = 0;
            var DEFAULT_FRAME_DUR_MILLIS = 23.22;
            for (var key in this.examples) {
                var spectrogram = this.examples[key].spectrogram;
                var frameDurMillis = spectrogram.frameDurationMillis | DEFAULT_FRAME_DUR_MILLIS;
                durMillis +=
                    spectrogram.data.length / spectrogram.frameSize * frameDurMillis;
            }
            return durMillis;
        };
        Dataset.prototype.empty = function () {
            return this.size() === 0;
        };
        Dataset.prototype.clear = function () {
            this.examples = {};
        };
        Dataset.prototype.getVocabulary = function () {
            var vocab = new Set();
            for (var uid in this.examples) {
                var example = this.examples[uid];
                vocab.add(example.label);
            }
            var sortedVocab = __spread(vocab);
            sortedVocab.sort();
            return sortedVocab;
        };
        Dataset.prototype.serialize = function (wordLabels) {
            var e_7, _a, e_8, _b;
            var vocab = this.getVocabulary();
            tf.util.assert(!this.empty(), function () { return "Cannot serialize empty Dataset"; });
            if (wordLabels != null) {
                if (!Array.isArray(wordLabels)) {
                    wordLabels = [wordLabels];
                }
                wordLabels.forEach(function (wordLabel) {
                    if (vocab.indexOf(wordLabel) === -1) {
                        throw new Error("Word label \"" + wordLabel + "\" does not exist in the " +
                            "vocabulary of this dataset. The vocabulary is: " +
                            (JSON.stringify(vocab) + "."));
                    }
                });
            }
            var manifest = [];
            var buffers = [];
            try {
                for (var vocab_2 = __values(vocab), vocab_2_1 = vocab_2.next(); !vocab_2_1.done; vocab_2_1 = vocab_2.next()) {
                    var label = vocab_2_1.value;
                    if (wordLabels != null && wordLabels.indexOf(label) === -1) {
                        continue;
                    }
                    var ids = this.label2Ids[label];
                    try {
                        for (var ids_3 = (e_8 = void 0, __values(ids)), ids_3_1 = ids_3.next(); !ids_3_1.done; ids_3_1 = ids_3.next()) {
                            var id = ids_3_1.value;
                            var artifact = serializeExample(this.examples[id]);
                            manifest.push(artifact.spec);
                            buffers.push(artifact.data);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (ids_3_1 && !ids_3_1.done && (_b = ids_3.return)) _b.call(ids_3);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (vocab_2_1 && !vocab_2_1.done && (_a = vocab_2.return)) _a.call(vocab_2);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return serializedExamples2ArrayBuffer({ manifest: manifest, data: concatenateArrayBuffers(buffers) });
        };
        return Dataset;
    }());
    function serializeExample(example) {
        var hasRawAudio = example.rawAudio != null;
        var spec = {
            label: example.label,
            spectrogramNumFrames: example.spectrogram.data.length / example.spectrogram.frameSize,
            spectrogramFrameSize: example.spectrogram.frameSize,
        };
        if (example.spectrogram.keyFrameIndex != null) {
            spec.spectrogramKeyFrameIndex = example.spectrogram.keyFrameIndex;
        }
        var data = example.spectrogram.data.buffer.slice(0);
        if (hasRawAudio) {
            spec.rawAudioNumSamples = example.rawAudio.data.length;
            spec.rawAudioSampleRateHz = example.rawAudio.sampleRateHz;
            data = concatenateArrayBuffers([data, example.rawAudio.data.buffer]);
        }
        return { spec: spec, data: data };
    }
    function deserializeExample(artifact) {
        var spectrogram = {
            frameSize: artifact.spec.spectrogramFrameSize,
            data: new Float32Array(artifact.data.slice(0, 4 * artifact.spec.spectrogramFrameSize *
                artifact.spec.spectrogramNumFrames))
        };
        if (artifact.spec.spectrogramKeyFrameIndex != null) {
            spectrogram.keyFrameIndex = artifact.spec.spectrogramKeyFrameIndex;
        }
        var ex = { label: artifact.spec.label, spectrogram: spectrogram };
        if (artifact.spec.rawAudioNumSamples != null) {
            ex.rawAudio = {
                sampleRateHz: artifact.spec.rawAudioSampleRateHz,
                data: new Float32Array(artifact.data.slice(4 * artifact.spec.spectrogramFrameSize *
                    artifact.spec.spectrogramNumFrames))
            };
        }
        return ex;
    }
    function serializedExamples2ArrayBuffer(serialized) {
        var manifestBuffer = string2ArrayBuffer(JSON.stringify(serialized.manifest));
        var descriptorBuffer = string2ArrayBuffer(DATASET_SERIALIZATION_DESCRIPTOR);
        var version = new Uint32Array([DATASET_SERIALIZATION_VERSION]);
        var manifestLength = new Uint32Array([manifestBuffer.byteLength]);
        var headerBuffer = concatenateArrayBuffers([descriptorBuffer, version.buffer, manifestLength.buffer]);
        return concatenateArrayBuffers([headerBuffer, manifestBuffer, serialized.data]);
    }
    function arrayBuffer2SerializedExamples(buffer) {
        tf.util.assert(buffer != null, function () { return 'Received null or undefined buffer'; });
        var offset = 0;
        var descriptor = arrayBuffer2String(buffer.slice(offset, DATASET_SERIALIZATION_DESCRIPTOR.length));
        tf.util.assert(descriptor === DATASET_SERIALIZATION_DESCRIPTOR, function () { return "Deserialization error: Invalid descriptor"; });
        offset += DATASET_SERIALIZATION_DESCRIPTOR.length;
        offset += 4;
        var manifestLength = new Uint32Array(buffer, offset, 1);
        offset += 4;
        var manifestBeginByte = offset;
        offset = manifestBeginByte + manifestLength[0];
        var manifestBytes = buffer.slice(manifestBeginByte, offset);
        var manifestString = arrayBuffer2String(manifestBytes);
        var manifest = JSON.parse(manifestString);
        var data = buffer.slice(offset);
        return { manifest: manifest, data: data };
    }
    function getValidWindows(snippetLength, focusIndex, windowLength, windowHop) {
        tf.util.assert(Number.isInteger(snippetLength) && snippetLength > 0, function () {
            return "snippetLength must be a positive integer, but got " + snippetLength;
        });
        if (focusIndex != null) {
            tf.util.assert(Number.isInteger(focusIndex) && focusIndex >= 0, function () {
                return "focusIndex must be a non-negative integer, but got " + focusIndex;
            });
        }
        tf.util.assert(Number.isInteger(windowLength) && windowLength > 0, function () { return "windowLength must be a positive integer, but got " + windowLength; });
        tf.util.assert(Number.isInteger(windowHop) && windowHop > 0, function () { return "windowHop must be a positive integer, but got " + windowHop; });
        tf.util.assert(windowLength <= snippetLength, function () { return "windowLength (" + windowLength + ") exceeds snippetLength " +
            ("(" + snippetLength + ")"); });
        tf.util.assert(focusIndex < snippetLength, function () { return "focusIndex (" + focusIndex + ") equals or exceeds snippetLength " +
            ("(" + snippetLength + ")"); });
        if (windowLength === snippetLength) {
            return [[0, snippetLength]];
        }
        var windows = [];
        if (focusIndex == null) {
            var begin = 0;
            while (begin + windowLength <= snippetLength) {
                windows.push([begin, begin + windowLength]);
                begin += windowHop;
            }
            return windows;
        }
        var leftHalf = Math.floor(windowLength / 2);
        var left = focusIndex - leftHalf;
        if (left < 0) {
            left = 0;
        }
        else if (left + windowLength > snippetLength) {
            left = snippetLength - windowLength;
        }
        while (true) {
            if (left - windowHop < 0 || focusIndex >= left - windowHop + windowLength) {
                break;
            }
            left -= windowHop;
        }
        while (left + windowLength <= snippetLength) {
            if (focusIndex < left) {
                break;
            }
            windows.push([left, left + windowLength]);
            left += windowHop;
        }
        return windows;
    }
    function spectrogram2IntensityCurve(spectrogram) {
        return tf.tidy(function () {
            var numFrames = spectrogram.data.length / spectrogram.frameSize;
            var x = tf.tensor2d(spectrogram.data, [numFrames, spectrogram.frameSize]);
            return x.mean(-1);
        });
    }
    function getMaxIntensityFrameIndex(spectrogram) {
        return tf.tidy(function () { return spectrogram2IntensityCurve(spectrogram).argMax(); });
    }

    var version = '0.4.2';

    var UNKNOWN_TAG = '_unknown_';
    var SAVED_MODEL_METADATA_KEY = 'tfjs-speech-commands-saved-model-metadata';
    var SAVE_PATH_PREFIX = 'indexeddb://tfjs-speech-commands-model/';
    var localStorageWrapper = {
        localStorage: typeof window === 'undefined' ? null : window.localStorage
    };
    function getMajorAndMinorVersion(version$$1) {
        var versionItems = version$$1.split('.');
        return versionItems.slice(0, 2).join('.');
    }
    var DEFAULT_WINDOW_HOP_RATIO = 0.25;
    var BrowserFftSpeechCommandRecognizer = (function () {
        function BrowserFftSpeechCommandRecognizer(vocabulary, modelArtifactsOrURL, metadataOrURL) {
            this.MODEL_URL_PREFIX = "https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v" + getMajorAndMinorVersion(version) + "/browser_fft";
            this.SAMPLE_RATE_HZ = 44100;
            this.FFT_SIZE = 1024;
            this.DEFAULT_SUPPRESSION_TIME_MILLIS = 0;
            this.streaming = false;
            this.transferRecognizers = {};
            tf.util.assert(modelArtifactsOrURL == null && metadataOrURL == null ||
                modelArtifactsOrURL != null && metadataOrURL != null, function () { return "modelURL and metadataURL must be both provided or " +
                "both not provided."; });
            if (modelArtifactsOrURL == null) {
                if (vocabulary == null) {
                    vocabulary = BrowserFftSpeechCommandRecognizer.DEFAULT_VOCABULARY_NAME;
                }
                else {
                    tf.util.assert(BrowserFftSpeechCommandRecognizer.VALID_VOCABULARY_NAMES.indexOf(vocabulary) !== -1, function () { return "Invalid vocabulary name: '" + vocabulary + "'"; });
                }
                this.vocabulary = vocabulary;
               /*  this.modelArtifactsOrURL =
                    this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/model.json";
                this.metadataOrURL =
                    this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/metadata.json"; */
                    this.modelArtifactsOrURL = 'http://localhost:3000/speechCommands/lib/model.json';
                    this.metadataOrURL = 'http://localhost:3000/speechCommands/lib/metadata.json';
                }
            else {
                tf.util.assert(vocabulary == null, function () { return "vocabulary name must be null or undefined when modelURL is " +
                    "provided"; });
                this.modelArtifactsOrURL = modelArtifactsOrURL;
                this.metadataOrURL = metadataOrURL;
            }
            this.parameters = {
                sampleRateHz: this.SAMPLE_RATE_HZ,
                fftSize: this.FFT_SIZE
            };
        }
        BrowserFftSpeechCommandRecognizer.prototype.listen = function (callback, config) {
            return __awaiter(this, void 0, void 0, function () {
                var probabilityThreshold, invokeCallbackOnNoiseAndUnknown, overlapFactor, spectrogramCallback, suppressionTimeMillis;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.streaming) {
                                throw new Error('Cannot start streaming again when streaming is ongoing.');
                            }
                            return [4, this.ensureModelLoaded()];
                        case 1:
                            _a.sent();
                            if (config == null) {
                                config = {};
                            }
                            probabilityThreshold = config.probabilityThreshold == null ? 0 : config.probabilityThreshold;
                            if (config.includeEmbedding) {
                                probabilityThreshold = 0;
                            }
                            tf.util.assert(probabilityThreshold >= 0 && probabilityThreshold <= 1, function () { return "Invalid probabilityThreshold value: " + probabilityThreshold; });
                            invokeCallbackOnNoiseAndUnknown = config.invokeCallbackOnNoiseAndUnknown == null ?
                                false :
                                config.invokeCallbackOnNoiseAndUnknown;
                            if (config.includeEmbedding) {
                                invokeCallbackOnNoiseAndUnknown = true;
                            }
                            if (config.suppressionTimeMillis < 0) {
                                throw new Error("suppressionTimeMillis is expected to be >= 0, " +
                                    ("but got " + config.suppressionTimeMillis));
                            }
                            overlapFactor = config.overlapFactor == null ? 0.5 : config.overlapFactor;
                            tf.util.assert(overlapFactor >= 0 && overlapFactor < 1, function () { return "Expected overlapFactor to be >= 0 and < 1, but got " + overlapFactor; });
                            spectrogramCallback = function (x, timeData) { return __awaiter(_this, void 0, void 0, function () {
                                var normalizedX, y, embedding, scores, maxIndexTensor, maxIndex, maxScore, spectrogram, _a, wordDetected;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            normalizedX = normalize(x);
                                            if (!config.includeEmbedding) return [3, 2];
                                            return [4, this.ensureModelWithEmbeddingOutputCreated()];
                                        case 1:
                                            _c.sent();
                                            _b = __read(this.modelWithEmbeddingOutput.predict(normalizedX), 2), y = _b[0], embedding = _b[1];
                                            return [3, 3];
                                        case 2:
                                            y = this.model.predict(normalizedX);
                                            _c.label = 3;
                                        case 3: return [4, y.data()];
                                        case 4:
                                            scores = _c.sent();
                                            maxIndexTensor = y.argMax(-1);
                                            return [4, maxIndexTensor.data()];
                                        case 5:
                                            maxIndex = (_c.sent())[0];
                                            maxScore = Math.max.apply(Math, __spread(scores));
                                            tf.dispose([y, maxIndexTensor, normalizedX]);
                                            if (!(maxScore < probabilityThreshold)) return [3, 6];
                                            return [2, false];
                                        case 6:
                                            spectrogram = undefined;
                                            if (!config.includeSpectrogram) return [3, 8];
                                            _a = {};
                                            return [4, x.data()];
                                        case 7:
                                            spectrogram = (_a.data = (_c.sent()),
                                                _a.frameSize = this.nonBatchInputShape[1],
                                                _a);
                                            _c.label = 8;
                                        case 8:
                                            wordDetected = true;
                                            if (!invokeCallbackOnNoiseAndUnknown) {
                                                if (this.words[maxIndex] === BACKGROUND_NOISE_TAG ||
                                                    this.words[maxIndex] === UNKNOWN_TAG) {
                                                    wordDetected = false;
                                                }
                                            }
                                            if (wordDetected) {
                                                callback({ scores: scores, spectrogram: spectrogram, embedding: embedding });
                                            }
                                            return [2, wordDetected];
                                    }
                                });
                            }); };
                            suppressionTimeMillis = config.suppressionTimeMillis == null ?
                                this.DEFAULT_SUPPRESSION_TIME_MILLIS :
                                config.suppressionTimeMillis;
                            this.audioDataExtractor = new BrowserFftFeatureExtractor({
                                sampleRateHz: this.parameters.sampleRateHz,
                                numFramesPerSpectrogram: this.nonBatchInputShape[0],
                                columnTruncateLength: this.nonBatchInputShape[1],
                                suppressionTimeMillis: suppressionTimeMillis,
                                spectrogramCallback: spectrogramCallback,
                                overlapFactor: overlapFactor
                            });
                            return [4, this.audioDataExtractor.start(config.audioTrackConstraints)];
                        case 2:
                            _a.sent();
                            this.streaming = true;
                            return [2];
                    }
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.ensureModelLoaded = function () {
            return __awaiter(this, void 0, void 0, function () {
                var model, outputShape, frameDurationMillis, numFrames;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.model != null) {
                                return [2];
                            }
                            return [4, this.ensureMetadataLoaded()];
                        case 1:
                            _a.sent();
                            if (!(typeof this.modelArtifactsOrURL === 'string')) return [3, 3];
                            return [4, tf.loadLayersModel(this.modelArtifactsOrURL)];
                        case 2:
                            model = _a.sent();
                            return [3, 5];
                        case 3: return [4, tf.loadLayersModel(tf.io.fromMemory(this.modelArtifactsOrURL.modelTopology, this.modelArtifactsOrURL.weightSpecs, this.modelArtifactsOrURL.weightData))];
                        case 4:
                            model = _a.sent();
                            _a.label = 5;
                        case 5:
                            if (model.inputs.length !== 1) {
                                throw new Error("Expected model to have 1 input, but got a model with " +
                                    (model.inputs.length + " inputs"));
                            }
                            if (model.inputs[0].shape.length !== 4) {
                                throw new Error("Expected model to have an input shape of rank 4, " +
                                    ("but got an input shape of rank " + model.inputs[0].shape.length));
                            }
                            if (model.inputs[0].shape[3] !== 1) {
                                throw new Error("Expected model to have an input shape with 1 as the last " +
                                    "dimension, but got input shape" +
                                    (JSON.stringify(model.inputs[0].shape[3]) + "}"));
                            }
                            outputShape = model.outputShape;
                            if (outputShape.length !== 2) {
                                throw new Error("Expected loaded model to have an output shape of rank 2," +
                                    ("but received shape " + JSON.stringify(outputShape)));
                            }
                            if (outputShape[1] !== this.words.length) {
                                throw new Error("Mismatch between the last dimension of model's output shape " +
                                    ("(" + outputShape[1] + ") and number of words ") +
                                    ("(" + this.words.length + ")."));
                            }
                            this.model = model;
                            this.freezeModel();
                            this.nonBatchInputShape =
                                model.inputs[0].shape.slice(1);
                            this.elementsPerExample = 1;
                            model.inputs[0].shape.slice(1).forEach(function (dimSize) { return _this.elementsPerExample *= dimSize; });
                            this.warmUpModel();
                            frameDurationMillis = this.parameters.fftSize / this.parameters.sampleRateHz * 1e3;
                            numFrames = model.inputs[0].shape[1];
                            this.parameters.spectrogramDurationMillis = numFrames * frameDurationMillis;
                            return [2];
                    }
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.ensureModelWithEmbeddingOutputCreated = function () {
            return __awaiter(this, void 0, void 0, function () {
                var secondLastDenseLayer, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.modelWithEmbeddingOutput != null) {
                                return [2];
                            }
                            return [4, this.ensureModelLoaded()];
                        case 1:
                            _a.sent();
                            for (i = this.model.layers.length - 2; i >= 0; --i) {
                                if (this.model.layers[i].getClassName() === 'Dense') {
                                    secondLastDenseLayer = this.model.layers[i];
                                    break;
                                }
                            }
                            if (secondLastDenseLayer == null) {
                                throw new Error('Failed to find second last dense layer in the original model.');
                            }
                            this.modelWithEmbeddingOutput = tf.model({
                                inputs: this.model.inputs,
                                outputs: [
                                    this.model.outputs[0], secondLastDenseLayer.output
                                ]
                            });
                            return [2];
                    }
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.warmUpModel = function () {
            var _this = this;
            tf.tidy(function () {
                var x = tf.zeros([1].concat(_this.nonBatchInputShape));
                for (var i = 0; i < 3; ++i) {
                    _this.model.predict(x);
                }
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.ensureMetadataLoaded = function () {
            return __awaiter(this, void 0, void 0, function () {
                var metadataJSON, _a, legacyWords;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.words != null) {
                                return [2];
                            }
                            if (!(typeof this.metadataOrURL === 'string')) return [3, 2];
                            return [4, loadMetadataJson(this.metadataOrURL)];
                        case 1:
                            _a = _b.sent();
                            return [3, 3];
                        case 2:
                            _a = this.metadataOrURL;
                            _b.label = 3;
                        case 3:
                            metadataJSON = _a;
                            if (metadataJSON.wordLabels == null) {
                                legacyWords = metadataJSON['words'];
                                if (legacyWords == null) {
                                    throw new Error('Cannot find field "words" or "wordLabels" in metadata JSON file');
                                }
                                this.words = legacyWords;
                            }
                            else {
                                this.words = metadataJSON.wordLabels;
                            }
                            return [2];
                    }
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.stopListening = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.streaming) {
                                throw new Error('Cannot stop streaming when streaming is not ongoing.');
                            }
                            return [4, this.audioDataExtractor.stop()];
                        case 1:
                            _a.sent();
                            this.streaming = false;
                            return [2];
                    }
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.isListening = function () {
            return this.streaming;
        };
        BrowserFftSpeechCommandRecognizer.prototype.wordLabels = function () {
            return this.words;
        };
        BrowserFftSpeechCommandRecognizer.prototype.params = function () {
            return this.parameters;
        };
        BrowserFftSpeechCommandRecognizer.prototype.modelInputShape = function () {
            if (this.model == null) {
                throw new Error('Model has not been loaded yet. Load model by calling ' +
                    'ensureModelLoaded(), recognize(), or listen().');
            }
            return this.model.inputs[0].shape;
        };
        BrowserFftSpeechCommandRecognizer.prototype.recognize = function (input, config) {
            return __awaiter(this, void 0, void 0, function () {
                var spectrogramData, numExamples, inputTensor, outTensor, output, outAndEmbedding, _a, unstacked, scorePromises, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (config == null) {
                                config = {};
                            }
                            return [4, this.ensureModelLoaded()];
                        case 1:
                            _f.sent();
                            if (!(input == null)) return [3, 3];
                            return [4, this.recognizeOnline()];
                        case 2:
                            spectrogramData = _f.sent();
                            input = spectrogramData.data;
                            _f.label = 3;
                        case 3:
                            if (input instanceof tf.Tensor) {
                                this.checkInputTensorShape(input);
                                inputTensor = input;
                                numExamples = input.shape[0];
                            }
                            else {
                                if (input.length % this.elementsPerExample) {
                                    throw new Error("The length of the input Float32Array " + input.length + " " +
                                        "is not divisible by the number of tensor elements per " +
                                        ("per example expected by the model " + this.elementsPerExample + "."));
                                }
                                numExamples = input.length / this.elementsPerExample;
                                inputTensor = tf.tensor4d(input, [
                                    numExamples
                                ].concat(this.nonBatchInputShape));
                            }
                            output = { scores: null };
                            if (!config.includeEmbedding) return [3, 5];
                            return [4, this.ensureModelWithEmbeddingOutputCreated()];
                        case 4:
                            _f.sent();
                            outAndEmbedding = this.modelWithEmbeddingOutput.predict(inputTensor);
                            outTensor = outAndEmbedding[0];
                            output.embedding = outAndEmbedding[1];
                            return [3, 6];
                        case 5:
                            outTensor = this.model.predict(inputTensor);
                            _f.label = 6;
                        case 6:
                            if (!(numExamples === 1)) return [3, 8];
                            _a = output;
                            return [4, outTensor.data()];
                        case 7:
                            _a.scores = (_f.sent());
                            return [3, 10];
                        case 8:
                            unstacked = tf.unstack(outTensor);
                            scorePromises = unstacked.map(function (item) { return item.data(); });
                            _b = output;
                            return [4, Promise.all(scorePromises)];
                        case 9:
                            _b.scores = (_f.sent());
                            tf.dispose(unstacked);
                            _f.label = 10;
                        case 10:
                            if (!config.includeSpectrogram) return [3, 14];
                            _c = output;
                            _d = {};
                            if (!(input instanceof tf.Tensor)) return [3, 12];
                            return [4, input.data()];
                        case 11:
                            _e = _f.sent();
                            return [3, 13];
                        case 12:
                            _e = input;
                            _f.label = 13;
                        case 13:
                            _c.spectrogram = (_d.data = (_e),
                                _d.frameSize = this.nonBatchInputShape[1],
                                _d);
                            _f.label = 14;
                        case 14:
                            tf.dispose(outTensor);
                            return [2, output];
                    }
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.recognizeOnline = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve, reject) {
                            var spectrogramCallback = function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var normalizedX, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            normalizedX = normalize(x);
                                            return [4, this.audioDataExtractor.stop()];
                                        case 1:
                                            _c.sent();
                                            _a = resolve;
                                            _b = {};
                                            return [4, normalizedX.data()];
                                        case 2:
                                            _a.apply(void 0, [(_b.data = (_c.sent()),
                                                    _b.frameSize = this.nonBatchInputShape[1],
                                                    _b)]);
                                            normalizedX.dispose();
                                            return [2, false];
                                    }
                                });
                            }); };
                            _this.audioDataExtractor = new BrowserFftFeatureExtractor({
                                sampleRateHz: _this.parameters.sampleRateHz,
                                numFramesPerSpectrogram: _this.nonBatchInputShape[0],
                                columnTruncateLength: _this.nonBatchInputShape[1],
                                suppressionTimeMillis: 0,
                                spectrogramCallback: spectrogramCallback,
                                overlapFactor: 0
                            });
                            _this.audioDataExtractor.start();
                        })];
                });
            });
        };
        BrowserFftSpeechCommandRecognizer.prototype.createTransfer = function (name) {
            if (this.model == null) {
                throw new Error('Model has not been loaded yet. Load model by calling ' +
                    'ensureModelLoaded(), recognizer(), or listen().');
            }
            tf.util.assert(name != null && typeof name === 'string' && name.length > 1, function () { return "Expected the name for a transfer-learning recognized to be a " +
                ("non-empty string, but got " + JSON.stringify(name)); });
            tf.util.assert(this.transferRecognizers[name] == null, function () { return "There is already a transfer-learning model named '" + name + "'"; });
            var transfer = new TransferBrowserFftSpeechCommandRecognizer(name, this.parameters, this.model);
            this.transferRecognizers[name] = transfer;
            return transfer;
        };
        BrowserFftSpeechCommandRecognizer.prototype.freezeModel = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.model.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    layer.trainable = false;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        BrowserFftSpeechCommandRecognizer.prototype.checkInputTensorShape = function (input) {
            var expectedRank = this.model.inputs[0].shape.length;
            if (input.shape.length !== expectedRank) {
                throw new Error("Expected input Tensor to have rank " + expectedRank + ", " +
                    ("but got rank " + input.shape.length + " that differs "));
            }
            var nonBatchedShape = input.shape.slice(1);
            var expectedNonBatchShape = this.model.inputs[0].shape.slice(1);
            if (!tf.util.arraysEqual(nonBatchedShape, expectedNonBatchShape)) {
                throw new Error("Expected input to have shape [null," + expectedNonBatchShape + "], " +
                    ("but got shape [null," + nonBatchedShape + "]"));
            }
        };
        BrowserFftSpeechCommandRecognizer.VALID_VOCABULARY_NAMES = ['18w', 'directional4w'];
        BrowserFftSpeechCommandRecognizer.DEFAULT_VOCABULARY_NAME = '18w';
        return BrowserFftSpeechCommandRecognizer;
    }());
    var TransferBrowserFftSpeechCommandRecognizer = (function (_super) {
        __extends(TransferBrowserFftSpeechCommandRecognizer, _super);
        function TransferBrowserFftSpeechCommandRecognizer(name, parameters, baseModel) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.parameters = parameters;
            _this.baseModel = baseModel;
            tf.util.assert(name != null && typeof name === 'string' && name.length > 0, function () { return "The name of a transfer model must be a non-empty string, " +
                ("but got " + JSON.stringify(name)); });
            _this.nonBatchInputShape =
                _this.baseModel.inputs[0].shape.slice(1);
            _this.words = null;
            _this.dataset = new Dataset();
            return _this;
        }
        TransferBrowserFftSpeechCommandRecognizer.prototype.collectExample = function (word, options) {
            return __awaiter(this, void 0, void 0, function () {
                var numFramesPerSpectrogram, frameDurationSec_1, frameDurationSec, totalDurationSec;
                var _this = this;
                return __generator(this, function (_a) {
                    tf.util.assert(!this.streaming, function () { return 'Cannot start collection of transfer-learning example because ' +
                        'a streaming recognition or transfer-learning example collection ' +
                        'is ongoing'; });
                    tf.util.assert(word != null && typeof word === 'string' && word.length > 0, function () { return "Must provide a non-empty string when collecting transfer-" +
                        "learning example"; });
                    if (options == null) {
                        options = {};
                    }
                    if (options.durationMultiplier != null && options.durationSec != null) {
                        throw new Error("durationMultiplier and durationSec are mutually exclusive, " +
                            "but are both specified.");
                    }
                    if (options.durationSec != null) {
                        tf.util.assert(options.durationSec > 0, function () {
                            return "Expected durationSec to be > 0, but got " + options.durationSec;
                        });
                        frameDurationSec_1 = this.parameters.fftSize / this.parameters.sampleRateHz;
                        numFramesPerSpectrogram =
                            Math.ceil(options.durationSec / frameDurationSec_1);
                    }
                    else if (options.durationMultiplier != null) {
                        tf.util.assert(options.durationMultiplier >= 1, function () { return "Expected duration multiplier to be >= 1, " +
                            ("but got " + options.durationMultiplier); });
                        numFramesPerSpectrogram =
                            Math.round(this.nonBatchInputShape[0] * options.durationMultiplier);
                    }
                    else {
                        numFramesPerSpectrogram = this.nonBatchInputShape[0];
                    }
                    if (options.snippetDurationSec != null) {
                        tf.util.assert(options.snippetDurationSec > 0, function () { return "snippetDurationSec is expected to be > 0, but got " +
                            ("" + options.snippetDurationSec); });
                        tf.util.assert(options.onSnippet != null, function () { return "onSnippet must be provided if snippetDurationSec " +
                            "is provided."; });
                    }
                    if (options.onSnippet != null) {
                        tf.util.assert(options.snippetDurationSec != null, function () { return "snippetDurationSec must be provided if onSnippet " +
                            "is provided."; });
                    }
                    frameDurationSec = this.parameters.fftSize / this.parameters.sampleRateHz;
                    totalDurationSec = frameDurationSec * numFramesPerSpectrogram;
                    this.streaming = true;
                    return [2, new Promise(function (resolve) {
                            var stepFactor = options.snippetDurationSec == null ?
                                1 :
                                options.snippetDurationSec / totalDurationSec;
                            var overlapFactor = 1 - stepFactor;
                            var callbackCountTarget = Math.round(1 / stepFactor);
                            var callbackCount = 0;
                            var lastIndex = -1;
                            var spectrogramSnippets = [];
                            var spectrogramCallback = function (freqData, timeData) { return __awaiter(_this, void 0, void 0, function () {
                                var normalizedX, _a, _b, _c, _d, _e, _f, _g, _h, data, i, increment, snippetData, normalized, finalSpectrogram, _j, _k, _l, _m, _o;
                                return __generator(this, function (_p) {
                                    switch (_p.label) {
                                        case 0:
                                            if (!(options.onSnippet == null)) return [3, 7];
                                            normalizedX = normalize(freqData);
                                            _b = (_a = this.dataset).addExample;
                                            _c = {
                                                label: word
                                            };
                                            _d = {};
                                            return [4, normalizedX.data()];
                                        case 1:
                                            _c.spectrogram = (_d.data = (_p.sent()),
                                                _d.frameSize = this.nonBatchInputShape[1],
                                                _d);
                                            if (!options.includeRawAudio) return [3, 3];
                                            _f = {};
                                            return [4, timeData.data()];
                                        case 2:
                                            _e = (_f.data = (_p.sent()),
                                                _f.sampleRateHz = this.audioDataExtractor.sampleRateHz,
                                                _f);
                                            return [3, 4];
                                        case 3:
                                            _e = undefined;
                                            _p.label = 4;
                                        case 4:
                                            _b.apply(_a, [(_c.rawAudio = _e,
                                                    _c)]);
                                            normalizedX.dispose();
                                            return [4, this.audioDataExtractor.stop()];
                                        case 5:
                                            _p.sent();
                                            this.streaming = false;
                                            this.collateTransferWords();
                                            _g = resolve;
                                            _h = {};
                                            return [4, freqData.data()];
                                        case 6:
                                            _g.apply(void 0, [(_h.data = (_p.sent()),
                                                    _h.frameSize = this.nonBatchInputShape[1],
                                                    _h)]);
                                            return [3, 13];
                                        case 7: return [4, freqData.data()];
                                        case 8:
                                            data = _p.sent();
                                            if (lastIndex === -1) {
                                                lastIndex = data.length;
                                            }
                                            i = lastIndex - 1;
                                            while (data[i] !== 0 && i >= 0) {
                                                i--;
                                            }
                                            increment = lastIndex - i - 1;
                                            lastIndex = i + 1;
                                            snippetData = data.slice(data.length - increment, data.length);
                                            spectrogramSnippets.push(snippetData);
                                            if (options.onSnippet != null) {
                                                options.onSnippet({ data: snippetData, frameSize: this.nonBatchInputShape[1] });
                                            }
                                            if (!(callbackCount++ === callbackCountTarget)) return [3, 13];
                                            return [4, this.audioDataExtractor.stop()];
                                        case 9:
                                            _p.sent();
                                            this.streaming = false;
                                            this.collateTransferWords();
                                            normalized = normalizeFloat32Array(concatenateFloat32Arrays(spectrogramSnippets));
                                            finalSpectrogram = {
                                                data: normalized,
                                                frameSize: this.nonBatchInputShape[1]
                                            };
                                            _k = (_j = this.dataset).addExample;
                                            _l = {
                                                label: word,
                                                spectrogram: finalSpectrogram
                                            };
                                            if (!options.includeRawAudio) return [3, 11];
                                            _o = {};
                                            return [4, timeData.data()];
                                        case 10:
                                            _m = (_o.data = (_p.sent()),
                                                _o.sampleRateHz = this.audioDataExtractor.sampleRateHz,
                                                _o);
                                            return [3, 12];
                                        case 11:
                                            _m = undefined;
                                            _p.label = 12;
                                        case 12:
                                            _k.apply(_j, [(_l.rawAudio = _m,
                                                    _l)]);
                                            resolve(finalSpectrogram);
                                            _p.label = 13;
                                        case 13: return [2, false];
                                    }
                                });
                            }); };
                            _this.audioDataExtractor = new BrowserFftFeatureExtractor({
                                sampleRateHz: _this.parameters.sampleRateHz,
                                numFramesPerSpectrogram: numFramesPerSpectrogram,
                                columnTruncateLength: _this.nonBatchInputShape[1],
                                suppressionTimeMillis: 0,
                                spectrogramCallback: spectrogramCallback,
                                overlapFactor: overlapFactor,
                                includeRawAudio: options.includeRawAudio
                            });
                            _this.audioDataExtractor.start(options.audioTrackConstraints);
                        })];
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.clearExamples = function () {
            var _this = this;
            tf.util.assert(this.words != null && this.words.length > 0 && !this.dataset.empty(), function () {
                return "No transfer learning examples exist for model name " + _this.name;
            });
            this.dataset.clear();
            this.words = null;
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.countExamples = function () {
            if (this.dataset.empty()) {
                throw new Error("No examples have been collected for transfer-learning model " +
                    ("named '" + this.name + "' yet."));
            }
            return this.dataset.getExampleCounts();
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.getExamples = function (label) {
            return this.dataset.getExamples(label);
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.setExampleKeyFrameIndex = function (uid, keyFrameIndex) {
            this.dataset.setExampleKeyFrameIndex(uid, keyFrameIndex);
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.removeExample = function (uid) {
            this.dataset.removeExample(uid);
            this.collateTransferWords();
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.isDatasetEmpty = function () {
            return this.dataset.empty();
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.loadExamples = function (serialized, clearExisting) {
            var e_2, _a, e_3, _b;
            if (clearExisting === void 0) { clearExisting = false; }
            var incomingDataset = new Dataset(serialized);
            if (clearExisting) {
                this.clearExamples();
            }
            var incomingVocab = incomingDataset.getVocabulary();
            try {
                for (var incomingVocab_1 = __values(incomingVocab), incomingVocab_1_1 = incomingVocab_1.next(); !incomingVocab_1_1.done; incomingVocab_1_1 = incomingVocab_1.next()) {
                    var label = incomingVocab_1_1.value;
                    var examples = incomingDataset.getExamples(label);
                    try {
                        for (var examples_1 = (e_3 = void 0, __values(examples)), examples_1_1 = examples_1.next(); !examples_1_1.done; examples_1_1 = examples_1.next()) {
                            var example = examples_1_1.value;
                            this.dataset.addExample(example.example);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (examples_1_1 && !examples_1_1.done && (_b = examples_1.return)) _b.call(examples_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (incomingVocab_1_1 && !incomingVocab_1_1.done && (_a = incomingVocab_1.return)) _a.call(incomingVocab_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.collateTransferWords();
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.serializeExamples = function (wordLabels) {
            return this.dataset.serialize(wordLabels);
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.collateTransferWords = function () {
            this.words = this.dataset.getVocabulary();
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.collectTransferDataAsTensors = function (windowHopRatio, augmentationOptions) {
            var numFrames = this.nonBatchInputShape[0];
            windowHopRatio = windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
            var hopFrames = Math.round(windowHopRatio * numFrames);
            var out = this.dataset.getData(null, __assign({ numFrames: numFrames, hopFrames: hopFrames }, augmentationOptions));
            return { xs: out.xs, ys: out.ys };
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.collectTransferDataAsTfDataset = function (windowHopRatio, validationSplit, batchSize, augmentationOptions) {
            if (validationSplit === void 0) { validationSplit = 0.15; }
            if (batchSize === void 0) { batchSize = 32; }
            var numFrames = this.nonBatchInputShape[0];
            windowHopRatio = windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
            var hopFrames = Math.round(windowHopRatio * numFrames);
            return this.dataset.getData(null, __assign({ numFrames: numFrames,
                hopFrames: hopFrames, getDataset: true, datasetBatchSize: batchSize, datasetValidationSplit: validationSplit }, augmentationOptions));
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.train = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var datasetDurationMillisThreshold;
                var _this = this;
                return __generator(this, function (_a) {
                    tf.util.assert(this.words != null && this.words.length > 0, function () {
                        return "Cannot train transfer-learning model '" + _this.name + "' because no " +
                            "transfer learning example has been collected.";
                    });
                    tf.util.assert(this.words.length > 1, function () { return "Cannot train transfer-learning model '" + _this.name + "' because only " +
                        ("1 word label ('" + JSON.stringify(_this.words) + "') ") +
                        "has been collected for transfer learning. Requires at least 2."; });
                    if (config.fineTuningEpochs != null) {
                        tf.util.assert(config.fineTuningEpochs >= 0 &&
                            Number.isInteger(config.fineTuningEpochs), function () { return "If specified, fineTuningEpochs must be a non-negative " +
                            ("integer, but received " + config.fineTuningEpochs); });
                    }
                    if (config == null) {
                        config = {};
                    }
                    if (this.model == null) {
                        this.createTransferModelFromBaseModel();
                    }
                    this.secondLastBaseDenseLayer.trainable = false;
                    this.model.compile({
                        loss: 'categoricalCrossentropy',
                        optimizer: config.optimizer || 'sgd',
                        metrics: ['acc']
                    });
                    datasetDurationMillisThreshold = config.fitDatasetDurationMillisThreshold == null ?
                        60e3 :
                        config.fitDatasetDurationMillisThreshold;
                    if (this.dataset.durationMillis() > datasetDurationMillisThreshold) {
                        console.log("Detected large dataset: total duration = " +
                            (this.dataset.durationMillis() + " ms > ") +
                            (datasetDurationMillisThreshold + " ms. ") +
                            "Training transfer model using fitDataset() instead of fit()");
                        return [2, this.trainOnDataset(config)];
                    }
                    else {
                        return [2, this.trainOnTensors(config)];
                    }
                    return [2];
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.trainOnDataset = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var batchSize, windowHopRatio, _a, trainDataset, valDataset, t0, history, t0_1, fineTuningHistory;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            tf.util.assert(config.epochs > 0, function () { return "Invalid config.epochs"; });
                            batchSize = config.batchSize == null ? 32 : config.batchSize;
                            windowHopRatio = config.windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
                            _a = __read(this.collectTransferDataAsTfDataset(windowHopRatio, config.validationSplit, batchSize, { augmentByMixingNoiseRatio: config.augmentByMixingNoiseRatio }), 2), trainDataset = _a[0], valDataset = _a[1];
                            t0 = tf.util.now();
                            return [4, this.model.fitDataset(trainDataset, {
                                    epochs: config.epochs,
                                    validationData: config.validationSplit > 0 ? valDataset : null,
                                    callbacks: config.callback == null ? null : [config.callback]
                                })];
                        case 1:
                            history = _b.sent();
                            console.log("fitDataset() took " + (tf.util.now() - t0).toFixed(2) + " ms");
                            if (!(config.fineTuningEpochs != null && config.fineTuningEpochs > 0)) return [3, 3];
                            t0_1 = tf.util.now();
                            return [4, this.fineTuningUsingTfDatasets(config, trainDataset, valDataset)];
                        case 2:
                            fineTuningHistory = _b.sent();
                            console.log("fitDataset() (fine-tuning) took " +
                                ((tf.util.now() - t0_1).toFixed(2) + " ms"));
                            return [2, [history, fineTuningHistory]];
                        case 3: return [2, history];
                    }
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.trainOnTensors = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var windowHopRatio, _a, xs, ys, trainXs, trainYs, valData, splits, history_1, fineTuningHistory;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            windowHopRatio = config.windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
                            _a = this.collectTransferDataAsTensors(windowHopRatio, { augmentByMixingNoiseRatio: config.augmentByMixingNoiseRatio }), xs = _a.xs, ys = _a.ys;
                            console.log("Training data: xs.shape = " + xs.shape + ", ys.shape = " + ys.shape);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 6, 7]);
                            if (config.validationSplit != null) {
                                splits = balancedTrainValSplit(xs, ys, config.validationSplit);
                                trainXs = splits.trainXs;
                                trainYs = splits.trainYs;
                                valData = [splits.valXs, splits.valYs];
                            }
                            else {
                                trainXs = xs;
                                trainYs = ys;
                            }
                            return [4, this.model.fit(trainXs, trainYs, {
                                    epochs: config.epochs == null ? 20 : config.epochs,
                                    validationData: valData,
                                    batchSize: config.batchSize,
                                    callbacks: config.callback == null ? null : [config.callback]
                                })];
                        case 2:
                            history_1 = _b.sent();
                            if (!(config.fineTuningEpochs != null && config.fineTuningEpochs > 0)) return [3, 4];
                            return [4, this.fineTuningUsingTensors(config, trainXs, trainYs, valData)];
                        case 3:
                            fineTuningHistory = _b.sent();
                            return [2, [history_1, fineTuningHistory]];
                        case 4: return [2, history_1];
                        case 5: return [3, 7];
                        case 6:
                            tf.dispose([xs, ys, trainXs, trainYs, valData]);
                            return [7];
                        case 7: return [2];
                    }
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.fineTuningUsingTfDatasets = function (config, trainDataset, valDataset) {
            return __awaiter(this, void 0, void 0, function () {
                var originalTrainableValue, fineTuningOptimizer, fineTuningHistory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            originalTrainableValue = this.secondLastBaseDenseLayer.trainable;
                            this.secondLastBaseDenseLayer.trainable = true;
                            fineTuningOptimizer = config.fineTuningOptimizer == null ? 'sgd' : config.fineTuningOptimizer;
                            this.model.compile({
                                loss: 'categoricalCrossentropy',
                                optimizer: fineTuningOptimizer,
                                metrics: ['acc']
                            });
                            return [4, this.model.fitDataset(trainDataset, {
                                    epochs: config.fineTuningEpochs,
                                    validationData: valDataset,
                                    callbacks: config.callback == null ? null : [config.callback]
                                })];
                        case 1:
                            fineTuningHistory = _a.sent();
                            this.secondLastBaseDenseLayer.trainable = originalTrainableValue;
                            return [2, fineTuningHistory];
                    }
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.fineTuningUsingTensors = function (config, trainXs, trainYs, valData) {
            return __awaiter(this, void 0, void 0, function () {
                var originalTrainableValue, fineTuningOptimizer, fineTuningHistory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            originalTrainableValue = this.secondLastBaseDenseLayer.trainable;
                            this.secondLastBaseDenseLayer.trainable = true;
                            fineTuningOptimizer = config.fineTuningOptimizer == null ? 'sgd' : config.fineTuningOptimizer;
                            this.model.compile({
                                loss: 'categoricalCrossentropy',
                                optimizer: fineTuningOptimizer,
                                metrics: ['acc']
                            });
                            return [4, this.model.fit(trainXs, trainYs, {
                                    epochs: config.fineTuningEpochs,
                                    validationData: valData,
                                    batchSize: config.batchSize,
                                    callbacks: config.fineTuningCallback == null ? null :
                                        [config.fineTuningCallback]
                                })];
                        case 1:
                            fineTuningHistory = _a.sent();
                            this.secondLastBaseDenseLayer.trainable = originalTrainableValue;
                            return [2, fineTuningHistory];
                    }
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.evaluate = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var NOISE_CLASS_INDEX;
                var _this = this;
                return __generator(this, function (_a) {
                    tf.util.assert(config.wordProbThresholds != null &&
                        config.wordProbThresholds.length > 0, function () { return "Received null or empty wordProbThresholds"; });
                    NOISE_CLASS_INDEX = 0;
                    tf.util.assert(this.words[NOISE_CLASS_INDEX] === BACKGROUND_NOISE_TAG, function () { return "Cannot perform evaluation when the first tag is not " +
                        ("" + BACKGROUND_NOISE_TAG); });
                    return [2, tf.tidy(function () {
                            var rocCurve = [];
                            var auc = 0;
                            var _a = _this.collectTransferDataAsTensors(config.windowHopRatio), xs = _a.xs, ys = _a.ys;
                            var indices = ys.argMax(-1).dataSync();
                            var probs = _this.model.predict(xs);
                            var maxWordProbs = probs.slice([0, 1], [probs.shape[0], probs.shape[1] - 1]).max(-1);
                            var total = probs.shape[0];
                            for (var i = 0; i < config.wordProbThresholds.length; ++i) {
                                var probThreshold = config.wordProbThresholds[i];
                                var isWord = maxWordProbs.greater(tf.scalar(probThreshold)).dataSync();
                                var negatives = 0;
                                var positives = 0;
                                var falsePositives = 0;
                                var truePositives = 0;
                                for (var i_1 = 0; i_1 < total; ++i_1) {
                                    if (indices[i_1] === NOISE_CLASS_INDEX) {
                                        negatives++;
                                        if (isWord[i_1]) {
                                            falsePositives++;
                                        }
                                    }
                                    else {
                                        positives++;
                                        if (isWord[i_1]) {
                                            truePositives++;
                                        }
                                    }
                                }
                                var fpr = falsePositives / negatives;
                                var tpr = truePositives / positives;
                                rocCurve.push({ probThreshold: probThreshold, fpr: fpr, tpr: tpr });
                                console.log("ROC thresh=" + probThreshold + ": " +
                                    ("fpr=" + fpr.toFixed(4) + ", tpr=" + tpr.toFixed(4)));
                                if (i > 0) {
                                    auc += Math.abs((rocCurve[i - 1].fpr - rocCurve[i].fpr)) *
                                        (rocCurve[i - 1].tpr + rocCurve[i].tpr) / 2;
                                }
                            }
                            return { rocCurve: rocCurve, auc: auc };
                        })];
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.createTransferModelFromBaseModel = function () {
            var _this = this;
            tf.util.assert(this.words != null, function () {
                return "No word example is available for tranfer-learning model of name " +
                    _this.name;
            });
            var layers = this.baseModel.layers;
            var layerIndex = layers.length - 2;
            while (layerIndex >= 0) {
                if (layers[layerIndex].getClassName().toLowerCase() === 'dense') {
                    break;
                }
                layerIndex--;
            }
            if (layerIndex < 0) {
                throw new Error('Cannot find a hidden dense layer in the base model.');
            }
            this.secondLastBaseDenseLayer = layers[layerIndex];
            var truncatedBaseOutput = this.secondLastBaseDenseLayer.output;
            this.transferHead = tf.sequential();
            this.transferHead.add(tf.layers.dense({
                units: this.words.length,
                activation: 'softmax',
                inputShape: truncatedBaseOutput.shape.slice(1),
                name: 'NewHeadDense'
            }));
            var transferOutput = this.transferHead.apply(truncatedBaseOutput);
            this.model =
                tf.model({ inputs: this.baseModel.inputs, outputs: transferOutput });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.modelInputShape = function () {
            return this.baseModel.inputs[0].shape;
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.getMetadata = function () {
            return {
                tfjsSpeechCommandsVersion: version,
                modelName: this.name,
                timeStamp: new Date().toISOString(),
                wordLabels: this.wordLabels()
            };
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.save = function (handlerOrURL) {
            return __awaiter(this, void 0, void 0, function () {
                var isCustomPath, metadataMapStr, metadataMap;
                return __generator(this, function (_a) {
                    isCustomPath = handlerOrURL != null;
                    handlerOrURL = handlerOrURL || getCanonicalSavePath(this.name);
                    if (!isCustomPath) {
                        metadataMapStr = localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY);
                        metadataMap = metadataMapStr == null ? {} : JSON.parse(metadataMapStr);
                        metadataMap[this.name] = this.getMetadata();
                        localStorageWrapper.localStorage.setItem(SAVED_MODEL_METADATA_KEY, JSON.stringify(metadataMap));
                    }
                    console.log("Saving model to " + handlerOrURL);
                    return [2, this.model.save(handlerOrURL)];
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.load = function (handlerOrURL) {
            return __awaiter(this, void 0, void 0, function () {
                var isCustomPath, metadataMap, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            isCustomPath = handlerOrURL != null;
                            handlerOrURL = handlerOrURL || getCanonicalSavePath(this.name);
                            if (!isCustomPath) {
                                metadataMap = JSON.parse(localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY));
                                if (metadataMap == null || metadataMap[this.name] == null) {
                                    throw new Error("Cannot find metadata for transfer model named " + this.name + "\"");
                                }
                                this.words = metadataMap[this.name].wordLabels;
                                console.log("Loaded word list for model named " + this.name + ": " + this.words);
                            }
                            _a = this;
                            return [4, tf.loadLayersModel(handlerOrURL)];
                        case 1:
                            _a.model = _b.sent();
                            console.log("Loaded model from " + handlerOrURL + ":");
                            this.model.summary();
                            return [2];
                    }
                });
            });
        };
        TransferBrowserFftSpeechCommandRecognizer.prototype.createTransfer = function (name) {
            throw new Error('Creating transfer-learned recognizer from a transfer-learned ' +
                'recognizer is not supported.');
        };
        return TransferBrowserFftSpeechCommandRecognizer;
    }(BrowserFftSpeechCommandRecognizer));
    function getCanonicalSavePath(name) {
        return "" + SAVE_PATH_PREFIX + name;
    }
    function listSavedTransferModels() {
        return __awaiter(this, void 0, void 0, function () {
            var models, keys, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, tf.io.listModels()];
                    case 1:
                        models = _a.sent();
                        keys = [];
                        for (key in models) {
                            if (key.startsWith(SAVE_PATH_PREFIX)) {
                                keys.push(key.slice(SAVE_PATH_PREFIX.length));
                            }
                        }
                        return [2, keys];
                }
            });
        });
    }
    function deleteSavedTransferModel(name) {
        return __awaiter(this, void 0, void 0, function () {
            var metadataMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadataMap = JSON.parse(localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY));
                        if (metadataMap == null) {
                            metadataMap = {};
                        }
                        if (metadataMap[name] != null) {
                            delete metadataMap[name];
                        }
                        localStorageWrapper.localStorage.setItem(SAVED_MODEL_METADATA_KEY, JSON.stringify(metadataMap));
                        return [4, tf.io.removeModel(getCanonicalSavePath(name))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    }

    function create(fftType, vocabulary, customModelArtifactsOrURL, customMetadataOrURL) {
        tf.util.assert(customModelArtifactsOrURL == null && customMetadataOrURL == null ||
            customModelArtifactsOrURL != null && customMetadataOrURL != null, function () { return "customModelURL and customMetadataURL must be both provided or " +
            "both not provided."; });
        if (customModelArtifactsOrURL != null) {
            tf.util.assert(vocabulary == null, function () { return "vocabulary name must be null or undefined when modelURL " +
                "is provided."; });
        }
        if (fftType === 'BROWSER_FFT') {
            return new BrowserFftSpeechCommandRecognizer(vocabulary, customModelArtifactsOrURL, customMetadataOrURL);
        }
        else if (fftType === 'SOFT_FFT') {
            throw new Error('SOFT_FFT SpeechCommandRecognizer has not been implemented yet.');
        }
        else {
            throw new Error("Invalid fftType: '" + fftType + "'");
        }
    }
    var utils = {
        concatenateFloat32Arrays: concatenateFloat32Arrays,
        playRawAudio: playRawAudio
    };

    exports.create = create;
    exports.utils = utils;
    exports.BACKGROUND_NOISE_TAG = BACKGROUND_NOISE_TAG;
    exports.Dataset = Dataset;
    exports.getMaxIntensityFrameIndex = getMaxIntensityFrameIndex;
    exports.spectrogram2IntensityCurve = spectrogram2IntensityCurve;
    exports.deleteSavedTransferModel = deleteSavedTransferModel;
    exports.listSavedTransferModels = listSavedTransferModels;
    exports.UNKNOWN_TAG = UNKNOWN_TAG;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=speech-commands.js.map
