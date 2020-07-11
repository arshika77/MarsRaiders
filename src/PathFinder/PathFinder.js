import React, { Component } from 'react'
import Node from './Node/Node'
import {dijkstra, getNodesInShortestPathOrder, calcDistance} from '../algorithms/dijkstra'
import './PathFinder.css'

//Define the initial starting point and the initial destination point of the rover
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
            dist:0,
            startPos: false,
            finishPos: false,
        }
    }

    componentDidMount() {
        const grid = getGrid()
        //gridE = grid;
        this.setState({grid})
    }

    handleMouseDown(row, col) {
        //When <button> Move starting point </button> is clicked
        if(this.state.startPos){
            const oldRow = START_NODE_ROW
            const oldCol = START_NODE_COL
            const node = this.state.grid[row][col]
            node.isStart = true
            this.state.grid[row][col] = node
            this.state.grid[oldRow][oldCol].isStart = false
            START_NODE_COL = col
            START_NODE_ROW = row
        }
        //When <button> Move destination point </button> is clicked
        else if(this.state.finishPos){
            const oldRow = FINISH_NODE_ROW
            const oldCol = FINISH_NODE_COL
            const node = this.state.grid[row][col]
            node.isFinish = true
            this.state.grid[row][col] = node
            this.state.grid[oldRow][oldCol].isFinish = false
            FINISH_NODE_COL = col
            FINISH_NODE_ROW = row
        }
        //When <button> Erase Walls </button> is pressed and current node is a wall
        else if(this.state.erase && this.state.grid[row][col].isWall){
            const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
        //When <button> Erase Walls </button> is pressed and current node is not a wall
        else if(this.state.erase && !this.state.grid[row][col].isWall){
            this.setState({mouseIsPressed:true})
        }
        //Drawing walls on the grid 
        else{
            const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
            this.setState({grid: newGrid, mouseIsPressed: true})
        }
    }

    handleMouseEnter(row, col) {
        //When mouse is not pressed don't do anything
        if (!this.state.mouseIsPressed) return
        //When <button> Erase Walls </button> is pressed
        if(this.state.erase) {
            const node = this.state.grid[row][col]
            if(node.isWall){
                const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
                this.setState({grid: newGrid})
            }
        }
        //Draw Walls
        else{
            const newGrid = getWallToggledGrid(this.state.grid, row, col,this.state.erase)
            this.setState({grid: newGrid})
        }

    }

    handleMouseUp() {
        //On releasing the mouse button
        this.setState({mouseIsPressed: false})
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        //Set Distance value to Visualizing
        this.setState({dist:"Visualizing..."})
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            //animate visited nodes : Refer to Node.css for animation details
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          //Do not animate start point and destination point
          if(visitedNodesInOrder[i].isStart || visitedNodesInOrder[i].isFinish) continue
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
        
    }
    
    animateShortestPath(nodesInShortestPathOrder) {
        //animate shortest path : Refer to Node.css for animation details
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            //Do not animate start point and destination point
            if(nodesInShortestPathOrder[i].isStart || nodesInShortestPathOrder[i].isFinish) continue  
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
        // Set Distance value to distance between start point and destination point
        this.setState({dist:calcDistance(nodesInShortestPathOrder)});
    }
    
    

    visualizeDijkstra() {
        //Start Visualization
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);   
    }

    eraseWalls() {
        //Toggle erase state on button press
        this.setState({erase: !this.state.erase})
    }

    startPosition() {
        //Toggle startPos state on button press
        this.setState({startPos: !this.state.startPos})
    }

    finishPosition() {
        //Toggle finishPos state on button press
        this.setState({finishPos: !this.state.finishPos})
    }

    render() {
        const {grid} = this.state
        return (
            <div>
                <navbar className='navbar'>
                    <button className='button' onClick={() => this.visualizeDijkstra()}>
                        Visualize Dijkstra's Algorithm
                    </button>
                    <button className = 'button' onClick={() => this.startPosition()}>
                        { this.state.startPos ? "Fix starting point" : "Move starting point"}
                    </button>
                    <button className = 'button' onClick={() => this.finishPosition()}>
                        { this.state.finishPos ? "Fix destination point" : "Move destination point"}
                    </button>
                    <button className='button' onClick = { () =>  this.eraseWalls()}>
                        { this.state.erase? "Stop Erasing" : "Erase Walls"}
                    </button>
                    <form action="http://localhost:3000/">
                        <button className='button'> 
                            Clear Grid 
                        </button>    
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
                <div>
                    <button className='button' style={{backgroundColor: "DarkSlateGrey"}}>
                        Distance: {this.state.dist}
                    </button>
                </div>
                <footer className='footer'> 
                    Developed By: Arshika Lalan, Parth Agrawal, Arohi Dureja, Rupali Raniwala
                </footer>
            </div>
        )
    }
}


const getGrid = () => {
    //Initial grid setup
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
    //Creating new node
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


const getWallToggledGrid = (grid, row, col,erase) => {
    //Draw wall function
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    let nNode = node
    //If erase button is not pressed and a wall doesn't exist at the node already - then draw a wall
    if (!node.isWall && erase === false){
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        nNode = newNode
    }
    //If erase button is pressed : (Proper functioning rendered due to event handling functions)
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