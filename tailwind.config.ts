import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			aurora: 'aurora 20s ease infinite',
  			'aurora-secondary': 'aurora-secondary 25s ease infinite',
  			'aurora-accent': 'aurora-accent 30s ease infinite',
  			'shiny-text': 'shiny-text 8s infinite',
  			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
  			'move-vertical': 'moveVertical 20s linear infinite',
  			'move-horizontal': 'moveHorizontal 20s linear infinite',
  			grid: 'grid 15s linear infinite',
  			'fade-in': 'fade-in 0.8s ease-out forwards 2.5s',
  			meteor: 'meteor 5s linear infinite',
  			'meteor-effect': 'meteor 5s linear infinite',
  			'meteor-effect-reverse': 'meteor-reverse 5s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		},
  		keyframes: {
  			aurora: {
  				'0%, 100%': {
  					transform: 'translate(0, 0) scale(1)'
  				},
  				'25%': {
  					transform: 'translate(-10%, 10%) scale(1.1)'
  				},
  				'50%': {
  					transform: 'translate(10%, -10%) scale(0.9)'
  				},
  				'75%': {
  					transform: 'translate(-5%, 5%) scale(1.05)'
  				}
  			},
  			'aurora-secondary': {
  				'0%, 100%': {
  					transform: 'translate(0, 0) scale(1)'
  				},
  				'25%': {
  					transform: 'translate(10%, -10%) scale(1.1)'
  				},
  				'50%': {
  					transform: 'translate(-10%, 10%) scale(0.9)'
  				},
  				'75%': {
  					transform: 'translate(5%, -5%) scale(1.05)'
  				}
  			},
  			'aurora-accent': {
  				'0%, 100%': {
  					transform: 'translate(0, 0) scale(1)'
  				},
  				'25%': {
  					transform: 'translate(-5%, -5%) scale(1.1)'
  				},
  				'50%': {
  					transform: 'translate(5%, 5%) scale(0.9)'
  				},
  				'75%': {
  					transform: 'translate(-10%, 10%) scale(1.05)'
  				}
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			},
  			'shimmer-slide': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			moveVertical: {
  				'0%': {
  					transform: 'translateY(0) rotateX(var(--grid-angle))'
  				},
  				'100%': {
  					transform: 'translateY(-100%) rotateX(var(--grid-angle))'
  				}
  			},
  			moveHorizontal: {
  				'0%': {
  					transform: 'translateX(0) rotateX(var(--grid-angle))'
  				},
  				'100%': {
  					transform: 'translateX(-100%) rotateX(var(--grid-angle))'
  				}
  			},
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			meteor: {
  				'0%': {
  					transform: 'rotate(215deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(215deg) translateX(-500px)',
  					opacity: '0'
  				}
  			},
  			'meteor-reverse': {
  				'0%': {
  					transform: 'rotate(145deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(145deg) translateX(500px)',
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: { height: "0" },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			'accordion-up': {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: "0" },
  			},
  		},
  		backgroundImage: {
  			'noise': "url('/noise.png')",
  		},
  		fontFamily: {
  			sans: ["var(--font-sans)", ...fontFamily.sans],
  			inter: ["var(--font-inter)", ...fontFamily.sans],
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config;
