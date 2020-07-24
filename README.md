# MarsRaiders
Repository for "Navigate the mars rover" project for Engage 2020 by Microsoft

Purpose :

1. For creating an easy visualization to understand the working of various algorithms.
2. For partial fulfilment of the Mars Colonization Program of Microsoft Engage 2020.

Objectives :

1. Implementing algorithms to find the shortest path between the start Node and End Node while avoiding the nodes marked as obstacles.
2. Expanding the problem to finding the shortest path with 2 end nodes and 1 start node. 
3. Visualizing the working of algorithms and highlighting the shortest path
4. Creating a workspace grid where 
5. Creating a browser based Web Application to deploy the project

Resources Used :

  Techniques and Softwares Used :

  1. React JS - It is an open-source JavaScript library used for building user interfaces. We have used React along with HTML and JSX to create our single page web application.      We started by making the grid. Then we added the nodes, and after that we incorporated the algorithms.
  2. Cascading Style Sheets - CSS has been used for the styling and presentation of the page. It allowed us to separate the content and presentation easily. 
	
Algorithms Used :

  1. Dijkstra’s Algorithm - It is a basic shortest path finding algorithm which works as follows :
  Initially, all the nodes are marked unvisited and are assigned infinite distance except the startNode which is at zero distance. 
  Then, we keep exploring the unvisited nodes one by one and keep updating the distance. Compare the newly calculated distance to the current value and assign the smaller value. 
  When all the neighbours of the current Node have been visited, remove it from the set of unvisited nodes and move on to the next node.
  The algorithm terminates when the endNode becomes a part of the visitedSet or when the smallest distance in the unvisited set becomes infinity indicating that the node is not   accessible.
  Then, we backtrack from the endNode to the startNode for getting the shortest path.

  The optimal complexity of the algorithm is  O((V + E)logV) [where V is the number of nodes and E is the number of edges] by using a min-priority queue. However, in this         project we have implemented this algorithm using an array because of its simplicity. It runs in O(V2). 
  Some problems with the algorithm include negative cycles, and exploration of extra nodes which are not in the direction of the endNodes.


  2. A Star Algorithm - This is an advanced variation of the Dijkstra’s algorithm which reduces the  nodes explored. In addition to Dijkstra’s algorithm, this uses a heuristic     function while assigning the distances to each node. A heuristic function calculates the distance between the endNode and startNode. This gives preference to nodes which are     in the direction of the endNode.


  3. Best First Search - In contrast to the A star algorithm which gives equal importance to path-distance from startNode and heuristic distance from endNode, this algorithm       focuses mainly on the heuristic distance from the endNode. Thus, it goes faster in the direction of the endNode as compared to Dijkstra and A star.

Heuristics Used :

  1. Euclidean : Calculates the euclidean distance between two nodes given by the formula x2 + y2
  2. Manhattan : Calculates the manhattan distance between two nodes given by the formula x+y
  3. Chebyshev : Calculates the chebyshev distance between two nodes given by the formula max(x,y)
  
Features added to the basic project :
 
   Added another end node in our project, which creates a more complex problem and allows for multiple possible paths.The basic algorithms only worked with one start node and      one end node. The agent now also has to decide which node to visit first and which one later. For this, we ran the algorithms from start node to Node A, node A to node B and    start node to node B separately. After that, we compared the respective total distances in the two cases (start - A - B vs. start - B - A) and chose the shorter one.            Appropriate modifications were made for cases involving one node being inaccessible. 

Future Work :

  1. Further, implementation of IDA* algorithm, Jump Point Search,etc. to reduce the space complexity while using heuristic (optimal path estimates) can be added
  2. Octile Heuristic can be added
  3. Currently, the project does not support diagonal movement. That can be added in two variations - allowing movement through walled corners or not. Certain heuristics will      not be able to work with diagonals, so appropriate modification will have to be made.
  4. Bi-directional searches can be added, which initiate the algorithm from the start node and the end node simultaneously. Its transformation to 2 end points will be             interesting.
  5. Multiple endpoints (more than 2) can be added which will lead to more complexity and an exponential increase in the number of paths to choose from. 
  6. Another interesting idea which can be explored includes adding obstacles which can be crossed but lead to extra time or distance costs. The grid will then act as a weighted   graph. e.g - An obstacle can be added which when crossed leads to the path-distance increasing by 10 units. 
  7. The grid structure is not displayed properly when viewing the WebApp from a mobile. Grid needs to be made compatible to different devices (by using Bootstrap). 

 
Using this App :

1. To run the MARS ROVER Navigator:
2. Go to https://arshika77.github.io/MarsRaiders 
3. If you want to change the starting point of the rover :
 i. Click on “Move Starting Point” Button
 ii. Click on the appropriate position/cell for the starting point on the grid
 iii. Click on “Fix Starting Point” button 
 4. If you want to change the end point closer to the rover :
 i. Click on “Move Destination Point A” Button
 ii. Click on the appropriate position/cell for end point A on the grid
 iii. Click on “Fix Destination Point A” button 
5. If you want to change the end point farther from the rover :
 i. Click on “Move Destination Point B” Button
 ii. Click on the appropriate position/cell for end point B on the grid
 iii. Click on “Fix Destination Point B” button
6. Draw the necessary obstacles (walls) on the grid by left clicking the cells
7. In case you make an error, press the "Erase Walls" button to make corrections and click on the cells to remove the walls or press "Reset Grid" to start afresh
8. Once the simulated terrain is ready, choose the appropriate algorithm and the corresponding Heuristic for the robot to implement from the drop down list by hovering over “Choose Algorithm to Visualize” button
9. Voila! The MARS ROVER Navigator will visualise the shortest path of the robot and display the distance
10. To start another visualisation, click on "Reset Grid" and start again from point 1.

References :
1. Problem http://microsoft.acehacker.com/mars/ 
2. MIT Path Finding Visualizer http://qiao.github.io/PathFinding.js/visual/ 
3. PathFinding Visualizer Tutorial by Clément Mihailescu :  https://youtu.be/msttfIHHkak and https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial 



