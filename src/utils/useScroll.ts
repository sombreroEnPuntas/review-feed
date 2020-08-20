import { useState, useEffect } from 'react'

const useScroll = (callback) => {
  const [loading, setLoading] = useState(false)
  const [scroll, setScroll] = useState(0)

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return

    setScroll(document.documentElement.scrollTop)
    setLoading(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return function cleanUp() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!loading) return
    ;(async () => {
      await callback()
      setLoading(false)
      document.documentElement.scrollTop = scroll
    })()
  }, [loading])
}

export default useScroll
