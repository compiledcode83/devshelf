import Link from 'next/link';

const Logo = () => (
  <Link href="/">
    <a>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38C29.4934 38 38 29.4934 38 19Z"
          fill="url(#paint0_radial)"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(8.03776 32.7039) scale(30.3776)"
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
