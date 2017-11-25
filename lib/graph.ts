import * as fs from "fs";
import * as path from "path";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

interface IGraphOptions {
  vertices: number;
  edges: Vertex[][];
}

type Vertex = string;

interface IAdjacencyList {
  [key: string]: Set<String>
}

interface IVertexCallback {
  (vertex: Vertex): void;
}

export class Graph {
  /**
   * Graph instance
   * @param  {Object}   options
   * @param  {Number}  options.vertices - Number of vertices to instantiate
   * @param  {Vertex[]} options.edges - An array of length two capturing vertices to be joined
   */
  constructor(options: IGraphOptions) {
    const { vertices, edges } = options;

    // Initialise adjacency list with number of vertices
    this.adjacencyList = {};
    for (let i = 0; i < vertices; i += 1) {
      this.adjacencyList[i] = new Set();
    }

    // Apply edges to adjacency list
    edges.forEach((edge) => this.addEdge(edge[0], edge[1]));
  }

  public adjacencyList: IAdjacencyList;

  // Adds edge between vertices
  public addEdge(v: Vertex, w: Vertex): void {
    this.adjacencyList[v].add(w);
    this.adjacencyList[w].add(v);
  }

  // Return number of edges
  public edgeCount() {
    return this.vertices()
      .reduce((sum, v) => this.adjacencyList[v].size + sum, 0) / 2;
  }

  public vertices() {
    return Object.keys(this.adjacencyList);
  }

  // Return number of vertices
  public verticesCount() {
    return this.vertices().length;
  }

  // Iterate over vertices
  public each(cb: IVertexCallback): void {
    this.vertices().forEach(cb);
  }

  // Iterate over vertices adjacent to v
  public forEachAdjacent(v: Vertex, cb: IVertexCallback): void {
    Array.from(this.adjacencyList[v]).forEach(cb);
  }

  public toString(): string {
    return JSON.stringify(this.adjacencyList);
  }

  static fromFile(file: string): Promise<Graph> {
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

const DATA_DIRECTORY = path.resolve(__dirname, "../data");
