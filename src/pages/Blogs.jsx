import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../styles/Blogs.scss";

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    let cards = gsap.utils.toArray(".colored-card");
    let stickDistance = 0; // extra distance to have things stick after the last card pins (pixels)

    let lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: "center center",
    });

    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "center center",
        end: () => lastCardST.start + stickDistance,
        pin: true,
        pinSpacing: false,
      });
    });
  }, []);

  return (
    <div className="container">
      <div id="scroll">&darr; Enlarge the screen and scroll down &darr;</div>

      <section id="colored-cards" ref={sectionRef}>
        <div class="container" ref={cardsRef}>
          <div class="spacer">
            <div class="row colored-card g-0">
              <div class="col l-col">
                <h4>Section 1</h4>
              </div>
              <div class="col r-col"></div>
            </div>
          </div>
          <div class="spacer">
            <div class="row colored-card g-0">
              <div class="col l-col">
                <h4>Section 2</h4>
              </div>
              <div class="col r-col"></div>
            </div>
          </div>
          <div class="spacer">
            <div class="row colored-card g-0">
              <div class="col l-col">
                <h4>Section 3</h4>
              </div>
              <div class="col r-col"></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container my-5">
          <div class="row">
            <div class="col">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                volutpat lacus sed massa iaculis, a porttitor lacus viverra.
                Morbi vel diam et augue venenatis consequat sit amet in lacus.
                Praesent eu ligula quam. Nunc tincidunt consectetur lorem, et
                commodo tellus malesuada eu. Integer at iaculis dolor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
