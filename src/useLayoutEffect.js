import {useState, useLayoutEffect} from 'react'

const ResizeExample = () =>{
  const [windowSize, setWindowSize] = useState({width: 0, height: 0})
  useLayoutEffect(() => {
    const resizeWindow = () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  return (
    <div>
      <p>width: {windowSize.width}</p>
      <p>height: {windowSize.height}</p>
    </div>
  )
}
export default ResizeExample