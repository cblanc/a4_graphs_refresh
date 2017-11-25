"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);
class Graph {
    /**
     * Graph instance
     * @param  {Object}   options
     * @param  {Number}  options.vertices - Number of vertices to instantiate
     * @param  {Vertex[]} options.edges - An array of length two capturing vertices to be joined
     */
    constructor(options) {
        const { vertices, edges } = options;
        // Initialise adjacency list with number of vertices
        this.adjacencyList = {};
        for (let i = 0; i < vertices; i += 1) {
            this.adjacencyList[i] = new Set();
        }
        // Apply edges to adjacency list
        edges.forEach((edge) => this.addEdge(edge[0], edge[1]));
    }
    // Adds edge between vertices
    addEdge(v, w) {
        this.adjacencyList[v].add(w);
        this.adjacencyList[w].add(v);
    }
    // Return number of edges
    edgeCount() {
        return this.vertices()
            .reduce((sum, v) => this.adjacencyList[v].size + sum, 0) / 2;
    }
    vertices() {
        return Object.keys(this.adjacencyList);
    }
    // Return number of vertices
    verticesCount() {
        return this.vertices().length;
    }
    // Iterate over vertices
    each(cb) {
        this.vertices().forEach(cb);
    }
    // Iterate over vertices adjacent to v
    forEachAdjacent(v, cb) {
        Array.from(this.adjacencyList[v]).forEach(cb);
    }
    toString() {
        return JSON.stringify(this.adjacencyList);
    }
    static fromFile(file) {
        return readFile(path.join(DATA_DIRECTORY, file), { encoding: "utf8" })
            .then((data) => {
            const operations = data.split("\n");
            const vertices = parseInt(operations[0], 10); // Number of vertices in position 0
            const edges = operations
                .slice(2)
                .map((val) => val.split(",").slice(0, 2)); // Edges defined as lines beyond 0 and 1
            return new Graph({ vertices, edges });
        });
    }
}
exports.Graph = Graph;
const DATA_DIRECTORY = path.resolve(__dirname, "../data");
//# sourceMappingURL=graph.js.map