import React from 'react';

interface BotanicalFloralLineArtProps {
  className?: string;
}

export const BotanicalFloralLineArt: React.FC<BotanicalFloralLineArtProps> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* ========================================================= */}
      {/* PRIMARY BOTANICAL LILY / LOTUS LINE ART (LEFT & CENTER)   */}
      {/* Matches the engraving line-art style from reference image */}
      {/* ========================================================= */}
      <svg
        viewBox="0 0 950 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#7A6B52]/18 sm:text-[#7A6B52]/22"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          
          {/* ------------------------------------------------------- */}
          {/* PETAL 1: Top-Left Graceful Sweeping Petal               */}
          {/* ------------------------------------------------------- */}
          {/* Outer Boundary */}
          <path
            d="M 280 520 C 230 420 160 260 80 120 C 120 220 180 380 270 510 C 210 390 140 220 70 80 C 130 180 230 360 300 505 Z"
            strokeWidth="1.6"
            className="opacity-90"
          />
          {/* Internal Striation / Vein Contour Lines */}
          <path d="M 275 515 C 220 400 155 240 75 100" strokeWidth="0.8" opacity="0.65" />
          <path d="M 270 518 C 210 390 145 230 85 125" strokeWidth="0.8" opacity="0.6" />
          <path d="M 282 510 C 235 410 175 270 100 145" strokeWidth="0.8" opacity="0.65" />
          <path d="M 288 505 C 248 420 195 290 125 170" strokeWidth="0.75" opacity="0.55" />
          <path d="M 295 502 C 260 430 215 315 150 200" strokeWidth="0.7" opacity="0.5" />
          <path d="M 265 522 C 195 385 130 230 95 150" strokeWidth="0.7" opacity="0.55" />

          {/* ------------------------------------------------------- */}
          {/* PETAL 2: Major Upper-Central Petal Arching High         */}
          {/* ------------------------------------------------------- */}
          {/* Outer Contour */}
          <path
            d="M 290 500 C 280 340 320 180 380 40 C 330 160 270 320 280 490 C 310 330 370 170 410 60 C 360 190 310 350 298 500 Z"
            strokeWidth="1.8"
            className="opacity-95"
          />
          {/* Internal Vein Contours */}
          <path d="M 290 495 C 295 340 345 180 395 50" strokeWidth="0.85" opacity="0.7" />
          <path d="M 285 492 C 282 345 315 200 365 70" strokeWidth="0.8" opacity="0.65" />
          <path d="M 280 490 C 270 355 295 220 340 100" strokeWidth="0.75" opacity="0.6" />
          <path d="M 275 488 C 260 365 275 245 315 135" strokeWidth="0.7" opacity="0.55" />
          <path d="M 296 498 C 315 350 370 205 418 80" strokeWidth="0.8" opacity="0.65" />
          <path d="M 302 502 C 335 365 395 230 435 110" strokeWidth="0.75" opacity="0.6" />
          <path d="M 308 506 C 355 380 418 255 450 145" strokeWidth="0.7" opacity="0.55" />

          {/* ------------------------------------------------------- */}
          {/* PETAL 3: Broad Prominent Right Petal Sweeping Center    */}
          {/* ------------------------------------------------------- */}
          {/* Outer Boundary */}
          <path
            d="M 310 510 C 420 460 580 360 720 220 C 580 330 440 430 300 500 C 440 440 620 330 760 180 C 600 315 450 440 315 515 Z"
            strokeWidth="1.8"
            className="opacity-95"
          />
          {/* Longitudinal Vein Contours */}
          <path d="M 310 508 C 445 440 600 335 740 200" strokeWidth="0.85" opacity="0.7" />
          <path d="M 306 502 C 430 425 570 310 690 185" strokeWidth="0.8" opacity="0.65" />
          <path d="M 302 498 C 410 410 535 290 645 175" strokeWidth="0.75" opacity="0.6" />
          <path d="M 298 494 C 390 395 500 275 600 170" strokeWidth="0.7" opacity="0.55" />
          <path d="M 315 515 C 465 460 625 365 755 240" strokeWidth="0.8" opacity="0.65" />
          <path d="M 320 520 C 485 480 645 400 750 285" strokeWidth="0.75" opacity="0.6" />
          <path d="M 325 526 C 500 500 655 435 730 335" strokeWidth="0.7" opacity="0.5" />

          {/* ------------------------------------------------------- */}
          {/* PETAL 4: Lower-Right Broad Blossom Petal                */}
          {/* ------------------------------------------------------- */}
          {/* Outer Boundary */}
          <path
            d="M 315 530 C 460 560 620 570 750 510 C 600 545 450 540 305 525 C 470 580 640 595 780 540 C 610 575 440 560 310 535 Z"
            strokeWidth="1.6"
            className="opacity-90"
          />
          {/* Vein Contours */}
          <path d="M 312 532 C 465 570 630 580 765 525" strokeWidth="0.8" opacity="0.65" />
          <path d="M 310 528 C 450 550 595 550 720 495" strokeWidth="0.75" opacity="0.6" />
          <path d="M 308 524 C 430 530 560 520 670 465" strokeWidth="0.7" opacity="0.55" />
          <path d="M 316 538 C 475 590 640 610 755 570" strokeWidth="0.75" opacity="0.6" />
          <path d="M 320 545 C 480 610 635 640 720 620" strokeWidth="0.7" opacity="0.5" />

          {/* ------------------------------------------------------- */}
          {/* PETAL 5: Far-Left Arching Petal                         */}
          {/* ------------------------------------------------------- */}
          {/* Outer Boundary */}
          <path
            d="M 265 535 C 170 510 70 440 10 320 C 85 415 185 490 270 525 C 150 480 50 395 0 270 C 80 390 190 480 275 530 Z"
            strokeWidth="1.6"
            className="opacity-85"
          />
          {/* Veins */}
          <path d="M 268 530 C 160 495 60 415 5 295" strokeWidth="0.8" opacity="0.6" />
          <path d="M 270 526 C 175 480 85 390 35 270" strokeWidth="0.75" opacity="0.55" />
          <path d="M 272 522 C 190 460 110 365 70 250" strokeWidth="0.7" opacity="0.5" />
          <path d="M 264 538 C 150 515 55 450 15 350" strokeWidth="0.75" opacity="0.55" />

          {/* ------------------------------------------------------- */}
          {/* PETAL 6: Bottom Downward Sweeping Petal                 */}
          {/* ------------------------------------------------------- */}
          <path
            d="M 285 550 C 270 660 310 760 360 840 C 290 750 250 650 275 545 C 285 670 340 780 400 850 C 320 765 270 660 280 550 Z"
            strokeWidth="1.5"
            className="opacity-80"
          />
          <path d="M 282 552 C 280 665 325 770 380 845" strokeWidth="0.8" opacity="0.6" />
          <path d="M 278 548 C 265 650 295 745 340 820" strokeWidth="0.75" opacity="0.5" />
          <path d="M 288 555 C 300 680 360 790 415 845" strokeWidth="0.75" opacity="0.5" />

          {/* ------------------------------------------------------- */}
          {/* CENTRAL CALYX / COROLLA FLOWER CORE ACCENTS             */}
          {/* ------------------------------------------------------- */}
          {/* Delicate pistil/stamen filaments radiating outward */}
          <path d="M 285 520 Q 320 480 365 440" strokeWidth="1.2" opacity="0.75" />
          <circle cx="367" cy="438" r="2.5" fill="currentColor" opacity="0.8" />

          <path d="M 290 515 Q 345 460 410 410" strokeWidth="1.2" opacity="0.75" />
          <circle cx="412" cy="408" r="2.5" fill="currentColor" opacity="0.8" />

          <path d="M 295 518 Q 360 485 435 465" strokeWidth="1.2" opacity="0.75" />
          <circle cx="437" cy="464" r="2.5" fill="currentColor" opacity="0.8" />

          <path d="M 288 525 Q 340 510 415 510" strokeWidth="1.2" opacity="0.75" />
          <circle cx="417" cy="510" r="2.5" fill="currentColor" opacity="0.8" />

          <path d="M 280 515 Q 300 450 325 385" strokeWidth="1.2" opacity="0.75" />
          <circle cx="326" cy="383" r="2.5" fill="currentColor" opacity="0.8" />

          <path d="M 275 518 Q 260 455 245 390" strokeWidth="1.2" opacity="0.75" />
          <circle cx="244" cy="388" r="2.5" fill="currentColor" opacity="0.8" />

          {/* Central floral hub curves */}
          <path d="M 265 520 C 275 500 295 500 305 520 C 310 535 295 545 285 545 C 270 545 260 535 265 520 Z" strokeWidth="1.4" opacity="0.7" />
          <path d="M 272 522 C 278 510 290 510 296 522 C 300 530 292 538 284 538 C 276 538 270 530 272 522 Z" strokeWidth="1" opacity="0.6" />

        </g>
      </svg>
    </div>
  );
};
