import Link from 'next/link';

const Logo = () => (
  <Link href="/">
    <a>
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35C27.165 35 35 27.165 35 17.5Z"
          fill="url(#paint0_radial)"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(7.4032 30.122) scale(27.9793)"
          >
            <stop stopColor="#4FD1C5" />
            <stop offset="0.25871" stopColor="#81E6D9" />
            <stop offset="1" stopColor="#338CF5" />
          </radialGradient>
        </defs>
      </svg>
      <span className="visually-hidden">Feedback</span>
    </a>
  </Link>
);

export default Logo;
