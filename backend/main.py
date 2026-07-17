from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # 1. Build set of all node IDs
    node_ids = {node['id'] for node in nodes}
    for edge in edges:
        node_ids.add(edge.get('source'))
        node_ids.add(edge.get('target'))
    
    # 2. Build adjacency list: node -> list of neighbors
    adj = {node_id: [] for node_id in node_ids}
    for edge in edges:
        u = edge.get('source')
        v = edge.get('target')
        if u in adj and v in adj:
            adj[u].append(v)
        
    # 3. DFS to detect cycles
    # state map: 0 = UNVISITED, 1 = VISITING, 2 = VISITED
    state = {node_id: 0 for node_id in node_ids}
    
    def has_cycle(u: str) -> bool:
        state[u] = 1 # VISITING
        for v in adj[u]:
            if state[v] == 1:
                return True # cycle found
            elif state[v] == 0:
                if has_cycle(v):
                    return True
        state[u] = 2 # VISITED
        return False

    for node_id in node_ids:
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False # Cycle detected, not a DAG
                
    return True # No cycles detected, is a DAG

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
