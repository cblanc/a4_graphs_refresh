"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepthFirstSearch {
    constructor(graph, start) {
        this.count = 0;
        this.marked = graph.vertices()
            .reduce((marked, vertex) => marked[vertex] = false, {});
        this.mapPaths(graph, start);
    }
    mapPaths(graph, v) {
        this.mark(v);
        this.count += 1;
        graph.forEachAdjacent(v, (adjacentVertex) => {
            if (!this.marked[adjacentVertex]) {
                this.mapPaths(graph, adjacentVertex);
            }
        });
    }
    mark(vertex) {
        this.marked[vertex] = true;
    }
}
exports.DepthFirstSearch = DepthFirstSearch;
//# sourceMappingURL=depth_first_search.js.map