import { Graph } from './graph';

type Vertex = string;

interface IEdgeMap {
	[vertex: string]: boolean;
}

export class DepthFirstSearch {
	constructor(graph: Graph, start: string) {
		this.count = 0;
		this.marked = graph.vertices().reduce((marked, vertex) => {
			marked[vertex] = false;
			return marked;
		}, <IEdgeMap>{});
		this.mapPaths(graph, start);
	}

	private count: number;
	private marked: IEdgeMap;

	// Recursively explore edges and visited vertices
	private mapPaths(graph: Graph, v: Vertex): void {
		this.mark(v);
		this.count += 1;
		graph.forEachAdjacent(v, (adjacentVertex) => {
			if (!this.marked[adjacentVertex]) {
				this.mapPaths(graph, adjacentVertex);
			}
		});
	}

	private mark(vertex: string):void {
		this.marked[vertex] = true;
	}

	// Returns true if vertex connected to start
	public isConnected(vertex: string): boolean {
		return this.marked[vertex];
	}
}
