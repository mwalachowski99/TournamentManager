import { MutableRefObject, useEffect, useRef, useState } from 'react'

export function useParentWidth(): readonly [
    MutableRefObject<HTMLDivElement | null>,
    number | null,
] {
    const ref = useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = useState<number | null>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width)
        })

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    return [ref, width] as const
}
