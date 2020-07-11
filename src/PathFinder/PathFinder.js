import React, { Component } from 'react'
import Node from './Node/Node'
import {dijkstra, getNodesInShortestPathOrder, calcDistance} from '../algorithms/dijkstra'
import './PathFinder.css'

let START_NODE_ROW = 5;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

export default class PathFinder extends Component {
    constructor(){
        super()
        this.state = {
            grid: [],
            mouseIsPressed: false,
            erase: false,
            clear: false,
            dist:0
            
        }
    }

    componentDidMount() {
        const grid = getGrid()
        //gridE = grid;
        this.setState({grid})
    }

    handleMouseDown(row, col) {
        if (this.state.grid[row][col].isStart && !this.state.erase) {
            const newGrid = getNewStartGrid(this.state.grid,row,col)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
        else if (this.state.grid[row][col].isFinish && !this.state.erase) {
            const newGrid = getNewFinishGrid(this.state.grid,row,col,this.state.erase)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
        else if(this.state.erase && this.state.grid[row][col].isWall){
            const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
        else if(this.state.erase && !this.state.grid[row][col].isWall){
            this.setState({mouseIsPressed:true})
        }
        else{
            const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return
        
        if (this.state.grid[row][col].isStart && !this.state.erase) {
            const newGrid = getNewStartGrid(this.state.grid,row,col)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
        else if (this.state.grid[row][col].isFinish && !this.state.erase) {
            const newGrid = getNewFinishGrid(this.state.grid,row,col,this.state.erase)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
        else if(this.state.erase) {
            const node = this.state.grid[row][col]
            if(node.isWall){
                const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
                this.setState({grid: newGrid})
            }
        }
        else{
            const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
            this.setState({grid: newGrid})
        }

    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false})
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        this.setState({dist:"Visualizing..."})
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          if(visitedNodesInOrder[i].isStart || visitedNodesInOrder[i].isFinish) continue
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
        
    }
    
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if(nodesInShortestPathOrder[i].isStart || nodesInShortestPathOrder[i].isFinish) continue  
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
        this.setState({dist:calcDistance(nodesInShortestPathOrder)});
    }
    
    

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);   
    }

    eraseWalls() {
        this.setState({erase: !this.state.erase})
    }

    render() {
        const {grid} = this.state
        return (
            <div>
                <navbar className='navbar'>
                    <button className='button' onClick={() => this.visualizeDijkstra()}>
                        Visualize Dijkstra's Algorithm
                    </button>
                    <button className='button' onClick = { () =>  this.eraseWalls()}>
                        Erase Walls
                    </button>
                    <form action="http://localhost:3000/">
                        <button className='button'> Clear Grid </button>    
                    </form>
                    
                </navbar>
                <br></br> <br></br> <br></br>
                <div className = 'gridline'>
                    {grid.map((row,rowIdx) => {
                        return (
                        <div key={rowIdx}> 
                            {row.map((node,nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall} = node
                                return (
                                    <Node 
                                        key = {nodeIdx}
                                        col = {col}
                                        row = {row}
                                        isFinish = {isFinish}
                                        isStart = {isStart}
                                        isWall = {isWall}
                                        mouseIsPressed={this.state.mouseIsPressed}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) =>
                                          this.handleMouseEnter(row, col)
                                        }
                                        onMouseUp={() => this.handleMouseUp()}
                                    />
                                )
                            })}
                        </div>
                    )
                    })}
                </div> 
                <button className='button' style={{backgroundColor:"Black"}}>
                    Distance: {this.state.dist}
                </button>
            </div>
        )
    }
}


const getGrid = () => {
    const grid = [];
    for ( let row = 0; row < 20; row++){
        const currentRow = [];
        for ( let col = 0; col < 50; col++){
            currentRow.push(createNode(col,row))
        }
        grid.push(currentRow)
    }
    return grid
}

const createNode = (col,row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
}

const setNewStartNode = (col,row) => {
    START_NODE_COL = col
    START_NODE_ROW = row
}
const setNewFinishNode = (col,row) => {
    FINISH_NODE_COL = col
    FINISH_NODE_ROW = row
}

const getNewStartGrid = (grid,row,col) => {
    setNewStartNode(col,row)
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = createNode(col,row)
    newGrid[row][col] = newNode
    return newGrid
}

const getNewFinishGrid = (grid,row,col,erase) => {
    setNewFinishNode(col,row)
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isFinish: true,
    }
    newGrid[row][col] = newNode
    return newGrid
}

const getWallToggledGrid = (grid, row, col,erase) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    let nNode = node
    if (!node.isWall && erase === false){
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        nNode = newNode
    }
    else if(erase){
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        nNode = newNode
    }
    newGrid[row][col] = nNode
    return newGrid
}
