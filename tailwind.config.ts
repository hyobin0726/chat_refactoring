import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'hobbing-bg-pink': '#FFDBD7',
                'hobbing-bg-gray': '#F8F8F8',
                'hobbing-pink': '#FF8595',
                'hobbing-light-pink': '#FFF9F9',
                'hobbing-red': '#F76D67',
                'hobbing-orange': '#FD6B22',
                'hobbing-gray': '#E8E9EA',
                'text-pink-gray': '#D1AEAE',
                'text-gray': '#646464',
                'text-gray-light': '#757575',
            },
        },
    },
    plugins: [],
}
export default config
