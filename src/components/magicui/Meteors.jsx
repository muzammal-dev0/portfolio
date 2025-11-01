import { cn } from '../../utils/cn'

export const Meteors = ({
  number = 20,
  className,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
}) => {
  const meteors = new Array(number || 20).fill(true)

  return (
    <>
      {meteors.map((el, idx) => {
        const left = Math.floor(Math.random() * (400 - -400) + -400) + 'px'
        const delay = Math.random() * (maxDelay - minDelay) + minDelay
        const duration = Math.random() * (maxDuration - minDuration) + minDuration

        return (
          <span
            key={idx}
            className={cn(
              'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              className
            )}
            style={{
              left: left,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              '--angle': `${angle}deg`,
            }}
          />
        )
      })}
    </>
  )
}
