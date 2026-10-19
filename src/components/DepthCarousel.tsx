import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import gsap from 'gsap'
import './DepthCarousel.css'

export type DepthCarouselItem = {
  image: string
  alt?: string
}

type DepthCarouselProps = {
  items: Array<string | DepthCarouselItem>
  renderItem?: (item: DepthCarouselItem, index: number, isActive: boolean) => ReactNode
  cardWidth?: number
  cardHeight?: number
  radius?: number
  tint?: string
  depth?: number
  spread?: number
  tilt?: number
  tiltDirection?: 'left' | 'right'
  perspective?: number
  visibleCards?: number
  falloff?: number
  blur?: number
  duration?: number
  ease?: string
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  showControls?: boolean
  showIndicators?: boolean
  onChange?: (index: number, item: DepthCarouselItem) => void
  className?: string
  label?: string
}

type CarouselConfig = {
  count: number
  depth: number
  spread: number
  tilt: number
  tiltDirection: 'left' | 'right'
  visibleCards: number
  falloff: number
  blur: number
  duration: number
  ease: string
  loop: boolean
  cardWidth: number
  autoplayDelay: number
}

type DragState = {
  x: number
  startPos: number
  lastX: number
  lastT: number
  velocity: number
  moved: boolean
  pointerId: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const normalizeItem = (item: string | DepthCarouselItem): DepthCarouselItem =>
  typeof item === 'string' ? { image: item, alt: '' } : item

const DepthCarousel = ({
  items,
  renderItem,
  cardWidth = 340,
  cardHeight = 438,
  radius = 2,
  tint = '#05060a',
  depth = 205,
  spread = 66,
  tilt = 15,
  tiltDirection = 'right',
  perspective = 1300,
  visibleCards = 3,
  falloff = 0.22,
  blur = 2,
  duration = 700,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 3600,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = '',
  label = 'Work samples',
}: DepthCarouselProps) => {
  const data = useMemo(() => items.map(normalizeItem), [items])
  const count = data.length

  const rootRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const overlayRefs = useRef<Array<HTMLSpanElement | null>>([])
  const posRef = useRef(0)
  const focusRef = useRef(0)
  const scaleRef = useRef(1)
  const configRef = useRef<CarouselConfig>({
    count: 0,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  })
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const wheelTimerRef = useRef<number | null>(null)
  const autoTimerRef = useRef<number | null>(null)
  const reducedMotionRef = useRef(false)
  const suppressClickRef = useRef(false)
  const onChangeRef = useRef(onChange)
  const [active, setActive] = useState(0)

  onChangeRef.current = onChange
  configRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  }

  const layout = useCallback((position: number) => {
    const config = configRef.current
    if (!config.count) return

    const direction = config.tiltDirection === 'left' ? -1 : 1
    const scale = scaleRef.current

    for (let index = 0; index < config.count; index += 1) {
      const card = cardRefs.current[index]
      if (!card) continue

      let distance = index - position
      if (config.loop && config.count > 1) {
        distance = ((distance % config.count) + config.count) % config.count
        if (distance > config.count / 2) distance -= config.count
      }

      const behind = Math.max(0, distance)
      const absoluteDistance = Math.abs(distance)
      const shown = absoluteDistance <= config.visibleCards + 0.5
      const translateZ = -config.depth * distance
      const translateX = direction * config.spread * distance
      const rotateY = direction * config.tilt * clamp(distance, 0, 1)

      let opacity = distance < 0 ? Math.max(0, 1 + distance) : 1
      if (!shown) opacity = 0

      const brightness = Math.max(0.15, 1 - behind * config.falloff)
      const blurAmount = config.blur > 0
        ? Math.min(config.blur, (behind / Math.max(1, config.visibleCards)) * config.blur)
        : 0

      card.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`
      card.style.opacity = opacity.toFixed(3)
      card.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurAmount.toFixed(2)}px)`
      card.style.zIndex = String(Math.round(2000 - distance * 20))
      card.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none'

      const overlay = overlayRefs.current[index]
      if (overlay) {
        overlay.style.opacity = clamp(behind * config.falloff * 1.25, 0, 0.72).toFixed(3)
      }
    }
  }, [])

  const notify = useCallback((index: number) => {
    setActive(index)
    onChangeRef.current?.(index, data[index])
  }, [data])

  const tweenTo = useCallback((target: number, animate: boolean) => {
    tweenRef.current?.kill()
    const config = configRef.current
    const proxy = { position: posRef.current }
    tweenRef.current = gsap.to(proxy, {
      position: target,
      duration: animate && !reducedMotionRef.current ? config.duration / 1000 : 0,
      ease: config.ease,
      onUpdate: () => {
        posRef.current = proxy.position
        layout(proxy.position)
      },
      onComplete: () => {
        if (configRef.current.count > 0) {
          const total = configRef.current.count
          posRef.current = ((posRef.current % total) + total) % total
        }
        layout(posRef.current)
      },
    })
  }, [layout])

  const setFocus = useCallback((rawIndex: number, animate = true) => {
    const config = configRef.current
    const total = config.count
    if (!total) return

    const index = config.loop
      ? ((rawIndex % total) + total) % total
      : clamp(rawIndex, 0, total - 1)
    let delta = index - posRef.current

    if (config.loop && total > 1) {
      delta = ((delta % total) + total) % total
      if (delta > total / 2) delta -= total
    }

    tweenTo(posRef.current + delta, animate)
    if (index !== focusRef.current) {
      focusRef.current = index
      notify(index)
    }
  }, [notify, tweenTo])

  const navigateBy = useCallback((step: number) => {
    setFocus(focusRef.current + step, true)
  }, [setFocus])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? root.clientWidth
      const availableCardWidth = Math.max(240, width - 24)
      scaleRef.current = clamp(availableCardWidth / configRef.current.cardWidth, 0.55, 1)
      layout(posRef.current)
    })

    observer.observe(root)
    return () => observer.disconnect()
  }, [layout])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onWheel = (event: WheelEvent) => {
      const config = configRef.current
      if (config.count < 2) return

      event.preventDefault()
      tweenRef.current?.kill()
      const rawDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const delta = event.deltaMode === 1 ? rawDelta * 24 : rawDelta
      posRef.current += clamp(delta / (config.cardWidth * 0.9), -0.6, 0.6)
      layout(posRef.current)

      if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = window.setTimeout(() => setFocus(Math.round(posRef.current), true), 130)
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      root.removeEventListener('wheel', onWheel)
      if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current)
    }
  }, [layout, setFocus])

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || configRef.current.count < 2) return
    tweenRef.current?.kill()
    dragRef.current = {
      x: event.clientX,
      startPos: posRef.current,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
      pointerId: event.pointerId,
    }
  }, [])

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    const stepPixels = Math.max(configRef.current.cardWidth * 0.55 * scaleRef.current, 40)
    const deltaX = event.clientX - drag.x
    if (!drag.moved && Math.abs(deltaX) > 4) {
      drag.moved = true
      suppressClickRef.current = true
      rootRef.current?.setPointerCapture(drag.pointerId)
    }
    if (!drag.moved) return

    const now = performance.now()
    const elapsed = Math.max(now - drag.lastT, 1)
    drag.velocity = (event.clientX - drag.lastX) / elapsed
    drag.lastX = event.clientX
    drag.lastT = now
    posRef.current = drag.startPos - deltaX / stepPixels
    layout(posRef.current)
  }, [layout])

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null
    if (!drag.moved) return

    const stepPixels = Math.max(configRef.current.cardWidth * 0.55 * scaleRef.current, 40)
    const projected = posRef.current - (drag.velocity * 180) / stepPixels
    setFocus(Math.round(projected), true)
    window.setTimeout(() => { suppressClickRef.current = false }, 0)
  }, [setFocus])

  const onKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      navigateBy(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      navigateBy(1)
    }
  }, [navigateBy])

  const onCardClick = useCallback((index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    setFocus(index, true)
  }, [setFocus])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mediaQuery.matches
    const updatePreference = () => { reducedMotionRef.current = mediaQuery.matches }
    mediaQuery.addEventListener?.('change', updatePreference)
    return () => mediaQuery.removeEventListener?.('change', updatePreference)
  }, [])

  useEffect(() => {
    if (!autoplay || reducedMotionRef.current || count < 2) return
    const root = rootRef.current
    let hovered = false
    let focused = false

    const stop = () => {
      if (autoTimerRef.current !== null) window.clearInterval(autoTimerRef.current)
      autoTimerRef.current = null
    }
    const start = () => {
      stop()
      autoTimerRef.current = window.setInterval(() => {
        if (!hovered && !focused) navigateBy(1)
      }, Math.max(configRef.current.autoplayDelay, 600))
    }
    const onEnter = () => { hovered = true }
    const onLeave = () => { hovered = false }
    const onFocusIn = () => { focused = true }
    const onFocusOut = (event: FocusEvent) => {
      if (!root?.contains(event.relatedTarget as Node | null)) focused = false
    }

    root?.addEventListener('mouseenter', onEnter)
    root?.addEventListener('mouseleave', onLeave)
    root?.addEventListener('focusin', onFocusIn)
    root?.addEventListener('focusout', onFocusOut)
    start()

    return () => {
      stop()
      root?.removeEventListener('mouseenter', onEnter)
      root?.removeEventListener('mouseleave', onLeave)
      root?.removeEventListener('focusin', onFocusIn)
      root?.removeEventListener('focusout', onFocusOut)
    }
  }, [autoplay, autoplayDelay, count, navigateBy])

  useEffect(() => {
    layout(posRef.current)
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count])

  useEffect(() => () => {
    tweenRef.current?.kill()
    if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current)
    if (autoTimerRef.current !== null) window.clearInterval(autoTimerRef.current)
  }, [])

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={{ '--dc-perspective': `${perspective}px` } as CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="depth-carousel__stage">
        {data.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            className="depth-carousel__card"
            ref={(element) => { cardRefs.current[index] = element }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={active !== index}
            onClick={() => onCardClick(index)}
          >
            {renderItem
              ? renderItem(item, index, active === index)
              : <img className="depth-carousel__img" src={item.image} alt={item.alt ?? ''} draggable={false} />}
            <span
              className="depth-carousel__tint"
              ref={(element) => { overlayRefs.current[index] = element }}
              style={{ background: tint }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous project"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next project"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="depth-carousel__dots" role="group" aria-label="Choose a project">
          {data.map((item, index) => (
            <button
              key={`${item.image}-indicator-${index}`}
              type="button"
              aria-current={active === index ? 'true' : undefined}
              aria-label={`Show project ${index + 1} of ${count}`}
              className={`depth-carousel__dot${active === index ? ' is-active' : ''}`}
              onClick={() => setFocus(index, true)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DepthCarousel
