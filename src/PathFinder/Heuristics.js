
export function manhattan(dx,dy){
  return dx+dy;
}
export function euclidean(dx,dy){
  return Math.sqrt(dx*dx + dy*dy)
} 

export function chebyshev(dx,dy){
  return Math.max(dx,dy)
}




