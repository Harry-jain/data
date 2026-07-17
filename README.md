# VectorShift Pipeline Builder

A node-based pipeline builder application. This project features a React frontend utilizing React Flow for a drag-and-drop interface, and a FastAPI backend for pipeline validation.

## Features

- **Interactive Node Editor:** Drag and drop nodes onto a canvas to construct complex pipelines.
- **Node Connections:** Easily connect nodes using intuitive edge interactions.
- **Pipeline Validation:** Submits the pipeline to the backend to verify if it forms a Directed Acyclic Graph (DAG) and calculates the number of nodes and edges.
- **State Management:** Uses Zustand for efficient and predictable state management in the frontend.

## Tech Stack

### Frontend
- [React](https://reactjs.org/) (Create React App)
- [React Flow](https://reactflow.dev/) (For node-based UI)
- [Zustand](https://github.com/pmndrs/zustand) (State management)

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) (Web framework)
- [Pydantic](https://docs.pydantic.dev/) (Data validation)
- [Uvicorn](https://www.uvicorn.org/) (ASGI server)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Python](https://www.python.org/) (v3.7 or higher)
- npm or yarn

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
```

Install the required Python packages (it is recommended to use a virtual environment):

```bash
pip install fastapi uvicorn pydantic
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```
The backend server will run at `http://localhost:8000`. 

*Note: The API endpoint for parsing pipelines is located at `POST /pipelines/parse`.*

### 2. Frontend Setup

Open a new terminal window and navigate to the `frontend` directory:

```bash
cd frontend
```

Install the Node dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend application will open in your default browser at `http://localhost:3000`.

## Usage

1. Open the frontend application in your browser.
2. Drag nodes from the toolbar onto the canvas to add them to your pipeline.
3. Connect the output handle of one node to the input handle of another to define the flow.
4. Click the **Submit** button to send the pipeline to the backend.
5. The system will alert you with the total number of nodes, total number of edges, and whether the constructed pipeline is a valid Directed Acyclic Graph (DAG).
