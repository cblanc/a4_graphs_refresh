import { assert } from "chai";
import { Graph } from "../lib/graph";
import { DepthFirstSearch } from "../lib/depth_first_search";

describe("DepthFirstSearch", () => {
  describe("instantiation", () => {
    let graph: Graph;

    beforeEach(done => {
      Graph.fromFile("dfs_test")
        .then(g => {
          graph = g;
          done();
        })
        .catch(done);
    });

    it("marks joined vertices as connected", () => {
      const solution = new DepthFirstSearch(graph, "0");
      // Connected vertices
      ["1","2","3"].forEach(v => assert.isTrue(solution.isConnected(v)));
      // Not connected vertices
      ["4","5"].forEach(v => assert.isFalse(solution.isConnected(v)));
    });
  });
});
