import React, {MouseEvent, useState, useRef, useEffect} from "react";

// custom Previous Hook. But it allows only 1 undo :)
// function usePrevious(value:any) {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value; //assign the value of ref to the argument
//     },[value]); //this code will run when the value of 'value' changes
//     return ref.current; //in the end, return the current ref value.
// }
const App = () => {

    const [points, setPoints] = useState<Array<{ x: number, y: number }>>([]);
    const [redoCachePoints, setRedoCachePoints] = useState<Array<{ x: number, y: number }>>(points)

    const redoHandler = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        const currentPoints = [...points]
        const removedPoint = currentPoints.pop() as { x: number, y: number }
        setRedoCachePoints((cachePoints: Array<{ x: number, y: number }>) => [...cachePoints, removedPoint])
        setPoints(currentPoints)
    }

    const undoHandler = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        const currentCachePoints = [...redoCachePoints]
        const removedCachePoint = currentCachePoints.pop()
        setPoints((points: any) => [...points, removedCachePoint])
        setRedoCachePoints(currentCachePoints)
    }

    const clickHandler = (e: MouseEvent<HTMLElement>) => {
        if (e.clientY < 105) {
            // control area is not usable to drop a point
            return
        }

        setPoints((points) => [
            ...points.filter((point) => point.x !== e.clientX || point.y !== e.clientY),
            {
                x: e.clientX,
                y: e.clientY
            }
        ])

        // when item is added, cachePoints must be clean
        setRedoCachePoints([])
    }

    return (
        <div className={"screen"} onClick={clickHandler}>
            <header className={"header"}>
                <button disabled={points.length === 0} onClick={redoHandler}>Redo</button>
                <button disabled={redoCachePoints.length === 0} onClick={undoHandler}>Undo</button>
            </header>

            {points.map((point, item) => {
                return (
                    <div
                        className={"point"}
                        style={{
                            left: point.x,
                            top: point.y
                        }}
                        key={item}
                    />
                )
            })}
        </div>
    )
}

export default App
