'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { motion, useAnimation, cubicBezier } from 'framer-motion'

export default function AnimatedLogo() {
  const controls = useAnimation()

  const letters = [
    { id: 'B', d: "M0.427734 79V1.65625H21.3896C27.0146 1.65625 31.1016 3.0332 33.6504 5.78711C36.2285 8.51172 37.5176 13.0234 37.5176 19.3223V22.7061C37.5176 26.3389 36.8584 29.2832 35.54 31.5391C34.251 33.7949 32.2734 35.2744 29.6074 35.9775C33.0938 36.8564 35.4229 38.9219 36.5947 42.1738C37.7959 45.3965 38.3965 49.3369 38.3965 53.9951C38.3965 59.0049 37.9277 63.3848 36.9902 67.1348C36.0527 70.8848 34.3535 73.7998 31.8926 75.8799C29.4316 77.96 25.9307 79 21.3896 79H0.427734ZM15.5449 30.792H18.709C20.1445 30.792 21.0674 30.2354 21.4775 29.1221C21.8877 28.0088 22.0928 26.6758 22.0928 25.123V17.3447C22.0928 14.8545 20.9941 13.6094 18.7969 13.6094H15.5449V30.792ZM17.083 65.377C21.0967 65.377 23.1035 63.4727 23.1035 59.6641V49.9961C23.1035 47.7988 22.7666 46.0703 22.0928 44.8105C21.4482 43.5215 20.2178 42.877 18.4014 42.877H15.5449V65.2891C16.1895 65.3477 16.7021 65.377 17.083 65.377Z" },
    { id: 'A', d: "M38.3848 79L45.8555 1.65625H72.0908L79.4297 79H64.7959L63.6973 66.5195H54.3809L53.4141 79H38.3848ZM55.4795 54.1709H62.5107L59.127 14.8398H58.4238L55.4795 54.1709Z" },
    { id: 'D', d: "M81.1758 79V1.65625H102.445C108.012 1.65625 112.201 3.20898 115.014 6.31445C117.826 9.39062 119.232 13.9023 119.232 19.8496V56.0605C119.232 63.3848 117.943 69.0391 115.365 73.0234C112.816 77.0078 108.334 79 101.918 79H81.1758ZM96.7324 65.333H99.4131C102.255 65.333 103.676 63.9561 103.676 61.2021V21.2998C103.676 18.7217 103.324 17.0664 102.621 16.334C101.947 15.5723 100.556 15.1914 98.4463 15.1914H96.7324V65.333Z" },
    { id: 'G', d: "M138.513 79.7031C127.468 79.7031 121.945 71.793 121.945 55.9727V22.6182C121.945 8.1748 128.273 0.953125 140.93 0.953125C146.145 0.953125 150.144 2.00781 152.927 4.11719C155.71 6.19727 157.629 9.24414 158.684 13.2578C159.738 17.2715 160.266 22.1641 160.266 27.9355H145.148V21.0801C145.148 19.4102 144.914 18.0186 144.445 16.9053C144.006 15.7627 143.068 15.1914 141.633 15.1914C139.846 15.1914 138.659 15.792 138.073 16.9932C137.517 18.1943 137.238 19.5127 137.238 20.9482V58.4336C137.238 60.5137 137.502 62.2129 138.029 63.5312C138.586 64.8203 139.655 65.4648 141.237 65.4648C142.878 65.4648 143.962 64.8203 144.489 63.5312C145.046 62.2129 145.324 60.4844 145.324 58.3457V47.3154H141.193V33.9561H160.09V79H153.894L151.257 72.4961C148.562 77.3008 144.313 79.7031 138.513 79.7031Z" },
    { id: 'E', d: "M163.242 79V1.65625H194.18V16.5977H178.975V31.6709H193.564V46.2168H178.975V63.9268H195.19V79H163.242Z" },
    { id: 'G2', d: "M213.284 79.7031C202.239 79.7031 196.717 71.793 196.717 55.9727V22.6182C196.717 8.1748 203.045 0.953125 215.701 0.953125C220.916 0.953125 224.915 2.00781 227.698 4.11719C230.481 6.19727 232.4 9.24414 233.455 13.2578C234.51 17.2715 235.037 22.1641 235.037 27.9355H219.92V21.0801C219.92 19.4102 219.686 18.0186 219.217 16.9053C218.777 15.7627 217.84 15.1914 216.404 15.1914C214.617 15.1914 213.431 15.792 212.845 16.9932C212.288 18.1943 212.01 19.5127 212.01 20.9482V58.4336C212.01 60.5137 212.273 62.2129 212.801 63.5312C213.357 64.8203 214.427 65.4648 216.009 65.4648C217.649 65.4648 218.733 64.8203 219.261 63.5312C219.817 62.2129 220.096 60.4844 220.096 58.3457V47.3154H215.965V33.9561H234.861V79H228.665L226.028 72.4961C223.333 77.3008 219.085 79.7031 213.284 79.7031Z" },
    { id: 'A2', d: "M235.904 79L243.375 1.65625H269.61L276.949 79H262.315L261.217 66.5195H251.9L250.934 79H235.904ZM252.999 54.1709H260.03L256.646 14.8398H255.943L252.999 54.1709Z" },
    { id: 'T', d: "M284.188 79V16.5098H275.004V1.65625H308.842V16.5098H299.657V79H284.188Z" },
    { id: 'E2', d: "M310.148 79V1.65625H341.086V16.5977H325.881V31.6709H340.471V46.2168H325.881V63.9268H342.097V79H310.148Z" },
  ]

  // Custom easing function
  const customEase = cubicBezier(0.61, 0.28, 0, 0.98)

  const animationSequence = useMemo(() => [
    [{index: 2, direction: "Down"}],
    [],
    [],
    [{index: 4, direction: "Down"}, {index: 9, direction: "Down"}],
    [],
    [{index: 0, direction: "Down"}, {index: 7, direction: "Down"}],
    [{index: 1, direction: "Down"}, {index: 3, direction: "Up"}, {index: 5, direction: "Down"}],
    [],
    [{index: 6, direction: "Up"}, {index: 8, direction: "Up"}],
    [{index: 0, direction: "Up"}, {index: 1, direction: "Up"}, {index: 2, direction: "Up"}, {index: 3, direction: "Up"}, {index: 4, direction: "Up"},
     {index: 5, direction: "Down"}, {index: 6, direction: "Down"}, {index: 7, direction: "Down"}, {index: 8, direction: "Down"}, {index: 9, direction: "Down"}],
    [],
    [],
  ], [])

  const animateSequence = useCallback(async () => {
    for (const step of animationSequence) {
      await controls.start(i => {
        const animation = step.find(item => item.index === i)
        if (animation) {
          return {
            y: animation.direction === "Down" ? 80 : -80,
            transition: {
              duration: 0.6,
              ease: customEase,
            }
          }
        }
        return {}
      })

      // Reset positions without animation
      controls.set(i => {
        const animation = step.find(item => item.index === i)
        if (animation) {
          return { y: 0 }
        }
        return {}
      })

      await new Promise(resolve => setTimeout(resolve, 250)) // Wait 250ms between steps
    }
    animateSequence() // Repeat the sequence
  }, [controls, animationSequence, customEase])

  useEffect(() => {
    animateSequence()
  }, [animateSequence])

  return (
    <div className="w-full p-6 border-b border-border">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 343 80"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
          </mask>
        </defs>
        <g mask="url(#mask)">
          {letters.map((letter, index) => (
            <motion.g key={letter.id} custom={index} animate={controls}>
              <motion.path
                d={letter.d}
                fill="black"
                initial={{ y: -80 }}
              />
              <motion.path
                d={letter.d}
                fill="black"
                initial={{ y: 0 }}
              />
              <motion.path
                d={letter.d}
                fill="black"
                initial={{ y: 80 }}
              />
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  )
}