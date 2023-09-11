import React from "react"
import Slideshow from "../../components/slideshow/Slideshow.jsx"
import About from "../../components/about/About.jsx"
import Testimonial from "../../components/testimonial/Testimonial.jsx"
import Map from "../../components/map/Map.jsx"
import Contact from "../../components/contact/Contact.jsx"

const HomePage = () => {
    return (
        <>
            <Slideshow />
            <About />
            <Testimonial />
            <Map />
            <Contact />
        </>
    )
}

export default HomePage