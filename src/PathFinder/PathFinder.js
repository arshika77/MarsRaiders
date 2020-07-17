import React, { Component } from 'react'
import Node from './Node/Node'
import {dijkstra, getNodesInShortestPathOrder, calcDistance} from '../algorithms/dijkstra'
import './PathFinder.css'
import { euclidean } from './Heuristics';

//Define the initial starting point and the initial destination point of the rover
let START_NODE_ROW = 5;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;
let FINISH2_NODE_ROW = 12;
let FINISH2_NODE_COL = 40;


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
            finishPos2: false,
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
        //When <button> Move 2nd destination point </button> is clicked
        else if(this.state.finishPos2){
            const oldRow = FINISH2_NODE_ROW
            const oldCol = FINISH2_NODE_COL
            const node = this.state.grid[row][col]
            node.isFinish2 = true
            this.state.grid[row][col] = node
            this.state.grid[oldRow][oldCol].isFinish2 = false
            FINISH2_NODE_COL = col
            FINISH2_NODE_ROW = row
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

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, visitedNodesInOrder2, nodesInShortestPathOrder2) {
        //Set Distance value to Visualizing
        this.setState({dist:"Visualizing..."})
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            //animate visited nodes : Refer to Node.css for animation details
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder, nodesInShortestPathOrder2 , visitedNodesInOrder2);
            }, 10 * i);
            return;
          }
          //Do not animate start point and destination point
          if(visitedNodesInOrder[i].isStart || visitedNodesInOrder[i].isFinish || visitedNodesInOrder[i].isFinish2 ) continue
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
        
    }

    animateDijkstra2(visitedNodesInOrder2,nodesInShortestPathOrder2, nodesInShortestPathOrder,dist1) {
        // let dist1 = this.dist;
        this.setState({dist:"Visualizing..."})
        for (let i = 0; i <= visitedNodesInOrder2.length; i++) {
            //animate visited nodes : Refer to Node.css for animation details
          if (i === visitedNodesInOrder2.length) {
            setTimeout(() => {
              this.animateShortestPath2(nodesInShortestPathOrder2, nodesInShortestPathOrder,dist1);
            }, 10 * i);
            return;
          }
          //Do not animate start point and destination point
          for (let j = 0; j<= nodesInShortestPathOrder.length; j++) {
              if (visitedNodesInOrder2[i]===nodesInShortestPathOrder[j]) continue;
          }
          if(visitedNodesInOrder2[i].isStart || visitedNodesInOrder2[i].isFinish || visitedNodesInOrder2[i].isFinish2 ) continue
          setTimeout(() => {
            const node = visitedNodesInOrder2[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited2';
          }, 10 * i);
        }

    }

    
    animateShortestPath(nodesInShortestPathOrder, nodesInShortestPathOrder2, visitedNodesInOrder2) {
        //animate shortest path : Refer to Node.css for animation details
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            //Do not animate start point and destination point
            if(nodesInShortestPathOrder[i].isStart || nodesInShortestPathOrder[i].isFinish||nodesInShortestPathOrder[i].isFinish2) continue  
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
        // Set Distance value to distance between start point and destination point
        let dist1 = calcDistance(nodesInShortestPathOrder)
        this.setState({dist: calcDistance(nodesInShortestPathOrder)});
        if (dist1 != "No possible path") this.animateDijkstra2(visitedNodesInOrder2,nodesInShortestPathOrder2,nodesInShortestPathOrder,dist1)
    }

    animateShortestPath2(nodesInShortestPathOrder2, nodesInShortestPathOrder, dist1) {
        //animate shortest path : Refer to Node.css for animation details
        for (let i = 0; i < nodesInShortestPathOrder2.length; i++) {
            for (let j = 0; j<= nodesInShortestPathOrder.length; j++) {
                if (nodesInShortestPathOrder2[i]===nodesInShortestPathOrder[j]) continue;
            }
            //Do not animate start point and destination point
            if(nodesInShortestPathOrder2[i].isStart || nodesInShortestPathOrder2[i].isFinish||nodesInShortestPathOrder2[i].isFinish2 ) continue  
          setTimeout(() => {
            const node = nodesInShortestPathOrder2[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path2';
          }, 50 * i);
        }
        // Set Distance value to distance between start point and destination point
        let dist2 = calcDistance(nodesInShortestPathOrder2)
        if (dist1 == "No possible path") this.setState({dist: "No possible path"})
        else if (dist2 == "No possible path") this.setState({dist: "No possible path"})
        else this.setState({dist: dist1 + dist2 -1});
    }
    
    

    visualizeDijkstra() {
        //Start Visualization
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const finishNode2 = grid[FINISH2_NODE_ROW][FINISH2_NODE_COL];
        const fin = euclidean(FINISH_NODE_COL-START_NODE_ROW,FINISH_NODE_ROW-START_NODE_ROW)<euclidean(FINISH2_NODE_COL-START_NODE_ROW,FINISH2_NODE_ROW-START_NODE_ROW)? finishNode : finishNode2 ;
        const fin2 = euclidean(FINISH_NODE_COL-START_NODE_ROW,FINISH_NODE_ROW-START_NODE_ROW)>=euclidean(FINISH2_NODE_COL-START_NODE_ROW,FINISH2_NODE_ROW-START_NODE_ROW)? finishNode : finishNode2 ;
        const visitedNodesInOrder = dijkstra(grid, startNode, fin);
        const visitedNodesInOrder2 = dijkstra(grid,fin,fin2);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(fin);
        const nodesInShortestPathOrder2 = getNodesInShortestPathOrder(fin2);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, visitedNodesInOrder2, nodesInShortestPathOrder2);
        
        //const visitedNodesInOrder2 = dijkstra(grid,fin,fin2);
        //const nodesInShortestPathOrder2 = getNodesInShortestPathOrder(fin2);
        
        //enough gap between the two visualizations
        //this.setState({dist: dist1 + calcDistance(nodesInShortestPathOrder2)});
        
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

    finishPosition2() {
        //Toggle finishPos2 state on button press
        this.setState({finishPos2: !this.state.finishPos2})
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
                    <button className = 'button' onClick={() => this.finishPosition2()}>
                        { this.state.finishPos2 ? "Fix 2nd destination point" : "Move 2nd destination point"}
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
                                const {row, col, isFinish,isFinish2, isStart, isWall} = node
                                return (
                                    <Node 
                                        key = {nodeIdx}
                                        col = {col}
                                        row = {row}
                                        isFinish = {isFinish}
                                        isFinish2 = {isFinish2}
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
        isFinish2: row === FINISH2_NODE_ROW && col=== FINISH2_NODE_COL,
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