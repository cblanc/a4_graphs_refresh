import { assert } from "chai";
import { Graph } from "../lib/graph";

describe("Graph", () => {
  describe("instantiation", () => {
    it("creates a correct graph instance", () => {
      const g: Graph = new Graph({
        vertices: 5,
        edges: [
          ["0", "1"],
          ["1", "2"],
          ["2", "3"],
        ],
      });
      const vertices = g.vertices();
      assert.equal(vertices.length, 5);
      assert.equal(g.edgeCount(), 3);
      assert.deepEqual(g.adjacencyList["0"], new Set(["1"]));
      assert.deepEqual(g.adjacencyList["1"], new Set(["0", "2"]));
      assert.deepEqual(g.adjacencyList["2"], new Set(["1", "3"]));
      assert.deepEqual(g.adjacencyList["3"], new Set(["2"]));
      assert.deepEqual(g.adjacencyList["4"], new Set([]));
    });
  });

  describe(".fromFile", () => {
    it("loads graph", (done) => {
      Graph.fromFile("test")
        .then((g) => {
          assert.equal(g.vertices().length, 3);
          assert.equal(g.edgeCount(), 2);
          done();
      })
        .catch(done);
    });
  });
});
