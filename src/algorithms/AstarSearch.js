import React from 'react'
import { manhattan, euclidean, chebyshev } from '../PathFinder/Heuristics'

export function AstarSearch (grid, startNode, finishNode, heuristic) {
    //nodes, start, target, nodesToAnimate, boardArray, name, heuristic
    const visitedNodesInOrder = []
    const unvisitedNodes = getAllNodes(grid)
    startNode.distance = 0;
    startNode.totalDistance = 0;

    while (! !unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodesInOrder
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode)
        if(visitedNodesInOrder.includes(finishNode)){
          //var visitedNodesInOrder2 = dijkstra2(grid,finishNode,finishNode2);

          //console.log(visitedNodesInOrder2);
          return visitedNodesInOrder
        } 
        updateUnvisitedNeighbors(closestNode, grid)
    }

}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) =>  (nodeA.totalDistance!==nodeB.totalDistance) ? nodeA.totalDistance - nodeB.totalDistance: nodeA.heuristicDistance - nodeB.heuristicDistance);
}
  
  
function updateUnvisitedNeighbors(node, grid, finishNode, startNode, heuristic) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (let neighbor of unvisitedNeighbors) {
        if(finishNode){
            updateUnvisitedNode(node,neighbor,finishNode,startNode,heuristic,grid)
        }
        else {
            updateUnvisitedNode(node,neighbor)
        }
      
    }
}

function updateUnvisitedNode(node, neighbor, finishNode,  startNode, heuristic, grid) {
    let distance = manhattan(node, neighbor);
    if (!neighbor.heuristicDistance) 
        neighbor.heuristicDistance = manhattan(neighbor, finishNode);
      
    let distanceToCompare = node.distance + distance;
      
    if (distanceToCompare < neighbor.distance) {
      neighbor.distance = distanceToCompare;
      neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;
      neighbor.previousNode = node;
    }
  }

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
  
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        if(node.isVisited===false) nodes.push(node);
      }
    }
    return nodes;
}

  
export function AStargetNodesInShortestPathOrder(finishNode) {
    //const nodesInVisitedPathOrder = dijkstra2(grid,finishNode,finishNode2);
    //console.log(nodesInVisitedPathOrder);
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

export function AStarcalcDistance(nodesInShortestPathOrder){
  var sum=0,dx,dy;
  for(let i=1;i<nodesInShortestPathOrder.length;i++){
    dy = nodesInShortestPathOrder[i].row - nodesInShortestPathOrder[i-1].row;
    dx = nodesInShortestPathOrder[i].col - nodesInShortestPathOrder[i-1].col;
    sum+= manhattan(dx,dy);
  }
  return (sum!==0) ? sum : "No possible path";
  
  
}