import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
            <p className='fs-17'>In the digital age, books have transcended physical boundaries, and online platforms have become central to the experience of reading. Readers seek not only access to vast libraries but also a space to connect, share, and discover. Online book review platforms have emerged as valuable resources, guiding readers through the abundance of choices and fostering a sense of community. However, existing platforms often lack the user-friendliness, focused features, and sense of community that enhance the book discovery and review process. Book-Hub aims to address this gap by providing a dedicated space for readers to explore books, share their insights, and engage in meaningful discussions with fellow book enthusiasts.</p>
        
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
